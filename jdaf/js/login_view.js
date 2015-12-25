/**
 * Created by lmd on 2015/11/26.
 */
var LoginView=Backbone.View.extend({
    el: '#login',
    events: {
        'click #btnlogin_submit':'loginFun'
    },
    loginFun:function(){
        if (sdk) {
            var _uidItem=$("#txtlogin_uid");
            var _uid=_uidItem.val();
            if(_uid.length==0){
                $.MsgBox.Tip('error','登录帐号为空！');
                return ;
            };

            var _pwdItem=$("#txtlogin_pwd");
            var _pwd=_pwdItem.val();
            if(_pwd.length==0){
                $.MsgBox.Tip('error','登录密码为空！');
                return;
            };

            var _dealerId='';
            $.afui.showMask('加载中...');

            sdk.init(encrypt_key,encrypt_iv,'js/wetbizsdk',function() {
                sdk.loginWithUserId({
                    uid   : _uid,
                    pwd   : _pwd,
                    dealerId : _dealerId,
                    vcode : '',
                    urls  : app_ws_url,
                    onSuccess : function() {
                        $.afui.hideMask();
                        $.MsgBox.Tip('success','登录成功',function(){
                            loginStatus = 1;
                            setCookie("login_code",_uid);
                            $('#login_page').hide();
                            window.mainView.onShow();
                        });
                        console.log('登录成功')
                    },
                    onFailure : function(retCode,message) {
                        $.MsgBox.Tip('error','登录失败！[' + retCode + ']' + message,function(){
                            $.afui.hideMask();
                            _pwdItem.val('');
                        });
                        console.log('登录失败！[' + retCode + ']' + message) ;
                    }
                });
            });

        }
    },
    initialize:function(){
        $('#login').show();
        //$('.pages').removeClass('bg-E7E7E7').addClass('bg-2E3E4F');
        $('#txtlogin_uid').css({'padding-left':45 });
        $('#txtlogin_pwd').css({'padding-left':45 });
        var _loginCode=getCookie("login_code");
        if(_loginCode!='' || _loginCode != undefined){
            $('#txtlogin_uid').val(_loginCode);
        }
        sdk.on(PUSH_SAMEUSER_LOGIN,function(){
            $.MsgBox.Tip('error','用户在异地登录!',function(){
                loginStatus = 0;
                location.reload();
            });
        },sdk);
    }
});
