var loginStatus = 0;
_.extend(window, Backbone.Events);
window.onresize = function() { window.trigger('resize') };

(function(){
    "use strict";
	//location.hash='#login';
	$.afui.useOSThemes=false;
	$.afui.loadDefaultHash=false;
	$.afui.autoLaunch=true;
    $.afui.setBackButtonText("");
    $.afui.setBackButtonVisibility(false);
    //$.afui.manageHistory=false;
	if($.os.ios)
	$.afui.animateHeader(false);
    $.afui.registerDataDirective("[date-foo]",function(e){
        var _key=$(e).attr('date-foo');
        if(_key=='guide'){
            window.mainView.onHide();
        }
        if(_key=='rules'){
            window.mainView.onHide();
        }
        if(_key=='contract'){
            window.mainView.onHide();
        }
        if(_key=='active'){
            window.mainView.onHide();
        }
    })
    $.afui.ready(function(){
		Backbone.history.start();
		var AppRouter = Backbone.Router.extend({
			routes:{
			   "login" : "login",
			   "main"  : "main", 
			   "guide" : "guide",
			   "rules" : "rules",
			   "contract" : "contract",
			   "active" : "active",
			   "trade": "trade",
               "holdlist": "holdlist",
                "history":"history",
                "password":"password",
                "account":"account"
			   //"*actions":"defaultRoute"
			},
            destroy:function(){
                if(window.holdView){
                    window.holdView.destroy();
                }
                if(window.tradeView){
                    window.tradeView.destroy();
                }
                if(window.mainView){
                    window.mainView.onHide();
                }
            },
			main:function(){
                this.destroy();
				if(!window.mainView ){
                    window.mainView=new MainView();
				}
                window.mainView.onShow();
				console.log('main');
                FastClick.attach(document.body);
			},
            holdlist:function(){
                this.destroy();
                if(!window.holdView){
                    window.holdView=new HoldView();
                }
                window.holdView.onShow();
                window.holdView.render();
                FastClick.attach(document.body);
            },
			trade:function(symbolCode){
                this.destroy();
                var symbolCode=window.symbolCode;
                setTimeout(function(){
                    if($('#trade').html()==''){
                        $.afui.showMask('加载中...');
                        $.get('page/trade.html', function(result){
                           $('#trade').html(result);
                            window.tradeView=new TradeView({symbolCode:symbolCode});
                            //window.tradeView.symbolCode=symbolCode;
                            window.tradeView.render();
                            window.tradeView.goodsChange(symbolCode,true);
                            $.afui.hideMask();
                        });

                    }else{
                        if(symbolCode){
                            window.tradeView.symbolCode=symbolCode;
                            window.tradeView.goodsChange(symbolCode,true);
                        }
                        window.tradeView.render();
                    }
                },500);
                FastClick.attach(document.body);
			},
            history:function(){
                this.destroy();
                if(!window.historyView){
                    window.historyView=new HistoryView();
                }
                window.historyView.day=0;
                window.historyView.todayLog();
                FastClick.attach(document.body);
            },
            password:function(){
                if($('#password').html()==''){
                    $.afui.showMask('加载中...');
                    $.get('page/password.html', function(result){
                        $.afui.hideMask();
                        $('#password').html(result);
                        window.passwordView=new PasswordView();
                        window.passwordView.render();

                    });
                }else{
                    window.passwordView.render();
                }
                FastClick.attach(document.body);
            },
            account:function(){
                if($('#account').html()==''){
                    $.afui.showMask('加载中...');
                    $.get('page/account.html', function(result){
                        $.afui.hideMask();
                        $('#account').html(result);
                        window.accountView=new AccountView();
                        window.accountView.render();
                    });
                }else{
                    window.accountView.render();
                }
                FastClick.attach(document.body);
            },
			defaultRoute:function(actions){

			}

        });
        //菜单
        $('#menu_list li').each(function(){
            $(this).click(function(){
                $.afui.loadContent('#'+$(this).attr('page'),false,false,'fade');
                $('#menu_list li').removeClass('active');
                $(this).addClass('active');
            });
        });

        var app_router = new AppRouter;
		window.mainView=new MainView();
        FastClick.attach(document.body);

    });
})(jQuery);




