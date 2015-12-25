Mobilebone.captureLink = false;
Mobilebone.captureForm = false;
Mobilebone.evalScript  = true;
Mobilebone.init();
Mobilebone.callback = function(pagein,pageout,option) {
    if(sdk){
        var _userinfo=sdk.getAccount(-1);
        if(_userinfo!=undefined ){
            eval(option.id+'Fun();');
        }
    }
    //渲染
    //$('#'+option.id).trigger("init",[option.id]);
    bindPush(option.id);
};
//初始化变量
var images = {
	localId: [],
	serverId: [],
	imgMap: []
};
var holdList= Array();
var dailyProfit = 0;
var amMarginRemain =0;
var amMarginUsed =0;
var amMarginFreezed =0;
var  greenBg = '#D6EFD6';
var redBg = '#FFDED6';

var logincode,serialcode;
var LOGIN=0;
var myScroll;
//是否调试
var debug=1;

var symbolCode;

function getHoldList(callBack){
    var args={
        onSuccess:function(mods){
            holdList.splice(0,holdList.length);
            var  _orderList=mods;
            var arr = new Array();
            for(var i=0;i<_orderList.length;i++){
                if(_orderList[i]['bsCode']=='b'){
                    _orderList[i]['bsStr']='买';
                    _orderList[i]['bsClass']='buy';
                }else{
                    _orderList[i]['bsStr']='卖';
                    _orderList[i]['bsClass']='sell';
                }
                var _symbol =sdk.getSymbol(_orderList[i]['symbolCode']);
                _orderList[i]['symbolName']=_symbol['symbolName'];

                if(parseInt( _orderList[i].dynProfit)>0){
                    _orderList[i]['textColor']='red';
                }
                if(parseInt(_orderList[i].dynProfit)<0){
                    _orderList[i]['textColor']='green';
                }
                if(parseInt(_orderList[i].dynProfit)==0){
                    _orderList[i]['textColor']='black';
                }
                _orderList[i]['dynProfit']= _orderList[i]['dynProfit'].toFixed(2);

                var _stringTime = _orderList[i]['openDate'];
                var _timestamp2 = Date.parse(new Date(_stringTime));
                _timestamp2 = _timestamp2 / 1000;
                var _temp=[_timestamp2,_orderList[i]];
                arr[i] = _temp;
            }
            arr.sort(function compare(a,b){
                return b[0]-a[0];
            });
            dailyProfit=0;
            for(var i=0;i<arr.length;i++){
                holdList.push(arr[i][1]);
                dailyProfit=FloatAdd(dailyProfit,arr[i][1]['dynProfit']);
            }
            if (typeof callBack === 'function') {
                callBack.call() ;
            }
        },
        onFailure:function(re){
            if (typeof callBack === 'function') {
                callBack.call() ;
            }
            console.log(re);
        }
    }
    sdk.queryHoldBill(args);
}
function updateHoldList(symbolInfo){
    dailyProfit = 0;
    for(var i=0;i<holdList.length;i++){
        if(holdList[i].symbolCode==symbolInfo.symboCode){
            if(symbolInfo[i].bsCode=='b'){
                var _holdPrice=holdList[i].holdPrice;
                var _number=holdList[i].quantityHold;
                var _unit=symbolInfo.unit;
                var _currentPrice=symbolInfo.bid;
                var _pofit=(_currentPrice-_holdPrice)*_unit*_number;
            }
            if(symbolInfo[i].bsCode=='s'){
                var _holdPrice=holdList[i].holdPrice;
                var _number=holdList[i].quantityHold;
                var _unit=symbolInfo.unit;
                var _currentPrice=symbolInfo.ask;
                var _pofit=(_currentPrice-_holdPrice)*_unit*_number*-1;
            }
            dailyProfit=FloatAdd(dailyProfit,_pofit);
        }else{
            dailyProfit=FloatAdd(dailyProfit,holdList[i].dynProfit);
        }
    }
}

function bindPush(pageName){
    if (sdk) {
        sdk.un(M_R_PUSH_QUOTE,onQuoted) ;
        sdk.un(M_R_PUSH_QUOTE,onHoldQuoted) ;
        sdk.un(M_R_PUSH_QUOTE,onGoodsQuoted) ;
        sdk.un(M_R_PUSH_QUOTE,onAccountQuoted) ;
        sdk.un(PUSH_ACCCHANGE,onAccountChange) ;
        sdk.un(PUSH_ACCCHANGE,onGoodsAccountChange) ;
        if(pageName=='pageTrade'){
            sdk.on(M_R_PUSH_QUOTE,onQuoted) ;
            sdk.on(PUSH_ACCCHANGE,onAccountChange) ;
        }
        if( pageName=='pageGoods'){
            sdk.on(M_R_PUSH_QUOTE,onGoodsQuoted) ;
            sdk.on(PUSH_ACCCHANGE,onGoodsAccountChange) ;
        }
        if(pageName=='pageAccount'){
            sdk.on(M_R_PUSH_QUOTE,onAccountQuoted) ;
            sdk.on(PUSH_ACCCHANGE,onAccountChange) ;
        }
        if(pageName=='pageHold'){
            sdk.on(M_R_PUSH_QUOTE,onHoldQuoted) ;
        }
        sdk.on(PUSH_SAMEUSER_LOGIN,onLogin);
    }
}
function onLogin(mod){
    $.MsgBox.Tip('error','帐号在异地登录！',function(){
        window.location.href='index.php';
    })
}

function pageTradeFun(){
    var _accInfo=sdk.getAccount(-1);
    var _arrSymbols = sdk.getSymbols(-1) ;
    for (var i=0; i<_arrSymbols.length; i++)
    {
        var _buy_arr=_arrSymbols[i].marginUsedBuyList.split(',');
        var _sale_arr=_arrSymbols[i].marginUsedSellList.split(',');
        _arrSymbols[i].buy=_buy_arr[0];
        _arrSymbols[i].sale=_sale_arr[0];
        if(_arrSymbols[i].upOrDown==0){
            _arrSymbols[i].textColor='black';
            _arrSymbols[i].bgColor='';
        }
        if(_arrSymbols[i].upOrDown>0){
            _arrSymbols[i].textColor='red';
            _arrSymbols[i].bgColor=redBg;
        }
        if(_arrSymbols[i].upOrDown<0){
            _arrSymbols[i].textColor='green';
            _arrSymbols[i].bgColor=greenBg;
        }
    }

    getHoldList(function(){
        _accInfo.dailyProfit=dailyProfit;
        var _data={
            'acc':_accInfo,
            'mod':_arrSymbols
        };
        $.get("page/Trade.html?rnd=4", function(result){
            var _html=bindTemplate(result,_data);
            $('#pageTrade').html(_html);
            trade();
        });
    })

}
function pageLoginFun(){
    var _data={
        'logincode':logincode
    };
    $.get("page/Login.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        login();
        var myScroll = new IScroll('#pageLogin', { mouseWheel: true });
    });
}
function pageXyFun(){
    var _data={};
    $.get("page/Xy.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        Xy();
    });
}
function pageSigninFun(){
    var _data={
        'serialcode':serialcode
    };
    $.get("page/Signin.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        sign_in();
        var myScroll = new IScroll('#pageSignin', { mouseWheel: true });
    });
}
function pageForgotFun(){
    var _data={ };
    $.get("page/pageForgot.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        forgot();
        var myScroll = new IScroll('#pageForgot', { mouseWheel: true });
    });
}
function pageGoodsFun(){
    var _memberInfo,_symbolInfo;

    if(sdk){
         _symbolInfo = sdk.getSymbol(symbolCode);
        var _buy_arr=_symbolInfo.marginUsedBuyList.split(',');
        var _sale_arr=_symbolInfo.marginUsedSellList.split(',');
        _symbolInfo.buy=_buy_arr[0];
        _symbolInfo.top_buy=_buy_arr[0];
        _symbolInfo.top_sale=_sale_arr[0];
        if(_symbolInfo.upOrDown==0){
            _symbolInfo.textColor='black';
        }
        if(_symbolInfo.upOrDown>0){
            _symbolInfo.textColor='red';
        }
        if(_symbolInfo.upOrDown<0){
            _symbolInfo.textColor='green';
        }

        _memberInfo = sdk.getAccount(-1) ;
        //_memberInfo.amMarginRemain=_memberInfo.amMarginRemain.toFixed(2)

        //var _quantityHoldList=Array();
        //for(var i=0;i<_symbolInfo.quantityHoldMax;i++){
           // _quantityHoldList.push(i+1);
        //}
        //_symbolInfo.quantityHoldList=_quantityHoldList;
    }
    console.log('symbolInfo');
    console.log(_symbolInfo);
    var _data={
        'memberInfo':_memberInfo,
        'symbolInfo':_symbolInfo,
        'symbolInf':_symbolInfo
    };
    $.get("page/Goods.html?rnd=1", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        goods();
        var myScroll = new IScroll('#pageGoods', { mouseWheel: true });
    });
}
function pageHoldFun(){
    getHoldList(function(){
        var _data={
            'orderList':holdList
        };
        $.get("page/Hold.html?rnd=4", function(result){
            var _html=bindTemplate(result,_data);
            $('.in').html(_html);
            hold_list();
            //var myScroll = new IScroll('#pageHold', { mouseWheel: true });
        });
    })
}
function pageAccountFun(){
    var _accInfo;
    if(sdk){
        _accInfo=sdk.getAccount(-1);
        //_accInfo['amTotal'] = FloatAdd(_accInfo['amMarginUsed'] ,_accInfo['amWithdrawable']);
        //_accInfo['amTotal'] = FloatAdd(_accInfo['amTotal'] ,_accInfo['amMarginFreezed']);
        _accInfo['amMarginUsed'] = _accInfo['amMarginUsed'];
        switch (_accInfo['riskType']){
            case "1":
                _accInfo['riskCustomStr']='无风险';
                _accInfo['riskCustomColor']='green';
                break;
            case "2":
                _accInfo['riskCustomStr']='正常';
                _accInfo['riskCustomColor']='green';
                break;
            case "3":
                _accInfo['riskCustomStr']='低风险';
                _accInfo['riskCustomColor']='yellow';
                break;
            default :
                _accInfo['riskCustomStr']='无风险';
                _accInfo['riskCustomColor']='green';
                break;
        }
    }

    var _amMarginUsed=_accInfo.amMarginUsed;

    //if(_accInfo.amMarginRemain){
        //_accInfo.amMarginRemain =_accInfo.amMarginRemain-_amMarginUsed+dailyProfit;
    //}
    getHoldList(function(){
        _accInfo.dailyProfit=dailyProfit;
        var _data={
            'acc':_accInfo
        };
        $.get("page/Account.html?rnd=2", function(result){
            var _html=bindTemplate(result,_data);
            $('.in').html(_html);
            account();
            var myScroll = new IScroll('#pageAccount', { mouseWheel: true });
        });
    })

}
function pageMoreFun(){
    var _data={ };
    $.get("page/More.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        var myScroll = new IScroll('#pageAccount', { mouseWheel: true });
    });
}
function loginCheck(){
    if(sdk){
        var _userinfo=sdk.getAccount(-1);
        if(_userinfo==undefined ){
            $('.login-box').fadeIn(500,function(){ login();});
            console.log('not login');
        }else{
            console.log('have login');
        }

    }
}
//初始化函数
function loaded(){
    setTimeout("$('.loading-box').fadeOut(500,function(){$('.loading-box').remove();});",500);

    setTimeout("loginCheck();",1000);
    /*
	var _hash=location.hash;
	var pageName='';
	if(_hash!=''){
		pageName=_hash.replace('#&','');
        eval(pageName+'Fun();');
	}
	*/
	//微信配置
	//getWXJSSDK();
    if($(window).width()>=$('#pageLogin').width()){
        var _pageLoginLeft=($(window).width()-$('#pageLogin').width())/2
        $('#pageLogin').css({'left':_pageLoginLeft});
    }

	FastClick.attach(document.body);

}

var hold_list=function(){
    $page=$('#pageHold');
    initHoldList();
    $('.sall_all_btn').each(function(){
        $(this).unbind('click');
        $(this).bind('click',function(){
            var $obj=$(this);
            var _symboName=$(this).attr('symbolName');
            var _number=$(this).attr('quantity');
            var _bsCode=$(this).attr('bsCode');
            var _orderPrice=$(this).attr('orderPrice');
            var _pointOffset=$(this).attr('pointOffset');

            var _tradeStr="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"trade-order-box\">";
            _tradeStr+="<tr>";
            if(_bsCode=='b'){
                _tradeStr+="<td rowspan=\"2\"><div class=\"buy sale-btn\" style=\"width: 2em; height: 2em; line-height: 2em;font-size:24px;\">平买</div></td>";
            }
            if(_bsCode=='s'){
                _tradeStr+="<td rowspan=\"2\"><div class=\"sale sale-btn\" style=\"width: 2em; height: 2em; line-height: 2em;\">平卖</div></td>";
            }
            _tradeStr+="<td>名称：&nbsp;"+_symboName+"</td>";
            _tradeStr+="<td>数量：&nbsp;"+_number+"</td>";
            _tradeStr+="</tr>";
            _tradeStr+="<tr>";
            if(_bsCode=='b') {
                _tradeStr += "<td>价格：&nbsp;<span class=\"buy-price\">" + _orderPrice + "</span></td>";
                _tradeStr += "<td>点差：&nbsp;<span class=\"buy-pointOffset\">" + _pointOffset + "</span></td>";
            }
            if(_bsCode=='s') {
                _tradeStr += "<td>价格：&nbsp;<span class=\"sell-price\">" + _orderPrice + "</span></td>";
                _tradeStr += "<td>点差：&nbsp;<span class=\"sell-pointOffset\">" + _pointOffset + "</span></td>";
            }
            _tradeStr+="</tr>";
            _tradeStr+="</table>";

            var _args={
                'orderInfo':{
                    'orderCode':$(this).attr('orderCode'),
                    'symbolCode':$(this).attr('symbolCode'),
                    'quantity':$(this).attr('quantity'),
                    'bsCode':$(this).attr('bsCode'),
                    'orderPrice':$(this).attr('orderPrice'),
                    'pointOffset':$(this).attr('pointOffset'),
                    'priceStopLose':0,
                    'priceTakeProfit':0,
                    'memo':''
                },
                'pointOffset':$(this).attr('pointOffset'),
                'quantity':$(this).attr('quantity'),
                onSuccess:function(re){
                    if(re.bizRet==0) {
                        $.MsgBox.Tip('success',re.bizMsg,function(){
                            $obj.parent().parent().parent().fadeOut(function(){
                                $(this).remove();
                                initHoldList();
                            });
                        });
                    }else{
                        $.MsgBox.Tip('error',re.message);
                    }
                },
                onFailure:function(re){
                    console.log(re);
                    $.MsgBox.Tip('error',re.bizMsg);
                }
            }
            $.MsgBox.Confirm('提示',_tradeStr,function(){
                if(sdk){
                    saleAll(_args);
                }
            });
        });
    })
    function saleAll(arg){
        console.log(arg);
        if(sdk){
            sdk.marketCloseWithOrder(arg);
        }
    }
    function initHoldList(){
        if($('.hold-list li').length==0){
            $('.empty-tip').fadeIn();
        }
    }
    $page.find('.hold-list').css({'height':1000});
    var hold_list_height=$(window).height()-$('.menu').height();
    $('.hold-list').css({'height':hold_list_height,'overflow':'scroll','overflow-x':'hidden'});
    FastClick.attach(document.body);
}
var goods=function() {
    $page=$('#pageGoods');


    var _quantityMax=parseInt( $page.find('input[name=quantityMax]').val());
    var _quantityStep=parseInt($page.find('input[name=quantityStep]').val());

    $("#trading_number").ionRangeSlider({
        "min": 1,
        "max": _quantityMax,
        "from": 0,
        "from_percent": 0,
        "from_value": null,
        "to": 100,
        "to_percent": 20,
        "to_value": null
    });

    // 设置图表
    var _symbolCode = $('input[name=symboCode]').val();
    var _period     = cycle_min;
    $('.time div').each(function(index){
        $(this).unbind('click');
        $(this).bind('click',function(){
            doChangeChart(index);
        })
    })
    $('#trading_number').change(function(){
        $(this).parent().find('label').html( $(this).val());
    })
    function doChangeChart(index){
        if(index==0){
            _period=cycle_min;
        }
        if(index==1){
            _period=cycle_min5;
        }
        if(index==2){
            _period=cycle_min15;
        }
        if(index==3){
            _period=cycle_min30;
        }
        if(index==4){
            _period=cycle_hour;
        }
        $('.time div').removeClass('hover');
        $('.time div').eq(index).addClass('hover');
        setChart(_symbolCode,_period) ;
    }
    //下单
    function doTrade(bsCode){
        var _number=$('input[name=tradeNumber]').val();
        var _askPrice=$('input[name=ask]').val();
        var _pointAsk=$('input[name=pointAsk]').val();
        var _bidPrice=$('input[name=bid]').val();
        var _pointBid=$('input[name=pointBid]').val();
        var _orderPrice;
        var symboCode=$('input[name=symboCode]').val();
        var symboName=$('input[name=symboName]').val();
        var _bsCode=bsCode;
        var _contract='';
        var _pointOffset;
        if(bsCode=='b'){
            _orderPrice =_askPrice;
            _pointOffset =_pointAsk;
        }
        if(bsCode=='s'){
            _orderPrice =_bidPrice;
            _pointOffset =_pointBid;;
        }

        var _post_data={
            'symbolCode':symboCode,
            'contract':_contract,
            'quantity':_number,
            'bsCode':_bsCode,
            'orderPrice':_orderPrice,
            'pointOffset':_pointOffset,
            'priceStopLose':0,
            'priceTakeProfit':0,
            'memo':'',
            'onSuccess':function(re){
                if(re.bizRet==0) {
                    $.MsgBox.Tip('success', '下单成功！');
                }else{
                    $.MsgBox.Tip('error',re.bizMsg);
                }
            },
            'onFailure':function(re){
                $.MsgBox.Tip('error',re.bizMsg);
            }
        };

        var _tradeStr="<table width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"trade-order-box\">";
        _tradeStr+="<tr>";
        if(bsCode=='b'){
            _tradeStr+="<td rowspan=\"2\"><div class=\"buy buy-btn\">买</div></td>";
        }
        if(bsCode=='s'){
            _tradeStr+="<td rowspan=\"2\"><div class=\"sell sale-btn\">卖</div></td>";
        }
        _tradeStr+="<td>名称：&nbsp;"+symboName+"</td>";
        _tradeStr+="<td>数量：&nbsp;"+_number+"</td>";
        _tradeStr+="</tr>";
        _tradeStr+="<tr>";
        if(bsCode=='b') {
            _tradeStr += "<td>价格：&nbsp;<span class=\"buy-price\">" + _orderPrice + "</span></td>";
            _tradeStr += "<td>点差：&nbsp;<span class=\"buy-pointOffset\">" + _pointOffset + "</span></td>";
        }
        if(bsCode=='s') {
            _tradeStr += "<td>价格：&nbsp;<span class=\"sell-price\">" + _orderPrice + "</span></td>";
            _tradeStr += "<td>点差：&nbsp;<span class=\"sell-pointOffset\">" + _pointOffset + "</span></td>";
        }
        _tradeStr+="</tr>";
        _tradeStr+="</table>";


        $.MsgBox.Confirm('提示',_tradeStr,function(){
            if(sdk){
                sdk.marketOpen(_post_data);
            }
        });


    }
    $('#buy_btn').unbind('click');
    $('#buy_btn').bind('click',function(){
        doTrade('b');
    });
    $('#sale_btn').unbind('click');
    $('#sale_btn').bind('click',function(){
        doTrade('s');
    });
    function setChart(symboCode,period) {

        var barCnt = -80;
        var url    = 'chart/chart.html?chartStyle=1&symbolCode={0}&period={1}&barCount={2}&theme=white&sid={3}' ;

        url = url.format(symboCode, period, barCnt, Math.random().toString()) ;

        // console.log(url) ;

        var oChart = $('#grptrade_chart') ;

        // 根据选中的商品显示图表
        if (document.getElementById('frame_02')) {

            setIFrameSrc('frame_02',url) ;

        } else {
            oChart.css('left', '19px') ;
            oChart.css('width', $('.content').eq(0).width()+'px') ;
            oChart.css('height',$(window).height()-$page.find('.trade-symbolname').height()-$page.find('.trade_price').height()-$page.find('.time').height()-$page.find('.menu').height()-$page.find('.trading_number').height()-20+'px');
            // 设置图表
            var srcChart = "<iframe id='frame_02' frameborder='0' scrolling='no' src='{0}' width='100%' height='100%'></iframe>" ;
            oChart.append( srcChart.format(url,Math.random().toString()) ) ;
        }

        //更新最新价格
        var keyLastPrice = '#lastPrice' ;
        if ( $(keyLastPrice).length>0  && _symbolCode !='' )
        {
            var symbolInfo = sdk.getSymbol(_symbolCode) ;
            $(keyLastPrice).text(symbolInfo.priceCurrent.toFixed(symbolInfo.decimal));
        }

    }
    function setIFrameSrc(idFrame, url) {
        var originalFrame = document.getElementById(idFrame);
        var newFrame = document.createElement("iframe");
        $(newFrame).attr('id',originalFrame.getAttribute("id")) ;
        $(newFrame).attr('frameborder','0') ;
        $(newFrame).attr('scrolling','no') ;
        $(newFrame).attr('width','100%') ;
        $(newFrame).attr('height','100%') ;
        $(newFrame).attr('src',url) ;

        //newFrame.id = originalFrame.getAttribute("id");
        //newFrame.frameborder = '0' ;
        //newFrame.scrolling = 'no' ;
        //newFrame.width = '100%' ; //originalFrame.getAttribute("width");
        //newFrame.height = '100%'; // originalFrame.getAttribute("height");
        //newFrame.src = url;
        var parent = originalFrame.parentNode;
        parent.replaceChild(newFrame, originalFrame);

        var oChart = $('#grptrade_chart') ;
        oChart.css('width',  $('.content').eq(0).width()+'px') ;
    }
    doChangeChart(0);
    var _menuTop=$(window).height()-$page.find('.menu').height();
    $page.find('.menu').css({'top':_menuTop});
}
var login=function(){
    //事件绑定
    $page=$('#pageLogin');
    $('#login_btn').unbind('click');
    $('#login_btn').bind('click',function(){
        var _userID = $page.find('input[name=account]').val();
        var _passowrd = $page.find('input[name=password]').val();
        if(_userID.length==0){
            $.MsgBox.Tip('error','请输入帐号或手机！');
            return false;
        }
        if(_passowrd.length==0){
            $.MsgBox.Tip('error','请输入密码！');
            return false;
        }
        $('#login_btn').attr('disabled','true');
        $.MsgBox.Loading('提示','登录中...');

        //_userID = M_DEBUG_UID;
        //_passowrd =M_DEBUG_PWD;

        if(sdk){
            sdk.init(encrypt_key,encrypt_iv,'libs/wetbizsdk',function() {
                sdk.loginWithUserId({
                    uid   : _userID,
                    pwd   : _passowrd,
                    vcode : '',
                    urls  : app_ws_url,
                    onSuccess : function() {
                        $.MsgBox.Clean();
                        loginCode=_userID;
                        $('#login_btn').removeAttr("disabled");
                        $('#pageLogin').fadeOut(500,function(){
                            pageTradeFun();
                        });
                        console.log('登录成功') ;
                    },
                    onFailure : function(retCode,message) {
                        $.MsgBox.Clean();
                        $.MsgBox.Tip('error',message);
                        $('#login_btn').removeAttr("disabled");
                        console.log('登录失败！[' + retCode + ']' + message) ;
                        $page.find('input[type=text],input[type=password]').val('');
                    }
                });
            });

        }
    })
}
var trade=function(){
    $page=$('#pageTrade');
    var item_height=$('.products-list .item').eq(0).height();

    var products_list_height=$(window).height()-$('.member_info').height()-$('.menu').height()-60;
    $('.products-list').css({'height':products_list_height,'overflow':'scroll','overflow-x':'hidden'});

    var args={
        'onSuccess':function(mod){
            var _acc=mod[0];
            if(_acc){
                amMarginRemain=_acc['amMarginRemain'];
                amMarginUsed=_acc['amMarginUsed'];
            }
        },
        'onFailure':function(){
        }
    }
    sdk.queryAccount(args);

    bindPush('pageTrade');
    FastClick.attach(document.body);
}
var account=function(){
    $page=$('#pageAccount');
    var _menuTop=$(window).height()-$page.find('.menu').height();
    $page.find('.menu').css({'top':_menuTop});

    var args={
        'onSuccess':function(mod){
            var _acc=mod[0];
            if(_acc){
                $page.find('.amPreBalance').html('￥ '+_acc['amPreBalance'].toFixed(2));
                $page.find('.netValue').html('￥ '+_acc['netValue'].toFixed(2));
                $page.find('.amDailyCharge').html('￥ '+_acc['amDailyCharge'].toFixed(2));
                $page.find('.amMarginUsed').html('￥ '+_acc['amMarginUsed'].toFixed(2));
                $page.find('.amMarginFree').html('￥ '+_acc['amMarginFree'].toFixed(2));
                amMarginRemain=_acc['amMarginRemain'];
                amMarginUsed=_acc['amMarginUsed'];
            }
        },
        'onFailure':function(){
        }
    }
    sdk.queryAccount(args);


    FastClick.attach(document.body);
}
// --------------------------------------------------
// 接收到实时行情数据
// --------------------------------------------------
function onQuoted(mods) {
    $('.i2').css({'background':''});
    $('.i3').css({'background':''});
    $('.i2 .sell_money').removeClass('red').removeClass('green');
    $('.i3 .buy_money').removeClass('red').removeClass('green');
    var symbolInfo = mods[0] ;
    if (symbolInfo) {
        var $symbolObj=$('#'+symbolInfo.symbolCode);
        if($symbolObj.length>0){
            $symbolObj.find('.sell_money').html(symbolInfo.bid);
            $symbolObj.find('.buy_money').html(symbolInfo.ask);
            if(symbolInfo.upOrDown>0){
                $symbolObj.find('.sell_money').addClass('red');
                $symbolObj.find('.buy_money').addClass('red');
                $symbolObj.find('.sell_money').parent().css({'background':redBg});
                $symbolObj.find('.buy_money').parent().css({'background':redBg});
            }
            if(symbolInfo.upOrDown<0){
                $symbolObj.find('.sell_money').addClass('green');
                $symbolObj.find('.buy_money').addClass('green');
                $symbolObj.find('.sell_money').parent().css({'background':greenBg});
                $symbolObj.find('.buy_money').parent().css({'background':greenBg});
            }
        }
        updateHoldList(symbolInfo);
        $('.dailyProfit').html(dailyProfit.toFixed(2));

        var _amMarginFree=FloatAdd(amMarginRemain,-amMarginUsed);
        _amMarginFree=FloatAdd(_amMarginFree,dailyProfit);
        $('#pageTrade').find('.amMarginFree').html(_amMarginFree.toFixed(2));

    } else {
        //console.log(mods) ;
    }
}
function onHoldQuoted(mods){
    var symbolInfo = mods[0] ;
    if (symbolInfo) {
        if($('#pageHold .'+symbolInfo.symbolCode+'-b').length>0){
            $('#pageHold .'+symbolInfo.symbolCode+'-b').each(function(){
                var $obj=$(this);
                var _holdPrice=$obj.attr('pricehold');
                var _number=$obj.attr('quantityHold');
                var _unit=symbolInfo.unit;
                var _currentPrice=symbolInfo.bid;
                var _pofit=(_currentPrice-_holdPrice)*_unit*_number;
                $pofit=$obj.parent().parent().parent().find('.price-box div');
                $pofit.removeClass('red').removeClass('green');
                if(_pofit>0){
                    $pofit.addClass('red');
                }else{
                    $pofit.addClass('green');
                }
                $obj.parent().parent().parent().find('.price-box div').html(_pofit.toFixed(2));
            })
            $('#pageHold .'+symbolInfo.symbolCode+'-b').html(symbolInfo.bid);
        }
        if($('#pageHold .'+symbolInfo.symbolCode+'-s').length>0){
            $('#pageHold .'+symbolInfo.symbolCode+'-s').each(function(){
                var $obj=$(this);
                var _holdPrice=$obj.attr('pricehold');
                var _number=$obj.attr('quantityHold');
                var _unit=symbolInfo.unit;
                var _currentPrice=symbolInfo.ask;
                var _pofit=(_currentPrice-_holdPrice)*_unit*_number*-1;
                $pofit=$obj.parent().parent().parent().find('.price-box div');
                $pofit.removeClass('red').removeClass('green');
                if(_pofit>0){
                    $pofit.addClass('red');
                }else{
                    $pofit.addClass('green');
                }
                $pofit.html(_pofit.toFixed(2));
            })
            $('#pageHold .'+symbolInfo.symbolCode+'-s').html(symbolInfo.ask);
        }
    }

}
function onAccountChange(mods) {
    var mod = mods[0];
    console.log(mod);
    if($('#pageAccount .member-profit').length>0){
        $('#pageAccount .member-profit').html(mod.amDailyCloseProfit.toFixed(2));
    }
    //$('#txtsymbol_username').text(mod.username ) ;
    //$('#txtsymbol_balance').text(mod.amBalance.toFixed(2)) ;
}
function onGoodsQuoted(mods){
    var symbolInfo = mods[0] ;
    if (symbolInfo) {
        var $obj=$('#pageGoods').find('.goods'+symbolInfo.symbolCode);
        if($obj.length>0){
            var $buyObj=$obj.find('.buy-price');
            var $sellObj=$obj.find('.sell-price');
            var $highPriceObj=$obj.find('.high-price');
            var $lowPriceObj=$obj.find('.low-price');
            $buyObj.removeClass('red').removeClass('green');
            $sellObj.removeClass('red').removeClass('green');
            $buyObj.html(symbolInfo.ask);
            $sellObj.html(symbolInfo.bid);
            $highPriceObj.html('最高:'+symbolInfo.dailyHighest);
            $lowPriceObj.html('最低:'+symbolInfo.dailyLowest);
            if(symbolInfo.upOrDown==0){
                $buyObj.addClass('black');
                $sellObj.addClass('black');
            }
            if(symbolInfo.upOrDown>0){
                $buyObj.addClass('red');
                $sellObj.addClass('red');
            }
            if(symbolInfo.upOrDown<0){
                $buyObj.addClass('green');
                $sellObj.addClass('green');
            }
            $obj.find('input[name=ask]').val(symbolInfo.ask);
            $obj.find('input[name=bid]').val(symbolInfo.bid);
            $obj.find('input[name=pointAsk]').val(symbolInfo.pointAsk);
            $obj.find('input[name=pointBid]').val(symbolInfo.pointBid);

            if($('.trade-order-box').length>0){
                $('.trade-order-box').find('.buy-price').html(symbolInfo.ask);
                $('.trade-order-box').find('.sell-price').html(symbolInfo.bid);
                $('.trade-order-box').find('.buy-pointOffset').html(symbolInfo.pointAsk);
                $('.trade-order-box').find('.sell-pointOffset').html(symbolInfo.pointBid);
            }

            //document.getElementById('frame_02').contentWindow.location.reload(true);
        }
    }
}
function onAccountQuoted(mods){
    var symbolInfo = mods[0] ;
    if (symbolInfo) {
        updateHoldList(symbolInfo);
        $('.dailyProfit').html(dailyProfit.toFixed(2));

        var _netValue=FloatAdd(amMarginRemain,dailyProfit);

        var _amMarginFree=FloatAdd(amMarginRemain,-amMarginUsed);
        _amMarginFree=FloatAdd(_amMarginFree,dailyProfit);
        $('#pageAccount').find('.netValue').html('￥ '+_netValue.toFixed(2));
        $('#pageAccount').find('.amMarginFree').html('￥ '+_amMarginFree.toFixed(2));
    }
}
function onGoodsAccountChange(mods){}

window.addEventListener("DOMContentLoaded",loaded,false);

// 初始化微信 JS API
function getWXJSSDK() {
    wx.config({
        debug     : false,
        appId     : wx_appid,
        timestamp : wx_timestamp,
        nonceStr  : wx_noncestr,
        signature : wx_signature,
        jsApiList : [
            // 所有要调用的 API 都要加到这个列表中
            'checkJsApi',
            'chooseImage',
            'uploadImage',
            'downloadImage',
            'previewImage',
            'hideOptionMenu',
            'scanQRCode'
        ]
    });
	wx.ready(function(){
	});
};
// 选择照片
function takePhoto(key,callBack) {
	wx.chooseImage({
		success: function (res) {
			var imgKey = '#img_' + key ;
		
			images.imgMap[imgKey] = res.localIds[res.localIds.length-1] ;
			
			alert(images.imgMap[imgKey]);
		
			if (typeof callBack === 'function') {
				callBack.call(res,images) ;
			}
		}
	});
};
//上传照片
function uploadPhoto(callBack) {
	var arrImgs = [] ; // 准备上传的图片
	var url     = wx_url_uploadIMG ;

	for ( var imgKey in images.imgMap ) {
		arrImgs.push(images.imgMap[imgKey]) ;
	}

	var i = 0,cnt = arrImgs.length ;
	if (cnt == 0) {
		$.MsgBox.Tip('error','请先选择照片或直接拍照');
		return;
	}

	// 开始上传图片
	images.serverId = []; // 用于存放成功上传的图片的服务端ID
	function upload() {
		wx.uploadImage({
			localId : arrImgs[i],
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success : function (res) {
				i++ ;
				images.serverId.push(res.serverId);
	
				if ( i<cnt )
				{
					upload();
				}else{
					if (typeof callBack==='function') {
                		callBack() ;
                    }
				}
			},
			fail : function (res) {
				alert(JSON.stringify(res));
			}
		}) ;
	}
    upload();
};
//下载照片
function downLoadPhoto(userid,callBack){
	var i = 0,cnt = images.serverId.length ;
	function download(){
		$.ajax({
			url:"api.php",
			data:{'action':'download','media_id':images.serverId[i],'wx_token':wx_token,'code':userid,'key':i},
			type:"POST",
			beforeSend:function(){ },
			success:function(data){
				i++;
				if( i<cnt){
					download();
				}else{
					if (typeof callBack==='function') {
                		callBack() ;
                    }
				}
			}
		});
	}
	download();
}
function reSize(){
}
function loadTemplate(name){
    $.get("page/"+name+".html", function(result){
        $('body').append(result);
    });
}
function bindTemplate(source,data){
    var _html;
    if(source.length==0 || source == ''){
        _html="<div align=\"center\">404</div>";
    }else{
        var render = template.compile(source);
        _html=render(data);
    }
	return _html;
}
function FloatAdd(arg1,arg2){
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    return (arg1*m+arg2*m)/m;
}
String.prototype.format = function() {
    var result=this;
    if (arguments.length == 0)
        return null;
    for ( var i = 0; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i) + '\\}', 'gm');
        result = result.replace(re, arguments[i]);
    }
    return result;
};



