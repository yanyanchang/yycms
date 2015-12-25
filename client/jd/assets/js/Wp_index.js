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

var amType={
    '1':'入金',
    '2':'出金',
    '3':'调整',
    '4':'建仓手续费',
    '5':'平仓手续费',
    '6':'平仓盈亏',
    '7':'结算盈亏',
    '8':'结算计息',
    '9':'冻结',
    'A':'回退冻结',
    'B':'占用',
    'C':'回退占用',
    'D':'入金手续费',
    'E':'出金手续费',
    'F':'手续费结转',
    'G':'交割手续费',
    'H':'交割金额',
    'X':'红冲',
    'Z':'蓝补',
    'I':'出金回退',
    'J':'亏损回退',
}

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
        onFailure:function(re,message){
            
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
        window.location.href=api_path+'?m=Wp';
    })
}

function pageTradeFun(){
	$.MsgBox.Loading('提示','加载中...');
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
		
		var reg=new RegExp("\\d","g"); 
		_arrSymbols[i].photo=_arrSymbols[i]['symbolCode'].replace(reg,"").replace('T',"");  ;
		
    }

    getHoldList(function(){
        _accInfo.dailyProfit=dailyProfit;
        var _data={
            'acc':_accInfo,
            'mod':_arrSymbols,
            'assets_path':assets_path
        };
        $.get(assets_path+"page/Trade.html?rnd="+Math.random(), function(result){
            var _html=bindTemplate(result,_data);
            $('#pageTrade').html(_html);
            trade();
			$.MsgBox.Clean();
        });
    })

}
function pageLoginFun(){
    var _data={
        'logincode':logincode
    };
    $.get(assets_path+"page/Login.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        login();
        var myScroll = new IScroll('#pageLogin', { mouseWheel: true });
    });
}
function pageXyFun(){
    var _data={
		 'assets_path':assets_path
	};
    $.get(assets_path+"page/Xy.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        Xy();
    });
}
function pageSigninFun(){
    var _data={
        'serialcode':erialcode
    };
    $.get(assets_path+"page/Signin.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        sign_in();
        var myScroll = new IScroll('#pageSignin', { mouseWheel: true });
    });
}
function pageForgotFun(){
    var _data={ };
    $.get(assets_path+"page/pageForgot.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        forgot();
        var myScroll = new IScroll('#pageForgot', { mouseWheel: true });
    });
}
function pageGoodsFun(){
	$.MsgBox.Loading('提示','加载中...');
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
        'symbolInf':_symbolInfo,
		'assets_path':assets_path
    };
    $.get(assets_path+"page/Goods.html?rnd="+Math.random(), function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        goods();
		$.MsgBox.Clean();
        //var myScroll = new IScroll('#pageGoods', { mouseWheel: true });
    });
}
function pageHoldFun(){
    getHoldList(function(){
        var _data={
            'orderList':holdList,
			'assets_path':assets_path
        };
        $.get(assets_path+"page/Hold.html?rnd="+Math.random(), function(result){
            var _html=bindTemplate(result,_data);
            $('.in').html(_html);
            hold_list();
            //var myScroll = new IScroll('#pageHold', { mouseWheel: true });
        });
    })
}
function pageAccountFun(){
	$.MsgBox.Loading('提示','加载中...');
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
            'acc':_accInfo,
			 'assets_path':assets_path
        };
        $.get(assets_path+"page/Account.html?rnd="+Math.random(), function(result){
            var _html=bindTemplate(result,_data);
            $('.in').html(_html);
            account();
			$.MsgBox.Clean();
            //var myScroll = new IScroll('#pageAccount', { mouseWheel: true });
        });
    })

}
function pageHistoryFun(){
	$.MsgBox.Loading('提示','加载中...');
    if(sdk){
        var _userInfo=sdk.getUserInfo();
        console.log(_userInfo);
        var _data={
            'assets_path':assets_path
        };
        $.get(assets_path+"page/History.html?rnd="+Math.random(), function(result){
            var _html=bindTemplate(result,_data);
            $('.in').html(_html);
            account_history();
            //var myScroll = new IScroll('#pageAccount', { mouseWheel: true });
        });
    }
}
function pageMoreFun(){
    var _data={ };
    $.get(assets_path+"page/More.html"+Math.random(), function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        var myScroll = new IScroll('#pageAccount', { mouseWheel: true });
    });
}
function pageNote1Fun(){
	 var _data={ 
	  'assets_path':assets_path
	 };
    $.get(assets_path+"page/Note1.html?rnd="+Math.random(), function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        //var myScroll = new IScroll('#pageAccount', { mouseWheel: true });
        var _win_height=$(window).height();
        $('#pageNote1').find('.message-body div').eq(0).height(_win_height/1.5);
    });
}
function pageNote2Fun(){
	 var _data={
	 'assets_path':assets_path	 
	 };
    $.get(assets_path+"page/Note2.html?rnd="+Math.random(), function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        //var myScroll = new IScroll('#pageAccount', { mouseWheel: true });
        var _win_height=$(window).height();
        $('#pageNote2').find('.message-body div').eq(0).height(_win_height/1.5);
    });
}
function pageOptionFun(){
    var _data={
        'assets_path':assets_path
    };
    $.get(assets_path+"page/Option.html?rnd="+Math.random(), function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
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
    if(location.hash!=='pageTrade'){
        location.hash='#pageTrade';
    }
    $('.in').each(function(){
        if($(this).attr('id')!=location.hash.replace('#','')){
            $(this).removeClass('in').css({'display':'none'});
        }
    });


}
function resetW(){
    var _win_height = $(window).height();

    var _win_width = $(window).width();
    if($('#mb_box').length>0){
        var boxWidth = $("#mb_box").width();
        var boxHeight = $("#mb_box").height();

        $("#mb_box").css({
            'margin-top': -((boxHeight) / 2),
            'margin-left': -((boxWidth) / 2)
        });
    }
    $('#pageNote1').find('.message-body div').eq(0).height(_win_height/1.5);
    $('#pageNote2').find('.message-body div').eq(0).height(_win_height/1.5);


    if($('#frame_02').length>0){
        $('#grptrade_chart').width($('#grptrade_chart').parent().width());
        $('#frame_02').width($('#frame_02').parent().width());
    }
    if($('.menu').length>0){
        var _menuTop=$(window).height()-$('.menu').eq(0).height();
        $('.menu').css({'top':_menuTop});
    }

    if($('.products-list').length>0){
        var line=3;
        if($(window).height()<600){
            line=2;
        }
        var item_height=$('.products-list .item').eq(0).height();
        var products_list_height = item_height*line+(line-1)*11;
        $('.products-list').css({'height':products_list_height,'overflow':'scroll','overflow-x':'hidden'});
        var _menu_width=$('.in').width()/4;
        $('.menu .item').width(_menu_width);
    }
}
var account_history=function(){
    $page=$('#pageHistory');
    var _outInLog=Array();
    $page.find('.l-menu').unbind('click');
    $page.find('.l-menu').bind('click',function(){
        $page.find('.l-menu').removeClass('hover');
        $page.find('.r-menu').removeClass('hover');
        $(this).addClass('hover');
        $('.money-log').show();
        $('.out-money-log').hide();
    });
    $page.find('.r-menu').unbind('click');
    $page.find('.r-menu').bind('click',function(){
        $page.find('.l-menu').removeClass('hover');
        $page.find('.r-menu').removeClass('hover');
        $(this).addClass('hover');
        $('.money-log').hide();
        $('.out-money-log').show();
        getOutInLog();
    });
    getMoneyLog();
    function getOutInLog(){
        var _data={
            'log':_outInLog,
            'assets_path':assets_path
        };
        $.get(assets_path+"page/Amlog.html?rnd="+Math.random(),function(result){
            var _html=bindTemplate(result,_data);
            $('.out-money-log-list').html(_html);


            if($('.out-money-log li').length==0) {
                $('.out-money-log > .empty-tip').show();
            }else{
                var out_money_log_list_height=$(window).height()-$('.menu').height()-$('.hold-menu').height()-25;
                $('.out-money-log-list').css({'height':out_money_log_list_height,'overflow':'scroll','overflow-x':'hidden'});
            }
        })
    }
    function getMoneyLog(){
        var _user_info=sdk.getUserInfo();
        var _acc_info=sdk.getAccount();
        var _user_id=_user_info.userId;
        var _acc_id=_acc_info.accId;
       var _post_data={
           'acc_id':_acc_id,
           'user_id':_user_id
       };
        console.log(_post_data);
       $.ajax({
            url:api_path+'/Server/getAccountHistory',
            data:_post_data,
            type:"POST",
            beforeSend:function()
            {
                //$.MsgBox.Loading('提示','加载中...');
            },
            success:function(data) {
                var _log=eval("(" + data + ")");
                for(var i=0; i<_log.length;i++) {
                    _log[i]['amTypeStr'] = amType[_log[i]['amType']];
                    _log[i]['amTypeStr'] = amType[_log[i]['amType']];
                    if(parseInt( _log[i].amChange)>0){
                        _log[i]['textColor']='red';
                    }
                    if(parseInt(_log[i].amChange)<0){
                        _log[i]['textColor']='green';
                    }

                    if (_log[i]['amType'] == '1' || _log[i]['amType'] == '2') {
                        _outInLog.push(_log[i]);
                    }
                }
                var _data={
                    'log':_log,
                    'assets_path':assets_path
                };
                $.get(assets_path+"page/Amlog.html?rnd="+Math.random(),function(result){
                    var _html=bindTemplate(result,_data);
                    $('.log-list').html(_html);


                    if($('.money-log li').length==0) {
                        $('.money-log > .empty-tip').show();
                    }else{
                        var log_list_height=$(window).height()-$('.menu').height()-$('.hold-menu').height()-25;
                        $('.money-log').css({'height':log_list_height,'overflow':'scroll','overflow-x':'hidden'});
                    }
                })
                console.log(data);
                $.MsgBox.Clean();
            }
       });
    }
    var _menuTop=$(window).height()-$page.find('.menu').height();
    $page.find('.menu').css({'top':_menuTop});
}
var hold_list=function(){
    $page=$('#pageHold');
    initHoldList();
	$page.find('.l-menu').unbind('click');
	$page.find('.l-menu').bind('click',function(){
		$page.find('.l-menu').removeClass('hover');
		$page.find('.r-menu').removeClass('hover');
		$(this).addClass('hover');
		$('.hold-list').show();
		$('.hold-list-history').hide();
	});
	$page.find('.r-menu').unbind('click');
	$page.find('.r-menu').bind('click',function(){
		$page.find('.l-menu').removeClass('hover');
		$page.find('.r-menu').removeClass('hover');
		$(this).addClass('hover');
		$('.hold-list').hide();
		$('.hold-list-history').show();
        getCloseBill();
	});
    $('.sall_all_btn').each(function(){
        $(this).unbind('click');
        $(this).bind('click',function(){
            var $obj=$(this);
            var _symboName=$(this).attr('symbolName');
            var _number=$(this).attr('quantity');
            var _bsCode=$(this).attr('bsCode');
            var _orderPrice=$(this).attr('orderPrice');
            var _pointOffset=$(this).attr('pointOffset');

			/*
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
			*/
			
			var _tradeStr="";
			var _tradeTitle=_symboName;
			_tradeStr+="<div style='width: 100%;' class='trade-order-box'>";
			if(_bsCode=='b') {
				_tradeTitle
				_tradeStr += "<div style='width: 33%; float: left; text-align: center;'>平买卖方向<br/><div class=\"buy buy-btn\">买</div></div>";
				_tradeStr+="<div style='width: 33%; float: left;text-align: center;' class='border-left border-right'>买价<br/><br/><span class=\"buy-price\">"+_orderPrice+"</span></div>";
				_tradeStr+="<div style='width: 33%; float: left;text-align: center;'>买量<br/><br/>"+_number+"</div>";
			}
			if(_bsCode=='s'){
				_tradeStr += "<div style='width: 33%; float: left;text-align: center;'>平买卖方向<br/><div class=\"sell sale-btn\">卖</div></div>";
				_tradeStr+="<div style='width: 33%; float: left;text-align: center;' class='border-left border-right'>卖价<br/><br/><span class=\"sell-price\">"+_orderPrice+"</span></div>";
				_tradeStr+="<div style='width: 33%; float: left;text-align: center;'>卖量<br/><br/>"+_number+"</div>";
			}
			_tradeStr+="<div class='clear'></div></div>";

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
                onFailure:function(code,message){
                    $.MsgBox.Tip('error',message);
                }
            }
            $.MsgBox.Confirm(_tradeTitle,_tradeStr,function(){
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
        if($('.hold-list li').length==0) {
            $('.hold-list > .empty-tip').show();
        }
        var hold_list_height=$(window).height()-$('.menu').height()-$('.hold-menu').height()-25;
        $('.hold-list').css({'height':hold_list_height,'overflow':'scroll','overflow-x':'hidden'});
    }
    function getCloseBill(){
        var _user_info=sdk.getUserInfo();
        var _acc_info=sdk.getAccount();
        var _user_id=_user_info.userId;
        var _acc_id=_acc_info.accId;
        var _post_data={
            'acc_id':_acc_id,
            'user_id':_user_id
        };
        $.ajax({
            url: api_path + '/Server/getCloseBillHistory',
            data: _post_data,
            type: "POST",
            beforeSend: function () {
                $.MsgBox.Loading('提示','加载中...');
            },
            success: function (data) {
                var _closeBill=eval("(" + data + ")");
                for(var i=0;i<_closeBill.length;i++){
                    if(_closeBill[i]['bsCode']=='b'){
                        _closeBill[i]['bsStr']='买';
                        _closeBill[i]['bsClass']='buy';
                    }else{
                        _closeBill[i]['bsStr']='卖';
                        _closeBill[i]['bsClass']='sell';
                    }
                    if(parseInt( _closeBill[i].profitClose)>0){
                        _closeBill[i]['textColor']='red';
                    }
                    if(parseInt(_closeBill[i].profitClose)<0){
                        _closeBill[i]['textColor']='green';
                    }
                    if(parseInt(_closeBill[i].profitClose)==0){
                        _closeBill[i]['textColor']='black';
                    }

                    _closeBill[i]['priceOpen']=parseFloat(_closeBill[i]['priceOpen']).toFixed(0);
                    _closeBill[i]['priceClose']=parseFloat(_closeBill[i]['priceClose']).toFixed(0);
                    _closeBill[i]['priceHold']=parseFloat(_closeBill[i]['priceHold']).toFixed(0);
                    _closeBill[i]['quantityClose']=parseInt(_closeBill[i]['quantityClose']);
                }

                var _data={
                    'assets_path':assets_path,
                    'close_bill':_closeBill
                };
                console.log('closeBill');
                console.log(_closeBill);
                $.get(assets_path+"page/CloseBill.html?rnd="+Math.random(), function(result){
                    var _html=bindTemplate(result,_data);
                    $('.hold-list-history').html(_html);
                    var hold_list_history_height=$(window).height()-$('.menu').height()-$('.hold-menu').height()-25;
                    hold_list_history_height=300;
                    $('.hold-list-history').css({'height':hold_list_history_height,'overflow':'scroll','overflow-x':'hidden'});
                   // $('.hold-list-history').css({'height':hold_list_history_height});
                    if($('.hold-list-history li').length==0){
                        $('.hold-list-history > .empty-tip').show();
                    }


                    //document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                    show_close_bill();
                    $.MsgBox.Clean();
                });
            }
        })
    }
    function show_close_bill(){
        $('.show_btn').each(function(){
            $(this).unbind('click');
            $(this).bind('click',function(){
                var _symbolName=$(this).attr('symbolName');
                var _orderCode=$(this).attr('orderCode');
                var _quantity=$(this).attr('quantity');
                var _closeDate=$(this).attr('closeDate');
                var _priceOpen=parseFloat($(this).attr('priceOpen')).toFixed(0);
                var _priceHold=parseFloat($(this).attr('priceHold')).toFixed(0);
                var _priceClose=parseFloat($(this).attr('priceClose')).toFixed(0);
                var _chargeOpen=$(this).attr('chargeOpen');
                var _chargeClose=$(this).attr('chargeClose');
                var _profitClose=$(this).attr('profitClose');
                var _money=(_priceClose-_priceOpen)*_quantity;
                var _html="";
                _html+="<div style='width: 50%; float: left; line-height: 3em; font-size: 0.5em;' class='border-bottom'>建仓价："+_priceOpen+"</div>";
                _html+="<div style='width: 50%; float: left; line-height: 3em; font-size: 0.5em;' class='border-bottom'>持仓价："+_priceHold+"</div>";
                _html+="<div style='width: 50%; float: left; line-height: 3em; font-size: 0.5em;'class='border-bottom'>平仓价："+_priceClose+"</div>";
                _html+="<div style='width: 50%; float: left; line-height: 3em; font-size: 0.5em;' class='border-bottom'>数量："+_quantity+"</div>";
                _html+="<div style='width: 50%; float: left; line-height: 3em; font-size: 0.5em;' class='border-bottom'>建仓手续费："+_chargeOpen+"</div>";
                _html+="<div style='width: 50%; float: left; line-height: 3em; font-size: 0.5em;' class='border-bottom'>平仓手续费："+_chargeClose+"</div>";
                _html+="<div style='width: 50%; float: left; line-height: 3em; font-size: 0.5em;' class='border-bottom'>累计盈亏："+_profitClose+"</div>";
                _html+="<div style='width: 50%; float: left; line-height: 3em; font-size: 0.5em;' class='border-bottom'>&nbsp;</div>";
                _html+="<div class='clear'></div>";
                $.MsgBox.Confirm(_symbolName,_html,function(){

                });
            });
        });
    }
    FastClick.attach(document.body);
}
var goods=function() {
    $page=$('#pageGoods');

    var _quantityMax=parseInt( $page.find('input[name=quantityMax]').val());
    var _quantityStep=parseInt($page.find('input[name=quantityStep]').val());

    var _option='';
    for(var i=1;i<=_quantityMax;i++){
        _option+="<option value=\""+i+"\" >"+i+"</option>";

    }
    $page.find('select[name=trading_select]').html(_option);
    $page.find('select[name=trading_select]').change(function(){
        $('#trading_number').html($(this).val());
    })
    $page.find('.del').click(function(){
        var _number=parseInt($('#trading_number').html());
        if(_number>1){
            $('#trading_number').html(--_number);
        }
    })
    $page.find('.add').click(function(){
        var _number=parseInt($('#trading_number').html());
        if(_number<_quantityMax){
            //console.log(_number++);
            $('#trading_number').html(++_number);
        }
    })

/*
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
    */

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
        var _number=parseInt($('#trading_number').html());
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
            'onFailure':function(code,message){
				$.MsgBox.Tip('error',message);
            }
        };

        var _tradeTitle='订单确认';
        var _tradeTitle=symboName;
        /*
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
        */
        var _tradeStr="";
        _tradeStr+="<div style='width: 100%;' class='trade-order-box'>";
        if(bsCode=='b') {
            _tradeStr += "<div style='width: 33%; float: left; text-align: center;'>买卖方向<br/><div class=\"buy buy-btn\">买</div></div>";
            _tradeStr+="<div style='width: 33%; float: left;text-align: center;' class='border-left border-right'>买价<br/><br/><span class=\"buy-price\">"+_orderPrice+"</span></div>";
            _tradeStr+="<div style='width: 33%; float: left;text-align: center;'>买量<br/><br/>"+_number+"</div>";
        }
        if(bsCode=='s'){
            _tradeStr += "<div style='width: 33%; float: left;text-align: center;'>买卖方向<br/><div class=\"sell sale-btn\">卖</div></div>";
            _tradeStr+="<div style='width: 33%; float: left;text-align: center;' class='border-left border-right'>卖价<br/><br/><span class=\"sell-price\">"+_orderPrice+"</span></div>";
            _tradeStr+="<div style='width: 33%; float: left;text-align: center;'>卖量<br/><br/>"+_number+"</div>";
        }
        _tradeStr+="<div class='clear'></div></div>";


        $.MsgBox.Confirm(_tradeTitle,_tradeStr,function(){
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
        var url    = '/chart/chart.html?chartStyle=1&symbolCode={0}&period={1}&barCount={2}&theme=white&sid={3}' ;

        url = url.format(symboCode, period, barCnt, Math.random().toString()) ;

        // console.log(url) ;

        var oChart = $('#grptrade_chart') ;

        // 根据选中的商品显示图表
        if (document.getElementById('frame_02')) {

            setIFrameSrc('frame_02',url) ;

        } else {
            oChart.css('left', '19px') ;
            oChart.css('width', '100%') ;
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
        oChart.css('width',  '100%') ;
    }
    doChangeChart(0);
    var _menuTop=$(window).height()-$page.find('.menu').height();
    $page.find('.menu').css({'top':_menuTop});
	
}
var login=function(){
    //事件绑定
    $page=$('#pageLogin');

    if($page.find('input[name=account]').val()==''){
        var _local_userid=getCookie('userID');
        if(_local_userid){
            $page.find('input[name=account]').val(_local_userid);
        }
    }

    $('#login_btn').unbind('click');
    $('#login_btn').bind('click',function(){
        var _userID = $page.find('input[name=account]').val();
        var _passowrd = $page.find('input[name=password]').val();
        if(_userID.length==0){
            $.MsgBox.Tip('error','请输入帐号！');
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
            sdk.init(encrypt_key,encrypt_iv,assets_path+'libs/wetbizsdk',function() {
                console.log('init');
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
                        var _userInfo=sdk.getUserInfo();
                        console.log(_userInfo);
                        setCookie('userID',_userID);
                    },
                    onFailure : function(retCode,message) {
                        $.MsgBox.Clean();
                        $.MsgBox.Tip('error',message,function(){
                            $('#login_btn').removeAttr("disabled");

                            $page.find('input[type=password]').val('');
                        });
                        console.log('登录失败！[' + retCode + ']' + message) ;
                    }
                });
            });

        }
    })
}
var trade=function(){
    $page=$('#pageTrade');
    var item_height=$('.products-list .item').eq(0).height();

    //var products_list_height=$(window).height()-$('.member_info').height()-$('.menu').height()-$('.tools').height()-80;
	var line=3;
    if($(window).height()<600){
        line=2;
    }
	var products_list_height = item_height*line+(line-1)*11;
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
	
	$page.find('.call_server').unbind('click');
	$page.find('.call_server').bind('click',function(){
		$.MsgBox.Call('联系客服','<div align="center" style="width:100%; font-size:2em;">400-400-8888</div>',function(){
            location.href="tel:4004008888";
   		})
	});
    $page.find('.i1').each(function(){
        $(this).css({'font-size':'1em'});
        //if($(this).height()>$page.find('.i1').eq(0).height()){

        //}
    });
	
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
var accountHistory=function(){
}
// --------------------------------------------------
// 接收到实时行情数据
// --------------------------------------------------
function onQuoted(mods) {
	$('#pageTrade .item').each(function() {
		var time=parseInt($(this).find('.buy_money').attr('time'));
		if(time>0){
			var now_time=new Date().getTime();
			if(now_time-time>2000){
				$(this).find('.i2').css({'background':''});
    			$(this).find('.i3').css({'background':''});
			}
		}
    });
    
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
				$symbolObj.find('.buy_money').attr('time',new Date().getTime());
                //$symbolObj.find('.sell_money').parent().css({'background':redBg});
                //$symbolObj.find('.buy_money').parent().css({'background':redBg});
            }
            if(symbolInfo.upOrDown<0){
                $symbolObj.find('.sell_money').addClass('green');
                $symbolObj.find('.buy_money').addClass('green');
                $symbolObj.find('.buy_money').attr('time',new Date().getTime());
                //$symbolObj.find('.sell_money').parent().css({'background':greenBg});
                //$symbolObj.find('.buy_money').parent().css({'background':greenBg});
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
$(window).resize(function(){resetW();})

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
//写cookies
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

    if(arr=document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}
//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
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



