var PasswordView = Backbone.View.extend({
    el : '#password',
    events: {},
    initialize: function() {
		$('#password_submit_btn').bind('click',function(){
			window.passwordView.passwordFun();
		})
    },
    render: function() {
    },
	passwordFun:function(){
		var _opwd=$("input[name=old_password_txt]").val();
		if(_opwd.length==0){ 
			$.MsgBox.Tip('error','请输入旧密码！'); 
			return ;
		};
		
		var _npwd=$("input[name=new_password_txt]").val();
		if(_npwd.length==0){ 
			$.MsgBox.Tip('error','请输入新密码！'); 
			return ;
		};
		
		var _repwd=$("input[name=re_password_txt]").val();
		if(_repwd.length==0){ 
			$.MsgBox.Tip('error','请输入密码确认！'); 
			return ;
		};
		if(_repwd!=_npwd){
			$.MsgBox.Tip('error','请输入密码确认输入不正确！'); 
			return ;
		}
		if(sdk){
			var _userInfo=sdk.getUserInfo();
			sdk.passwordChange({
				'newPWD'   : _npwd,
				'oldPWD'   : _opwd,
				'userId'   : _userInfo.uid,
				onSuccess : function(){
					 $.MsgBox.Tip('success','修改成功,请重新登录',function(){
						 window.location.reload();
					 });
				},
				onFailure : function(retCode,message) {
					$.MsgBox.Tip('error',message);
				}
			})
		}
		
		
	}
});
