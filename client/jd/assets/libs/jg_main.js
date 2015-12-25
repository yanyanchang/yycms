Mobilebone.captureLink = false;
Mobilebone.captureForm = false;
Mobilebone.evalScript  = true;
Mobilebone.init();
Mobilebone.callback = function(pagein,pageout,option) {
    eval(option.id+'Fun();');
    //渲染
    //$('#'+option.id).trigger("init",[option.id]);
};
//初始化变量
var debug=1;//是否调试

var symbolCode;
var _serialcode,_serialcode_institutions;

function pageJgQRCodeFun(){
    var _data={};
    $.get("page/JgQRCode.html", function(result){
        var _html=bindTemplate(result,_data);
        $('.in').html(_html);
        jqqrcode();
        var myScroll = new IScroll('#pageJgQRCode', { mouseWheel: true });
    });
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
// 选择照片
function takePhoto(key,callBack) {
	wx.chooseImage({
		success: function (res) {
			var imgKey = '#img_' + key ;
		
			images.imgMap[imgKey] = res.localIds[res.localIds.length-1] ;
			
			alert(images.imgMap[imgKey]);
		
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
function reSize(){
}
function loadTemplate(name){
    $.get("page/"+name+".html", function(result){
        $('body').append(result);
    });
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

//页面函数
function jqqrcode(){
    $page=$('.in');

    $page.find('input[name=serialcode]').unbind('keyup');
    $page.find('input[name=serialcode]').bind('keyup',function(){
        _serialcode=$page.find('input[name=serialcode]').val();
        getSerialCode();
        var _serialName=$page.find('input[name=serialcode_name]').val();
    })
    $page.find('.creat_qrcode_btn').unbind('click');
    $page.find('.creat_qrcode_btn').bind('click',function(){
        _serialcode_institutions=$page.find('input[name=serialcode_institutions]').val();
        if(_serialcode=='' || _serialcode==undefined){
            $.MsgBox.Tip('error','机构号为空！');
        }else{
            if(_serialcode_institutions != '' && _serialcode_institutions != undefined){
                $page.find('.step1').hide();
                $page.find('.step2').show();
                $page.find('.qrcode').attr('src',"http://wx.bymiao.com/wx/xmWP/api.php?action=qrcode&data=http://wx.bymiao.com/wx/xmWP/index.php?sc="+_serialcode+"#pageWelcome");
                //$page.find('.url').val("http://wx.bymiao.com/wx/xmWP/index.php?sc="+_serialcode);

                alert(_serialcode);
                wx.onMenuShareTimeline({
                    title: '厦门两岸商品交易', // 分享标题
                    link: 'http://wx.bymiao.com/wx/xmWP/index.php?sc='+_serialcode, // 分享链接
                    imgUrl: 'http://wx.bymiao.com/wx/xmWP/skin/images/phonelogo.gif', // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });
                wx.onMenuShareAppMessage({
                    title: '厦门两岸商品交易', // 分享标题
                    desc: '厦门两岸商品交易', // 分享描述
                    link: 'http://wx.bymiao.com/wx/xmWP/index.php?sc='+_serialcode, // 分享链接
                    imgUrl: 'http://wx.bymiao.com/wx/xmWP/skin/images/phonelogo.gif', // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

            }else{
                $.MsgBox.Tip('error','不存在该机构！');
            }
        }
    });
    $page.find('.copy_btn').unbind('click');
    $page.find('.copy_btn').bind('click',function(){
        copyToClipBoard($page.find('.url').val());
    });

    $page.find('.share_btn').unbind('click');
    $page.find('.share_btn').bind('click',function(){

    });







    //加载机构
    function getSerialCode(){
        $.ajax({
            url:"api.php",
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




}
wx.ready(function () {
    alert(1);
    // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
        wx.checkJsApi({
            jsApiList: [
                'onMenuShareAppMessage',
                'onMenuShareTimeline'
            ],
            success: function (res) {
                alert(JSON.stringify(res));
            }
        });
    wx.onMenuShareTimeline({
        title: '厦门两岸商品交易', // 分享标题
        link: 'http://wx.bymiao.com/wx/xmWP/index.php', // 分享链接
        imgUrl: 'http://wx.bymiao.com/wx/xmWP/skin/images/phonelogo.gif', // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
    wx.onMenuShareAppMessage({
        title: '厦门两岸商品交易', // 分享标题
        desc: '厦门两岸商品交易', // 分享描述
        link: 'http://wx.bymiao.com/wx/xmWP/index.php', // 分享链接
        imgUrl: 'http://wx.bymiao.com/wx/xmWP/skin/images/phonelogo.gif', // 分享图标
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





