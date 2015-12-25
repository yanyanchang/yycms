Mobilebone.captureLink = false;
Mobilebone.captureForm = false;
Mobilebone.init();
Mobilebone.callback = function(pagein,pageout,option) {
    //滚动
    if(option.id!='pageXy'){
        //myScroll = new IScroll('#'+option.id, { mouseWheel: true });
    }

    $('#'+option.id).trigger("init");
    // NOT: var element = document.querySelector("#ID");
    //var element = pagein.querySelector("#ID");
    // do sth by using elememt...
};
//初始化变量
var images = {
    localId: [],
    serverId: [],
    imgMap: []
};
var NowPage='pageXy';
var loginCode="";
//是否调试
var debug=1;
var myScroll;
//初始化函数
function loaded(){
    setTimeout("$('.loading-box').fadeOut(500,function(){$('.loading-box').remove();});",500);
    var _hash=location.hash;
    var pageName='';
    if(_hash!=''){
        pageName=_hash.replace('#&','');
        $('#'+pageName).trigger("init");
    }
    if(pageName !='pageXy') {
        //myScroll = new IScroll('#' + pageName, {mouseWheel: true});
    }
    //微信配置
    getWXJSSDK();
    FastClick.attach(document.body);
}
window.addEventListener("DOMContentLoaded",loaded,false);

$("#pageXy").bind("init",function(){
    $("title").html("在线开户");
    var $page=$(this);
    $page.find('.step0').show();
    $page.find('.step1').hide();
    $page.css({'overflow':'scroll','overflow-x':'hidden'});
    $page.find('.signin_btn0').unbind('click');
    $page.find('.signin_btn0').bind('click',function(){
        if($page.find('input[name=isread0]').is(':checked')){
            $page.find('.step0').hide();
            $page.find('.step1').show();

            $('#xieyi').width($('.message-body').eq(1).width()-40);
            $('#xieyi').height($(window).height()/2);
            $('#xieyi').css({'margin-top':$('.Xy-logo').eq(1).height()+75});
            myScroll = new IScroll('#xieyi', {mouseWheel: true});

        }else{
            $.MsgBox.Tip('error',"请认真阅读并完全理解并同意！");
        }
    });
    $page.find('.signin_btn1').unbind('click');
    $page.find('.signin_btn1').bind('click',function(){
        if($page.find('input[name=isread1]').is(':checked')){
            location.href="#pageSignin";
        }else{
            $.MsgBox.Tip('error',"请认真阅读并完全理解并同意！");
        }
    });
    $('#fengxian').width($('.message-body').eq(0).width()-40);
    $('#fengxian').height($(window).height()/2);
    $('#fengxian').css({'margin-top':$('.Xy-logo').eq(0).height()+75});
    myScroll = new IScroll('#fengxian', {mouseWheel: true});

});
$("#pageSignin").bind("init",function(){
    $('#signinForm').attr('action',api_path+'/Server/register2');
    $("title").html("在线开户");
    var $page=$(this);
    $page.find('.step1').show();
    $page.find('.step2').hide();
    $page.find('.step3').hide();
    $page.find('.step4').hide();
    if($(window).width()<285){
        $page.find('input[type=text]').css({'width':'55%'});
    }
    $page.css({'overflow':'scroll','overflow-x':'hidden'});

    //$page.find('input[type=text]').val('');
    $page.find('.vcode-send').unbind('click');
    $page.find('.vcode-send').bind('click',function(){
        send_verfiy_sms();
    });

    var post_data;
    var _serialcode;
    _serialcode=$page.find('input[name=serialcode]').val();
    var _username,_idcard,_phone,_vcode,_password,_repassword;

    getSerialCode();

    $('#signin_btn1').unbind('click');
    $('#signin_btn1').bind('click',function(){
        _username = $page.find('input[name=username]').val();
        _idcard = $page.find('input[name=idcard]').val();
        _phone = $page.find('input[name=phone]').val();
        _vcode = $page.find('input[name=vcode]').val();
        if(_username.length==0){
            $.MsgBox.Tip('error',"请输入姓名！");
            return false;
        }
        var _usernameLength=getRealLen(_username);
        if(!checkName(_username) || _usernameLength<4 || _usernameLength >12){
            $.MsgBox.Tip('error',"请输入合法姓名！");
            return false;
        }
        if(_idcard.length==0){
            $.MsgBox.Tip('error',"请输入身份证号！");
            return false;
        }
        if(_phone.length==0){
            $.MsgBox.Tip('error',"请输入手机号！");
            return false;
        }
        if(_vcode.length==0){
            $.MsgBox.Tip('error',"请输入验证码！");
            return false;
        }
        if (!checkMobile(_phone) ||  _phone.length!=11) {
            $.MsgBox.Tip('error',"请输入合法手机号码！");
            return false;
        }
        $('#signin_btn1').attr('disabled','true');
        //表单验证
        var verfiy_data={
            'action':'verfiy',
            'serialcode':_serialcode,
            'username':_username,
            'phone':_phone,
            'idcard':_idcard,
            'vcode':_vcode,
            'password':_password
        }
        $.ajax({
            url:api_path+'/Server/verfiy',
            data:verfiy_data,
            type:"POST",
            beforeSend:function(){},
            success:function(data){
                if(data==""){
                    $page.find('.step1').hide();
                    $page.find('.step2').show();
                }else{
                    data = eval("(" + data + ")");
                    $.MsgBox.Tip('error',data.retText);
                }
                console.log(data);
            },
            complete:function(){
                $('#signin_btn1').removeAttr('disabled');
            }
        });
    });

    $('#signin_btn2').unbind('click');
    $('#signin_btn2').bind('click',function(){

        var arrImgs=Array();
        for ( var imgKey in images.imgMap ) {
            arrImgs.push(images.imgMap[imgKey]) ;
        }
        var i = 0,cnt = arrImgs.length ;
        if (cnt == 0) {
            $.MsgBox.Tip('error','请先选择照片或直接拍照');
            return;
        }
        $page.find('.step2').hide();
        $page.find('.step3').show();
        /*
         if(isWeiXin()){
         uploadPhoto(function(){
         $page.find('.step2').hide();
         $page.find('.step3').show();
         });
         }else{
         $page.find('.step2').hide();
         $page.find('.step3').show();
         }
         */
    })

    $('#signin_btn3').unbind('click');
    $('#signin_btn3').bind('click',function(){
        _password=$page.find('input[name=password]').val();
        _repassword=$page.find('input[name=repassword]').val();

        if(_password.length==0 || _password.length<6 || !checkPassword(_password)){
            $.MsgBox.Tip('error',"请输入密码,最小6位数字、英文字母！");
            return false;
        }
        if(_repassword.length==0 ){
            $.MsgBox.Tip('error',"请输入密码确认！");
            return false;
        }
        if(_repassword!=_password){
            $.MsgBox.Tip('error',"请密码确认不正确！");
            return false;
        }
        $('#signin_btn3').attr('disabled','true');
        post_data={
            'action':'register',
            'serialcode':_serialcode,
            'username':_username,
            'phone':_phone,
            'idcard':_idcard,
            'vcode':_vcode,
            'password':_password,
            'image1':$('input[name=image1]').val(),
            'image2':$('input[name=image2]').val(),
            'image3':$('input[name=image3]').val(),
        }


        if(isWeiXin()){
            $.ajax({
                url:api_path+'/Server/register2',
                data:post_data,
                type:"POST",
                beforeSend:function(){
                    $.MsgBox.Loading('提示',"提交中");
                },
                success:function(data){
                    data = eval("(" + data + ")");
                    console.log(data);
                    if(data.retCode==0){
                        $.MsgBox.Clean();
                        $page.find('.logincode').html(data.loginCode);

                        $('#go_to_wp').bind('click',function(){
                            location.href=api_path+"?g="+group_name+"&m=Wp&code="+data.loginCode;
                        })

                        $page.find('.step3').hide();
                        $page.find('.step4').show();
                    }else{
                        $.MsgBox.Clean();
                        $('#signin_btn3').removeAttr('disabled');
                        $.MsgBox.Tip('error',data.retText);
                    }
                },
                complete: function(){
                    $.MsgBox.Clean();
                    $('#signin_btn3').removeAttr('disabled');
                }
            });
        }else{
            $.MsgBox.Loading('提示',"提交中");
            $('#signinForm').submit();
        }

    })

    $('#signin_btn4').unbind('click');
    $('#signin_btn4').bind('click',function(){
        location.href='#pageLogin';
    })

    if(isWeiXin()){
        $page.find('input[type=file]').remove();
        $('#photo_upload_1').unbind('click');
        $('#photo_upload_1').bind('click',function(){
            takePhoto('1',function(res,images){
                uploadPhoto(res.localIds[0],function(serverId){
                    $('#photo_upload_1').find('i').removeClass('fa-camera').addClass('fa-check-square-o');
                    $('input[name=image1]').val(serverId);

                })
            }) ;
        })
        $('#photo_upload_2').unbind('click');
        $('#photo_upload_2').bind('click',function(){
            takePhoto('2',function(res,images){
                uploadPhoto(res.localIds[0],function(serverId){
                    $('#photo_upload_2').find('i').removeClass('fa-camera').addClass('fa-check-square-o');
                    $('input[name=image2]').val(serverId);
                })
            }) ;
        })
        $('#photo_upload_3').unbind('click');
        $('#photo_upload_3').bind('click',function(){
            takePhoto('3',function(res,images){
                uploadPhoto(res.localIds[0],function(serverId){
                    $('#photo_upload_3').find('i').removeClass('fa-camera').addClass('fa-check-square-o');
                    $('input[name=image3]').val(serverId);
                })
            }) ;
        })
    }else{
        $page.find('input[type=file]').each(function(){
            $(this).unbind('change');
            $(this).bind('change',function(){
                images.imgMap.push($(this).val()) ;
                $(this).parent().find('i').removeClass('fa-camera').addClass('fa-check-square-o');
            });
        });

        $('#signinForm').append("<input type=\"\hidden\" name=\"action\" value=\"register\"/>");
        var options = {
            success: function(data) {
                data = eval("(" + data + ")");
                console.log(data);
                if(data.retCode==0){
                    loginCode=data.loginCode;
                    if($('#ios_back_to_login').length>0){
                        $('#ios_back_to_login').attr('href','js-call://backToApp/'+loginCode);
                    }
                    $page.find('.logincode').html(loginCode);
                    $('#go_to_wp').bind('click',function(){
                        location.href=api_path+'?g='+group_name+'&m=Wp&code='+loginCode;
                    })
                    $page.find('.step3').hide();
                    $page.find('.step4').show();
                }else{
                    $.MsgBox.Tip('error',data.retText);
                }
                $.MsgBox.Clean();
                $('#signin_btn3').removeAttr('disabled');
            }
        };
        $('#signinForm').ajaxForm(options);

    }

    $page.find('input[name=serialcode]').unbind('keyup');
    $page.find('input[name=serialcode]').bind('keyup',function(){
        _serialcode=$page.find('input[name=serialcode]').val();
        getSerialCode();
    })

    $page.find('input[name=serialcode]').bind('input propertychange', function() {
        _serialcode=$page.find('input[name=serialcode]').val();
        getSerialCode();
    });


    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(!isAndroid){
        $('#android_download').remove();
    }
    if(!isiOS){
        $('#apple_download').remove();
    }

    //加载机构
    function getSerialCode(){
        $.ajax({
            url:api_path+'/Server/getSerialCode',
            data:{'serialcode':_serialcode},
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
                    //$.MsgBox.Tip('error',data.retText);
                }
            }
        });
    }
    function checkMobile(str) {
        var re = /^1\d{10}$/
        if (re.test(str)) {
            return true ;
        } else {
            return false;
        }
    }

    function checkName(str) {
        if (/^[\u4e00-\u9fa5]+$/.test(str)) {
            return true ;
        }
        else{
            return false ;
        }
    }
    function checkPassword(str){
        if(str.length!=0){
            reg=/^[a-zA-Z0-9_]+$/;
            if(!reg.test(str)){
                return false;
            }
        }
        return true;
    }
    function getRealLen(str) {
        return str.replace(/[^\x00-\xff]/g, '__').length; //这个把所有双字节的都给匹配进去了
    }


    function send_verfiy_sms(){
        var $obj=$('.vcode-send');
        var SMS = {
            node:null,
            count:180,
            start:function(){
                //console.log(this.count);
                if(this.count > 0){
                    this.node.html(this.count--);
                    var _this = this;
                    setTimeout(function(){
                        _this.start();
                    },1000);
                }else{
                    this.node.attr("send",0);
                    this.node.html('重发');
                    this.count = 180;
                }
            },
            //初始化
            init:function(node){
                this.node = node;
                this.node.attr("send",1);
                this.start();
            }
        };
        if($obj.attr('send')=='1'){
            return ;
        }
        //验证
        var mobile = $('#pageSignin').find('input[name=phone]').val() ;

        if (checkMobile(mobile) &&  mobile.length==11) {
            $.ajax({
                url:api_path+'/Server/sendVerfiy',
                data:{'action':'sendverfiy','phone':mobile},
                type:"POST",
                beforeSend:function(){},
                success:function(data){
                    data = eval("(" + data + ")");
                    console.log(data);
                    $.MsgBox.Tip('success',"验证码已经发出");
                    SMS.init($obj);
                }
            });
        }else{
            $.MsgBox.Tip('error',"请输入合法手机号码");
            return false;
        }
    }
});

function adjScreen(){
    var w = 640 ;
    var width  = $(window).width();

    var radio   = width/w;
    var newMeta = '' ;

    newMeta += 'width=' + width.toString() + ',';

    newMeta += 'initial-scale=' + radio.toFixed(3) + ',';
    newMeta += 'minimum-scale=' + radio.toFixed(3) + ',';
    newMeta += 'maximum-scale=' + radio.toFixed(3) + '';

    var meta = document.getElementsByTagName('meta')[2] ;
    $('meta[name="viewport"]').attr('content', newMeta);

};

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

            if (typeof callBack === 'function') {
                callBack(res,images) ;
            }
        }
    });
};

//上传照片
function uploadPhoto(localId,callBack){
    wx.uploadImage({
        localId : localId,
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success : function (res) {
            if (typeof callBack==='function') {
                callBack(res.serverId) ;
            }
        },
        fail : function (res) {
            console.log(res);
            $.MsgBox.Tip('error','网络繁忙，请稍后再上传！');
        }
    }) ;
}
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
var appPhotoIndex=0;
function appUploadPhoto(index){
    appPhotoIndex=index;
    var _html="";
    _html+='<div style="line-height:2em; border-bottom:1px solid #CCC"><a href=\"js-call://camera/cameraCallback\" style="color:#498DDE">拍照</a></div>';
    _html+='<div style="line-height:2em"><a href=\"js-call://album/albumCallback\" style="color:#498DDE">相册</a></div>';
    $.MsgBox.Photo('图片上传',_html,function(){});
    $('.buttondiv').remove();
}
function cameraCallback(imageData){
    $("input[name=appUploadPhoto"+appPhotoIndex+"]").val(imageData);
    $('#photo_upload_'+appPhotoIndex).find('i').removeClass('fa-camera').addClass('fa-check-square-o');
    $.MsgBox.Clean();

}
function photolibraryCallback(imageData){
    $("input[name=appUploadPhoto"+appPhotoIndex+"]").val(imageData);
    $('#photo_upload_'+appPhotoIndex).find('i').removeClass('fa-camera').addClass('fa-check-square-o');
    $.MsgBox.Clean();
}
function albumCallback(imageData){
    $("input[name=appUploadPhoto"+appPhotoIndex+"]").val(imageData);
    $('#photo_upload_'+appPhotoIndex).find('i').removeClass('fa-camera').addClass('fa-check-square-o');
    $.MsgBox.Clean();
}
function iosBack(){
    var _nowPage=$('.in').attr('id');
    if(_nowPage!='pageWelcome'){
        history.back(-1);
        return "1";
    }else{
        return "0";
    }
}
