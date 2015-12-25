Mobilebone.captureLink = false;
Mobilebone.captureForm = false;
Mobilebone.evalScript  = true;
Mobilebone.init();
Mobilebone.callback = function(pagein,pageout,option) {
	var _userinfo=sdk.getAccount(-1);
	if(_userinfo!=undefined ){
		eval(option.id+'Fun();');
	}
};
//初始化变量
var images = {
	localId: [],
	serverId: [],
	imgMap: []
};
var app_url=assets_path+'/index.php';

var serialcode;
//是否调试
var debug=1;
var symbolCode;

function pageSigninFun(){
    var _data={
        'serialcode':serialcode,
		'assets_path':assets_path
    };
    $.get(assets_path+"/page/institutions_signin.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        signin();
    });
}
function pageSignInSuccessFun(){
    var _data={
        'serialcode':serialcode,
        'assets_path':assets_path
    };
    $.get(assets_path+"/page/institutions_signin_success.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        signin();
    });
}
function signin(){
	var $page=$('#pageSignin');
    $page.find('.step1').show();
    $page.find('.step2').hide();
	$page.find('.step3').hide();
	$page.find('.step4').hide();
    if($(window).width()<285){
        $page.find('input[type=text]').css({'width':'55%'});
    }
    $page.css({'overflow':'scroll','overflow-x':'hidden'});
	
	$page.find('select[name=certificate_type]').change(function(){
		$(this).parent().find('label').html(_certificateTypeList[$(this).val()]).css({'color':'#000'});
	});

    //$page.find('input[type=text]').val('');
	$page.find('.vcode-send').unbind('click');
	$page.find('.vcode-send').bind('click',function(){
		send_verfiy_sms();
	});
	
	var post_data;
    var _serialcode;
	_serialcode=$page.find('input[name=serialcode]').val();
	var _institutionsName,
		_certificateType,
		_certificateNo,
		_contact,
		_phone,
		_vcode;
	var _certificateTypeList=['身份证','驾驶证','护照','组织机构代码','营业执照','其它'];
	for(var i=0;i<_certificateTypeList.length;i++){
		$page.find('select[name=certificate_type]').append("<option value=\""+(i+1)+"\">"+_certificateTypeList[i]+"</option>");
	}

	//getSerialCode();

	$('#signin_btn1').unbind('click'); 
	$('#signin_btn1').bind('click',function(){
		_institutionsName = $page.find('input[name=institutions_name]').val();
		_certificateType = $page.find('select[name=certificate_type]').val();
		_certificateNo = $page.find('input[name=certificate_no]').val();
		_contact = $page.find('input[name=contact]').val();
		_phone = $page.find('input[name=phone]').val();
		_vcode = $page.find('input[name=vcode]').val();
		if(_institutionsName.length==0){
			$.MsgBox.Tip('error',"请输入机构名称！");
			return false;
		}
        var _institutionsNameLen=getRealLen(_institutionsName);
        if(!checkName(_institutionsName) || _institutionsNameLen<4 || _institutionsNameLen >12){
            $.MsgBox.Tip('error',"请输入合法机构名称！");
            return false;
        }
		if(_certificateType.length==0){
			$.MsgBox.Tip('error',"请输入证件类型！");
			return false;
		}
		if(_certificateNo.length==0){
			$.MsgBox.Tip('error',"请输入证件号！");
			return false;
		}
		if(_contact.length==0){
			$.MsgBox.Tip('error',"请输入联系人姓名！");
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
		$.ajax({
			url:api_path+"/server/jgInfoVerfiy",
			data:$('#signinForm').serialize(),
			type:"POST",
			beforeSend:function(){
				$page.find('input[name=action]').val('verfiy');
			},
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
        if(isWeiXin()){
            uploadPhoto(function(){
                doSignIn();
            });
        }else{
            if(fileCheck()){
                $.MsgBox.Loading('提示',"提交中");
                $('#signin_btn2').attr('disabled','true');
                $('#signinForm').submit();
            }
        }
	})

    $page.find('input[type=file]').each(function(){
        $(this).unbind('change');
        $(this).bind('change',function(){
            images.imgMap.push($(this).val()) ;
            $(this).parent().find('i').removeClass('fa-camera').addClass('fa-check-square-o');
        });
    });
	
	//$('#signin_btn3').unbind('click');
	//$('#signin_btn3').bind('click',function(){
	//})
	
	//$('#signin_btn4').unbind('click');
	//$('#signin_btn4').bind('click',function(){
	//	location.href='#pageLogin';
	//})

	//$page.find('input[name=serialcode]').unbind('keyup');
	//$page.find('input[name=serialcode]').bind('keyup',function(){
	//	_serialcode=$page.find('input[name=serialcode]').val();
	//	getSerialCode();
	//})
	
	//$page.find('input[name=serialcode]').bind('input propertychange', function() {
    //	_serialcode=$page.find('input[name=serialcode]').val();
	//	getSerialCode();
    //});

	var u = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
	var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
	if(!isAndroid){
		$('#android_download').remove();
	}
	if(!isiOS){
		$('#apple_download').remove();
	}

    var options = {
        url   :  api_path+"/server/jgSignIn",
        success: function(data) {
            data = eval("(" + data + ")");
            console.log(data);
            if(data.retCode==0){
                if(isWeiXin()){
                    downLoadPhoto(data.loginCode,function(){
                        $.MsgBox.Clean();
                        console.log('upload')
                        loginCode=data.loginCode;
                        location.href="?code="+loginCode+"#pageSignInSuccess";
                        //$page.find('.logincode').html(loginCode);
                        //$page.find('.step3').hide();
                        //$page.find('.step4').show();
                    });
                }else{
                    $.MsgBox.Clean();
                    loginCode=data.loginCode;
                    location.href="/index.php/institutions/signin/code/"+loginCode+"#pageSignInSuccess";
                }
            }else{
                $.MsgBox.Tip('error',data.retText);
            }
            $('#signin_btn2').removeAttr('disabled');
        }
    };
    $('#signinForm').ajaxForm(options);

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
				url:api_path+"/server/sendverfiy",
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
    function fileCheck(){
        var arrImgs = [] ; // 准备上传的图片

        for ( var imgKey in images.imgMap ) {
            arrImgs.push(images.imgMap[imgKey]) ;
        }

        var i = 0,cnt = arrImgs.length ;
        if (cnt == 0) {
            $.MsgBox.Tip('error','请先选择照片或直接拍照');
            return false;
        }
        return true;
    }
}

//初始化函数
function loaded(){
    setTimeout("$('.loading-box').fadeOut(500,function(){$('.loading-box').remove();});",500);
	var _hash=location.hash;
	var pageName='';
	if(_hash!=''){
		pageName=_hash.replace('#&','');
        eval(pageName+'Fun();');
	}
	FastClick.attach(document.body);
    getWXJSSDK();
}
window.addEventListener("DOMContentLoaded",loaded,false);


// 公共函数
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
        $('#photo_upload_1').unbind('click');
        $('#photo_upload_1').bind('click',function(){
            takePhoto('1',function(res,images){
                $('#photo_upload_1').find('i').removeClass('fa-camera').addClass('fa-check-square-o');

            }) ;
        })
        $('#photo_upload_2').unbind('click');
        $('#photo_upload_2').bind('click',function(){
            takePhoto('2',function(res,images){
                $('#photo_upload_2').find('i').removeClass('fa-camera').addClass('fa-check-square-o');
            }) ;
        })
        $('#photo_upload_3').unbind('click');
        $('#photo_upload_3').bind('click',function(){
            takePhoto('3',function(res,images){
                $('#photo_upload_3').find('i').removeClass('fa-camera').addClass('fa-check-square-o');
            }) ;
        })
        $('#signinForm').find('input[type=file]').remove();
	});
};
// 选择照片
function takePhoto(key,callBack) {
	wx.chooseImage({
		success: function (res) {
			var imgKey = '#img_' + key ;
			images.imgMap[imgKey] = res.localIds[res.localIds.length-1] ;
			if (typeof callBack === 'function') {
				callBack.call(res,images) ;
			}
		}
	});
};
//上传照片
function uploadPhoto(callBack) {
	var arrImgs = [] ; // 准备上传的图片
	var url     = wx_url_uploadIMG ;

	for ( var imgKey in images.imgMap ) {
		arrImgs.push(images.imgMap[imgKey]) ;
	}

	var i = 0,cnt = arrImgs.length ;
	if (cnt == 0) {
		$.MsgBox.Tip('error','请先选择照片或直接拍照');
		return;
	}

	// 开始上传图片
	images.serverId = []; // 用于存放成功上传的图片的服务端ID
	function upload() {
		wx.uploadImage({
			localId : arrImgs[i],
			isShowProgressTips: 1, // 默认为1，显示进度提示
			success : function (res) {
				i++ ;
				images.serverId.push(res.serverId);
	
				if ( i<cnt )
				{
					upload();
				}else{
					if (typeof callBack==='function') {
                		callBack() ;
                    }
				}
			},
			fail : function (res) {
				alert(JSON.stringify(res));
			}
		}) ;
	}
    upload();
};
//下载照片
function downLoadPhoto(userid,callBack){
	var i = 0,cnt = images.serverId.length ;
	function download(){
		$.ajax({
			url:"api.php",
			data:{'action':'download','media_id':images.serverId[i],'wx_token':wx_token,'code':userid,'key':i},
			type:"POST",
			beforeSend:function(){ },
			success:function(data){
				i++;
				if( i<cnt){
					download();
				}else{
					if (typeof callBack==='function') {
                		callBack() ;
                    }
				}
			}
		});
	}
	download();
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
function isWeiXin(){
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
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



