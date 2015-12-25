// JavaScript Document
$("#pageSignin").bind("init",function(){
    console.log('pageSignin');
	var $page=$(this);
    $page.find('.step1').show();
    $page.find('.step2').hide();
	$page.find('.step3').hide();
	$page.find('.step4').hide();

    $page.find('input[type=text]').val('');
	$page.find('.vcode-send').unbind('click');
	$page.find('.vcode-send').bind('click',function(){
		send_verfiy_sms();
	});
	var post_data;
	 
	$('#signin_btn1').unbind('click'); 
	$('#signin_btn1').bind('click',function(){
		
		var _username = $page.find('#txt_username').val();
		var _idcart = $page.find('#txt_idcart').val();
		var _phone = $page.find('#txt_phone').val();
		var _vcode = $page.find('#txt_vcode').val();
		var _serialcode = $page.find('#hid_serialcode').val();
		if(_username.length==0){
			$.MsgBox.Tip('error',"请输入姓名！");
			return false;
		}
		if(_idcart.length==0){
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

		$page.find('.step1').hide();
        $page.find('.step2').show();
	}); 
	
	$('#signin_btn2').unbind('click'); 
	$('#signin_btn2').bind('click',function(){
		$page.find('.step2').hide();
        $page.find('.step3').show();
	})
	
	$('#signin_btn3').unbind('click'); 
	$('#signin_btn3').bind('click',function(){
		var _password=$page.find('txt_password').val();
		var _repassword=$page.find('txt_repassword').val();
		if(_password.length==0){
			$.MsgBox.Tip('error',"请输入密码！");
			return false;
		}
		if(_repassword.length==0){
			$.MsgBox.Tip('error',"请输入密码确认！");
			return false;
		}
		if(_repassword!=_password){
			$.MsgBox.Tip('error',"请密码确认不正确！");
			return false;
		}
		post_data={
			'action':'register',
			'serialcode':_serialcode,
			'username':_username,
			'phone':_phone,
			'idcard':_idcart,
			'vcode':_vcode,
		}
		$.ajax({
			url:"addAccount.php",
			data:post_data,
			type:"POST",
			beforeSend:function(){},
			success:function(data){
				data = eval("(" + data + ")");
				if(data.retCode==0){
					
				}else{
					//alert(data.retText);
					$.MsgBox.Tip('error',data.retText);
				}
			}
		});
	})
	

	
	function checkMobile(str) {
		console.log(str);
		var re = /^1\d{10}$/
		if (re.test(str)) {
			return true ;
		} else {
			return false;
		}
	}
	function send_verfiy_sms(){
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
		if($('#btnregist_vcode_1').attr('send')=='1'){
			return ;
		}
		//验证
		var mobile = $page.find('#txt_phone').val() ;
		
		if (checkMobile(mobile) &&  mobile.length===11) {
			$.ajax({
				url:"addAccount.php",
				data:{'action':'sendverfiy','phone':mobile},
				type:"POST",
				beforeSend:function(){},
				success:function(data){
					data = eval("(" + data + ")");
					console.log(data);
					$.MsgBox.Tip('success',"验证码已经发发出");
					SMS.init($('#btnregist_vcode_1'));
				}
			});
		}else{;
			$.MsgBox.Tip('error',"请正确填写手机号");
			return false;
		}
	}
});