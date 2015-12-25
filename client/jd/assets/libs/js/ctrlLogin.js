$('#login_btn').bind('click',function(){
    $('#login_btn').unbind('click');
    $('#login_btn').bind('click',function(){
        var _userID = $('#login_account').val();
        var _passowrd = $('#login_password').val();
		if(_userID.length==0){
			 $.MsgBox.Tip('error','请输入帐号或手机！');
			 $('#login_account').focus();
			 return false;
		}
		if(_passowrd.length==0){
			 $.MsgBox.Tip('error','请输入密码！');
			 $('#login_password').focus();
			 return false;
		}
        _userID=M_DEBUG_UID;
        _passowrd= M_DEBUG_PWD;
        if(sdk){
            sdk.init(encrypt_key,encrypt_iv,'libs/wetbizsdk',function() {
                sdk.loadDataWithSID({
                    uid   : _userID,
                    pwd   : _passowrd,
                    vcode : '',
                    urls  : app_ws_url,
                    onSuccess : function() {
                        $.MsgBox.Tip('success','登录成功');
                        console.log('登录成功') ;
                        location.href="#pageTrade";
                    },
                    onFailure : function(retCode,message) {
                        $.MsgBox.Tip('error','登录失败');
                        console.log('登录失败！[' + retCode + ']' + message) ;
                    }
                });
            });

        }
    })
})