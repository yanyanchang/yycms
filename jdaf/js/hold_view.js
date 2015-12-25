/**
 * Created by lmd on 2015/11/26.
 */
var HoldView=Backbone.View.extend({
    el : '#holdlist',
    holdList:null,
    timeOut:null,
    myScroll:null,
    events:{
        'resize body': 'resizePage'
    },
    initialize:function(){
        if(sdk){
            sdk.queryBinHoldBill({
                onSuccess : function(mods) {
                    window.holdView.holdList=Array();
                    for (var i=0; i<mods.length; i++) {
                        mods[i].symbolCode=sdk.symbolId2Code(mods[i].symbolId);
                        var symbolInfo  = sdk.getSymbol(mods[i].symbolCode) ;
                        if(symbolInfo){
                            mods[i].symbolName  = symbolInfo.symbolName;
                            mods[i].symbolIcon  = 'css/image/' + mods[i].symbolCode + '_W.png' ;
                            mods[i].orderDirect = 'css/image/' + ((mods[i].bsCode==='b') ?  'picbuyup.png':'picbuydown.png') ;
                            mods[i].orderPrice  = mods[i].quantity ;
                            mods[i].investVal   = mods[i].investVal ;
                            mods[i].profitRate  = (mods[i].profitRate * 100).toFixed(0);

                            var _temp=mods[i].closeTime.split('T');
                            var _endDateStr= mods[i].endDateStr =_temp[0].substring (0,4)+"-"+_temp[0].substring  (4,6)+"-"+_temp[0].substring  (6,8)+" "+_temp[1].substring (0,2)+":"+_temp[1].substring  (2,4)+":"+_temp[1].substring  (4,6);
                            var _endDate =  new Date(Date.parse(_endDateStr.replace(/-/g, "/")));
                            var _lastTime = mods[i].lastTime= window.holdView.jsDateDiff(_endDate);
                            var _priceCurrent = mods[i].priceCurrent  =symbolInfo.priceCurrent;
                            var _profit=0;
                            if(_lastTime!='过期'){
                                if(mods[i].bsCode=="b"){
                                    if(symbolInfo.priceCurrent>mods[i].priceOrder){
                                        _profit=mods[i].profitRate*mods[i].amount/100;
                                    }
                                    if(symbolInfo.priceCurrent<mods[i].priceOrder){
                                        _profit=-mods[i].amount;
                                    }
                                }
                                if(mods[i].bsCode=="s"){
                                    if(symbolInfo.priceCurrent<mods[i].priceOrder){
                                        _profit=mods[i].profitRate*mods[i].amount/100;
                                    }
                                    if(symbolInfo.priceCurrent>mods[i].priceOrder){
                                        _profit=-mods[i].amount;
                                    }
                                }
                                if(_profit>0){
                                    mods[i].profitColor="red";
                                }
                                if(_profit<0){
                                    mods[i].profitColor="green";
                                }
                                mods[i].profit=_profit;
                                window.holdView.holdList.push(mods[i]);
                            }else{
                                //mods.remove(i);
                                //mods[i].profit=mods[i].profitClose;
                            }
                        }
                    }
                    var _template=_.template($('#holdListTemplate').html());
                    $("#hold_list").html(_template({datas:window.holdView.holdList}));
                    window.holdView.myScroll = new IScroll('#hold_list_wrapper', {
                        disableMouse: true,
                        disablePointer: true
                    });

                    window.holdView.render();
                    window.holdView.resizePage();
                    if (sdk) {
                        sdk.on(M_R_PUSH_QUOTE,this.onQuoted,sdk) ;
                    }
                }
            }) ;
        }
        $('#hold_list_wrapper').height($(window).height()-$('#holdlist_header').height()-30);
        this.listenTo(window, 'resize', _.debounce(this.resizePage));
    },
    onShow:function(){
        if (sdk) {
            sdk.on(M_R_PUSH_QUOTE,this.onQuoted,sdk) ;
        }
        window.holdView.myScroll = new IScroll('#hold_list_wrapper', {
            disableMouse: true,
            disablePointer: true
        });
    },
    jsDateDiff:function(publishTime){
        var d_minutes,d_hours,d_days;
        var timeNow = parseInt(new Date().getTime()/1000);
        if(publishTime.getTime()/1000>timeNow){
            var d;
            d =  publishTime.getTime()/1000-timeNow;
            d_days = parseInt(d/86400);
            d_hours = parseInt(d/3600);
            d_minutes = parseInt(d/60);
            d_second = d-d_minutes*60;
            if(d_days>0 && d_days<4){
                return d_days+"天"+d_second+"秒";
            }else if(d_days<=0 && d_hours>0){
                return d_hours+"小时"+d_second+"秒";
            }else if(d_hours<=0 && d_minutes>0){
                return d_minutes+"分钟"+d_second+"秒";
            }else if(d_second>0){
                return d_second+"秒";
            }
        }else{
            return '过期';
        }
    },
    render:function(){
        for (var i=0; i<window.holdView.holdList.length; i++)
        {
            var _mod = window.holdView.holdList[i] ;

            var _temp=_mod.closeTime.split('T');
            var _endDateStr=_temp[0].substring (0,4)+"-"+_temp[0].substring  (4,6)+"-"+_temp[0].substring  (6,8)+" "+_temp[1].substring (0,2)+":"+_temp[1].substring  (2,4)+":"+_temp[1].substring  (4,6);
            var _temp1=_mod.openTime.split('T');
            var _startDateStr=_temp1[0].substring (0,4)+"-"+_temp1[0].substring  (4,6)+"-"+_temp1[0].substring  (6,8)+" "+_temp1[1].substring (0,2)+":"+_temp1[1].substring  (2,4)+":"+_temp1[1].substring  (4,6);
            var _endDate =  new Date(Date.parse(_endDateStr.replace(/-/g, "/")));
            var _startDate =  new Date(Date.parse(_startDateStr.replace(/-/g, "/")));
            var _nowDate= new Date();
            var _totalTime=(_endDate.getTime()-_startDate.getTime())/1000;
            var _diffTime=(_endDate.getTime()-_nowDate.getTime())/1000;
            var _lastTime =window.holdView.jsDateDiff(_endDate);
            if(_lastTime!='过期'){
                var _percent=parseInt(_diffTime/_totalTime*100);
                if(_percent<30){
                    $('.list-item-'+_mod.orderCode).find('.progress > span').addClass('red');
                }
                $('.list-item-'+_mod.orderCode).find('.progress > span').css({'width':_percent+'%'});
                $('.list-item-'+_mod.orderCode).find('.progress > span > span').html(_percent+'%');
                $('.list-item-'+_mod.orderCode).find('.last-time').html(_lastTime);
            }else{
                $('.list-item-'+_mod.orderCode).parent().fadeOut(function(){
                    $(this).remove();
                    window.holdView.myScroll.refresh();
                });
            }
        }

        if($('#hold_list li').length==0){
            $('#hold_list').html('<div class=\"empty\">持仓为空</div>');
        }
        $('#holdlist_header > li > a').eq(1).addClass('active');

        window.holdView.timeOut=setTimeout("window.holdView.render();",1000);
    },
    resizePage:function(){
        var menuWidth=($(window).width()-20)/3;
        $('#holdlist_header li').width(menuWidth);

        var progressWidth=$(window).width()-265;
        $('.progress').width(progressWidth);
        $('#hold_list_wrapper').height($(window).height()-$('#holdlist_header').height()-30);
    },
    onQuoted:function(mods) {
        var symbolInfo   = mods[0] ;
        if(symbolInfo){
            console.log(symbolInfo);
            if($("."+symbolInfo.symbolCode).length>0){
                $("."+symbolInfo.symbolCode).each(function(){
                    var _latestPrice=symbolInfo.priceCurrent;
                    var _orderPrice=parseFloat($(this).attr('priceorder'));
                    var _bsCode=$(this).attr('bsCode');
                    var _profitRate=$(this).attr('profitrate');
                    var _amount=$(this).attr('amount');
                    var _profit=0;
                    var _profitColor="";
                    if(_profitRate>1){
                        _profitRate=_profitRate/100;
                    }
                    if(_bsCode=="b"){
                        if(_latestPrice>_orderPrice){
                            _profit=_profitRate*_amount;
                        }
                        if(_latestPrice<_orderPrice){
                            _profit=-_amount;
                        }
                    }
                    if(_bsCode=="s"){
                        if(_latestPrice<_orderPrice){
                            _profit=_profitRate*_amount;
                        }
                        if(_latestPrice>_orderPrice){
                            _profit=-_amount;
                        }
                    }
                    if(_profit>0){
                        _profitColor="red";
                    }
                    if(_profit<0){
                        _profitColor="green";
                    }
                    $(this).find('.latestPrice').html('最新价格<br/>'+_latestPrice);
                    $(this).find('.profit').html( '盈利<br><span class="'+_profitColor+'">'+_profit.toFixed(2) +'</span>');
                })
            }
        }
    },
    destroy:function(){
        if (sdk) {
            sdk.un(M_R_PUSH_QUOTE,this.onQuoted,sdk) ;
        }
        window.holdView.myScroll.destroy();
        clearTimeout(window.holdView.timeOut);
    }
});