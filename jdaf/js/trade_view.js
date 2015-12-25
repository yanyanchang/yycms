var TradeView=Backbone.View.extend({
		el : '#trade',
        defInvestVal : 100,     // 默认投资额
        defTimeLimit : 60,      // 默认期限
        symbolList : {},     // 商品列表
        symbol : {},          // 商品
        symbolCode :  '',      // 商品代码
        symbolName : '',       // 商品名称
        contract : {},       // 合约
        contractList : {},  // 合约
        period : 4,   // 数据周期
        invest:100,      // 投资额
        minInvest : 100,       // 投资最大限额
        maxInvest : 5000,      // 投资最大限额
        stepInvest : 100,      // 投资额递增值
        defProfit : 76,      // 默认收益率
        bsCode : '',
        events: {
            'click .holdlist_btn': 'toHoldList',
            'click #up_btn img': 'toUp',
            'click #down_btn img': 'toDown',
            'click #add' : 'addMoeny',
            'click #del' : 'delMoeny'
           // 'longTap li': 'removeTodo'
        },
        toUp:function(){
            window.tradeView.bsCode='b';
            this.showPopu();
        },
        toDown:function(){
            window.tradeView.bsCode='s';
            this.showPopu();
        },
        addMoeny:function(){
            window.tradeView.invest=parseInt(window.tradeView.invest)+parseInt(this.stepInvest);
            if(window.tradeView.invest>this.maxInvest){
                window.tradeView.invest=this.maxInvest;
            }
            $('#money_txt').html(window.tradeView.invest);
        },
        delMoeny:function(){
            window.tradeView.invest=window.tradeView.invest-this.stepInvest;
            if(window.tradeView.invest<this.minInvest){
                window.tradeView.invest=this.minInvest;
            }
            $('#money_txt').html(window.tradeView.invest);
        },
        showPopu:function() {
            if(this.contract==null){
                $.MsgBox.Tip('error','商品未开始交易');
                return;
            }

            var _bsCodeStr='';
            if( this.bsCode=='s'){
                _bsCodeStr='买跌';;
            }
            if( this.bsCode=='b'){
                _bsCodeStr='买涨';;
            }

            var _html="<ul class='trade_message'>";
			var _timeLimit=parseInt(this.contract.period)+this.contract.unit;
			_html+="<li><div>到期时间：<span>"+_timeLimit+"</span></div></li>";
            _html+="<li><div>投资金额：<span>"+this.invest+"</span></div></li>";
            _html+="<li><div>交易品种：<span>"+this.symbol.symbolName+"</span></div></li>";
            _html+="<li><div>收益比率：<span class=\"txt-990000\">"+this.contract.profitRate+"%</span></div></li>";
            _html+="<li><div>委托方向：<span>"+_bsCodeStr+"</span></div></li>";
            _html+="<li><div>最新价格：<span class=\"priceCurrent\">"+this.symbol.priceCurrent.toFixed(+this.symbol.decimal)+"</span></div></li>";
            _html+="<div class=\"clear\"></div>";
            _html+="</ul>";
            $.afui.popup({
                title: "交易确定",
                message: _html,
                cancelText: "取消",
                cancelClass:'popup_cancle',
                doneClass:'popup_done',
                cancelCallback: function () {},
                doneText: "确认",
                doneCallback: function () {
                    window.tradeView.doOrder();
                },
                cancelOnly: false
            });
        },
        toHoldList:function(){
            $.afui.loadContent("#holdlist",false,false,"");
        },
        getContract:function(symbolCode) {
            if(sdk){
                var _contract = sdk.getContract(symbolCode);//合约编号
                if(!_contract){
                    //console.log('no bindContract');
                    return null;
                }
                var arr = new Array();
                for (var i = 0; i < _contract.length; i++) {
                    var _unit = 1;
                    var  _unitStr='';
                    if (_contract[i].periodUnit == 3) {
                        _unit = 3600;
                        _unitStr='h';
                    }
                    if (_contract[i].periodUnit == 2) {
                        _unit = 60;
                        _unitStr='m';
                    }
                    if (_contract[i].periodUnit == 1) {
                        _unit = 1;
                        _unitStr='s';
                    }
                    var _time = _unit * _contract[i].period;
                    var _temp=[_time,_contract[i].profitRate * 100,_contract[i].contractId,_contract[i].amountMax,_contract[i].amountMin,_contract[i].amountStep,_unitStr,_contract[i].period];
                    if(this.checkContract(_time,arr)){
                        //arr[i] = _temp;
                        arr.push(_temp);
                    }
                }

                arr.sort(function(x, y){
                    return x[0]>y[0];
                });
            }
            //console.log(symbolCode);
            this.contractList = arr;
            $('#trade_timelimit').html('');
            if(this.contractList.length>0){
                for (var i = 0; i < this.contractList.length; i++) {
                    $('#trade_timelimit').append("<option contractId='"+this.contractList[i][2]+"' profit='"+this.contractList[i][1]+"' value='"+this.contractList[i][6]+this.contractList[i][7]+"' maxInvest='"+this.contractList[i][3]+"' minInvest='"+this.contractList[i][4]+"' stepInvest='"+this.contractList[i][5]+"' unit='"+this.contractList[i][6]+"' period='"+this.contractList[i][7]+"' >"+this.contractList[i][7]+this.contractList[i][6]+"</option>");
                    if(i==0){
                        this.contract={};
                        this.contract.timeLimit=this.contractList[i][0];
                        this.contract.profitRate=this.contractList[i][1];
                        this.contract.contractID=this.contractList[i][2];
                        this.contract.maxInvest=this.contractList[i][3];
                        this.contract.minInvest=this.contractList[i][4];
                        this.contract.stepInvest=this.contractList[i][5];
                        this.contract.unit=this.contractList[i][6];
                        this.contract.period=this.contractList[i][7];
                    }
                }
            }else{
                this.contract=null;
            }
            return this.contract;
        },
        checkContract:function(key,arr){
            var count=0;
            for(var i=0;i<arr.length;i++){
                if(arr[i][0]==key){
                    count++;
                    if(count==1){
                        return false;
                    }
                }
            }
            return true;
        },
        getSymbols:function(){
            if(sdk){
                var _symbolList=sdk.getSymbols(-1);
                for(var i=_symbolList.length-1;i>-1;i--){
                    if(_symbolList[i].tradeMarketId!=2){
                        _symbolList.remove(i);
                    }
                }
                return _symbolList;
            }
            return null;
        },
        setChart:function(){
            var barCnt = -80;
            var chartUrl = 'chart/chart.html?chartStyle=1&symbolCode='+this.symbolCode+'&period='+this.period+'&barCount='+barCnt+'&theme=white&sid='+Math.random().toString() ;
            $('#frame_02').attr('src',chartUrl);
            //frame_02.window.manUpdate(this.symbolCode,this.period,barCnt);
        },
        doOrder:function(){
            var _postDate={
                symbolCode:window.tradeView.symbolCode,
                contractId:window.tradeView.contract.contractID,
                quantity:window.tradeView.invest,
                bsCode:window.tradeView.bsCode,
                orderPrice:window.tradeView.symbol.priceCurrent,
                timeExpire:window.tradeView.contract.timeLimit
            };

            sdk.binOptionOpen({
                symbolCode:_postDate.symbolCode,
                contractId:_postDate.contractId,
                quantity:_postDate.quantity,
                bsCode:_postDate.bsCode,
                orderPrice:_postDate.orderPrice,
                //timeExpire:_postDate.timeExpire,
                timeExpire:'',
                memo:'',
                onSuccess: function (mods) {
                    if(mods.bizRet=="0"){
                        $.MsgBox.Tip('success','下单成功',function(){
                            sdk.queryAccount({
                                'onSuccess':function(mod){
                                    window.holdView=new HoldView();
                                },
                                onFailure :function(){
                                    //console.log('error');
                                }
                            });
                        })
                    }else{
                        $.MsgBox.Tip('error',mods.message);

                    }
                },
                onFailure: function (mods, message) {
                    if(mods.message !=undefined){
                        $.MsgBox.Tip('error',mods.message);
                    }else{
                        $.MsgBox.Tip('error',message);
                    }
                }
            })
        },
        onQuoted:function(mods){
            var symbolInfo = mods[0] ;
            if (symbolInfo) {
                if(symbolInfo.symbolCode== window.tradeView.symbolCode){
                    window.tradeView.symbol.priceCurrent=symbolInfo.priceCurrent;
                    window.tradeView.render();
                }
            }
        },
        onAccountChange:function(mods){
            var acc_mod = mods[0];
            $('.acc_money_txt').html(acc_mod.amMarginRemain.toFixed(2));
        },
        goodsChange:function(symbolCode,animation){
            window.tradeView.symbolCode=symbolCode;
            window.tradeView.contract=window.tradeView.getContract(window.tradeView.symbolCode);
            $("#trade_type_list div").removeClass('active');
            $("#trade_type_list div[symbolCode="+window.tradeView.symbolCode+"]").addClass('active');
            if(animation){
                var owl = $(".owl-carousel").data('owlCarousel');
                $("#trade_type_list li").each(function(index){
                    if($(this).attr('symbolCode')==window.tradeView.symbolCode){
                        owl.goTo(index);
                    }
                })
            }
            if( window.tradeView.contract){
                $('#trade_profit').html(parseInt(window.tradeView.contract.profitRate) + '%');
                $('#timelimit_txt').text(window.tradeView.contract.period+this.contract.unit);
                window.tradeView.maxInvest=window.tradeView.contract.maxInvest;
                window.tradeView.minInvest=window.tradeView.contract.minInvest;
                window.tradeView.stepInvest=window.tradeView.contract.stepInvest;
                window.tradeView.invest=window.tradeView.contract.minInvest;
            }else{
                window.tradeView.maxInvest=0;
                window.tradeView.minInvest=0;
                window.tradeView.stepInvest=0;
                window.tradeView.invest=0;
                $('#trade_timelimit').html('');
                $('#timelimit_txt').html('-');
                $('#trade_profit').html('0%');
                $('#money_txt').html('0');
            }
            window.tradeView.period=4;
            window.tradeView.render();
        },
		initialize:function(parems){
            this.symbolList  = this.getSymbols();
			if(!parems.symbolCode){
				this.symbol=this.symbolList[0];
				this.symbolCode=this.symbol.symbolCode;
			}else{
				this.symbolCode=parems.symbolCode;
				this.symbol=sdk.getSymbol(this.symbolCode) ;
			}
			//console.log(this.symbolCode);
            //this.getContract(this.symbolCode);
			
            $('#invest_select').change(function(){
                var _invest=$(this).val();
                if(_invest<= window.tradeView.maxInvest && _invest>=window.tradeView.minInvest){
                    window.tradeView.invest=_invest;
                }else{
                    $.MsgBox.Tip('error','商品最大投资金额为'+window.tradeView.maxInvest);
                    window.tradeView.invest=window.tradeView.maxInvest;
                }
                $('#money_txt').html(window.tradeView.invest);
                $('#invest_select').val(0);
            });
            $('#trade_timelimit').change(function(){
                var timeLimit = $(this).val();
                var contracObj=$('#trade_timelimit').find('option[value='+timeLimit+']');
                window.tradeView.contract.contractID=contracObj.attr('contractid');
                window.tradeView.contract.timeLimit=timeLimit;
                window.tradeView.contract.profitRate=contracObj.attr('profit');
                window.tradeView.maxInvest=contracObj.attr('maxInvest');
                window.tradeView.minInvest=contracObj.attr('minInvest');
                window.tradeView.stepInvest=contracObj.attr('stepInvest');
                window.tradeView.invest=window.tradeView.minInvest;
                window.tradeView.contract.unit=contracObj.attr('unit');
                window.tradeView.contract.period=contracObj.attr('period');

                $('#timelimit_txt').html(window.tradeView.contract.period+window.tradeView.contract.unit);
                $('#trade_profit').html(window.tradeView.contract.profitRate+'%');
                $('#money_txt').html( window.tradeView.invest);
            });
            //时间
            $('#k_time_list div').each(function(){
                $(this).unbind('click');
                $(this).bind('click',function(){
					window.tradeView.period=$(this).attr('period');
					$('#k_time_list div').removeClass('active');
                	$("#k_time_list .period"+window.tradeView.period).addClass('active');
                    window.tradeView.render();
                })
            })
            //商品列表
            var _template=_.template($('#symbolListTemplate').html());
            $("#trade_type_list").html(_template({datas:this.symbolList,symbolCode:this.symbolCode}));
            $('#money_txt').html(this.invest);

            var acc_mod  = sdk.getAccount(-1);
            var user_info_mod = sdk.getUserInfo();

            if(user_info_mod.userName!=undefined){
                $('.acc_username_txt').html(user_info_mod.userName);
            }
            if(acc_mod.amWithdrawable!=undefined){
                $('.acc_money_txt').html(acc_mod.amMarginRemain.toFixed(2));
            }
            //console.log(acc_mod);

            var owl=$(".owl-carousel").owlCarousel({
                items : 4,
                itemsCustom : false,
                itemsDesktop : [1199,6],
                itemsDesktopSmall : [320,3],
                itemsTablet: [320,3],
                itemsTabletSmall: false,
                itemsMobile : [480,4],
                singleItem : false,
                itemsScaleUp : false,
                pagination:false
            });

            sdk.on(M_R_PUSH_QUOTE,this.onQuoted,sdk) ;
            sdk.on(PUSH_ACCCHANGE,this.onAccountChange,sdk) ;
        },
        onShow:function(){
            sdk.on(M_R_PUSH_QUOTE,this.onQuoted,sdk) ;
            sdk.on(PUSH_ACCCHANGE,this.onAccountChange,sdk) ;
        },
        render:function() {
            if (sdk) {
                this.symbol=sdk.getSymbol(this.symbolCode) ;
                //图表
                if(typeof( frame_02.window.manUpdate)=='function'){
                    frame_02.window.manUpdate(window.tradeView.symbolCode,window.tradeView.period,-80);
                }else{
                    this.setChart();
                }
                $("#trade_type_list div").removeClass('active');
                $("#trade_type_list div[symbolCode="+window.tradeView.symbolCode+"]").addClass('active');

                //$('#k_time_list div').removeClass('active');
                //$("#k_time_list .period"+window.tradeView.period).addClass('active');


                $('#k_time_list div').removeClass('active');
                $('#trade .period'+this.period).addClass('active');
                $('.priceCurrent').html(this.symbol.priceCurrent);

                $('#money_txt').html(this.invest);

                setTimeout(function(){
                    $('#trade_k_col').css({'height':$(window).width()/2});
                },500);

            }
        },
        destroy:function(){
            if (sdk) {
                //console.log('trade hide') ;
                sdk.un(M_R_PUSH_QUOTE,this.onQuoted) ;
                sdk.un(PUSH_ACCCHANGE,this.onAccountChange) ;
            }
            $('#current_price').html('-');
            $('#cancel').click();
        }
});