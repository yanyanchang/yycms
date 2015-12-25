// JavaScript Document
//发送验证码倒计时
var InterValObj; //timer变量，控制时间
var count = 300; //间隔函数，1秒执行行
var curCount;//当前剩余秒数

$(document).ready(function() {
    $("#phone").keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) || 
            (e.keyCode >= 35 && e.keyCode <= 40)) {
                 return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
	
	//$('#btnSendCode').bind('click',function(){
		//sendMessage1();
	//})
	
});

window.setTimeout(function(){
  var event = document.createEvent('MouseEvents');
  event.initMouseEvent(
    "click", true, true, window,
    0, 0, 0, 0, 0, 
    false, false, false, false, 
    0, null
  );
});
document.getElementById('btnSendCode').dispatchEvent(event);


function sendMessage() {
	console.log('sendMessage');
  　curCount = count;

    var data={};
    data["phone"]=$('#phone').val();
    data["index"]=$('#index').val();
    data["code_send_type"] = '1';

    $.post('/account/real/smsverify', data, function(result) {
        //console.log(result);

        var dat = eval( '(' + result + ')') ;

        if (dat.retCode === '0'){
        　　//设置button效果，开始计时
            $("#btnSendCode").attr("disabled", "true");
            $("#btnSendCode").html(curCount + "s后重新发送");
			
			$('#btnSendCode').css({'background':'#a3a3a3','cursor':'default'});
            InterValObj = window.setInterval(SetRemainTime, 1000); //启动计时器，1秒执行一次
        }
        else{
			$('#chkalert').html("<img src='images/icon-false.jpg'>&nbsp;&nbsp;验证码发送失败请重试！");
        }

    });
}

//timer处理函数
function SetRemainTime() {
            if (curCount == 0) {                
                window.clearInterval(InterValObj);//停止计时器
                $("#btnSendCode").removeAttr("disabled");//启用按钮
				$('#btnSendCode').css({'background':'#dfb21a','cursor':'pointer'});
                $("#btnSendCode").html("发送验证码");
            }
            else {
                curCount--;
                $("#btnSendCode").html( curCount + "s后重新发送");
				console.log(curCount);
            }
        }
		
//手机验证		
function chk()
{
    var phonenum =document.getElementById('phone').value;
	var partten = /^1[3,5,8]\d{9}$/;
	var fl=false;

	if(partten.test(phonenum)){
        var textId = document.getElementById("chkalert");
        textId.innerHTML = "<img src='images/icon-true.jpg'>";
        return true;
    }
    else{
        var textId1 = document.getElementById("chkalert");
        textId1.innerHTML = "<img src='images/icon-false.jpg'>&nbsp;&nbsp;手机号码格式错误！";
    }
    return false;
}

