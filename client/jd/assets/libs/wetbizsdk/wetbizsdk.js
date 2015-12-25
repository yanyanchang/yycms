/**
 * Created by he.zhiyi on 15/2/8.
 */
var procJSONP = [] ;
function jsonP(url,callBack) {

    procJSONP.push(callBack) ;

    var items  = url.split('?') ;
    var tmpUrl = items[0] + '?callBack=callBack' ;
    if ( items.length>1 ) {
        tmpUrl += '&' + items[1] ;
    }

    var script = document.createElement('script');
    script.setAttribute('src', tmpUrl);
    document.getElementsByTagName('head')[0].appendChild(script);
    // document.getElementsByTagName('head')[0].removeChild(script);

    // 这里需要做一个延时操作，否则低版本的IE不能正常显示
    setTimeout(function(){
        document.getElementsByTagName('head')[0].removeChild(script);
    },10000) ;

}

function callBack(data){

    if ( procJSONP.length>0 ) {
        var updateList = procJSONP[0] ;
        procJSONP.slice(0,1) ;
        if (typeof  updateList === 'function') {
            updateList(data) ;
        }
    }
}

var sdk = null ;

var WETBizSDK = (
    function() {
        var _encrypt_key,_encrypt_iv ;      // 初始化加密密钥
        var _modLoginInfo ;

        var _requires = [] ;
        _requires.push('encrypt') ;
        _requires.push('uiFunction') ;
        _requires.push('sdkDefine') ;
        _requires.push('websocket/webSocket') ;
        _requires.push('Biz/IBiz') ;
        _requires.push('Biz/BizTest') ;
        _requires.push('Biz/BizLogin') ;
        _requires.push('Biz/BizUserAccount') ;
        _requires.push('Biz/BizSymbolInfo') ;
        _requires.push('Biz/BizContracts') ;
        _requires.push('Biz/BizCERInfo') ;
        _requires.push('Biz/BizHoldBill') ;
        _requires.push('Biz/BizLimitBill') ;
        _requires.push('Biz/BizCloseBill') ;
        _requires.push('Biz/BizHoldPosition') ;
        _requires.push('Biz/BizOrder') ;
        _requires.push('Biz/BizPayPort') ;
        _requires.push('Biz/BizRegister') ;
        _requires.push('Biz/BizBinHoldBill') ;
        _requires.push('Biz/BizPassword') ;

        var _wsLogin  = null ;
        var _wsTC     = null ;
        var _wsQuoted = null ;
        var _wsMSG    = null ;
        var _callBackID = 0  ;      // 调用 on 订阅消息时，用于唯一标识回调函数的编号，当调用 un 注销时需要使用

        var _symbolInfos  = [] ;
        var _accInfos     = [] ;
        var _exchangeRate = [] ;
        var _holdBills    = [] ;
        var _binHoldBills    = [] ;
        var _limitBills   = [] ;
        var _holdPosition = [] ;
        var _bankInfos    = [] ;    // 缓存银行信息
        var _contracts    = [] ;    // 缓存合约信息

        var _hostHisQuery = '' ;    // 历史查询服务地址

        var _subscrib     = [] ;
        var _keepQuoted   = false ;

        var _onReady      = null ;

        var _rootPath     = './' ;

        var _isAccountLogin = 0;
        // 动态加载JS代码
        var _loadRequire = function(callBack) {

            var root = _rootPath ; //this.rootPath ;

            for (var i = 0; i<_requires.length; i++) {

                var fnName = _requires[i].split('/') ;
                var oFn    = fnName[fnName.length-1] ;

                switch (oFn)
                {
                    case 'encrypt' : {
                        oFn = 'CryptoJS' ;
                        break;
                    }
                    case 'sdkDefine' : {
                        oFn = 'sdkDefine' ;
                        break;
                    }
                    default : {}
                }

                try {
                    var func = eval(oFn) ;
                    console.log(oFn + ' --> has ' + (typeof func)) ;
                } catch (e){
                    //console.log(oFn + ' --> ' + (typeof oFn)) ;

                    var fn      = root + '/' + _requires[i] + '.js' ;
                    // var fn      =  './' + _requires[i] + '.js' ;
                    var fileref = document.createElement('script') ;
                    fileref.setAttribute("type","text/javascript") ;
                    fileref.setAttribute("src", fn) ;

                    if (typeof fileref!="undefined") {
                        document.getElementsByTagName("head")[0].appendChild(fileref)
                    }

                }

            }

            if (typeof callBack === 'function') {
                callBack.call() ;
            }
        } ;
        //_loadRequire() ;

        // 消息路由
        var _msgRote = function(wetPackage) {
            var eventCode = wetPackage.event ;

            console.log('event : ' + eventCode) ;

            if ( _subscrib[eventCode] ) {

                var callBacks = _subscrib[eventCode] ;
                for (var i=0; i<callBacks.length; i++) {
                    if (typeof callBacks[i].fn === 'function') {
                        var scope = callBacks[i].scope || this ;


                        try {
                            var mods  = wetPackage.data.children || [] ;
                            callBacks[i].fn.call(scope,mods) ;
                        } catch(err) {
                            console.log('wetbizsdk._msgRote  收到异常包') ;
                        }

                    }
                }
            } else {
                console.log('消息 : ' + eventCode + ' 未订阅') ;
            }

            switch (eventCode)
            {
                case PUSH_SAMEUSER_LOGIN :
                {
                    if (_wsTC)
                    {
                        _wsTC.close() ;
                    }
                    if (_wsQuoted && _keepQuoted===false)
                    {
                        _wsQuoted.close() ;
                    }

                    for (var key in _subscrib)
                    {
                        // TODO : 这里做了特殊处理，在只查看实时行情的应用个场景中，即使出现同名登录，也希望保持实时行情不中断
                        if ( key==='4002' && _keepQuoted===true ) {} else {
                            delete _subscrib[key] ;
                        }
                    }

                    // _subscrib = [] ; // 清除所有订阅
                    break ;
                }
                default : {}
            }

        } ;

        /**
         * @brief           （内部函数）登录网关
         * @param args
         * @private
         */
        var _loginWithUserId = function(args) {
            var me = this ;

            // 创建登录服务对象
            _wsLogin = new webSocket({
                key         : _encrypt_key,
                iv          : _encrypt_iv,
                isEncrypt   : M_DATA_ENCRYPT
            }) ;

            _wsLogin.open({
                url    : args.urls[0],
                scope  : me,
                onOpen : function() {

                    var me = this ;
                    console.log('链接已建立');

                    var biz = new BizLogin({
                        webSocket : _wsLogin
                    }) ;

                    biz.loginWithUID({
                        uid       : args.uid,
                        pwd       : args.pwd,
                        vcode     : args.vcode,
                        onSuccess : function(mod) {

                            _modLoginInfo     = mod ;
                            _modLoginInfo.uid = args.uid ;
                            _modLoginInfo.pwd = args.pwd ;
                           // _modLoginInfo.userId = mod.Uid ;//TODO
                            console.log(mod);

                            // 登录交易网关

                            _loginTraderProxy.call(me,{
                                onSuccess    : args.onSuccess,
                                onFailure    : args.onFailure
                            }) ;

                            _wsLogin.close() ;

                        },
                        onFailure : args.onFailure
                    }) ;

                },
                onPush : function() {}
            }) ;

        };

        /**
         * @brief           （内部函数）修改登录密码
         * @param args
         * @private
         */
        var _passwordChange = function(args) {
            var me = this ;
            if (!_wsTC) {
                if ( typeof args.onFailure === 'function') {
                    args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                }
                return  ;
            }

            var biz = new BizPassword({
                webSocket : _wsTC
            }) ;

            biz.changeUserPassword({
                'pwdType'  : 1,
                'newPWD'   : args.newPWD,
                'oldPWD'   : args.oldPWD,
                'userId'   : args.userId,
                onSuccess : function(mods) {
                    if (typeof args.onSuccess==='function') {
                        args.onSuccess(mods) ;
                    }
                },
                onFailure : args.onFailure
            }) ;
        };

        /**
         * @brief           （内部函数）登录交易网关
         * @param args
         * @private
         */
        var _loginTraderProxy = function(args) {

            var me = this ;

            // 创建交易网关服务对象
            _wsTC = new webSocket({
                heartBeat   : { interval:5000, timeout:60000, msg:'' },
                key         : _encrypt_key,
                iv          : _encrypt_iv,
                isEncrypt   : M_DATA_ENCRYPT
            }) ;

            _wsTC.open({
                url    : _modLoginInfo.tradeproxy,
                onOpen : function() {

                    var biz = new BizLogin({
                        webSocket : _wsTC
                    }) ;

                    // 登录交易网关

                    biz.loginWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        pwd       : _modLoginInfo.pwd,
                        onSuccess : function(mod) {
                            _isAccountLogin=1;//TODO
                            _modLoginInfo.userId=mod.data.Uid;//TODO

                            _wsTC.token = mod.token ;

                            // 登录消息公告服务
                            _loginMsgProxy({
                                onSuccess    : args.onSuccess,
                                onFailure    : args.onFailure
                            }) ;

                            // 初始化历史数据查询服务
                            _loginHisQueryProxy({
                                onSuccess    : args.onSuccess,
                                onFailure    : args.onFailure
                            }) ;

                            // 查询资金账户信息
                            me.queryAccount({
                                onSuccess : function(mods) {
                                    //_accInfos = mods ;

                                    // 查询商品信息
                                    me.querySymbol({
                                        onSuccess : function(mods) {
                                            // me.symbolInfos = mods ;

                                            // 查询汇率信息
                                            me.queryCERInfo({
                                                onSuccess : function(mods) {
                                                    // 登录实时行情服务
                                                    _loginQuotedProxy({
                                                        onSuccess    : args.onSuccess,
                                                        onFailure    : args.onFailure
                                                    }) ;
                                                    // 二元交易合约编号查询
                                                    console.log('二元交易合约编号查询');
                                                    me.queryContracts({
                                                        onSuccess: function (mods) {
                                                            console.log(mods);
                                                        },
                                                        onFailure: function (){

                                                        }
                                                    }) ;
                                                },
                                                onFailure : args.onFailure
                                            }) ;
                                        },
                                        onFailure : args.onFailure
                                    }) ;

                                },
                                onFailure : args.onFailure
                            }) ;

                        },
                        onFailure : args.onFailure
                    }) ;

                },
                onClose : function() {
                    console.log('TraderProxy is close') ;
                    if (_isAccountLogin == 1) {
                        _wsTC.reConnect();
                    }
                },
                onPush : function(wetPackage) {
                    // 收到交易服务推送过来的消息
                    _msgRote.call(me,wetPackage) ;
                }
            }) ;

        };

        /**
         * @brief           （内部函数）登录实时行情服务
         * @param args
         * @private
         */
        var _loginQuotedProxy = function(args) {
            var me = this ;

            var hostURL  = _modLoginInfo.new_quotedproxy || _modLoginInfo.quotedproxy ;
            var protocol = (_modLoginInfo.new_quotedproxy) ? WS_PROTOCOL_QCMP : WS_PROTOCOL_DEFAULT ;

            // 创建交易网关服务对象
            _wsQuoted = new webSocket({
                protocol    : protocol,
                heartBeat   : { interval:5000, timeout:60000, msg:'' },
                key         : _encrypt_key,
                iv          : _encrypt_iv,
                isEncrypt   : M_DATA_UNENCRYPT
            }) ;

            // var hostURL = _modLoginInfo.quotedproxy ;

            _wsQuoted.open({
                url    : hostURL,
                scope  : me,
                onOpen : function() {

                    if (!_modLoginInfo.new_quotedproxy) {
                        // 旧版实时行情服务需要执行登录逻辑
                        var biz = new BizLogin({
                            webSocket : _wsQuoted
                        }) ;

                        // 登录实时行情网关
                        biz.loginWithSID({
                            sid       : _modLoginInfo.sid,
                            uid       : _modLoginInfo.uid,
                            pwd       : _modLoginInfo.pwd,
                            onSuccess : function(mod) {
                                _wsQuoted.token = mod.token ;
                                args.onSuccess();

                                // me._demoQuoted() ;
                            },
                            onFailure : args.onFailure
                        }) ;
                    }else{
                        args.onSuccess();
                    }

                },
                onClose : function() {
                    console.log('QuotedProxy is close') ;
                },
                onPush : function(wetPackage) {

                    // 接收到的行情数据
                    var mods = wetPackage.data.children ;

                    if ( protocol === WS_PROTOCOL_QCMP) {

                        // 0 -> 功能号
                        // 1 -> lastTime        最后更新时间（整型值）
                        // 2 -> exchange_name   （暂不使用）
                        // 3 -> symbolCode      商品代码
                        // 4 -> priceCurrent    最新价（用于计算ask,bid）
                        // 5 -> priceOpen       （暂不使用）
                        // 6 -> priceHighest    最高价（用于图表显示）
                        // 7 -> priceLowest     最低价（用于图表显示）
                        // 8 -> priceClose      （暂不使用）
                        // 9 -> dailyHight      当日最高价（用于报价列表显示）
                        // 10 -> dailyLow       当日最低价（用于报价列表显示）
                        // 11 -> volume         （暂不使用）

                        var quotedList = mods ;
                        mods = [] ;
                        for (var i=0; i<quotedList.length; i++)
                        {
                            var item = quotedList[i].split(',') ;

                            var lastTime = me.sdk.uf.fmtDate( me.sdk.uf.Epoch2Date( new Date(parseInt( item[1] )) ) );
                            var quoted = {
                                symbolCode   : item[3],
                                priceCurrent : parseFloat(item[4]),
                                priceHighest : parseFloat(item[6]),
                                priceLowest  : parseFloat(item[7]),
                                dailyHight   : parseFloat(item[9]),
                                dailyLow     : parseFloat(item[10]),
                                volume       : parseFloat(item[11]),
                                lastTime     : lastTime
                            };

                            mods.push(quoted) ;
                            //console.log('接收到新版实时行情') ;

                        }
                    }

                    var ret  = [] ;

                    for (var i=0; i<mods.length; i++)
                    {
                        var mod = mods[i] ;

                        if (_symbolInfos[mod.symbolCode]) {

                            _symbolInfos[mod.symbolCode].lastTime =  mod.lastTime ;

                            // 根据报价点差计算买卖价
                            var symbolInfo   = _symbolInfos[mod.symbolCode] ;
                            var currentPrice = parseFloat( mod.priceCurrent );       // 取实时行情最新价
                            var decimal      = symbolInfo.decimal;
                            var scale        = Math.pow(10, decimal);
                            var askPoint     = symbolInfo.pointAsk ;
                            var bidPoint     = symbolInfo.pointBid;

                            var newAsk = ( currentPrice * scale + askPoint ) / scale;
                            var newBid = ( currentPrice * scale - bidPoint ) / scale;

                            // ---------------------------------------------------------------------------------
                            // 更新缓存商品的价格信息
                            // ---------------------------------------------------------------------------------
                            _symbolInfos[mod.symbolCode].upOrDown = (newAsk * scale - symbolInfo.ask * scale) ;
                            _symbolInfos[mod.symbolCode].ask  = parseFloat( newAsk );
                            _symbolInfos[mod.symbolCode].bid  = parseFloat( newBid );

                            _symbolInfos[mod.symbolCode].priceCurrent  = currentPrice;
                            _symbolInfos[mod.symbolCode].priceHighest  = parseFloat(mod.priceHighest);
                            _symbolInfos[mod.symbolCode].priceLowest   = parseFloat(mod.priceLowest);
                            _symbolInfos[mod.symbolCode].dailyHighest  = parseFloat(mod.dailyHight) ;
                            _symbolInfos[mod.symbolCode].dailyLowest   = parseFloat(mod.dailyLow) ;
                            _symbolInfos[mod.symbolCode].spread        = Math.abs(askPoint - bidPoint) ;

                            ret.push(_symbolInfos[mod.symbolCode]) ;

                            // ---------------------------------------------------------------------------------
                            // 根据持仓单数据，计算浮动盈亏
                            // ---------------------------------------------------------------------------------
                            _updateHoldBill(_symbolInfos[mod.symbolCode]) ;
                        }

                    }

                    if (_subscrib && _subscrib[M_R_PUSH_QUOTE] && ret.length>0) {
                        var callBacks = _subscrib[M_R_PUSH_QUOTE] ;
                        for (var i=0; i<callBacks.length; i++) {
                            if (typeof callBacks[i].fn === 'function') {
                                var scope = callBacks[i].scope || this ;
                                callBacks[i].fn.call(scope,ret) ;
                            }
                        }
                    }
                    // TODO : 发布实时行情
                    //console.log('发布实时行情') ;
                }
            }) ;

        };

        /**
         * @brief           （内部函数）登录消息公告服务
         * @param args
         * @private
         */
        var _loginMsgProxy = function(args){
            var me = this ;

            // 创建交易网关服务对象
            _wsMSG = new webSocket({
                heartBeat   : { interval:5000, timeout:60000, msg:'' },
                key         : _encrypt_key,
                iv          : _encrypt_iv,
                isEncrypt   : M_DATA_ENCRYPT
            }) ;

            _wsMSG.open({
                url    : _modLoginInfo.messageProxy,
                onOpen : function() {

                    var biz = new BizLogin({
                        webSocket : _wsMSG
                    }) ;

                    // 登录交易网关
                    biz.loginWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        pwd       : _modLoginInfo.pwd,
                        onSuccess : function(mod) {
                            console.log('Message login success') ;
                            _wsMSG.token = mod.token ;
                        },
                        onFailure : args.onFailure
                    }) ;

                },
                onClose : function() {
                    console.log('MessageProxy is close') ;
                    if (_isAccountLogin == 1) {
                        _wsMSG.reConnect();
                    }
                },
                onPush : function(wetPackage) {
                    // 收到交易服务推送过来的消息
                    _msgRote.call(me,wetPackage) ;
                }
            }) ;
        } ;

        /**
         * @brief           （内部函数）登录历史数据查询服务
         * @param args
         *      {
         *          onSuccess
         *          onFailure
         *      }
         * @private
         */
        var _loginHisQueryProxy = function (args) {
            if (_strLeft(_modLoginInfo.hisQueryProxy,7)==='http://') {
                _hostHisQuery = _modLoginInfo.hisQueryProxy ;

                console.log('HisQueryProxy login success') ;
            }
        };
        /**
         * @brief           （内部函数）取汇率
         * @param baseCode
         * @param exchangeCode
         * @private
         */
        var _getExchangeRate = function(baseCode,exchangeCode){

            var mod = null ;
            var ret = 1.0 ;

            if (_exchangeRate) {
                var key = baseCode + '_' + exchangeCode ;
                mod = _exchangeRate[key] ;
                if (mod)
                {
                    ret = mod.exchangeRate ;
                }
            }

            return ret ;
        } ;

        /**
         * @brief           （内部函数）计算浮动盈亏
         * @param pClose
         * @param pHold
         * @param quantity
         * @param bsCode
         * @param unit
         * @param symbolType
         * @private
         */
        var _calculateDynProfit = function(pClose, pHold, quantity, bsCode, unit, symbolType){

            var ret  = 0.0 ;

            var flag = 1 ;		// 持仓方向标志，1=买， -1=卖

            if ( bsCode===BSCODE_BUY ) {
                flag = 1 ;
            }else{
                flag = -1 ;
            }

            try {
                if ( symbolType === M_SYMBOLTYPE_NORMA ) {
                    // 直接商品
                    ret = (pClose - pHold) * flag * unit * quantity ;
                } else if ( symbolType === M_SYMBOLTYPE_INDIRECT ) {
                    // 间接商品(非美元合约)
                    ret = (1/pClose - 1/pHold) * flag * unit * quantity ;
                } else if ( symbolType === M_SYMBOLTYPE_INDIRECT_2 ) {
                    // 间接商品(实盘)
                    // ToDo : 暂不支持
                    // if ( pClose <= 0.000001 ) {
                    //     errCode = ;
                    // } else {
                    //    result = (pClose - pOpen) * flag * unit * quantity / pClose;
                    // }
                } else if ( symbolType === M_SYMBOLTYPE_CROSS ) {
                    // 交叉商品
                    // ToDo : 暂不支持
                    // if ( exchangeRate <= 0.000001 ) {
                    //     errCode = ;
                    // } else {
                    //    result = (pClose - pOpen) * flag * unit * quantity / exchangeRate;
                    // }
                } else {
                }
            }
            catch (err) {
                //
            }
            finally {
                //
            }

            return ret ;
        } ;

        var _holdBillDynProfit = function(mod) {

            var bsCode = mod.bsCode ;
            var symbolInfo    = _symbolInfos[mod.symbolCode] ;

            var pClose        = (bsCode === BSCODE_BUY) ? symbolInfo.bid : symbolInfo.ask ;
            var pHold         = mod.priceHold ;
            var quantity      = mod.quantityHold ;
            var unit          = symbolInfo.unit ;
            var symbolType    = symbolInfo.symbolType ;
            var exchangeRate  = _getExchangeRate(symbolInfo.symbolCurrency,symbolInfo.accCurrency);

            // 更新持仓单上的最新价
            mod.markPrice = pClose ;

            // 以报价货币计算的浮动盈亏
            mod.dynProfitPrice   = _calculateDynProfit(pClose, pHold, quantity, bsCode, unit, symbolType) ;
            // 以结算货币计算的浮动盈亏
            mod.dynProfit        = mod.dynProfitPrice * exchangeRate ;
        } ;

        /**
         * @brief           （内部函数）更新持仓单
         * @param symbolInfo
         * @private
         */
        var _updateHoldBill = function(symbolInfo) {

            var ret = [] ;
            for(var key in _holdBills){
                var mod = _holdBills[key];

                if ( mod.symbolCode===symbolInfo.symbolCode ) {

                    var accInfo_profitDyn   = 0.0 ;
                    var holdPosition_dpBuy  = 0.0 ;
                    var holdPosition_dpSell = 0.0 ;

                    _holdBillDynProfit(mod,symbolInfo) ;

                    ret.push(mod) ;
                }
            }

            if (ret.length>0) {
                // 广播持仓单变更消息
                if (_subscrib && _subscrib[PUSH_HOLDBILLCHANGE]) {
                    var callBacks = _subscrib[PUSH_HOLDBILLCHANGE] ;
                    for (var i=0; i<callBacks.length; i++) {
                        if (typeof callBacks[i].fn === 'function') {
                            var scope = callBacks[i].scope || this ;
                            callBacks[i].fn.call(scope,ret) ;
                        }
                    }
                }
            }
        } ;

        /**
         * @brief           （内部函数）判断限价单类型
         * @param bsCode
         * @param priceOver
         * @private
         */
        var _getLimitType = function(bsCode,priceOver) {

            var strRet = eOT_LimitOrder ;
            if ( bsCode===BSCODE_BUY && priceOver<0 ) {

                strRet = eOT_LimitOrder ;

            }else if ( bsCode===BSCODE_SELL && priceOver>0 ){

                strRet = eOT_LimitOrder ;

            }else if (bsCode===BSCODE_BUY && priceOver>0){

                strRet = eOT_StopOrder ;

            }else if (bsCode===BSCODE_SELL && priceOver<0){

                strRet = eOT_StopOrder ;

            }

            return strRet ;
        };
        /**
         *  @brief  截取字符串 Left 函数
         *  @param  str         被截取的字符串
         *  @param  length      要截取的长度
         */
        var _strLeft = function(str,length) {
            var sl = str ;
            sl = sl.substring(0,length) ;
            return sl;
        };
        /**
         *  @brief  截取字符串 Right 函数
         *
         *  @param  str         被截取的字符串
         *  @param  length      要截取的长度
         */
        var _strRight = function(str,length) {
            var sr = str;
            sr = sr.substring(sr.length-length,sr.length);
            return sr;
        } ;

        /**
         *	@brief	格式化日期
         *
         *  根据限价点差计算限价
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 yyyy-mm-dd hh:mm:ss 的日期字符串
         */
        var _fmtDate = function(date) {
            var sRet;
            sRet = date.getFullYear() + "-";                        // 取年份
            sRet += _strRight('0' + (date.getMonth() + 1),2) + "-";  // 取月份
            sRet += _strRight('0' + date.getDate(),2) + " ";         // 取日期
            sRet += _strRight('0' + date.getHours(),2) + ":";        // 取小时
            sRet += _strRight('0' + date.getMinutes(),2) + ":";      // 取分
            sRet += _strRight('0' + date.getSeconds(),2);            // 取秒

            return sRet;
        } ;

        return {

            /**
             * @brief       当出现同名账户登录时，是否保留实时行情链路不中断，true＝保留，false＝不保留
             * @param       bFlag
             */
            keepQuoted : function(bFlag) {_keepQuoted=bFlag},
            /**
             * @brief       SDK UI数据处理函数集
             * @note        成功初始化后方可使用
             */
            uf : null,

            /**
             * @brief       SDK 根目录
             */
            rootPath : '',


            /**
             * @brief       初始化SDK
             * @param key   用于AES加密/解密的密钥
             * @param iv
             * @param rootPath
             * @param callBack
             */
            init : function(key,iv,rootPath,callBack){
                var me = this ;

                me.setRoot(rootPath) ; // '../js/wetbizsdk'

                if (!_rootPath || _rootPath.length===0) {
                    console.log('未指定 SDK 根目录') ;
                    return ;
                }

                _loadRequire.call(this,function(){

                    var testTimes = 5 ;

                    var checker = setInterval(function(){

                        try {

                            if (CryptoJS) {
                                console.log('SDK 依赖项加载已完成！') ;
                                clearInterval(checker) ;

                                _encrypt_key = CryptoJS.enc.Latin1.parse(key);
                                _encrypt_iv  = CryptoJS.enc.Latin1.parse(iv);

                                me.uf = new uiFunction() ;

                                if (_onReady)
                                {
                                    _onReady.call(me) ;
                                }

                                if (typeof callBack === 'function')
                                {
                                    callBack.call() ;
                                }

                            }else{
                                testTimes -- ;
                            }

                        } catch (err) {
                            testTimes -- ;
                        }

                        console.log('test CryptoJS') ;
                        if ( testTimes<=0 ) {
                            clearInterval(checker) ;
                            console.log('SDK 依赖项加载失败！') ;
                        }

                    },1000) ;

                }) ;

            },

            /**
             * @brief       sdk 就绪事件
             * @param callBack
             */
            onReady : function(callBack) {

                if (typeof callBack === 'function')
                {
                    _onReady = callBack ;
                }
            },

            setRoot : function(strRootPath) {
                _rootPath = strRootPath ;
                // _loadRequire() ;
            },

            //strRight : _strRight,
            //strLeft  : _strLeft,

            /**  ---------------------------------------------------------------------
             *      登录类
             *   --------------------------------------------------------------------/
            /**
             * @brief       登录请求
             * @param args
             *
             *      {
             *          uid       : <登录帐号>
             *          pwd       : <登录密码>
             *          vaildCode : [登录校验码 (可选) ]
             *          URLs      : <登录服务地址 (数组)>
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            loginWithUserId : function(args) {
                var me = this ;
                // console.log('loginWithUserId be call + uid : ' + args.uid) ;
                _loginWithUserId.call(me,args) ;
            },

            /**
             * @brief       注销登录
             */
            logout : function() {
                console.log('logout be call') ;
            },

            /**
             * @brief       修改登录密码
             * @param newPWD
             * @param onsuccess
             * @param onfailure
             */
            passwordChange : function(args){
                var me = this ;
                _passwordChange.call(me,args) ;
                console.log('passwordChange be call') ;
            },


            /**  ---------------------------------------------------------------------
             *      在线注册类
             *   --------------------------------------------------------------------/
             /**
             * @brief       交易账户在线注册
             * @param args
             *
             *      {
             *          userName  : 账户姓名
             *          password  : 交易密码
             *          mobile    : 手机号码
             *          email     : 邮件地址
             *          smsCode   : 短信验证码
             *          bankCode  : 银行代码
             *          bankAccount : 银行卡号
             *          referee   : 推荐人编号
             *          attach    : 附件文件列表（以逗号分隔的字符串）
             *
             *          onSuccess : [执行成功回调函数]，注册成功时返回 msg 对象，msg.registCode 为签约席位号
             *          onFailure : [执行失败回调函数]
             *      }
             */
            registUser : function(args) {
                var me = this ;

                //if (!_wsTC) {
                //    if ( typeof args.onFailure === 'function') {
                //        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                //    }
                //    return  ;
                //}

                var biz = new BizRegister({
                    webSocket : _wsTC
                }) ;

                biz.submit({
                    method    : 'get',
                    url       : '../debug/testCall.php', // http://127.0.0.1/wetbizsdk/debug/testCall.php
                    mobile    : args.mobile,
                    password  : args.password,
                    vcode     : args.vcode,
                    token     : '',
                    onSuccess : function(mods) {

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       机构在线注册
             * @param args
             *
             *      {
             *          orgName   : 机构名称
             *          mobile    : 手机号码
             *          smsCode   : 短信验证码
             *          bankCode  : 银行代码
             *          bankAccount : 银行卡号
             *          referee   : 推荐人编号
             *
             *          onSuccess : [执行成功回调函数]，注册成功时返回 msg 对象，msg.registCode 为签约席位号
             *          onFailure : [执行失败回调函数]
             *      }
             */
            registOrg : function(args) {},

            queryTest : function(args) {
                var me = this ;

                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizTest({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    method    : 'get',
                    url       : '../debug/testCall.php', // http://127.0.0.1/wetbizsdk/debug/testCall.php
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;

            },


            /**  ---------------------------------------------------------------------
             *      查询类
             *   --------------------------------------------------------------------/

            /**
             * @brief       取登录账户信息
             * @returns MODLoginInfo
             */
            getUserInfo : function()
            {
                return _modLoginInfo ;
            },

            /**
             * @brief       查询资金帐户
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODUserAccount 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryAccount : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizUserAccount({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以 accId 为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = 'key_' + mod.accId ;
                            mod.userName = _modLoginInfo.userName ;
                            _accInfos[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;

            },

            /**
             * @brief       根据资金账户accID取资金账户信息
             * @param accId
             * @returns MODUserAccount
             */
            getAccount : function(accId) {
                var mod = null ;
                if (_accInfos) {
                    var key = 'key_' + accId ;
                    mod = _accInfos[key] ;

                    if (!mod) {
                        for ( key in _accInfos ) {
                            mod = _accInfos[key] ;
                            break ;
                        }
                    }
                }

                return mod ;
            },

            /**
             * @brief       查询商品信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODSymbolInfo 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            querySymbol : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizSymbolInfo({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {
                        // 以字典方式缓存商品数据
                        _symbolInfos = [] ;
                        for (var i=0; i<mods.length; i++)
                        {
                            var mod = mods[i] ;
                            _symbolInfos[mod.symbolCode] = mod ;
                            _symbolInfos[mod.symbolCode].lastTime = _symbolInfos[mod.symbolCode].date ;
                            _symbolInfos[mod.symbolCode].dailyHighest = _symbolInfos[mod.symbolCode].priceHighest ;
                            _symbolInfos[mod.symbolCode].dailyLowest = _symbolInfos[mod.symbolCode].priceLowest ;
                            _symbolInfos[mod.symbolCode].upOrDown = 0 ;
                            _symbolInfos[mod.symbolCode].spread = Math.abs(mod.pointAsk - mod.pointBid) ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }

                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       根据商品代码查询商品信息
             * @param symbolCode
             * @returns MODSymbolInfo
             */
            getSymbol : function(symbolCode) {
                var mod = null ;
                if (_symbolInfos) {
                    mod = _symbolInfos[symbolCode] ;
                }
                return mod ;
            },

            /**
             *  @brief      取商品信息对象
             *
             *  @note       根据给定的资金账户accID，获取商品信息
             *  @param      accId           资金账户ID，－1 表示返回所有的商品
             *  @return     modSymbolInfo   商品信息数据
             *
             */
            getSymbols : function(accId) {

                var ret = [] ;

                for(var key in _symbolInfos){
                    var mod = _symbolInfos[key];

                    if ( accId===-1 || accId === mod.accId ) {
                        ret.push(mod) ;
                    }

                }

                return ret ;
            },
            symbolId2Code:function(symbolId){
                for(var key in _symbolInfos){
                    var mod = _symbolInfos[key];
                    if ( symbolId === mod.symbolId ) {
                        return mod.symbolCode;
                    }
                }
                return '';
            },


            /**
             *  @brief      取商品信息对象
             *
             *  @note       根据给定的资金账户accID，获取商品信息
             *  @param      accId           资金账户ID，－1 表示返回所有的商品
             *  @return     modSymbolInfo   商品信息数据
             *
             */
            getContract : function(symbolCode) {
                return _contracts[symbolCode] ;
            },
            /**
             * @brief       查询合约编号
             * @param args
             *      {
             *          symbolCode  商品代码（可选填）
             *
             *          onSuccess : [执行成功回调函数] (返回 MODContractInfo 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryContracts : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }
                if(!_symbolInfos){
                    args.onFailure(BIZ_ERR_INVALIDWS, '商品信息未初始化');
                    return;
                }

                var biz = new BizContracts({
                    webSocket : _wsTC
                }) ;



                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {
                        // 建立汇率字典
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var symbolCode = me.symbolId2Code(mod.symbolId) ;
                            if (!_contracts[symbolCode]) {
                                _contracts[symbolCode] = [] ;
                            }
                            _contracts[symbolCode].push(mod) ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       查询汇率信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODCERInfo 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryCERInfo : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizCERInfo({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 建立汇率字典
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.currencyBase + '_' + mod.currencyExchange ;
                            _exchangeRate[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            getExchangeRate : _getExchangeRate,

            /**
             * @brief       查询持仓单信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODHoldBill 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryHoldBill : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizHoldBill({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以单号为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.orderCode ;
                            _holdBills[key] = mod ;
                            _holdBillDynProfit(mod) ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },
            queryBinHoldBill : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizBinHoldBill({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以单号为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.orderCode ;
                            _binHoldBills[key] = mod ;
                            //_holdBillDynProfit(mod) ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       根据持仓单号查询单据信息
             * @param orderCode
             * @returns MODHoldBill
             */
            getHoldBill : function(orderCode) {
                var mod = null ;
                if (_holdBills) {
                    mod = _holdBills[orderCode] ;
                }
                return mod ;
            },

            /**
             * @brief       查询持仓汇总信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODHoldPosition 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryHoldPosition : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizHoldPosition({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以商品代码为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.symbolCode ;
                            _holdPosition[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       根据商品代码查询持仓汇总信息
             * @param symbolCode
             * @returns MODHoldPosition
             */
            getHoldPosition : function(symbolCode) {
                var mod = null ;
                if (_holdPosition) {
                    mod = _holdPosition[symbolCode] ;
                }
                return mod ;
            },

            /**
             * @brief       查询限价单信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODLimitBill 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryLimitBill : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizLimitBill({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以单号为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.orderCode ;
                            _limitBills[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       根据限价单号查询限价单信息
             * @param orderCode
             * @returns MODLimitBill
             */
            getLimitBill : function(orderCode) {
                var mod = null ;
                if (_limitBills) {
                    mod = _limitBills[orderCode] ;
                }
                return mod ;
            },

            /**
             * @brief       查询限价单信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODCloseBill 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryCloseBill : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizCloseBill({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       查询微交易合约
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODBineBill 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryBinBill : function(args) {},

            /**
             * @brief       查询历史行情数据
             * @param args
             *
             *      {
             *          symbolCode : 商品代码
             *          period     : 周期
             *          barCount   : 指定返回条目数
             *          time       : 时间基线（ barCount > 0 时，取大于 time 的数据 ）
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryHisQuoted : function(args) {

            },

            /**
             * @brief       查询系统支持的银行
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODPayPort 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryPayPort : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizPayPort({
                    webSocket : _wsTC
                }) ;


                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        _bankInfos = [] ;

                        // 以 payPortId 为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = 'key_' + mod.payPortId ;
                            _bankInfos[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;

            },

            /**
             * @brief       根据支付接口 payPortId 查询支付接口信息
             * @param payPortId
             * @returns MODPayPort
             */
            getPayPortInfo : function(payPortId) {

                var mod = null ;
                var key = 'key_' + payPortId ;
                if (_bankInfos) {
                    mod = _bankInfos[key] ;
                }
                return mod ;

            },

            /**
             * @brief       查询交易历史（针对金德微交易）
             * @param args
             * {
             *      startTime,      开始时间（格式：yyyy-mm-dd 00:00:00）
             *      endTime,        结束时间（格式：yyyy-mm-dd 23:59:59）
             *      pageStart,      分页参数 - 数据记录开始下标
             *      pageLimit,      分页参数 - 每页返回记录数
             *      pageEnd,        分页参数 - 保留，占不使用
             *      page            分页参数 - 保留，占不使用
             * }
             */
            getHisTradeLog : function(args) {

                var me = this ;
                //_hostHisQuery = 'http://120.24.159.238:14020/wetquery/report_client/closebill' ;
                //_hostHisQuery = 'http://192.168.1.108:20040/report_client/binaryoptionsorder';


                if (args && args.hisQueryProxy) {
                    _hostHisQuery = args.hisQueryProxy;
                }else{
                    _hostHisQuery = 'http://192.168.1.108:20040/report_client/binaryoptionsorder';
                }


                if (_hostHisQuery)
                {
                    var _historyValue="1";//TODO
                    if(args.startTime=="" && args.startTime==""){//TODO
                        _historyValue="0";//TODO
                    }//TODO
                    var url = _hostHisQuery + "?bizData=";
                    var parames =[
                        {
                            'operator' : 'and',  //and,rlike,or
                            'value'    : _historyValue,//TODO
                            'key'      : 'isHistory'
                        },
                        {
                            'operator' : 'and',
                            'value'    : '("' + args.startTime + '","' + args.endTime + '")',
                            'key'      : 'tradingday'
                        }
                    ];
                    var sort = {
                        'order': 'DESC', //DESC,ASC
                        'children': [
                            "orderTime"
                        ]
                    };

                    var pageCtrl ={
                        'start': '0',
                        'limit': '20',
                        'page' : '1'
                    };

                    var accs=this.getAccount(-1);//TODO
                    var bizData = {
                        'accId'     :  accs.accId,//TODO
                        'userId'    : _modLoginInfo.userId, // TODO
                        'parames'   : parames,
                        'pageCtrl'  : pageCtrl,
                        'sort'      : sort

                    };

                    url += encodeURIComponent(JSON.stringify(bizData));

                    // console.log(url) ;

                    jsonP(url,function(dat){

                         //console.log(dat)  ;

                        if (dat && dat.bizRet && dat.bizRet === "0") {
                            // console.log(dat.bizMsg) ;

                            if ( typeof args.onSuccess === 'function')
                            {
                                if(dat.data.length>0){//TODO
                                    dat.data[0].totalCount=dat.totalCount;//TODO
                                }//TODO
                                args.onSuccess(dat.data) ;
                            }
                        }

                    }) ;

                }
            },

            /**  ---------------------------------------------------------------------
             *      交易类
             *   --------------------------------------------------------------------/
             /**
             * @brief       市价建仓单
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          contract            合约编号
             *          quantity            委托数量
             *          bsCode              买卖方向
             *          orderPrice          委托价格
             *          pointOffset         允许偏离点差
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            marketOpen : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_MARKETOPEN,
                    responseCode : M_R_MARKETOPEN,
                    webSocket    : _wsTC
                }) ;

                var symbolInfo = _symbolInfos[args.symbolCode] ;

                if (symbolInfo) {

                    var modOrder = {
                        orderType       : eOT_MarketOpen ,
                        symbolCode      : args.symbolCode ,
                        orderQuantity   : args.quantity ,
                        bsCode          : args.bsCode ,
                        orderPrice      : args.orderPrice ,
                        pointOffset     : args.pointOffset ,
                        priceTakeProfit : args.priceTakeProfit ,
                        priceStopLose   : args.priceStopLose ,
                        memo            : args.memo ,

                        orderSerial     : 0,
                        orderTime       : _fmtDate(new Date()),
                        revQuantity     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        orderCode       : "" ,
                        orderCodeRe     : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;

                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }

            },

            /**
             * @brief       市价平仓单（按单号平仓）
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          quantity            委托数量
             *          bsCode              买卖方向
             *          orderPrice          委托价格
             *          pointOffset         允许偏离点差
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            marketCloseWithOrder : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_MARKETCLOSE,
                    responseCode : M_R_MARKETCLOSE,
                    webSocket    : _wsTC
                }) ;

                var orderInfo  = args.orderInfo ;

                if (orderInfo) {
                    var symbolInfo = _symbolInfos[orderInfo.symbolCode] ;
                    var bsCode     = (orderInfo.bsCode === BSCODE_BUY) ? BSCODE_SELL : BSCODE_BUY ;
                    var orderPrice = (orderInfo.bsCode === BSCODE_BUY) ? symbolInfo.bid : symbolInfo.ask ;

                    var modOrder = {
                        orderType       : eOT_MarketClose ,
                        symbolCode      : orderInfo.symbolCode ,
                        orderQuantity   : args.quantity ,
                        bsCode          : bsCode ,
                        orderPrice      : orderPrice ,
                        pointOffset     : args.pointOffset ,
                        orderCodeRe     : orderInfo.orderCode ,
                        revQuantity     : args.revQuantity,
                        memo            : args.memo ,

                        priceTakeProfit : 0 ,
                        priceStopLose   : 0 ,
                        orderSerial     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",

                        orderTime       : _fmtDate(new Date()),
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        orderCode       : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;
                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效单据信息') ;
                    }
                }

            },

            /**
             * @brief       市价平仓单（按商品平仓）
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          quantity            委托数量
             *          bsCode              买卖方向
             *          orderPrice          委托价格
             *          pointOffset         允许偏离点差
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            marketCloseWithSymbol : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_POSITION_CLOSE_ORDER,
                    responseCode : M_R_POSITION_CLOSE_ORDER,
                    webSocket    : _wsTC
                }) ;

                var symbolInfo = _symbolInfos[args.symbolCode] ;

                if (symbolInfo) {
                    var orderPrice = (args.bsCode === BSCODE_BUY) ? symbolInfo.bid : symbolInfo.ask ;

                    var modOrder = {
                        orderType       : eOT_MarketClose ,
                        symbolCode      : args.symbolCode ,
                        orderQuantity   : args.quantity ,
                        bsCode          : args.bsCode ,
                        orderPrice      : orderPrice ,
                        pointOffset     : args.pointOffset ,
                        revQuantity     : args.revQuantity,
                        memo            : args.memo ,
                        cutType         : COT_FIFO ,

                        orderCodeRe     : "" ,
                        priceTakeProfit : 0 ,
                        priceStopLose   : 0 ,
                        orderSerial     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",

                        orderTime       : _fmtDate(new Date()),
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        pickInfo        : "" ,
                        orderCode       : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;
                }

                if (symbolInfo) {


                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }


            },

            /**
             * @brief       限价建仓单
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          quantity            委托数量
             *          bsCode              买卖方向
             *          orderPrice          委托价格
             *          pointOffset         允许偏离点差
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            limitOpen : function(args) {
                var biz = new BizOrder({
                    requestCode  : M_Q_LIMITOPEN,
                    responseCode : M_R_LIMITOPEN,
                    webSocket    : _wsTC
                }) ;

                var symbolInfo = _symbolInfos[args.symbolCode] ;

                if (symbolInfo) {

                    // 根据买卖方向、委托价、现价（ASK/BID）判定限价单的单据类型（止限单/停损单）
                    var priceOver       = (args.orderPrice - ( args.bsCode===BSCODE_BUY ? symbolInfo.ask : symbolInfo.bid )) ;
                    var limitType       = _getLimitType(args.bsCode,priceOver) ;

                    var modOrder = {
                        orderType       : limitType ,
                        symbolCode      : args.symbolCode ,
                        orderQuantity   : args.quantity ,
                        bsCode          : args.bsCode ,
                        orderPrice      : args.orderPrice ,
                        priceTakeProfit : args.priceTakeProfit ,
                        priceStopLose   : args.priceStopLose ,
                        validDateType   : args.validDateType ,
                        limitType       : limitType ,
                        memo            : args.memo ,

                        pointOffset     : 0 ,
                        orderSerial     : 0,
                        orderTime       : _fmtDate(new Date()),
                        revQuantity     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        orderCode       : "" ,
                        orderCodeRe     : "" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;

                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }
            },

            /**
             * @brief       修改委托单
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          orderCode           委托单号
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            modifyOrder : function(args) {
                var biz = new BizOrder({
                    requestCode  : M_Q_MODIFYORDER,
                    responseCode : M_R_MODIFYORDER,
                    webSocket    : _wsTC
                }) ;

                var orderInfo  = args.orderInfo ;

                if (orderInfo) {
                    var symbolInfo = _symbolInfos[orderInfo.symbolCode] ;
                    var modOrder = {
                        orderType       : M_Q_MODIFYORDER ,
                        symbolCode      : orderInfo.symbolCode ,
                        orderCode       : orderInfo.orderCode,
                        priceStopLose   : args.priceStopLose,
                        priceTakeProfit : args.priceTakeProfit,
                        memo            : args.memo ,

                        orderQuantity   : 0 ,
                        bsCode          : "" ,
                        orderPrice      : 0 ,
                        revQuantity     : 0,
                        pointOffset     : 0 ,
                        orderCodeRe     : "" ,
                        orderSerial     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",

                        orderTime       : _fmtDate(new Date()),
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;
                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效单据信息') ;
                    }
                }
            },
            /**
             * @brief       撤销委托单（限价单）
             * @param args
             *
             *      {
             *          orderInfo           单据信息
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            cancelOrder : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_LIMITUNDO,
                    responseCode : M_R_LIMITUNDO,
                    webSocket    : _wsTC
                }) ;

                var orderInfo  = args.orderInfo ;

                if (orderInfo) {
                    var symbolInfo = _symbolInfos[orderInfo.symbolCode] ;
                    var bsCode     = (orderInfo.bsCode === BSCODE_BUY) ? BSCODE_SELL : BSCODE_BUY ;
                    var orderPrice = (orderInfo.bsCode === BSCODE_BUY) ? symbolInfo.bid : symbolInfo.ask ;

                    var modOrder = {
                        orderType       : eOT_CancelLimit ,
                        symbolCode      : orderInfo.symbolCode ,
                        orderCode       : orderInfo.orderCode ,
                        memo            : args.memo ,

                        orderQuantity   : 0 ,
                        bsCode          : "" ,
                        orderPrice      : 0 ,
                        pointOffset     : 0 ,
                        orderCodeRe     : "" ,
                        revQuantity     : 0,
                        priceTakeProfit : 0 ,
                        priceStopLose   : 0 ,
                        orderSerial     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",

                        orderTime       : _fmtDate(new Date()),
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;
                }

                if (symbolInfo) {


                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }

            },

            /**
             * @brief       微交易建仓单
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          contract            合约编号
             *          quantity            委托数量
             *          bsCode              涨跌方向( 'b' = 买涨，'s' = 买跌 )
             *          orderPrice          委托价格
             *          timeExpire          到期时间
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            binOptionOpen : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_BINMARKETOPEN,
                    responseCode : M_R_BINMARKETOPEN,
                    webSocket    : _wsTC
                }) ;

                var symbolInfo = _symbolInfos[args.symbolCode] ;

                if (symbolInfo) {

                    var modOrder = {
                        orderType       : eOT_MarketOpen ,
                        symbolCode      : args.symbolCode ,
                        contract        : '', // TODO
                        orderQuantity   : args.quantity ,
                        bsCode          : args.bsCode ,
                        orderPrice      : args.orderPrice ,
                        timeExpire      : 60, // TODO
                        memo            : args.memo ,

                        orderSerial     : 0,
                        orderTime       : _fmtDate(new Date()),
                        revQuantity     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",
                        pointOffset     : 0 ,
                        priceTakeProfit : 0 ,
                        priceStopLose   : 0 ,
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        orderCode       : "" ,
                        orderCodeRe     : "" ,
                        validDateType   : "0" ,
                        validDate       : "",

                        'pwd': '',
                        'marginCalculetType': '1',//NEW
                        'marginUsedCalc': '100',//NEW
                        'contractId':args.contractId //NEW
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {
							console.log('111111');
							console.log(mods);

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure

                    }) ;

                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }

            },

            /**
             * @brief       订阅事件
             * @param eventCode
             * @param callBack
             */
            on : function(eventCode,callBack,scope) {

                if (typeof callBack === 'function') {
                    var callBacks ;
                    if (_subscrib[eventCode]) {
                        callBacks = _subscrib[eventCode] ;
                    }else{
                        callBacks = [] ;
                    }

                    //callBack.key = 'asf_' + Math.random() * 100000 + 1 ;
                    _callBackID ++ ;
                    callBack.key = 'callback_' + _callBackID ;

                    // console.log('订阅 ： ' + eventCode + '  key :' + callBack.key) ;

                    callBacks.push({fn:callBack,scope:scope}) ;
                    _subscrib[eventCode] = callBacks ;
                }
            },

            /**
             * @brief       取消订阅
             * @param eventCode
             * @param callBack
             */
            un : function(eventCode,callBack) {
                var callBacks ;

                // 查找是否有订阅
                // 如果订阅了，则按先进先出原则，把对同一个事件源的订阅移除
                // 当指定的事件源的所有订阅都移除完时，就把整个事件源的订阅删除
                var removeID = 0 ;
                if (_subscrib[eventCode]) {
                    callBacks = _subscrib[eventCode] ;

                    if (callBack) {

                        for (var i=0; i<callBacks.length; i++) {
                            if (callBacks[i].fn.key === callBack.key) {
                                removeID = i ;
                                break ;
                            }
                        }

                    }else{
                    }

                    callBacks.splice(removeID,1) ;

                    if (callBacks.length===0) {
                        delete _subscrib[eventCode] ;
                    }
                }

            }

        };
    }
)() ;

sdk = WETBizSDK ;

console.log('load wetBizSDK complete') ;
