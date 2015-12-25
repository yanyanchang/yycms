/**
 * Created by lmd on 2015/11/26.
 */
var MainView=Backbone.View.extend({
    el: '#main',
    events: {
        'click #addTodo': 'addTodo',
        'longTap li': 'removeTodo',
        'resize body': 'resizePage'
    },
    template:_.template($('#tradeTemplate').html()),
    removeTodo:function(e){
        var item=$(e.target);
        todos.splice(todos.indexOf(item.html()),1);
        $(item).remove();
    },
    initialize:function(){
        this.resizePage();
        this.listenTo(window, 'resize', _.debounce(this.resizePage));
        if(loginStatus == 0){
            new LoginView();
        }
    },
    onShow: function() {
        //获得数据
        var datas;
        if (sdk) {
            var acc_mod  = sdk.getAccount(-1);
            var user_info_mod = sdk.getUserInfo();
            var arrSymbols = sdk.getSymbols(-1);
            datas=arrSymbols;
            if(user_info_mod.userName != undefined){
                $('.acc_username_txt').html(user_info_mod.userName);
            }
            if(acc_mod.amMarginRemain != undefined){
                $('.acc_money_txt').html(acc_mod.amMarginRemain.toFixed(2));
            }

            $('#trade_list_scroll').height($(window).height()-210);

            sdk.on(M_R_PUSH_QUOTE,this.onQuoted,sdk) ;
            sdk.on(PUSH_ACCCHANGE,this.onAccountChange,sdk) ;
        }
	   	for(var i=datas.length-1;i>-1;i--){
			if(datas[i].tradeMarketId!=2){
				datas.remove(i);
			}
		}
        $("#trade_list").html(this.template({datas:datas}));
        $("#holdlist_btn").bind('touchstart', function(){
            $(this).addClass('red-button-hover');
        });
        $("#holdlist_btn").attr('touchend', function(){
            $(this).removeClass('red-button-hover');
        });
    },
    onHide: function() {
        if (sdk) {
            console.log('main hide') ;
            sdk.un(M_R_PUSH_QUOTE,this.onQuoted) ;
            sdk.un(PUSH_ACCCHANGE,this.onAccountChange) ;
        }
    },
    resizePage:function(){
        var _pwidth=($('#main').width()-256)/3;
        $("#tip li").css({'margin-left':_pwidth});
        $("#tip li").eq(0).css({'margin-left':0});
        $('#trade_list_scroll').height($(window).height()-210);
    },
    onQuoted:function(mods){
        var symbolInfo = mods[0] ;
        if (symbolInfo) {
            $("#trade_list .symbol"+symbolInfo.symbolCode+' span').html(symbolInfo.priceCurrent.toFixed(symbolInfo.decimal));
        }
    },
    onAccountChange:function(mods){
        var acc_mod = mods[0];
        $('.acc_money_txt').html(acc_mod.amWithdrawable.toFixed(2));
    }
});
