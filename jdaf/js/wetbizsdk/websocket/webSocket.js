/**
 * @brief   WebSocket 封装对象
 */
function webSocket(args){

    var _strLeft = function(str,length) {
        var sl = str ;
        sl = sl.substring(0,length) ;
        return sl;
    } ;
    var _strRight = function(str,length) {
        var sr = str;
        sr = sr.substring(sr.length-length,sr.length);
        return sr;
    };

    var _queue = [] ;

    var _pushQueue = function(msgOrder,onSuccess,onFailure) {
        var key = 'queue_' + msgOrder ;
        _queue[key] = {
            onSuccess : onSuccess,
            onFailure : onFailure
        };
    };

    var _popQueue  = function(msgOrder) {
        var key = 'queue_' + msgOrder ;
        var ret = null ;
        if (_queue[key]) {
            ret = {
                onSuccess : _queue[key].onSuccess,
                onFailure : _queue[key].onFailure
            } ;

            delete _queue[key] ;
        }

        return ret ;
    };

    var _isopen    = false ;
    var _sending   = false ;

    var _encrypt_key = args.key ;
    var _encrypt_iv  = args.iv ;
    var _isEncrypt   = args.isEncrypt ;
    var _heartBeat   = args.heartBeat ;
    var _lastReceivedTime = new Date() ;
    var _lastSendTime = new Date() ;
    var _timeOutLimit = 120000 ;

    var _protocol     = args.protocol ||  WS_PROTOCOL_DEFAULT ; // 0=JSON 协议  1=逗号分割实时行情

    //WS_PROTOCOL_DEFAULT   = 0,  // JSON 协议
    //    WS_PROTOCOL_QCMP = 1        // 逗号分割实时行情


    var _ws = null ;
    var _url = null ;

    var _closeByHost = true ;
    var _closeByCall = false ; // 表示网络关闭是客户端主动发起的
    var _queryTask = null ;

    var _initWebSocket = function(url) {
        var me = this ;
        if (_ws) {
            _closeByCall = true ;
            _ws.close() ;
        }

        _url = url ;
        _ws = new WebSocket(url) ;
        _ws.scope = me ;

        _ws.onopen = function() {

            // this 指向的是 WebSocket ，_ws.scope 是在初始化 _ws 对象时传入的参数，指向 webSocket 实例
            var me = _ws.scope || this ;
            _closeByCall = false ;  // 初始化 _closeByCall 为 false，当收到服务端的断网通知时，需要回调 onClose 函数

            if ( typeof me.onopen === 'function') {
                var caller = me.scope || this ;
                me.onopen.call(caller) ;
            }

            _isopen = true ;

            // 如果设置了心跳参数，则启动心跳处理逻辑
            if ( _heartBeat ) {
                _startTask.call(me) ;
            }
        } ;

        _ws.onclose = function() {
            // TODO : 处理重连
            _isopen = false ;
            if ( typeof me.onclose === 'function') {
                var caller = me.scope || this ;

                // 收到网络断开消息，且 _closeByCall ＝ false 表示，该网络是因服务端或网络异常引起的
                // 这种情况下需要通知应用层处理
                if (!_closeByCall) {
                    me.onclose.call(caller) ;
                }
            }
        } ;

        _ws.onmessage = function(message) {
            var me = this.scope ; // onOpen 是通过 dojox.socket 的事件绑定被回调，this 指向的是 dojox.socket(WebSocket)

            var responseData    = message.data ;
            _lastReceivedTime = new Date() ;

            // 数据长度为 0  的是心跳包，仅需更新 lastReceivedTime
            if (responseData.length===0) {
                // 接收到心跳包 - {1}',me.url,me.name)) : isDebug ;
                console.log('收到心跳包') ;
                return;
            }

            if ( _isEncrypt=== M_DATA_ENCRYPT && _strLeft(responseData,1)!=='{' ) {
                var decrypted = CryptoJS.AES.decrypt(message.data, _encrypt_key,{ iv: _encrypt_iv, mode: CryptoJS.mode.ECB });
                responseData = decrypted.toString(CryptoJS.enc.Utf8) ;
            }

            if ( responseData.length<=2 ) {
                // 接收到心跳包 - {1}',me.url,me.name)) : isDebug ;
                console.log('收到心跳包') ;
                return;
            }

            _sending = false ;

            switch (_protocol)
            {
                case WS_PROTOCOL_QCMP :
                {
                    // 压缩版实时行情协议，逗号分割
                    var funCode = responseData.substring(0,1);
                    if ( funCode === "0" ) {
                        // 收到实时行情包
                        msg = {
                            event : M_R_PUSH_QUOTE,
                            data  : {
                                children : [responseData]
                            }
                        } ;
                        if (typeof me.onpush === 'function'){
                            me.onpush.call(me,msg) ;
                        }
                    }

                    break ;
                }
                case WS_PROTOCOL_DEFAULT :
                default :
                {
                    var msg = JSON.parse(responseData);

                    console.log(JSON.stringify(msg)) ;

                    var handler = _popQueue(msg.msgOrder) ;

                    if (typeof msg === 'object' && msg.event) {

                        // 匹配 MessageOrder ，如果没有则是服务端主动发起的推送消息
                        if (handler) {
                            if ( typeof handler.onSuccess === 'function') {
                                handler.onSuccess(msg) ;
                            }
                        }else{
                            // console.log('收到推送消息 ' + msg.event);
                            if (typeof me.onpush === 'function'){
                                me.onpush.call(me,msg) ;
                            }
                        }

                    } else {

                        if ( handler && typeof handler.onFailure === 'function') {
                            handler.onFailure(WS_ERR_UNKNOWPACKAGE,'收到异常包') ;
                        }
                        console.log('收到异常包') ;
                    }
                }
            }

        } ;

        return _ws ;
    } ;

    var _Date2Epoch = function(dDate) {
        if (typeof dDate=='string') {
            var d = dDate.replace(/-/g,'/') ;
            dDate = new Date(d) ;
        }

        var x ;
        var GMT = true ;
        if ( GMT ) {
            x = parseInt(
                Date.UTC(
                    dDate.getUTCFullYear(),
                    dDate.getUTCMonth(),
                    dDate.getUTCDate(),
                    dDate.getUTCHours(),
                    dDate.getUTCMinutes(),
                    dDate.getUTCSeconds(),
                    dDate.getUTCMilliseconds()
                )/1000
            );
        } else {
            x = ( dDate.getTime()-dDate.getMilliseconds() ) / 1000;
//    x += dDate.getTimezoneOffset();
        }
        return x;
    } ;

    /**
     * @brief       发送心跳包
     */
    var _sendHeartBeat = function() {
        var me = this ;
        if (_isopen) {
            _lastSendTime = new Date() ;
            console.log('发送心跳包 : ' + _url);
            _ws.send(_heartBeat.msg) ;
        }
    };

    /**
     * @brief               启动任务
     */
    var _startTask = function() {
        var me = this ;

        if (!_queryTask) {
            _queryTask = setInterval( function() {
                    // 计算未收到服务端报文的时间间隔
                    // timeOutLimit 是指网络的超时判断，即超过 timeOutLimit 指定的时间，客户端仍未收到
                    // 服务端的任何报文，则可判断网络超时，此时需要发起网络重连操作
                    var tmDelay = (_Date2Epoch(new Date()) - _Date2Epoch(_lastReceivedTime)) * 1000 ;
                    if (tmDelay > _timeOutLimit) {
                        // me.reConnect() ;
                    }else{
                        // heartBeat.timeout 是指心跳包的发送判断，即从最后一次向服务端发送报文至当前时间，
                        // 超过 heartBeat.timeout 指定的时间，客户端未有任何报文发送至服务端的，则客户端需
                        // 要主动向服务端发起心跳包
                        tmDelay = (_Date2Epoch(new Date()) - _Date2Epoch(_lastSendTime)) * 1000 ;
                        if ( _heartBeat && tmDelay > _heartBeat.timeout ) {
                            _sendHeartBeat.call(me) ; // 向服务端发送心跳包
                        } else {
                            //console.log( _url +  ' - 等待: ' + tmDelay ) ;
                        }
                    }
                },
                _heartBeat.interval
            );
        }
        //_queryTask.start() ;
    };

    var _stopTask = function() {
        var me = this ;
        if (_queryTask) {
            clearInterval(_queryTask) ;
            _queryTask = null ;
        }
    };

    return {
        token : '',
        //heartBeat : { interval:5000, timeout:60000, msg:'' },
        open  : function(args) {
            var me = this ;

            if (_isopen) {
                return ;
            }

            me.onopen  = args.onOpen ;      // 回调外部的函数
            me.onpush  = args.onPush ;
            me.onclose = args.onClose ;
            me.scope   = args.scope ;

            _ws      = _initWebSocket.call(me,args.url) ;

        },
        close : function() {
            _closeByCall = true;
            if (_ws)
            {
                _ws.close() ;
            }
        },
        reConnect : function(url){

            var me = this ;

            url = url || _url ;

            console.log('重连：' + url) ;

            var initWS = setTimeout(function(){
                _initWebSocket.call(me,url) ;
            },1000) ;
        },

        send : function(args) {
            var me = this ;

            if (_sending) {

                if (me.onFailure) {
                    me.onFailure(WS_ERR_BUSY,"上次请求仍在处理中") ;
                }

                return ;
            }

            if (!_ws) {
                if (me.onFailure) {
                    me.onFailure(WS_ERR_BUSY,"通讯组件未就绪") ;
                }

                return ;
            }

            _sending = true ;
            _lastSendTime = new Date() ;

            var wetPackage = args.wetPackage ;
            wetPackage.data.token = me.token ;

            _pushQueue(wetPackage.msgOrder,args.onSuccess,args.onFailure) ;

            var sendData = JSON.stringify (wetPackage) ;

           //
           // console.log(sendData) ;

            if ( _isEncrypt === M_DATA_ENCRYPT ) {
                var encrypted = CryptoJS.AES.encrypt( sendData, _encrypt_key,{ iv: _encrypt_iv, mode: CryptoJS.mode.ECB } ) ;
                _ws.send ( encrypted );
            } else {
                _ws.send ( sendData );
            }

            // 启动超时等待
        }

    } ;
}

