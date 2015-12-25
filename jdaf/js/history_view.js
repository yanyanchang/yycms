/**
 * Created by lmd on 2015/11/26.
 */
var HistoryView = Backbone.View.extend({
    el : '#history',
    accInfo:null,
    startTime:'',
    endTime:'',
    day:0,
    myScroll:null,
    events: {
        'resize body': 'resizePage',
        'click #more_history_btn':'more'
    },
    initialize: function() {
        this.resizePage();
        this.listenTo(window, 'resize', _.debounce(this.resizePage));
        if(browser.versions.android){
            $('#history_list_wrapper').css({'overflow':'scroll', '-webkit-overflow-scrolling' : 'touch'});
        }
        this.todayLog();
    },
    todayLog:function(){
        $('#history_header > li > a').eq(2).addClass('active');
        var _acc=sdk.getAccount(-1);
        var _historyData={
            'action':'history',
            'acc_id':_acc.accId,
            'startDate':'',
            'endDate':''
        };
        $.ajax({
            url:"api.php",
            data:_historyData,
            type:"POST",
            beforeSend:function(){
                $.afui.showMask('加载中...');
            },
            success:function(mods)
            {
                $.afui.hideMask();
                _historylog = eval('(' + mods + ')');

                var _todayProfit = 0;
                var _todayCount = 0;
                for(var i=0;i<_historylog.length;i++){
                    if(_historylog[i].closedQuantity>0){
                        _todayCount++;
                        _todayProfit+=parseFloat(_historylog[i].profitClose);
                    }

                    _historylog[i].orderQuantity=parseFloat(_historylog[i].orderQuantity).toFixed(2);
                    _historylog[i].profitClose=parseFloat(_historylog[i].profitClose).toFixed(2);
                    _historylog[i].holdPrice=parseFloat(_historylog[i].holdPrice).toFixed(2);
                    _historylog[i].closedQuantity=parseFloat(_historylog[i].closedQuantity).toFixed(2);

                    if(_historylog[i].profitClose>0){
                        _historylog[i].profitHtml="<span class=\"red\">"+ parseFloat(_historylog[i].profitClose).toFixed(2)+"</span>";
                    }
                    if(_historylog[i].profitClose<0){
                        _historylog[i].profitHtml="<span class=\"green\">"+ parseFloat(_historylog[i].profitClose).toFixed(2)+"</span>";
                    }
                    if(_historylog[i].profitClose==0){
                        _historylog[i].profitHtml="<span class=\"black\">"+ parseFloat(_historylog[i].profitClose).toFixed(2)+"</span>";
                    }
                    _historylog[i].orderDirect = 'css/image/' + ((_historylog[i].bsCode==='b') ?  'picbuyup.png':'picbuydown.png') ;

                }
                var _template=_.template($('#historyListTemplate').html());
                $("#history_list").html(_template({datas:_historylog}));
                $('#more_history_btn').remove();
                $("#history_list").append('<div id=\"more_history_btn\" onclick="window.historyView.more()">查看最近7天历史</div>');
                $('#history').find('.acc_orderporfit').html( _todayProfit.toFixed(2));
                $('#history').find('.acc_ordernum').html(_todayCount);
                if(!browser.versions.android){
                    if(window.historyView.myScroll){
                        window.historyView.myScroll.refresh();
                    }else{
                        window.historyView.myScroll = new IScroll('#history_list_wrapper', {
                            //disableMouse: true,
                            //disablePointer: true
                            //momentum: false,
                            //fadeScrollbars:false
                            //bounce:false
                            //preventDefault:false
                        });
                    }
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.MsgBox.Tip('error','查询超时！');
            }
        })
    },
    historyLog:function(){
        var _acc=sdk.getAccount(-1);
        var _historyData={
            'action':'history',
            'acc_id':_acc.accId,
            'startDate':window.historyView.startTime,
            'endDate':window.historyView.endTime
        };
        $.ajax({
            url:"api.php",
            data:_historyData,
            type:"POST",
            beforeSend:function(){
                $.afui.showMask('加载中...');
            },
            success:function(mods)
            {
                $.afui.hideMask();
                _historylog = eval('(' + mods + ')');

                var _todayProfit = 0;
                var _todayCount = 0;
                for(var i=0;i<_historylog.length;i++){
                    if(_historylog[i].closedQuantity>0){
                        _todayCount++;
                        _todayProfit+=parseFloat(_historylog[i].profitClose);
                    }

                    _historylog[i].orderQuantity=parseFloat(_historylog[i].orderQuantity).toFixed(2);
                    _historylog[i].profitClose=parseFloat(_historylog[i].profitClose).toFixed(2);
                    _historylog[i].holdPrice=parseFloat(_historylog[i].holdPrice).toFixed(2);
                    _historylog[i].closedQuantity=parseFloat(_historylog[i].closedQuantity).toFixed(2);

                    if(_historylog[i].profitClose>0){
                        _historylog[i].profitHtml="<span class=\"red\">"+ parseFloat(_historylog[i].profitClose).toFixed(2)+"</span>";
                    }
                    if(_historylog[i].profitClose<0){
                        _historylog[i].profitHtml="<span class=\"green\">"+ parseFloat(_historylog[i].profitClose).toFixed(2)+"</span>";
                    }
                    if(_historylog[i].profitClose==0){
                        _historylog[i].profitHtml="<span class=\"black\">"+ parseFloat(_historylog[i].profitClose).toFixed(2)+"</span>";
                    }
                    _historylog[i].orderDirect = 'css/image/' + ((_historylog[i].bsCode==='b') ?  'picbuyup.png':'picbuydown.png') ;

                }
                var _template=_.template($('#historyListTemplate').html());
                $('#more_history_btn').remove();
                $("#history_list").append(_template({datas:_historylog}));
                //$("#history_list").append('<div id=\"more_history_btn\" onclick="window.historyView.more()" >查看更多历史</div>');
                if(!browser.versions.android){
                    window.historyView.myScroll.refresh();
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                $.MsgBox.Tip('error','查询超时！');
            }
        })
    },
    render: function() {

        if(sdk){
            sdk.queryAccount({
                'onSuccess':function(mod){
                    window.historyView.accInfo=mod[0];
                    console.log(  window.historyView.accInfo);
                    $('#history').find('.acc_money_txt').html( window.historyView.accInfo.amMarginRemain.toFixed(2));
                },
                onFailure :function(){
                }
            });
        }
    },
    resizePage:function(){
        var menuWidth=($(window).width()-20)/3;
        $('#history_header li').width(menuWidth);

        $('#history .info_col').width($(window).width()-20);
        $('#history .info_col li').width(($(window).width()-20)/3);
        $('#history_list_wrapper').height($(window).height()-$('#history_header').height()-$('#info_col').height()-110);

    },
    more:function(){
        window.historyView.endTime=this.getDateStr(-1);
		window.historyView.startTime=this.getDateStr(-7);
        this.historyLog();
    },
    getDateStr:function(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        return dd.format('yyyy-MM-dd');
    }
});
