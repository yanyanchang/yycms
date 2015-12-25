/**
 * Created by yyc on 2015/11/3.
 */
Mobilebone.captureLink = false;
Mobilebone.captureForm = false;
Mobilebone.evalScript  = true;
Mobilebone.init();
Mobilebone.callback = function(pagein,pageout,option) {
    eval(option.id+'Fun();');
};
//初始化变量
var debug=1;//是否调试

var symbolCode;
var _serialcode,_serialcode_institutions;
app_url=app_url.replace('/index.php','');

function pageJgQRCodeFun(){
    var _data={};
    $.get(assets_path+"page/JgQRCode2.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        jqqrcode();

        //var myScroll = new IScroll('#pageJgQRCode', { mouseWheel: true });
    });
}
function pageUnbindwxFun(){
    var _data={
        'wx_nickname':wx_nickname,
        'wx_headimgurl':wx_headimgurl,
        'serialcode':serialcode
    }
    $.get(assets_path+"page/Unbind.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        Unbindwx();
        var myScroll = new IScroll('#pageUnbindwx', { mouseWheel: true });
        alert(1);
    });
}

//初始化函数
function loaded(){
    setTimeout("$('.loading-box').fadeOut(500,function(){$('.loading-box').remove();});",500);
    var _hash=location.hash;
    var pageName='';
    if(_hash!=''){
        pageName=_hash.replace('#&','').replace('#','');
        eval(pageName+'Fun();');
    }
    //微信配置
    getWXJSSDK();
    FastClick.attach(document.body);
}
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
            'scanQRCode',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
        ]
    });
    wx.ready(function(){
    });
};

function reSize(){
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
//加载机构
function getSerialCode(){
    $.ajax({
        url:api_path+"/server/getSerialCode",
        data:{'action':'getserial','serialcode':_serialcode},
        type:"POST",
        beforeSend:function(){},
        success:function(data){
            data = eval("(" + data + ")");
            console.log(data)
            if(data.retCode==0){
                if(_serialcode==''){
                    $page.find('input[name=serialcode]').val(data.serialcode);
                }
                $page.find('input[name=serialcode_name]').val(data.orgName);
                $page.find('input[name=serialcode_institutions]').val(data.dealerName);
                _serialcode=data.serialcode;
            }else{
                $page.find('input[name=serialcode_name]').val('');
                $page.find('input[name=serialcode_institutions]').val('');
            }
        }
    });
}

//页面函数
function jqqrcode(){
    $page=$('.in');
    if(serialcode==''){
        var _data={
            'wx_nickname':wx_nickname,
            'wx_headimgurl':wx_headimgurl
        }
        $.get(assets_path+"page/Bind.html", function(result){
            var _html=bindTemplate(result,_data);
            $('#pageBind').html(_html);
            bindwx();
            var myScroll = new IScroll('#pageBind', { mouseWheel: true });
            $.MsgBox.Tip('error','请先把微信绑定到相应的推荐机构');
        });
    }else{
        $('#pageBind').remove();
        $page.find('.qrcode').attr('src',app_url+"/Institutions/logoqrcode?g="+group_name+"&key="+serialcode+"&data="+app_url+"/register/"+group_name+"/sc/"+serialcode);
        wx.onMenuShareTimeline({
            title: app_name, // 分享标题
            desc:app_name+ '，1分钟线上开户，便捷，安全，收益高.', // 分享描述
            link: app_url+"/register/"+group_name+"?sc="+serialcode, // 分享链接
            imgUrl: assets_path+'/images/qrlogo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareAppMessage({
            title: app_name, // 分享标题
            desc:app_name+ '，1分钟线上开户，便捷，安全，收益高.', // 分享描述
            link: app_url+"/register/"+group_name+"?sc="+serialcode, // 分享链接
            imgUrl: assets_path+'/images/qrlogo.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        $.ajax({
            url:api_path+"/server/getSerialCode",
            data:{'action':'getserial','serialcode':serialcode},
            type:"POST",
            beforeSend:function(){},
            success:function(data){
                data = eval("(" + data + ")");
                if(data.retCode==0){
                    $page.find('.serialname').html(data.dealerName);
                }else{
                    $page.find('.serialname').hide();
                }
            }
        });

    }
}

function bindwx(){
    $page=$('#pageBind');
    $page.find('input[name=serialcode]').unbind('keyup');
    $page.find('input[name=serialcode]').bind('keyup',function(){
        _serialcode=$page.find('input[name=serialcode]').val();
        getSerialCode();
        var _serialName=$page.find('input[name=serialcode_name]').val();
    })
    $page.find('input[name=serialcode]').bind('input propertychange',function(){
        _serialcode=$page.find('input[name=serialcode]').val();
        getSerialCode();
        var _serialName=$page.find('input[name=serialcode_name]').val();
    })
    $page.find('.bind_btn').unbind('click');
    $page.find('.bind_btn').bind('click',function(){
        var _scode=$page.find('input[name=serialcode]').val();
        var _sname=$page.find('input[name=serialcode_institutions]').val();
        var _password=$page.find('input[name=serialpassword]').val();
        if(_scode==""){
            $.MsgBox.Tip('error','请输入机构号！');
            return;
        }
        if(_sname==""){
            $.MsgBox.Tip('error','该机构不存在！');
            return;
        }
        if(_password==""){
            $.MsgBox.Tip('error','请输入密码！');
            return;
        }
        var post_data={
            'action':'bindwx',
            'openSourceId':wx_appid,
            'openId':wx_openid,
            'unionId':wx_unionid,
            'scode':_scode,
            'pwd':_password
        }
        //alert(JSON.stringify(post_data));
        //console.log(post_data);
        $page.find('.bind_btn').attr('disabled','true');
        $.ajax({
            url:api_path+"/Server/bindwx",
            data:post_data,
            type:"POST",
            beforeSend:function(){

            },
            success:function(data){
                data = eval("(" + data + ")");
                if(data.retCode=="0"){
                    $.MsgBox.Tip('success',data.retText,function(){
                        location.reload();
                    });

                }else{
                    //alert(JSON.stringify(data));
                    $.MsgBox.Tip('error',data.retText);
                }
                console.log(data);

            },
            complete:function(data){
                $page.find('.bind_btn').removeAttr('disabled');
            }
        });


    });

}

function Unbindwx(){
    $page=$('.in');
    //alert(serialcode);
    if(serialcode==''){
        var _data={
            'wx_nickname':wx_nickname,
            'wx_headimgurl':wx_headimgurl
        }
        $.get(assets_path+"page/Bind.html", function(result){
            var _html=bindTemplate(result,_data);
            $('#pageBind').html(_html);
            bindwx();
            var myScroll = new IScroll('#pageBind', { mouseWheel: true });
            $.MsgBox.Tip('error','请先把微信绑定到相应的推荐机构');
        });
    }else{
        $('#pageBind').remove();
        $.ajax({
            url:api_path+"/server/unbindwx",
            data:{'action':'getserial','serialcode':serialcode},
            type:"POST",
            beforeSend:function(){},
            success:function(data){
                data = eval("(" + data + ")");
                console.log(data)
                if(data.retCode==0){
                    $page.find('input[name=serialcode]').val(data.serialcode);
                    $page.find('input[name=serialcode_institutions]').val(data.dealerName);
                }
            }
        });
        $page.find('.unbind_btn').unbind('click');
        $page.find('.unbind_btn').bind('click',function(){
            var _password=$page.find('input[name=serialpassword]').val();
            if(_password==""){
                $.MsgBox.Tip('error','请输入机构密码！');
                return;
            }
            $.MsgBox.Confirm('提示','确定要解除绑定吗？',function(){
                $.ajax({
                    url:api_path+"/server/unbindwx",
                    data:{'action':'unbindwx','unionId':wx_unionid},
                    type:"POST",
                    beforeSend:function(){},
                    success:function(data){
                        data = eval("(" + data + ")");
                        if(data.retCode=="0"){
                            $.MsgBox.Tip('success',data.retText,function(){
                                window.location.href=app_url+"/jg2.php";
                            });
                        }else{
                            $.MsgBox.Tip('error',data.retText);
                        }
                        console.log(data);
                    }
                });
            });
        });
    }
}

wx.ready(function () {

    // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
    wx.checkJsApi({
        jsApiList: [
            'onMenuShareAppMessage',
            'onMenuShareTimeline'
        ],
        success: function (res) {
            //alert(JSON.stringify(res));
        }
    });


    wx.onMenuShareTimeline({
        title: app_name, // 分享标题
        desc: app_name+'，1分钟线上开户，便捷，安全，收益高.', // 分享描述
        link: app_url+"/register/"+group_name+"?sc="+serialcode, // 分享链接
        imgUrl: assets_path+'/images/qrlogo.png', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title:app_name, // 分享标题
        desc: app_name+'，1分钟线上开户，便捷，安全，收益高.', // 分享描述
        link: app_url+"/register/"+group_name+"?sc="+serialcode, // 分享链接
        imgUrl: assets_path+'/images/qrlogo.png', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
})






