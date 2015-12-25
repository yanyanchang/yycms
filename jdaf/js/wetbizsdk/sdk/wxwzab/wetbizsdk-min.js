function BizBinHoldBill(e){var o=new IBiz(e)
return o.request_code=M_Q_BINHOLDBILL,o.response_code=M_R_BINHOLDBILL,o.pushData=function(e){return e},o}function BizCERInfo(e){var o=new IBiz(e)
return o.request_code=M_Q_CER_INFO,o.response_code=M_R_CER_INFO,o.pushData=function(e){return e},o}function BizCloseBill(e){var o=new IBiz(e)
return o.request_code=M_Q_CLOSEBILL,o.response_code=M_R_CLOSEBILL,o.pushData=function(e){return e},o}function BizContracts(e){var o=new IBiz(e)
return o.request_code=M_Q_CONTRACTS,o.response_code=M_R_CONTRACTS,o.pushData=function(e){return e},o}function BizHoldBill(e){var o=new IBiz(e)
return o.request_code=M_Q_BINHOLDBILL,o.response_code=M_R_BINHOLDBILL,o.pushData=function(e){return e},o}function BizHoldPosition(e){var o=new IBiz(e)
return o.request_code=M_Q_HOLDPOSITION,o.response_code=M_R_HOLDPOSITION,o.pushData=function(e){return e},o}function BizLimitBill(e){var o=new IBiz(e)
return o.request_code=M_Q_LIMITBILL,o.response_code=M_R_LIMITBILL,o.pushData=function(e){return e},o}function BizLogin(e){var o=new IBiz(e)
return o.loginWithUID=function(e){var o=this
if(!o.ws)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var t={uid:e.uid,pwd:e.pwd,vcode:e.vcode,userType:M_USER_TYPE},n={event:M_Q_LOGIN_GW,msgOrder:o.getMsgOrder(),encrypt:M_DATA_ENCRYPT,data:t}
o.ws.send({wetPackage:n,onSuccess:function(o){if(o.retCode===M_RETCODE_SUCCESS){o.data.hisQueryProxy="http://120.24.159.238:14020/wetquery/report_client/binaryoptionsorder"
var t=o.data
"function"==typeof e.onSuccess&&e.onSuccess(t)}else"function"==typeof e.onFailure&&e.onFailure(o.retCode,o.message)},onFailure:function(o,t){"function"==typeof e.onFailure&&e.onFailure(o,t)}})},o.loginWithSID=function(e){var o=this
if(!o.ws)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var t={sid:e.sid,uid:e.uid,userId:e.uid,pwd:e.pwd,vcode:e.vcode,userType:M_USER_TYPE},n={event:M_Q_LOGIN,msgOrder:o.getMsgOrder(),encrypt:M_DATA_UNENCRYPT,data:t}
o.ws.send({wetPackage:n,onSuccess:function(o){if(o.retCode===M_RETCODE_SUCCESS){var t={token:o.data.token}
"function"==typeof e.onSuccess&&e.onSuccess(t)}else"function"==typeof e.onFailure&&e.onFailure(o.retCode,o.message)},onFailure:function(o,t){"function"==typeof e.onFailure&&e.onFailure(o,t)}})},o}function BizOrder(e){var o=new IBiz(e),t=e.requestCode
e.responseCode
return o.makeOrderWithSID=function(e){var o=this,n={uid:e.uid,trUid:e.uid,sid:e.sid,action:ACTION_ADD,children:[e.orderData]},i={event:t,msgOrder:o.getMsgOrder(),encrypt:M_DATA_ENCRYPT,data:n}
o.ws.send({wetPackage:i,onSuccess:function(o){if(console.log("wetPackage"),console.log(o),o.retCode===M_RETCODE_SUCCESS){o.data.children
"function"==typeof e.onSuccess&&e.onSuccess(o.data)}else"function"==typeof e.onFailure&&e.onFailure(o.retCode,o.message)},onFailure:function(o,t){"function"==typeof e.onFailure&&e.onFailure(o,t)},onPush:function(){}})},o}function BizPassword(e){var o=new IBiz(e)
return o.request_code=M_Q_CHANGEPWD,o.response_code=M_R_CHANGEPWD,o.changeUserPassword=function(e){var o=this,t={pwdType:1,newPWD:e.newPWD,oldPWD:e.oldPWD,userId:e.userId},n={event:M_Q_CHANGEPWD,msgOrder:o.getMsgOrder(),encrypt:M_DATA_ENCRYPT,data:t}
o.ws.send({wetPackage:n,onSuccess:function(o){if(o.retCode===M_RETCODE_SUCCESS){o.data.children
"function"==typeof e.onSuccess&&e.onSuccess(o.data)}else"function"==typeof e.onFailure&&e.onFailure(o.retCode,o.message)},onFailure:function(o,t){"function"==typeof e.onFailure&&e.onFailure(o,t)},onPush:function(){}})},o}function BizPayPort(e){var o=new IBiz(e)
return o.request_code=M_Q_AMOUNT,o.response_code=M_R_AMOUNT,o.pushData=function(e){return e},o}function BizRegister(e){var o=new IBiz(e),t="10001"
return o.submit=function(e){var o=this,n=o.getMsgOrder(),i={mobile:e.mobile,password:e.password,vcode:e.vcode,action:ACTION_ADD,children:[]},r={event:t,msgOrder:n,encrypt:M_DATA_ENCRYPT,data:i}
switch(e.method){case"get":case"post":if(!e.url)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"无效的URL参数设置"))
var s=o.getXmlHttpObject()
if(!s)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"无法创建AJAX对象"))
var c=JSON.stringify(r),a=e.url
o.pushQueue(n,e.onSuccess,e.onFailure),a+="?jsonData="+c,a+="&sid="+Math.random(),console.log(a),s.onreadystatechange=function(){if(4===s.readyState){var e=JSON.parse(s.responseText),t=o.popQueue(e.msgOrder)
"object"==typeof e&&e.event?t&&(e.retCode===M_RETCODE_SUCCESS?"function"==typeof t.onSuccess&&t.onSuccess(e):"function"==typeof t.onFailure&&t.onFailure(e.retCode,e.message)):(t&&"function"==typeof t.onFailure&&t.onFailure(WS_ERR_UNKNOWPACKAGE,"收到异常包"),console.log("收到异常包"))}},s.open("GET",a,!0),s.send(null)
break
case"websocket":default:if(!o.ws)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
o.ws.send({wetPackage:r,onSuccess:function(t){if(t.retCode===M_RETCODE_SUCCESS){var n=t.data.children
"function"==typeof e.onSuccess&&e.onSuccess(o.pushData(n))}else"function"==typeof e.onFailure&&e.onFailure(t.retCode,t.message)},onFailure:function(o,t){"function"==typeof e.onFailure&&e.onFailure(o,t)}})}},o}function BizSymbolInfo(e){var o=new IBiz(e)
return o.request_code=M_Q_SYMBOL,o.response_code=M_R_SYMBOL,o.pushData=function(e){return e},o}function BizTest(e){var o=new IBiz(e)
return o.request_code=M_Q_AMOUNT,o.response_code=M_R_AMOUNT,o.pushData=function(e){return e},o}function BizUserAccount(e){var o=new IBiz(e)
return o.request_code=M_Q_AMOUNT,o.response_code=M_R_AMOUNT,o.pushData=function(e){return e},o}function IBiz(e){IBiz.prototype.statics||(IBiz.prototype.statics={orderNo:0})
var o=null,t=[],n=function(e,o,n){var i="queue_"+e
t[i]={onSuccess:o,onFailure:n}},i=function(e){var o="queue_"+e,n=null
return t[o]&&(n={onSuccess:t[o].onSuccess,onFailure:t[o].onFailure},delete t[o]),n},r=function(){if(4===o.readyState){var e=JSON.parse(o.responseText),t=i(e.msgOrder)
"object"==typeof e&&e.event?t&&(e.retCode===M_RETCODE_SUCCESS?"function"==typeof t.onSuccess&&t.onSuccess(e):"function"==typeof t.onFailure&&t.onFailure(e.retCode,e.message)):(t&&"function"==typeof t.onFailure&&t.onFailure(WS_ERR_UNKNOWPACKAGE,"收到异常包"),console.log("收到异常包"))}},s=function(){var e=null
try{e=new XMLHttpRequest}catch(o){try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(o){e=new ActiveXObject("Microsoft.XMLHTTP")}}return e}
return{ws:e.webSocket,popQueue:i,pushQueue:n,getMsgOrder:function(){return IBiz.prototype.statics.orderNo++,IBiz.prototype.statics.orderNo},getXmlHttpObject:s,loadDataWithSID:function(e){var t=this,i=t.getMsgOrder(),c={uid:e.uid,sid:e.sid,action:ACTION_QUERY},a={event:t.request_code,msgOrder:i,encrypt:M_DATA_ENCRYPT,data:c}
switch(e.method){case"get":case"post":if(!e.url)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"无效的URL参数设置"))
if(o=s(),!o)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"无法创建AJAX对象"))
var u=JSON.stringify(a),l=e.url
n(i,e.onSuccess,e.onFailure),l+="?jsonData="+u,l+="&sid="+Math.random(),o.onreadystatechange=r,o.open("GET",l,!0),o.send(null)
break
case"websocket":default:if(!t.ws)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
t.ws.send({wetPackage:a,onSuccess:function(o){if(o.retCode===M_RETCODE_SUCCESS){var n=o.data.children
"function"==typeof e.onSuccess&&e.onSuccess(t.pushData(n))}else"function"==typeof e.onFailure&&e.onFailure(o.retCode,o.message)},onFailure:function(o,t){"function"==typeof e.onFailure&&e.onFailure(o,t)}})}},pushData:function(){}}}function uiFunction(){var e=function(e,o){var t=e
return t=t.substring(0,o)},o=function(e,o){var t=e
return t=t.substring(t.length-o,t.length)}
return{Date2Epoch:function(e){if("string"==typeof e){var o=e.replace(/-/g,"/")
e=new Date(o)}var t,n=!0
return t=n?parseInt(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds())/1e3):(e.getTime()-e.getMilliseconds())/1e3},Epoch2Date:function(e){var o=new Date
return 1e10>e&&(e*=1e3),o.setTime(e),o},fmtPrice:function(e,o){return e||(e=0),"string"==typeof e&&(e=parseFloat(e)),e.toFixed(o)},calculPrice:function(e,o,t){var n=e,i=Math.pow(10,t)
return n=(n*i+o)/i,n=n.toFixed(t)},fmtShowPrice:function(t,n){t||(t=0)
var i={price:""+t}
if(t){var r=Math.pow(10,n),s=""+Math.round(t*r),c=s.indexOf(".")
c>=0&&(s=e(s,c))
var a=Math.min(n,2)
if(i.price1=e(s,s.length-a),i.price2=s.replace(i.price1,""),0===n){var u=i.price1.length
switch(u){case 0:case 1:case 2:i.price2=i.price1,i.price1=""
break
default:i.price2=o(i.price1,2),i.price1=e(i.price1,u-2)}}else n>2&&(i.price1=""+parseInt(e(s,s.length-a)+"11")/r,i.price1=e(i.price1,i.price1.length-a)),n>0&&-1==i.price1.indexOf(".")&&(i.price2="."+i.price2)}else i.price1="0",i.price2=""
return i.price=i.price1+i.price2,i},fmtDate:function(e){var t
return t=e.getFullYear()+"-",t+=o("0"+(e.getMonth()+1),2)+"-",t+=o("0"+e.getDate(),2)+" ",t+=o("0"+e.getHours(),2)+":",t+=o("0"+e.getMinutes(),2)+":",t+=o("0"+e.getSeconds(),2)},fmtMSDate:function(e){var t
return t=e.getFullYear()+"-",t+=o("0"+(e.getMonth()+1),2)+"-",t+=o("0"+e.getDate(),2)+" ",t+=o("0"+e.getHours(),2)+":",t+=o("0"+e.getMinutes(),2)+":",t+=o("0"+e.getSeconds(),2)+":",t+=o("0000"+e.getMilliseconds(),4)},fmtDate2:function(e){var t
return t=e.getFullYear(),t+=o("0"+(e.getMonth()+1),2),t+=o("0"+e.getDate(),2),t+=o("0"+e.getHours(),2),t+=o("0"+e.getMinutes(),2),t+=o("0"+e.getSeconds(),2)},fmtShortDate:function(e){if("string"==typeof e)return e
var t
return t=e.getFullYear(),t+="/",t+=o("0"+(e.getMonth()+1),2),t+="/",t+=o("0"+e.getDate(),2)},fmtMDDate:function(e){if("string"==typeof e){var t=e.indexOf("-")
return t>=0&&(e=o(e,e.length-t-1)),e}var n
return n+=o("0"+(e.getMonth()+1),2),n+="-",n+=o("0"+e.getDate(),2)},strLeft:function(o,t){return e(o,t)},strRight:function(e,t){return o(e,t)},getGuid:function(){for(var e="",o=1;32>=o;o++){var t=Math.floor(16*Math.random()).toString(16)
e+=t,(8==o||12==o||16==o||20==o)&&(e+="-")}return e},getXmlHttpObject:function(){var e=null
try{e=new XMLHttpRequest}catch(o){try{e=new ActiveXObject("Msxml2.XMLHTTP")}catch(o){e=new ActiveXObject("Microsoft.XMLHTTP")}}return e}}}function webSocket(e){var o=function(e,o){var t=e
return t=t.substring(0,o)},t=[],n=function(e,o,n){var i="queue_"+e
t[i]={onSuccess:o,onFailure:n}},i=function(e){var o="queue_"+e,n=null
return t[o]&&(n={onSuccess:t[o].onSuccess,onFailure:t[o].onFailure},delete t[o]),n},r=!1,s=!1,c=e.key,a=e.iv,u=e.isEncrypt,l=e.heartBeat,_=new Date,d=new Date,f=12e4,p=e.protocol||WS_PROTOCOL_DEFAULT,h=null,y=null,S=!1,g=null,I=function(e){var t=this
return h&&(S=!0,h.close()),y=e,h=new WebSocket(e),h.scope=t,h.onopen=function(){var e=h.scope||this
if(S=!1,"function"==typeof e.onopen){var o=e.scope||this
e.onopen.call(o)}r=!0,l&&v.call(e)},h.onclose=function(){if(r=!1,"function"==typeof t.onclose){var e=t.scope||this
S||t.onclose.call(e)}},h.onmessage=function(e){var t=this.scope,n=e.data
if(_=new Date,0===n.length)return void console.log("收到心跳包")
if(u===M_DATA_ENCRYPT&&"{"!==o(n,1)){var r=CryptoJS.AES.decrypt(e.data,c,{iv:a,mode:CryptoJS.mode.ECB})
n=r.toString(CryptoJS.enc.Utf8)}if(n.length<=2)return void console.log("收到心跳包")
switch(s=!1,p){case WS_PROTOCOL_QCMP:var l=n.substring(0,1)
"0"===l&&(d={event:M_R_PUSH_QUOTE,data:{children:[n]}},"function"==typeof t.onpush&&t.onpush.call(t,d))
break
case WS_PROTOCOL_DEFAULT:default:var d=JSON.parse(n)
console.log(JSON.stringify(d))
var f=i(d.msgOrder)
"object"==typeof d&&d.event?f?"function"==typeof f.onSuccess&&f.onSuccess(d):"function"==typeof t.onpush&&t.onpush.call(t,d):(f&&"function"==typeof f.onFailure&&f.onFailure(WS_ERR_UNKNOWPACKAGE,"收到异常包"),console.log("收到异常包"))}},h},m=function(e){if("string"==typeof e){var o=e.replace(/-/g,"/")
e=new Date(o)}var t,n=!0
return t=n?parseInt(Date.UTC(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds())/1e3):(e.getTime()-e.getMilliseconds())/1e3},C=function(){r&&(d=new Date,console.log("发送心跳包 : "+y),h.send(l.msg))},v=function(){var e=this
g||(g=setInterval(function(){var o=1e3*(m(new Date)-m(_))
o>f||(o=1e3*(m(new Date)-m(d)),l&&o>l.timeout&&C.call(e))},l.interval))}
return{token:"",open:function(e){var o=this
r||(o.onopen=e.onOpen,o.onpush=e.onPush,o.onclose=e.onClose,o.scope=e.scope,h=I.call(o,e.url))},close:function(){S=!0,h&&h.close()},reConnect:function(e){var o=this
e=e||y,console.log("重连："+e)
setTimeout(function(){I.call(o,e)},1e3)},send:function(e){var o=this
if(s)return void(o.onFailure&&o.onFailure(WS_ERR_BUSY,"上次请求仍在处理中"))
if(!h)return void(o.onFailure&&o.onFailure(WS_ERR_BUSY,"通讯组件未就绪"))
s=!0,d=new Date
var t=e.wetPackage
t.data.token=o.token,n(t.msgOrder,e.onSuccess,e.onFailure)
var i=JSON.stringify(t)
if(u===M_DATA_ENCRYPT){var r=CryptoJS.AES.encrypt(i,c,{iv:a,mode:CryptoJS.mode.ECB})
h.send(r)}else h.send(i)}}}function jsonP(e,o){procJSONP.push(o)
var t=e.split("?"),n=t[0]+"?callBack=callBack"
t.length>1&&(n+="&"+t[1])
var i=document.createElement("script")
i.setAttribute("src",n),document.getElementsByTagName("head")[0].appendChild(i),setTimeout(function(){document.getElementsByTagName("head")[0].removeChild(i)},1e4)}function callBack(e){if(procJSONP.length>0){var o=procJSONP[0]
procJSONP.slice(0,1),"function"==typeof o&&o(e)}}console.log("load IBiz complete")
var CryptoJS=CryptoJS||function(e,o){var t={},n=t.lib={},i=function(){},r=n.Base={extend:function(e){i.prototype=this
var o=new i
return e&&o.mixIn(e),o.hasOwnProperty("init")||(o.init=function(){o.$super.init.apply(this,arguments)}),o.init.prototype=o,o.$super=this,o},create:function(){var e=this.extend()
return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var o in e)e.hasOwnProperty(o)&&(this[o]=e[o])
e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},s=n.WordArray=r.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=t!=o?t:4*e.length},toString:function(e){return(e||a).stringify(this)},concat:function(e){var o=this.words,t=e.words,n=this.sigBytes
if(e=e.sigBytes,this.clamp(),n%4)for(var i=0;e>i;i++)o[n+i>>>2]|=(t[i>>>2]>>>24-8*(i%4)&255)<<24-8*((n+i)%4)
else if(65535<t.length)for(i=0;e>i;i+=4)o[n+i>>>2]=t[i>>>2]
else o.push.apply(o,t)
return this.sigBytes+=e,this},clamp:function(){var o=this.words,t=this.sigBytes
o[t>>>2]&=4294967295<<32-8*(t%4),o.length=e.ceil(t/4)},clone:function(){var e=r.clone.call(this)
return e.words=this.words.slice(0),e},random:function(o){for(var t=[],n=0;o>n;n+=4)t.push(4294967296*e.random()|0)
return new s.init(t,o)}}),c=t.enc={},a=c.Hex={stringify:function(e){var o=e.words
e=e.sigBytes
for(var t=[],n=0;e>n;n++){var i=o[n>>>2]>>>24-8*(n%4)&255
t.push((i>>>4).toString(16)),t.push((15&i).toString(16))}return t.join("")},parse:function(e){for(var o=e.length,t=[],n=0;o>n;n+=2)t[n>>>3]|=parseInt(e.substr(n,2),16)<<24-4*(n%8)
return new s.init(t,o/2)}},u=c.Latin1={stringify:function(e){var o=e.words
e=e.sigBytes
for(var t=[],n=0;e>n;n++)t.push(String.fromCharCode(o[n>>>2]>>>24-8*(n%4)&255))
return t.join("")},parse:function(e){for(var o=e.length,t=[],n=0;o>n;n++)t[n>>>2]|=(255&e.charCodeAt(n))<<24-8*(n%4)
return new s.init(t,o)}},l=c.Utf8={stringify:function(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(o){throw Error("Malformed UTF-8 data")}},parse:function(e){return u.parse(unescape(encodeURIComponent(e)))}},_=n.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=l.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(o){var t=this._data,n=t.words,i=t.sigBytes,r=this.blockSize,c=i/(4*r),c=o?e.ceil(c):e.max((0|c)-this._minBufferSize,0)
if(o=c*r,i=e.min(4*o,i),o){for(var a=0;o>a;a+=r)this._doProcessBlock(n,a)
a=n.splice(0,o),t.sigBytes-=i}return new s.init(a,i)},clone:function(){var e=r.clone.call(this)
return e._data=this._data.clone(),e},_minBufferSize:0})
n.Hasher=_.extend({cfg:r.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){_.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(o,t){return new e.init(t).finalize(o)}},_createHmacHelper:function(e){return function(o,t){return new d.HMAC.init(e,t).finalize(o)}}})
var d=t.algo={}
return t}(Math)
!function(){var e=CryptoJS,o=e.lib.WordArray
e.enc.Base64={stringify:function(e){var o=e.words,t=e.sigBytes,n=this._map
e.clamp(),e=[]
for(var i=0;t>i;i+=3)for(var r=(o[i>>>2]>>>24-8*(i%4)&255)<<16|(o[i+1>>>2]>>>24-8*((i+1)%4)&255)<<8|o[i+2>>>2]>>>24-8*((i+2)%4)&255,s=0;4>s&&t>i+.75*s;s++)e.push(n.charAt(r>>>6*(3-s)&63))
if(o=n.charAt(64))for(;e.length%4;)e.push(o)
return e.join("")},parse:function(e){var t=e.length,n=this._map,i=n.charAt(64)
i&&(i=e.indexOf(i),-1!=i&&(t=i))
for(var i=[],r=0,s=0;t>s;s++)if(s%4){var c=n.indexOf(e.charAt(s-1))<<2*(s%4),a=n.indexOf(e.charAt(s))>>>6-2*(s%4)
i[r>>>2]|=(c|a)<<24-8*(r%4),r++}return o.create(i,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(e){function o(e,o,t,n,i,r,s){return e=e+(o&t|~o&n)+i+s,(e<<r|e>>>32-r)+o}function t(e,o,t,n,i,r,s){return e=e+(o&n|t&~n)+i+s,(e<<r|e>>>32-r)+o}function n(e,o,t,n,i,r,s){return e=e+(o^t^n)+i+s,(e<<r|e>>>32-r)+o}function i(e,o,t,n,i,r,s){return e=e+(t^(o|~n))+i+s,(e<<r|e>>>32-r)+o}for(var r=CryptoJS,s=r.lib,c=s.WordArray,a=s.Hasher,s=r.algo,u=[],l=0;64>l;l++)u[l]=4294967296*e.abs(e.sin(l+1))|0
s=s.MD5=a.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,r){for(var s=0;16>s;s++){var c=r+s,a=e[c]
e[c]=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8)}var s=this._hash.words,c=e[r+0],a=e[r+1],l=e[r+2],_=e[r+3],d=e[r+4],f=e[r+5],p=e[r+6],h=e[r+7],y=e[r+8],S=e[r+9],g=e[r+10],I=e[r+11],m=e[r+12],C=e[r+13],v=e[r+14],B=e[r+15],O=s[0],T=s[1],M=s[2],D=s[3],O=o(O,T,M,D,c,7,u[0]),D=o(D,O,T,M,a,12,u[1]),M=o(M,D,O,T,l,17,u[2]),T=o(T,M,D,O,_,22,u[3]),O=o(O,T,M,D,d,7,u[4]),D=o(D,O,T,M,f,12,u[5]),M=o(M,D,O,T,p,17,u[6]),T=o(T,M,D,O,h,22,u[7]),O=o(O,T,M,D,y,7,u[8]),D=o(D,O,T,M,S,12,u[9]),M=o(M,D,O,T,g,17,u[10]),T=o(T,M,D,O,I,22,u[11]),O=o(O,T,M,D,m,7,u[12]),D=o(D,O,T,M,C,12,u[13]),M=o(M,D,O,T,v,17,u[14]),T=o(T,M,D,O,B,22,u[15]),O=t(O,T,M,D,a,5,u[16]),D=t(D,O,T,M,p,9,u[17]),M=t(M,D,O,T,I,14,u[18]),T=t(T,M,D,O,c,20,u[19]),O=t(O,T,M,D,f,5,u[20]),D=t(D,O,T,M,g,9,u[21]),M=t(M,D,O,T,B,14,u[22]),T=t(T,M,D,O,d,20,u[23]),O=t(O,T,M,D,S,5,u[24]),D=t(D,O,T,M,v,9,u[25]),M=t(M,D,O,T,_,14,u[26]),T=t(T,M,D,O,y,20,u[27]),O=t(O,T,M,D,C,5,u[28]),D=t(D,O,T,M,l,9,u[29]),M=t(M,D,O,T,h,14,u[30]),T=t(T,M,D,O,m,20,u[31]),O=n(O,T,M,D,f,4,u[32]),D=n(D,O,T,M,y,11,u[33]),M=n(M,D,O,T,I,16,u[34]),T=n(T,M,D,O,v,23,u[35]),O=n(O,T,M,D,a,4,u[36]),D=n(D,O,T,M,d,11,u[37]),M=n(M,D,O,T,h,16,u[38]),T=n(T,M,D,O,g,23,u[39]),O=n(O,T,M,D,C,4,u[40]),D=n(D,O,T,M,c,11,u[41]),M=n(M,D,O,T,_,16,u[42]),T=n(T,M,D,O,p,23,u[43]),O=n(O,T,M,D,S,4,u[44]),D=n(D,O,T,M,m,11,u[45]),M=n(M,D,O,T,B,16,u[46]),T=n(T,M,D,O,l,23,u[47]),O=i(O,T,M,D,c,6,u[48]),D=i(D,O,T,M,h,10,u[49]),M=i(M,D,O,T,v,15,u[50]),T=i(T,M,D,O,f,21,u[51]),O=i(O,T,M,D,m,6,u[52]),D=i(D,O,T,M,_,10,u[53]),M=i(M,D,O,T,g,15,u[54]),T=i(T,M,D,O,a,21,u[55]),O=i(O,T,M,D,y,6,u[56]),D=i(D,O,T,M,B,10,u[57]),M=i(M,D,O,T,p,15,u[58]),T=i(T,M,D,O,C,21,u[59]),O=i(O,T,M,D,d,6,u[60]),D=i(D,O,T,M,I,10,u[61]),M=i(M,D,O,T,l,15,u[62]),T=i(T,M,D,O,S,21,u[63])
s[0]=s[0]+O|0,s[1]=s[1]+T|0,s[2]=s[2]+M|0,s[3]=s[3]+D|0},_doFinalize:function(){var o=this._data,t=o.words,n=8*this._nDataBytes,i=8*o.sigBytes
t[i>>>5]|=128<<24-i%32
var r=e.floor(n/4294967296)
for(t[(i+64>>>9<<4)+15]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t[(i+64>>>9<<4)+14]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8),o.sigBytes=4*(t.length+1),this._process(),o=this._hash,t=o.words,n=0;4>n;n++)i=t[n],t[n]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)
return o},clone:function(){var e=a.clone.call(this)
return e._hash=this._hash.clone(),e}}),r.MD5=a._createHelper(s),r.HmacMD5=a._createHmacHelper(s)}(Math),function(){var e=CryptoJS,o=e.lib,t=o.Base,n=o.WordArray,o=e.algo,i=o.EvpKDF=t.extend({cfg:t.extend({keySize:4,hasher:o.MD5,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,o){for(var t=this.cfg,i=t.hasher.create(),r=n.create(),s=r.words,c=t.keySize,t=t.iterations;s.length<c;){a&&i.update(a)
var a=i.update(e).finalize(o)
i.reset()
for(var u=1;t>u;u++)a=i.finalize(a),i.reset()
r.concat(a)}return r.sigBytes=4*c,r}})
e.EvpKDF=function(e,o,t){return i.create(t).compute(e,o)}}(),CryptoJS.lib.Cipher||function(e){var o=CryptoJS,t=o.lib,n=t.Base,i=t.WordArray,r=t.BufferedBlockAlgorithm,s=o.enc.Base64,c=o.algo.EvpKDF,a=t.Cipher=r.extend({cfg:n.extend(),createEncryptor:function(e,o){return this.create(this._ENC_XFORM_MODE,e,o)},createDecryptor:function(e,o){return this.create(this._DEC_XFORM_MODE,e,o)},init:function(e,o,t){this.cfg=this.cfg.extend(t),this._xformMode=e,this._key=o,this.reset()},reset:function(){r.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(o,t,n){return("string"==typeof t?p:f).encrypt(e,o,t,n)},decrypt:function(o,t,n){return("string"==typeof t?p:f).decrypt(e,o,t,n)}}}})
t.StreamCipher=a.extend({_doFinalize:function(){return this._process(!0)},blockSize:1})
var u=o.mode={},l=function(o,t,n){var i=this._iv
i?this._iv=e:i=this._prevBlock
for(var r=0;n>r;r++)o[t+r]^=i[r]},_=(t.BlockCipherMode=n.extend({createEncryptor:function(e,o){return this.Encryptor.create(e,o)},createDecryptor:function(e,o){return this.Decryptor.create(e,o)},init:function(e,o){this._cipher=e,this._iv=o}})).extend()
_.Encryptor=_.extend({processBlock:function(e,o){var t=this._cipher,n=t.blockSize
l.call(this,e,o,n),t.encryptBlock(e,o),this._prevBlock=e.slice(o,o+n)}}),_.Decryptor=_.extend({processBlock:function(e,o){var t=this._cipher,n=t.blockSize,i=e.slice(o,o+n)
t.decryptBlock(e,o),l.call(this,e,o,n),this._prevBlock=i}}),u=u.CBC=_,_=(o.pad={}).Pkcs7={pad:function(e,o){for(var t=4*o,t=t-e.sigBytes%t,n=t<<24|t<<16|t<<8|t,r=[],s=0;t>s;s+=4)r.push(n)
t=i.create(r,t),e.concat(t)},unpad:function(e){e.sigBytes-=255&e.words[e.sigBytes-1>>>2]}},t.BlockCipher=a.extend({cfg:a.cfg.extend({mode:u,padding:_}),reset:function(){a.reset.call(this)
var e=this.cfg,o=e.iv,e=e.mode
if(this._xformMode==this._ENC_XFORM_MODE)var t=e.createEncryptor
else t=e.createDecryptor,this._minBufferSize=1
this._mode=t.call(e,this,o&&o.words)},_doProcessBlock:function(e,o){this._mode.processBlock(e,o)},_doFinalize:function(){var e=this.cfg.padding
if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize)
var o=this._process(!0)}else o=this._process(!0),e.unpad(o)
return o},blockSize:4})
var d=t.CipherParams=n.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),u=(o.format={}).OpenSSL={stringify:function(e){var o=e.ciphertext
return e=e.salt,(e?i.create([1398893684,1701076831]).concat(e).concat(o):o).toString(s)},parse:function(e){e=s.parse(e)
var o=e.words
if(1398893684==o[0]&&1701076831==o[1]){var t=i.create(o.slice(2,4))
o.splice(0,4),e.sigBytes-=16}return d.create({ciphertext:e,salt:t})}},f=t.SerializableCipher=n.extend({cfg:n.extend({format:u}),encrypt:function(e,o,t,n){n=this.cfg.extend(n)
var i=e.createEncryptor(t,n)
return o=i.finalize(o),i=i.cfg,d.create({ciphertext:o,key:t,iv:i.iv,algorithm:e,mode:i.mode,padding:i.padding,blockSize:e.blockSize,formatter:n.format})},decrypt:function(e,o,t,n){return n=this.cfg.extend(n),o=this._parse(o,n.format),e.createDecryptor(t,n).finalize(o.ciphertext)},_parse:function(e,o){return"string"==typeof e?o.parse(e,this):e}}),o=(o.kdf={}).OpenSSL={execute:function(e,o,t,n){return n||(n=i.random(8)),e=c.create({keySize:o+t}).compute(e,n),t=i.create(e.words.slice(o),4*t),e.sigBytes=4*o,d.create({key:e,iv:t,salt:n})}},p=t.PasswordBasedCipher=f.extend({cfg:f.cfg.extend({kdf:o}),encrypt:function(e,o,t,n){return n=this.cfg.extend(n),t=n.kdf.execute(t,e.keySize,e.ivSize),n.iv=t.iv,e=f.encrypt.call(this,e,o,t.key,n),e.mixIn(t),e},decrypt:function(e,o,t,n){return n=this.cfg.extend(n),o=this._parse(o,n.format),t=n.kdf.execute(t,e.keySize,e.ivSize,o.salt),n.iv=t.iv,f.decrypt.call(this,e,o,t.key,n)}})}(),function(){for(var e=CryptoJS,o=e.lib.BlockCipher,t=e.algo,n=[],i=[],r=[],s=[],c=[],a=[],u=[],l=[],_=[],d=[],f=[],p=0;256>p;p++)f[p]=128>p?p<<1:p<<1^283
for(var h=0,y=0,p=0;256>p;p++){var S=y^y<<1^y<<2^y<<3^y<<4,S=S>>>8^255&S^99
n[h]=S,i[S]=h
var g=f[h],I=f[g],m=f[I],C=257*f[S]^16843008*S
r[h]=C<<24|C>>>8,s[h]=C<<16|C>>>16,c[h]=C<<8|C>>>24,a[h]=C,C=16843009*m^65537*I^257*g^16843008*h,u[S]=C<<24|C>>>8,l[S]=C<<16|C>>>16,_[S]=C<<8|C>>>24,d[S]=C,h?(h=g^f[f[f[m^g]]],y^=f[f[y]]):h=y=1}var v=[0,1,2,4,8,16,32,64,128,27,54],t=t.AES=o.extend({_doReset:function(){for(var e=this._key,o=e.words,t=e.sigBytes/4,e=4*((this._nRounds=t+6)+1),i=this._keySchedule=[],r=0;e>r;r++)if(t>r)i[r]=o[r]
else{var s=i[r-1]
r%t?t>6&&4==r%t&&(s=n[s>>>24]<<24|n[s>>>16&255]<<16|n[s>>>8&255]<<8|n[255&s]):(s=s<<8|s>>>24,s=n[s>>>24]<<24|n[s>>>16&255]<<16|n[s>>>8&255]<<8|n[255&s],s^=v[r/t|0]<<24),i[r]=i[r-t]^s}for(o=this._invKeySchedule=[],t=0;e>t;t++)r=e-t,s=t%4?i[r]:i[r-4],o[t]=4>t||4>=r?s:u[n[s>>>24]]^l[n[s>>>16&255]]^_[n[s>>>8&255]]^d[n[255&s]]},encryptBlock:function(e,o){this._doCryptBlock(e,o,this._keySchedule,r,s,c,a,n)},decryptBlock:function(e,o){var t=e[o+1]
e[o+1]=e[o+3],e[o+3]=t,this._doCryptBlock(e,o,this._invKeySchedule,u,l,_,d,i),t=e[o+1],e[o+1]=e[o+3],e[o+3]=t},_doCryptBlock:function(e,o,t,n,i,r,s,c){for(var a=this._nRounds,u=e[o]^t[0],l=e[o+1]^t[1],_=e[o+2]^t[2],d=e[o+3]^t[3],f=4,p=1;a>p;p++)var h=n[u>>>24]^i[l>>>16&255]^r[_>>>8&255]^s[255&d]^t[f++],y=n[l>>>24]^i[_>>>16&255]^r[d>>>8&255]^s[255&u]^t[f++],S=n[_>>>24]^i[d>>>16&255]^r[u>>>8&255]^s[255&l]^t[f++],d=n[d>>>24]^i[u>>>16&255]^r[l>>>8&255]^s[255&_]^t[f++],u=h,l=y,_=S
h=(c[u>>>24]<<24|c[l>>>16&255]<<16|c[_>>>8&255]<<8|c[255&d])^t[f++],y=(c[l>>>24]<<24|c[_>>>16&255]<<16|c[d>>>8&255]<<8|c[255&u])^t[f++],S=(c[_>>>24]<<24|c[d>>>16&255]<<16|c[u>>>8&255]<<8|c[255&l])^t[f++],d=(c[d>>>24]<<24|c[u>>>16&255]<<16|c[l>>>8&255]<<8|c[255&_])^t[f++],e[o]=h,e[o+1]=y,e[o+2]=S,e[o+3]=d},keySize:8})
e.AES=o._createHelper(t)}()
var CryptoJS=CryptoJS||function(e,o){var t={},n=t.lib={},i=function(){},r=n.Base={extend:function(e){i.prototype=this
var o=new i
return e&&o.mixIn(e),o.hasOwnProperty("init")||(o.init=function(){o.$super.init.apply(this,arguments)}),o.init.prototype=o,o.$super=this,o},create:function(){var e=this.extend()
return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var o in e)e.hasOwnProperty(o)&&(this[o]=e[o])
e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},s=n.WordArray=r.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=t!=o?t:4*e.length},toString:function(e){return(e||a).stringify(this)},concat:function(e){var o=this.words,t=e.words,n=this.sigBytes
if(e=e.sigBytes,this.clamp(),n%4)for(var i=0;e>i;i++)o[n+i>>>2]|=(t[i>>>2]>>>24-8*(i%4)&255)<<24-8*((n+i)%4)
else if(65535<t.length)for(i=0;e>i;i+=4)o[n+i>>>2]=t[i>>>2]
else o.push.apply(o,t)
return this.sigBytes+=e,this},clamp:function(){var o=this.words,t=this.sigBytes
o[t>>>2]&=4294967295<<32-8*(t%4),o.length=e.ceil(t/4)},clone:function(){var e=r.clone.call(this)
return e.words=this.words.slice(0),e},random:function(o){for(var t=[],n=0;o>n;n+=4)t.push(4294967296*e.random()|0)
return new s.init(t,o)}}),c=t.enc={},a=c.Hex={stringify:function(e){var o=e.words
e=e.sigBytes
for(var t=[],n=0;e>n;n++){var i=o[n>>>2]>>>24-8*(n%4)&255
t.push((i>>>4).toString(16)),t.push((15&i).toString(16))}return t.join("")},parse:function(e){for(var o=e.length,t=[],n=0;o>n;n+=2)t[n>>>3]|=parseInt(e.substr(n,2),16)<<24-4*(n%8)
return new s.init(t,o/2)}},u=c.Latin1={stringify:function(e){var o=e.words
e=e.sigBytes
for(var t=[],n=0;e>n;n++)t.push(String.fromCharCode(o[n>>>2]>>>24-8*(n%4)&255))
return t.join("")},parse:function(e){for(var o=e.length,t=[],n=0;o>n;n++)t[n>>>2]|=(255&e.charCodeAt(n))<<24-8*(n%4)
return new s.init(t,o)}},l=c.Utf8={stringify:function(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(o){throw Error("Malformed UTF-8 data")}},parse:function(e){return u.parse(unescape(encodeURIComponent(e)))}},_=n.BufferedBlockAlgorithm=r.extend({reset:function(){this._data=new s.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=l.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(o){var t=this._data,n=t.words,i=t.sigBytes,r=this.blockSize,c=i/(4*r),c=o?e.ceil(c):e.max((0|c)-this._minBufferSize,0)
if(o=c*r,i=e.min(4*o,i),o){for(var a=0;o>a;a+=r)this._doProcessBlock(n,a)
a=n.splice(0,o),t.sigBytes-=i}return new s.init(a,i)},clone:function(){var e=r.clone.call(this)
return e._data=this._data.clone(),e},_minBufferSize:0})
n.Hasher=_.extend({cfg:r.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){_.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(o,t){return new e.init(t).finalize(o)}},_createHmacHelper:function(e){return function(o,t){return new d.HMAC.init(e,t).finalize(o)}}})
var d=t.algo={}
return t}(Math)
!function(){var e=CryptoJS,o=e.lib.WordArray
e.enc.Base64={stringify:function(e){var o=e.words,t=e.sigBytes,n=this._map
e.clamp(),e=[]
for(var i=0;t>i;i+=3)for(var r=(o[i>>>2]>>>24-8*(i%4)&255)<<16|(o[i+1>>>2]>>>24-8*((i+1)%4)&255)<<8|o[i+2>>>2]>>>24-8*((i+2)%4)&255,s=0;4>s&&t>i+.75*s;s++)e.push(n.charAt(r>>>6*(3-s)&63))
if(o=n.charAt(64))for(;e.length%4;)e.push(o)
return e.join("")},parse:function(e){var t=e.length,n=this._map,i=n.charAt(64)
i&&(i=e.indexOf(i),-1!=i&&(t=i))
for(var i=[],r=0,s=0;t>s;s++)if(s%4){var c=n.indexOf(e.charAt(s-1))<<2*(s%4),a=n.indexOf(e.charAt(s))>>>6-2*(s%4)
i[r>>>2]|=(c|a)<<24-8*(r%4),r++}return o.create(i,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(e){function o(e,o,t,n,i,r,s){return e=e+(o&t|~o&n)+i+s,(e<<r|e>>>32-r)+o}function t(e,o,t,n,i,r,s){return e=e+(o&n|t&~n)+i+s,(e<<r|e>>>32-r)+o}function n(e,o,t,n,i,r,s){return e=e+(o^t^n)+i+s,(e<<r|e>>>32-r)+o}function i(e,o,t,n,i,r,s){return e=e+(t^(o|~n))+i+s,(e<<r|e>>>32-r)+o}for(var r=CryptoJS,s=r.lib,c=s.WordArray,a=s.Hasher,s=r.algo,u=[],l=0;64>l;l++)u[l]=4294967296*e.abs(e.sin(l+1))|0
s=s.MD5=a.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,r){for(var s=0;16>s;s++){var c=r+s,a=e[c]
e[c]=16711935&(a<<8|a>>>24)|4278255360&(a<<24|a>>>8)}var s=this._hash.words,c=e[r+0],a=e[r+1],l=e[r+2],_=e[r+3],d=e[r+4],f=e[r+5],p=e[r+6],h=e[r+7],y=e[r+8],S=e[r+9],g=e[r+10],I=e[r+11],m=e[r+12],C=e[r+13],v=e[r+14],B=e[r+15],O=s[0],T=s[1],M=s[2],D=s[3],O=o(O,T,M,D,c,7,u[0]),D=o(D,O,T,M,a,12,u[1]),M=o(M,D,O,T,l,17,u[2]),T=o(T,M,D,O,_,22,u[3]),O=o(O,T,M,D,d,7,u[4]),D=o(D,O,T,M,f,12,u[5]),M=o(M,D,O,T,p,17,u[6]),T=o(T,M,D,O,h,22,u[7]),O=o(O,T,M,D,y,7,u[8]),D=o(D,O,T,M,S,12,u[9]),M=o(M,D,O,T,g,17,u[10]),T=o(T,M,D,O,I,22,u[11]),O=o(O,T,M,D,m,7,u[12]),D=o(D,O,T,M,C,12,u[13]),M=o(M,D,O,T,v,17,u[14]),T=o(T,M,D,O,B,22,u[15]),O=t(O,T,M,D,a,5,u[16]),D=t(D,O,T,M,p,9,u[17]),M=t(M,D,O,T,I,14,u[18]),T=t(T,M,D,O,c,20,u[19]),O=t(O,T,M,D,f,5,u[20]),D=t(D,O,T,M,g,9,u[21]),M=t(M,D,O,T,B,14,u[22]),T=t(T,M,D,O,d,20,u[23]),O=t(O,T,M,D,S,5,u[24]),D=t(D,O,T,M,v,9,u[25]),M=t(M,D,O,T,_,14,u[26]),T=t(T,M,D,O,y,20,u[27]),O=t(O,T,M,D,C,5,u[28]),D=t(D,O,T,M,l,9,u[29]),M=t(M,D,O,T,h,14,u[30]),T=t(T,M,D,O,m,20,u[31]),O=n(O,T,M,D,f,4,u[32]),D=n(D,O,T,M,y,11,u[33]),M=n(M,D,O,T,I,16,u[34]),T=n(T,M,D,O,v,23,u[35]),O=n(O,T,M,D,a,4,u[36]),D=n(D,O,T,M,d,11,u[37]),M=n(M,D,O,T,h,16,u[38]),T=n(T,M,D,O,g,23,u[39]),O=n(O,T,M,D,C,4,u[40]),D=n(D,O,T,M,c,11,u[41]),M=n(M,D,O,T,_,16,u[42]),T=n(T,M,D,O,p,23,u[43]),O=n(O,T,M,D,S,4,u[44]),D=n(D,O,T,M,m,11,u[45]),M=n(M,D,O,T,B,16,u[46]),T=n(T,M,D,O,l,23,u[47]),O=i(O,T,M,D,c,6,u[48]),D=i(D,O,T,M,h,10,u[49]),M=i(M,D,O,T,v,15,u[50]),T=i(T,M,D,O,f,21,u[51]),O=i(O,T,M,D,m,6,u[52]),D=i(D,O,T,M,_,10,u[53]),M=i(M,D,O,T,g,15,u[54]),T=i(T,M,D,O,a,21,u[55]),O=i(O,T,M,D,y,6,u[56]),D=i(D,O,T,M,B,10,u[57]),M=i(M,D,O,T,p,15,u[58]),T=i(T,M,D,O,C,21,u[59]),O=i(O,T,M,D,d,6,u[60]),D=i(D,O,T,M,I,10,u[61]),M=i(M,D,O,T,l,15,u[62]),T=i(T,M,D,O,S,21,u[63])
s[0]=s[0]+O|0,s[1]=s[1]+T|0,s[2]=s[2]+M|0,s[3]=s[3]+D|0},_doFinalize:function(){var o=this._data,t=o.words,n=8*this._nDataBytes,i=8*o.sigBytes
t[i>>>5]|=128<<24-i%32
var r=e.floor(n/4294967296)
for(t[(i+64>>>9<<4)+15]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),t[(i+64>>>9<<4)+14]=16711935&(n<<8|n>>>24)|4278255360&(n<<24|n>>>8),o.sigBytes=4*(t.length+1),this._process(),o=this._hash,t=o.words,n=0;4>n;n++)i=t[n],t[n]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)
return o},clone:function(){var e=a.clone.call(this)
return e._hash=this._hash.clone(),e}}),r.MD5=a._createHelper(s),r.HmacMD5=a._createHmacHelper(s)}(Math),function(){var e=CryptoJS,o=e.lib,t=o.Base,n=o.WordArray,o=e.algo,i=o.EvpKDF=t.extend({cfg:t.extend({keySize:4,hasher:o.MD5,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,o){for(var t=this.cfg,i=t.hasher.create(),r=n.create(),s=r.words,c=t.keySize,t=t.iterations;s.length<c;){a&&i.update(a)
var a=i.update(e).finalize(o)
i.reset()
for(var u=1;t>u;u++)a=i.finalize(a),i.reset()
r.concat(a)}return r.sigBytes=4*c,r}})
e.EvpKDF=function(e,o,t){return i.create(t).compute(e,o)}}(),CryptoJS.lib.Cipher||function(e){var o=CryptoJS,t=o.lib,n=t.Base,i=t.WordArray,r=t.BufferedBlockAlgorithm,s=o.enc.Base64,c=o.algo.EvpKDF,a=t.Cipher=r.extend({cfg:n.extend(),createEncryptor:function(e,o){return this.create(this._ENC_XFORM_MODE,e,o)},createDecryptor:function(e,o){return this.create(this._DEC_XFORM_MODE,e,o)},init:function(e,o,t){this.cfg=this.cfg.extend(t),this._xformMode=e,this._key=o,this.reset()},reset:function(){r.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(o,t,n){return("string"==typeof t?p:f).encrypt(e,o,t,n)},decrypt:function(o,t,n){return("string"==typeof t?p:f).decrypt(e,o,t,n)}}}})
t.StreamCipher=a.extend({_doFinalize:function(){return this._process(!0)},blockSize:1})
var u=o.mode={},l=function(o,t,n){var i=this._iv
i?this._iv=e:i=this._prevBlock
for(var r=0;n>r;r++)o[t+r]^=i[r]},_=(t.BlockCipherMode=n.extend({createEncryptor:function(e,o){return this.Encryptor.create(e,o)},createDecryptor:function(e,o){return this.Decryptor.create(e,o)},init:function(e,o){this._cipher=e,this._iv=o}})).extend()
_.Encryptor=_.extend({processBlock:function(e,o){var t=this._cipher,n=t.blockSize
l.call(this,e,o,n),t.encryptBlock(e,o),this._prevBlock=e.slice(o,o+n)}}),_.Decryptor=_.extend({processBlock:function(e,o){var t=this._cipher,n=t.blockSize,i=e.slice(o,o+n)
t.decryptBlock(e,o),l.call(this,e,o,n),this._prevBlock=i}}),u=u.CBC=_,_=(o.pad={}).Pkcs7={pad:function(e,o){for(var t=4*o,t=t-e.sigBytes%t,n=t<<24|t<<16|t<<8|t,r=[],s=0;t>s;s+=4)r.push(n)
t=i.create(r,t),e.concat(t)},unpad:function(e){e.sigBytes-=255&e.words[e.sigBytes-1>>>2]}},t.BlockCipher=a.extend({cfg:a.cfg.extend({mode:u,padding:_}),reset:function(){a.reset.call(this)
var e=this.cfg,o=e.iv,e=e.mode
if(this._xformMode==this._ENC_XFORM_MODE)var t=e.createEncryptor
else t=e.createDecryptor,this._minBufferSize=1
this._mode=t.call(e,this,o&&o.words)},_doProcessBlock:function(e,o){this._mode.processBlock(e,o)},_doFinalize:function(){var e=this.cfg.padding
if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize)
var o=this._process(!0)}else o=this._process(!0),e.unpad(o)
return o},blockSize:4})
var d=t.CipherParams=n.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),u=(o.format={}).OpenSSL={stringify:function(e){var o=e.ciphertext
return e=e.salt,(e?i.create([1398893684,1701076831]).concat(e).concat(o):o).toString(s)},parse:function(e){e=s.parse(e)
var o=e.words
if(1398893684==o[0]&&1701076831==o[1]){var t=i.create(o.slice(2,4))
o.splice(0,4),e.sigBytes-=16}return d.create({ciphertext:e,salt:t})}},f=t.SerializableCipher=n.extend({cfg:n.extend({format:u}),encrypt:function(e,o,t,n){n=this.cfg.extend(n)
var i=e.createEncryptor(t,n)
return o=i.finalize(o),i=i.cfg,d.create({ciphertext:o,key:t,iv:i.iv,algorithm:e,mode:i.mode,padding:i.padding,blockSize:e.blockSize,formatter:n.format})},decrypt:function(e,o,t,n){return n=this.cfg.extend(n),o=this._parse(o,n.format),e.createDecryptor(t,n).finalize(o.ciphertext)},_parse:function(e,o){return"string"==typeof e?o.parse(e,this):e}}),o=(o.kdf={}).OpenSSL={execute:function(e,o,t,n){return n||(n=i.random(8)),e=c.create({keySize:o+t}).compute(e,n),t=i.create(e.words.slice(o),4*t),e.sigBytes=4*o,d.create({key:e,iv:t,salt:n})}},p=t.PasswordBasedCipher=f.extend({cfg:f.cfg.extend({kdf:o}),encrypt:function(e,o,t,n){return n=this.cfg.extend(n),t=n.kdf.execute(t,e.keySize,e.ivSize),n.iv=t.iv,e=f.encrypt.call(this,e,o,t.key,n),e.mixIn(t),e},decrypt:function(e,o,t,n){return n=this.cfg.extend(n),o=this._parse(o,n.format),t=n.kdf.execute(t,e.keySize,e.ivSize,o.salt),n.iv=t.iv,f.decrypt.call(this,e,o,t.key,n)}})}(),function(){function e(e,o){var t=(this._lBlock>>>e^this._rBlock)&o
this._rBlock^=t,this._lBlock^=t<<e}function o(e,o){var t=(this._rBlock>>>e^this._lBlock)&o
this._lBlock^=t,this._rBlock^=t<<e}var t=CryptoJS,n=t.lib,i=n.WordArray,n=n.BlockCipher,r=t.algo,s=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],c=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],a=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],u=[{0:8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{0:1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{0:260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{0:2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{0:128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{0:268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{0:1048576,16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{0:134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],l=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],_=r.DES=n.extend({_doReset:function(){for(var e=this._key.words,o=[],t=0;56>t;t++){var n=s[t]-1
o[t]=e[n>>>5]>>>31-n%32&1}for(e=this._subKeys=[],n=0;16>n;n++){for(var i=e[n]=[],r=a[n],t=0;24>t;t++)i[t/6|0]|=o[(c[t]-1+r)%28]<<31-t%6,i[4+(t/6|0)]|=o[28+(c[t+24]-1+r)%28]<<31-t%6
for(i[0]=i[0]<<1|i[0]>>>31,t=1;7>t;t++)i[t]>>>=4*(t-1)+3
i[7]=i[7]<<5|i[7]>>>27}for(o=this._invSubKeys=[],t=0;16>t;t++)o[t]=e[15-t]},encryptBlock:function(e,o){this._doCryptBlock(e,o,this._subKeys)},decryptBlock:function(e,o){this._doCryptBlock(e,o,this._invSubKeys)},_doCryptBlock:function(t,n,i){this._lBlock=t[n],this._rBlock=t[n+1],e.call(this,4,252645135),e.call(this,16,65535),o.call(this,2,858993459),o.call(this,8,16711935),e.call(this,1,1431655765)
for(var r=0;16>r;r++){for(var s=i[r],c=this._lBlock,a=this._rBlock,_=0,d=0;8>d;d++)_|=u[d][((a^s[d])&l[d])>>>0]
this._lBlock=a,this._rBlock=c^_}i=this._lBlock,this._lBlock=this._rBlock,this._rBlock=i,e.call(this,1,1431655765),o.call(this,8,16711935),o.call(this,2,858993459),e.call(this,16,65535),e.call(this,4,252645135),t[n]=this._lBlock,t[n+1]=this._rBlock},keySize:2,ivSize:2,blockSize:2})
t.DES=n._createHelper(_),r=r.TripleDES=n.extend({_doReset:function(){var e=this._key.words
this._des1=_.createEncryptor(i.create(e.slice(0,2))),this._des2=_.createEncryptor(i.create(e.slice(2,4))),this._des3=_.createEncryptor(i.create(e.slice(4,6)))},encryptBlock:function(e,o){this._des1.encryptBlock(e,o),this._des2.decryptBlock(e,o),this._des3.encryptBlock(e,o)},decryptBlock:function(e,o){this._des3.decryptBlock(e,o),this._des2.encryptBlock(e,o),this._des1.decryptBlock(e,o)},keySize:6,ivSize:2,blockSize:2}),t.TripleDES=n._createHelper(r)}(),CryptoJS.mode.ECB=function(){var e=CryptoJS.lib.BlockCipherMode.extend()
return e.Encryptor=e.extend({processBlock:function(e,o){this._cipher.encryptBlock(e,o)}}),e.Decryptor=e.extend({processBlock:function(e,o){this._cipher.decryptBlock(e,o)}}),e}()
var sdkDefine=sdkDefine||{},encrypt_iv="34F6f83CaC57865F",encrypt_key="0082D4FA04d85FfF",WS_ERR_BUSY="10001",WS_ERR_UNKNOWPACKAGE="10002",WS_PROTOCOL_DEFAULT=0,WS_PROTOCOL_QCMP=1,BIZ_ERR_INVALIDWS="3001",BIZ_ERR_INVALID_SYMBOL="3002",M_USER_TYPE="1",M_RETCODE_SUCCESS="0",M_RETCODE_FAIL="1",M_DATA_UNENCRYPT="0",M_DATA_ENCRYPT="1",M_HEARTBEAT=60,M_REQ_TIMEOUT=10,M_NOTIC_MAXROW=20,ACTION_ADD="1",ACTION_MODIFY="2",ACTION_DELETE="3",ACTION_QUERY="4",ACTION_CANCEL="5",M_Q_PWDKEY="1001",M_R_PWDKEY="1002",M_Q_LOGIN_GW="1003",M_R_LOGIN_GW="1004",M_Q_LOGIN="1005",M_R_LOGIN="1006",M_Q_LOGOUT="1007",M_R_LOGOUT="1008",M_Q_CHANGEPWD="1009",M_R_CHANGEPWD="1010",M_Q_LOGIN_ACC="1011",M_R_LOGIN_ACC="1012",M_Q_AMOUNT="2001",M_R_AMOUNT="2002",M_Q_HOLDBILL="2003",M_R_HOLDBILL="2004",M_Q_BINHOLDBILL="3203",M_R_BINHOLDBILL="3204",M_Q_LIMITBILL="2005",M_R_LIMITBILL="2006",M_Q_CLOSEBILL="2007",M_R_CLOSEBILL="2008",M_Q_SYMBOL="2009",M_R_SYMBOL="2010",M_Q_RULER="2011",M_R_RULER="2012",M_Q_NOTIC="2013",M_R_NOTIC="2014",M_Q_NOTICDETAIL="2015",M_R_NOTICDETAIL="2016",M_Q_TRADEPORT="2017",M_R_TRADEPORT="2018",M_Q_TOKENCHECK="2019",M_R_TOKENCHECK="2020",M_Q_SYMBOLPRICE="2021",M_R_SYMBOLPRICE="2022",M_Q_HIS_QUOTE="2023",M_R_HIS_QUOTE="2024",M_Q_HOLDPOSITION="2027",M_R_HOLDPOSITION="2028",M_Q_CER_INFO="2029",M_R_CER_INFO="2030",M_Q_INOUT_MONEY="2031",M_R_INOUT_MONEY="2032",M_Q_CANCEL_DW="2033",M_R_CANCEL_DW="2034",M_Q_AMOUNTINOUT="2035",M_R_AMOUNTINOUT="2036",M_Q_DELIVERY_ORDER="2037",M_R_DELIVERY_ORDER="2038",M_Q_POSITION_CLOSE_ORDER="2039",M_R_POSITION_CLOSE_ORDER="2040",M_Q_GROUP_CLOSE_ORDER="2041",M_R_GROUP_CLOSE_ORDER="2042",M_Q_MARKET_STATUS="2043",M_R_MARKET_STATUS="2044",M_Q_QTY_PAYPORT="2101",M_R_QTY_PAYPORT="2102",M_Q_QTY_SYS_PAYPORT="2103",M_R_QTY_SYS_PAYPORT="2104",M_Q_PAYPORT_REGIST="2105",M_R_PAYPORT_REGIST="2106",M_Q_PAYPORT_UNREGIST="2107",M_R_PAYPORT_UNREGIST="2108",M_Q_MARKETOPEN="3001",M_R_MARKETOPEN="3002",M_Q_BINMARKETOPEN="3209",M_R_BINMARKETOPEN="3210",M_Q_MARKETCLOSE="3003",M_R_MARKETCLOSE="3004",M_Q_LIMITOPEN="3005",M_R_LIMITOPEN="3006",M_Q_LIMITCLOSE="3007",M_R_LIMITCLOSE="3008",M_Q_LIMITUNDO="3009",M_R_LIMITUNDO="3010",M_Q_MODIFYORDER="3011",M_R_MODIFYORDER="3012",M_Q_CONTRACTS="3201",M_R_CONTRACTS="3202",M_R_PUSH_QUOTE="4002",M_R_PUSH_SYMBOLINFO="4004",PUSH_TRCOMPLETE="4006",PUSH_ACCCHANGE="4008",PUSH_SAMEUSER_LOGIN="4010",PUSH_BE_LOGOUT="4012",PUSH_HOLDBILLCHANGE="4016",PUSH_LIMITBILLCHANGE="4018",PUSH_CLOSEBILLCHANGE="4020",PUSH_POSITIONCHANGE="4022",PUSH_EXCHANGERATE="4024",PUSH_DW_CHANGE="4026",PUSH_SYMBOL_INFO="4028",PUSH_RISK_DOWN="4030",PUSH_RISK_UP="4032",PUSH_SPOTDELIVERY="4034",PUSH_BULLETIN="8002",PUSH_MODIFY_PASSWORD="4038",PUSH_PAYPORT_INFO="4040",PUSH_BANK_IN_URL="4042",PUSH_BINMARKETBILL="3208",M_Q_SUB_QUOTE="5001",M_R_SUB_QUOTE="5002",M_Q_UNSUB_QUOTE="5003",M_R_UNSUB_QUOTE="5004",eOT_MarketOpen="1",eOT_MarketClose="2",eOT_LimitOrder="3",eOT_StopOrder="4",eOT_LimitClose="5",eOT_CancelLimit="6",eOT_ModifyOrder="7",eOT_ForceClose="8",eOT_SystemCancel="9",eOT_DeliveryOrder="A",COT_FIFO="1",COT_LIFO="2",COT_TPFO="3",COT_SLFO="4",COT_ALLKL="5",COT_ALL="6",BSCODE_BUY="b",BSCODE_SELL="s",M_SYMBOLTYPE_NORMA="1",M_SYMBOLTYPE_INDIRECT="2",M_SYMBOLTYPE_INDIRECT_2="4",M_SYMBOLTYPE_CROSS="3"
console.log("load sdkDefine complete")
var procJSONP=[],sdk=null,WETBizSDK=function(){var _encrypt_key,_encrypt_iv,_modLoginInfo,_requires=[]
_requires.push("encrypt"),_requires.push("uiFunction"),_requires.push("sdkDefine"),_requires.push("websocket/webSocket"),_requires.push("Biz/IBiz"),_requires.push("Biz/BizTest"),_requires.push("Biz/BizLogin"),_requires.push("Biz/BizUserAccount"),_requires.push("Biz/BizSymbolInfo"),_requires.push("Biz/BizContracts"),_requires.push("Biz/BizCERInfo"),_requires.push("Biz/BizHoldBill"),_requires.push("Biz/BizLimitBill"),_requires.push("Biz/BizCloseBill"),_requires.push("Biz/BizHoldPosition"),_requires.push("Biz/BizOrder"),_requires.push("Biz/BizPayPort"),_requires.push("Biz/BizRegister"),_requires.push("Biz/BizBinHoldBill"),_requires.push("Biz/BizPassword")
var _wsLogin=null,_wsTC=null,_wsQuoted=null,_wsMSG=null,_callBackID=0,_symbolInfos=[],_accInfos=[],_exchangeRate=[],_holdBills=[],_binHoldBills=[],_limitBills=[],_holdPosition=[],_bankInfos=[],_contracts=[],_hostHisQuery="",_subscrib=[],_keepQuoted=!1,_onReady=null,_rootPath="./",_loadRequire=function(callBack){for(var root=_rootPath,i=0;i<_requires.length;i++){var fnName=_requires[i].split("/"),oFn=fnName[fnName.length-1]
switch(oFn){case"encrypt":oFn="CryptoJS"
break
case"sdkDefine":oFn="sdkDefine"}try{var func=eval(oFn)
console.log(oFn+" --> has "+typeof func)}catch(e){var fn=root+"/"+_requires[i]+".js",fileref=document.createElement("script")
fileref.setAttribute("type","text/javascript"),fileref.setAttribute("src",fn),void 0!==fileref&&document.getElementsByTagName("head")[0].appendChild(fileref)}}"function"==typeof callBack&&callBack.call()},_msgRote=function(e){var o=e.event
if(console.log("event : "+o),_subscrib[o]){for(var t=_subscrib[o],n=0;n<t.length;n++)if("function"==typeof t[n].fn){var i=t[n].scope||this
try{var r=e.data.children||[]
t[n].fn.call(i,r)}catch(s){console.log("wetbizsdk._msgRote  收到异常包")}}}else console.log("消息 : "+o+" 未订阅")
switch(o){case PUSH_SAMEUSER_LOGIN:_wsTC&&_wsTC.close(),_wsQuoted&&_keepQuoted===!1&&_wsQuoted.close()
for(var c in _subscrib)"4002"===c&&_keepQuoted===!0||delete _subscrib[c]}},_loginWithUserId=function(e){var o=this
_wsLogin=new webSocket({key:_encrypt_key,iv:_encrypt_iv,isEncrypt:M_DATA_ENCRYPT}),_wsLogin.open({url:e.urls[0],scope:o,onOpen:function(){var o=this
console.log("链接已建立")
var t=new BizLogin({webSocket:_wsLogin})
t.loginWithUID({uid:e.uid,pwd:e.pwd,vcode:e.vcode,onSuccess:function(t){_modLoginInfo=t,_modLoginInfo.uid=e.uid,_modLoginInfo.pwd=e.pwd,_modLoginInfo.userId=t.Uid,console.log(t),_loginTraderProxy.call(o,{onSuccess:e.onSuccess,onFailure:e.onFailure}),_wsLogin.close()},onFailure:e.onFailure})},onPush:function(){}})},_passwordChange=function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizPassword({webSocket:_wsTC})
o.changeUserPassword({pwdType:1,newPWD:e.newPWD,oldPWD:e.oldPWD,userId:e.userId,onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},_loginTraderProxy=function(e){var o=this
_wsTC=new webSocket({heartBeat:{interval:5e3,timeout:6e4,msg:""},key:_encrypt_key,iv:_encrypt_iv,isEncrypt:M_DATA_ENCRYPT}),_wsTC.open({url:_modLoginInfo.tradeproxy,onOpen:function(){var t=new BizLogin({webSocket:_wsTC})
t.loginWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,pwd:_modLoginInfo.pwd,onSuccess:function(t){_wsTC.token=t.token,_loginMsgProxy({onSuccess:e.onSuccess,onFailure:e.onFailure}),_loginHisQueryProxy({onSuccess:e.onSuccess,onFailure:e.onFailure}),o.queryAccount({onSuccess:function(){o.querySymbol({onSuccess:function(){o.queryCERInfo({onSuccess:function(){_loginQuotedProxy({onSuccess:e.onSuccess,onFailure:e.onFailure}),console.log("二元交易合约编号查询"),o.queryContracts({onSuccess:function(e){console.log(e)},onFailure:function(){}})},onFailure:e.onFailure})},onFailure:e.onFailure})},onFailure:e.onFailure})},onFailure:e.onFailure})},onClose:function(){console.log("TraderProxy is close"),_wsTC.reConnect()},onPush:function(e){_msgRote.call(o,e)}})},_loginQuotedProxy=function(e){var o=this,t=_modLoginInfo.new_quotedproxy||_modLoginInfo.quotedproxy,n=_modLoginInfo.new_quotedproxy?WS_PROTOCOL_QCMP:WS_PROTOCOL_DEFAULT
_wsQuoted=new webSocket({protocol:n,heartBeat:{interval:5e3,timeout:6e4,msg:""},key:_encrypt_key,iv:_encrypt_iv,isEncrypt:M_DATA_UNENCRYPT}),_wsQuoted.open({url:t,scope:o,onOpen:function(){if(_modLoginInfo.new_quotedproxy)e.onSuccess()
else{var o=new BizLogin({webSocket:_wsQuoted})
o.loginWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,pwd:_modLoginInfo.pwd,onSuccess:function(o){_wsQuoted.token=o.token,e.onSuccess()},onFailure:e.onFailure})}},onClose:function(){console.log("QuotedProxy is close")},onPush:function(e){var t=e.data.children
if(n===WS_PROTOCOL_QCMP){var i=t
t=[]
for(var r=0;r<i.length;r++){var s=i[r].split(","),c=o.sdk.uf.fmtDate(o.sdk.uf.Epoch2Date(new Date(parseInt(s[1])))),a={symbolCode:s[3],priceCurrent:parseFloat(s[4]),priceHighest:parseFloat(s[6]),priceLowest:parseFloat(s[7]),dailyHight:parseFloat(s[9]),dailyLow:parseFloat(s[10]),volume:parseFloat(s[11]),lastTime:c}
t.push(a)}}for(var u=[],r=0;r<t.length;r++){var l=t[r]
if(_symbolInfos[l.symbolCode]){_symbolInfos[l.symbolCode].lastTime=l.lastTime
var _=_symbolInfos[l.symbolCode],d=parseFloat(l.priceCurrent),f=_.decimal,p=Math.pow(10,f),h=_.pointAsk,y=_.pointBid,S=(d*p+h)/p,g=(d*p-y)/p
_symbolInfos[l.symbolCode].upOrDown=S*p-_.ask*p,_symbolInfos[l.symbolCode].ask=parseFloat(S),_symbolInfos[l.symbolCode].bid=parseFloat(g),_symbolInfos[l.symbolCode].priceCurrent=d,_symbolInfos[l.symbolCode].priceHighest=parseFloat(l.priceHighest),_symbolInfos[l.symbolCode].priceLowest=parseFloat(l.priceLowest),_symbolInfos[l.symbolCode].dailyHighest=parseFloat(l.dailyHight),_symbolInfos[l.symbolCode].dailyLowest=parseFloat(l.dailyLow),_symbolInfos[l.symbolCode].spread=Math.abs(h-y),u.push(_symbolInfos[l.symbolCode]),_updateHoldBill(_symbolInfos[l.symbolCode])}}if(_subscrib&&_subscrib[M_R_PUSH_QUOTE]&&u.length>0)for(var I=_subscrib[M_R_PUSH_QUOTE],r=0;r<I.length;r++)if("function"==typeof I[r].fn){var m=I[r].scope||this
I[r].fn.call(m,u)}}})},_loginMsgProxy=function(e){var o=this
_wsMSG=new webSocket({heartBeat:{interval:5e3,timeout:6e4,msg:""},key:_encrypt_key,iv:_encrypt_iv,isEncrypt:M_DATA_ENCRYPT}),_wsMSG.open({url:_modLoginInfo.messageProxy,onOpen:function(){var o=new BizLogin({webSocket:_wsMSG})
o.loginWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,pwd:_modLoginInfo.pwd,onSuccess:function(e){console.log("Message login success"),_wsMSG.token=e.token},onFailure:e.onFailure})},onClose:function(){console.log("MessageProxy is close"),_wsMSG.reConnect()},onPush:function(e){_msgRote.call(o,e)}})},_loginHisQueryProxy=function(){"http://"===_strLeft(_modLoginInfo.hisQueryProxy,7)&&(_hostHisQuery=_modLoginInfo.hisQueryProxy,console.log("HisQueryProxy login success"))},_getExchangeRate=function(e,o){var t=null,n=1
if(_exchangeRate){var i=e+"_"+o
t=_exchangeRate[i],t&&(n=t.exchangeRate)}return n},_calculateDynProfit=function(e,o,t,n,i,r){var s=0,c=1
c=n===BSCODE_BUY?1:-1
try{r===M_SYMBOLTYPE_NORMA?s=(e-o)*c*i*t:r===M_SYMBOLTYPE_INDIRECT&&(s=(1/e-1/o)*c*i*t)}catch(a){}finally{}return s},_holdBillDynProfit=function(e){var o=e.bsCode,t=_symbolInfos[e.symbolCode],n=o===BSCODE_BUY?t.bid:t.ask,i=e.priceHold,r=e.quantityHold,s=t.unit,c=t.symbolType,a=_getExchangeRate(t.symbolCurrency,t.accCurrency)
e.markPrice=n,e.dynProfitPrice=_calculateDynProfit(n,i,r,o,s,c),e.dynProfit=e.dynProfitPrice*a},_updateHoldBill=function(e){var o=[]
for(var t in _holdBills){var n=_holdBills[t]
if(n.symbolCode===e.symbolCode){_holdBillDynProfit(n,e),o.push(n)}}if(o.length>0&&_subscrib&&_subscrib[PUSH_HOLDBILLCHANGE])for(var i=_subscrib[PUSH_HOLDBILLCHANGE],r=0;r<i.length;r++)if("function"==typeof i[r].fn){var s=i[r].scope||this
i[r].fn.call(s,o)}},_getLimitType=function(e,o){var t=eOT_LimitOrder
return e===BSCODE_BUY&&0>o?t=eOT_LimitOrder:e===BSCODE_SELL&&o>0?t=eOT_LimitOrder:e===BSCODE_BUY&&o>0?t=eOT_StopOrder:e===BSCODE_SELL&&0>o&&(t=eOT_StopOrder),t},_strLeft=function(e,o){var t=e
return t=t.substring(0,o)},_strRight=function(e,o){var t=e
return t=t.substring(t.length-o,t.length)},_fmtDate=function(e){var o
return o=e.getFullYear()+"-",o+=_strRight("0"+(e.getMonth()+1),2)+"-",o+=_strRight("0"+e.getDate(),2)+" ",o+=_strRight("0"+e.getHours(),2)+":",o+=_strRight("0"+e.getMinutes(),2)+":",o+=_strRight("0"+e.getSeconds(),2)}
return{keepQuoted:function(e){_keepQuoted=e},uf:null,rootPath:"",init:function(e,o,t,n){var i=this
return i.setRoot(t),_rootPath&&0!==_rootPath.length?void _loadRequire.call(this,function(){var t=5,r=setInterval(function(){try{CryptoJS?(console.log("SDK 依赖项加载已完成！"),clearInterval(r),_encrypt_key=CryptoJS.enc.Latin1.parse(e),_encrypt_iv=CryptoJS.enc.Latin1.parse(o),i.uf=new uiFunction,_onReady&&_onReady.call(i),"function"==typeof n&&n.call()):t--}catch(s){t--}console.log("test CryptoJS"),0>=t&&(clearInterval(r),console.log("SDK 依赖项加载失败！"))},1e3)}):void console.log("未指定 SDK 根目录")},onReady:function(e){"function"==typeof e&&(_onReady=e)},setRoot:function(e){_rootPath=e},loginWithUserId:function(e){var o=this
_loginWithUserId.call(o,e)},logout:function(){console.log("logout be call")},passwordChange:function(e){var o=this
_passwordChange.call(o,e),console.log("passwordChange be call")},registUser:function(e){var o=new BizRegister({webSocket:_wsTC})
o.submit({method:"get",url:"../debug/testCall.php",mobile:e.mobile,password:e.password,vcode:e.vcode,token:"",onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},registOrg:function(){},queryTest:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizTest({webSocket:_wsTC})
o.loadDataWithSID({method:"get",url:"../debug/testCall.php",sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},getUserInfo:function(){return _modLoginInfo},queryAccount:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizUserAccount({webSocket:_wsTC})
o.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){for(var t=0;t<o.length;t++){var n=o[t],i="key_"+n.accId
n.userName=_modLoginInfo.userName,_accInfos[i]=n}"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},getAccount:function(e){var o=null
if(_accInfos){var t="key_"+e
if(o=_accInfos[t],!o)for(t in _accInfos){o=_accInfos[t]
break}}return o},querySymbol:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizSymbolInfo({webSocket:_wsTC})
o.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){_symbolInfos=[]
for(var t=0;t<o.length;t++){var n=o[t]
_symbolInfos[n.symbolCode]=n,_symbolInfos[n.symbolCode].lastTime=_symbolInfos[n.symbolCode].date,_symbolInfos[n.symbolCode].dailyHighest=_symbolInfos[n.symbolCode].priceHighest,_symbolInfos[n.symbolCode].dailyLowest=_symbolInfos[n.symbolCode].priceLowest,_symbolInfos[n.symbolCode].upOrDown=0,_symbolInfos[n.symbolCode].spread=Math.abs(n.pointAsk-n.pointBid)}"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},getSymbol:function(e){var o=null
return _symbolInfos&&(o=_symbolInfos[e]),o},getSymbols:function(e){var o=[]
for(var t in _symbolInfos){var n=_symbolInfos[t];(-1===e||e===n.accId)&&o.push(n)}return o},symbolId2Code:function(e){for(var o in _symbolInfos){var t=_symbolInfos[o]
if(e===t.symbolId)return t.symbolCode}return""},getContract:function(e){return _contracts[e]},queryContracts:function(e){var o=this
if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
if(!_symbolInfos)return void e.onFailure(BIZ_ERR_INVALIDWS,"商品信息未初始化")
var t=new BizContracts({webSocket:_wsTC})
t.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(t){for(var n=0;n<t.length;n++){var i=t[n],r=o.symbolId2Code(i.symbolId)
_contracts[r]||(_contracts[r]=[]),_contracts[r].push(i)}"function"==typeof e.onSuccess&&e.onSuccess(t)},onFailure:e.onFailure})},queryCERInfo:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizCERInfo({webSocket:_wsTC})
o.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){for(var t=0;t<o.length;t++){var n=o[t],i=n.currencyBase+"_"+n.currencyExchange
_exchangeRate[i]=n}"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},getExchangeRate:_getExchangeRate,queryHoldBill:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizHoldBill({webSocket:_wsTC})
o.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){for(var t=0;t<o.length;t++){var n=o[t],i=n.orderCode
_holdBills[i]=n,_holdBillDynProfit(n)}"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},queryBinHoldBill:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizBinHoldBill({webSocket:_wsTC})
o.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){for(var t=0;t<o.length;t++){var n=o[t],i=n.orderCode
_binHoldBills[i]=n}"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},getHoldBill:function(e){var o=null
return _holdBills&&(o=_holdBills[e]),o},queryHoldPosition:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizHoldPosition({webSocket:_wsTC})
o.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){for(var t=0;t<o.length;t++){var n=o[t],i=n.symbolCode
_holdPosition[i]=n}"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},getHoldPosition:function(e){var o=null
return _holdPosition&&(o=_holdPosition[e]),o},queryLimitBill:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizLimitBill({webSocket:_wsTC})
o.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){for(var t=0;t<o.length;t++){var n=o[t],i=n.orderCode
_limitBills[i]=n}"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},getLimitBill:function(e){var o=null
return _limitBills&&(o=_limitBills[e]),o},queryCloseBill:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizCloseBill({webSocket:_wsTC})
o.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},queryBinBill:function(){},queryHisQuoted:function(){},queryPayPort:function(e){if(!_wsTC)return void("function"==typeof e.onFailure&&e.onFailure(BIZ_ERR_INVALIDWS,"通讯组件未初始化"))
var o=new BizPayPort({webSocket:_wsTC})
o.loadDataWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,token:_modLoginInfo.token,onSuccess:function(o){_bankInfos=[]
for(var t=0;t<o.length;t++){var n=o[t],i="key_"+n.payPortId
_bankInfos[i]=n}"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})},getPayPortInfo:function(e){var o=null,t="key_"+e
return _bankInfos&&(o=_bankInfos[t]),o},getHisTradeLog:function(e){if(_hostHisQuery=e&&e.hisQueryProxy?e.hisQueryProxy:"http://192.168.1.108:20040/report_client/binaryoptionsorder"){var o="1"
""==e.startTime&&""==e.startTime&&(o="0")
var t=_hostHisQuery+"?bizData=",n=[{operator:"and",value:o,key:"isHistory"},{operator:"and",value:'("'+e.startTime+'","'+e.endTime+'")',key:"tradingday"}],i={order:"DESC",children:["orderTime"]},r={start:"0",limit:"20",page:"1"},s=this.getAccount(-1),c={accId:s.accId,userId:_modLoginInfo.userId,parames:n,pageCtrl:r,sort:i}
t+=encodeURIComponent(JSON.stringify(c)),jsonP(t,function(o){o&&o.bizRet&&"0"===o.bizRet&&"function"==typeof e.onSuccess&&(o.data.length>0&&(o.data[0].totalCount=o.totalCount),e.onSuccess(o.data))})}},marketOpen:function(e){var o=new BizOrder({requestCode:M_Q_MARKETOPEN,responseCode:M_R_MARKETOPEN,webSocket:_wsTC}),t=_symbolInfos[e.symbolCode]
if(t){var n={orderType:eOT_MarketOpen,symbolCode:e.symbolCode,orderQuantity:e.quantity,bsCode:e.bsCode,orderPrice:e.orderPrice,pointOffset:e.pointOffset,priceTakeProfit:e.priceTakeProfit,priceStopLose:e.priceStopLose,memo:e.memo,orderSerial:0,orderTime:_fmtDate(new Date),revQuantity:0,amId:0,cmDealerId:0,sendType:"",symbolId:t.symbolId,pointAsk:t.pointAsk,pointBid:t.pointBid,accId:t.accId,cutType:"",pickInfo:"",orderCode:"",orderCodeRe:"",validDateType:"0",validDate:""}
o.makeOrderWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,orderData:n,onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})}else e.onFailure&&e.onFailure(BIZ_ERR_INVALID_SYMBOL,"无效的交易商品")},marketCloseWithOrder:function(e){var o=new BizOrder({requestCode:M_Q_MARKETCLOSE,responseCode:M_R_MARKETCLOSE,webSocket:_wsTC}),t=e.orderInfo
if(t){var n=_symbolInfos[t.symbolCode],i=t.bsCode===BSCODE_BUY?BSCODE_SELL:BSCODE_BUY,r=t.bsCode===BSCODE_BUY?n.bid:n.ask,s={orderType:eOT_MarketClose,symbolCode:t.symbolCode,orderQuantity:e.quantity,bsCode:i,orderPrice:r,pointOffset:e.pointOffset,orderCodeRe:t.orderCode,revQuantity:e.revQuantity,memo:e.memo,priceTakeProfit:0,priceStopLose:0,orderSerial:0,amId:0,cmDealerId:0,sendType:"",orderTime:_fmtDate(new Date),symbolId:n.symbolId,pointAsk:n.pointAsk,pointBid:n.pointBid,accId:n.accId,cutType:"",pickInfo:"",orderCode:"",validDateType:"0",validDate:""}
o.makeOrderWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,orderData:s,onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})}else e.onFailure&&e.onFailure(BIZ_ERR_INVALID_SYMBOL,"无效单据信息")},marketCloseWithSymbol:function(e){var o=new BizOrder({requestCode:M_Q_POSITION_CLOSE_ORDER,responseCode:M_R_POSITION_CLOSE_ORDER,webSocket:_wsTC}),t=_symbolInfos[e.symbolCode]
if(t){var n=e.bsCode===BSCODE_BUY?t.bid:t.ask,i={orderType:eOT_MarketClose,symbolCode:e.symbolCode,orderQuantity:e.quantity,bsCode:e.bsCode,orderPrice:n,pointOffset:e.pointOffset,revQuantity:e.revQuantity,memo:e.memo,cutType:COT_FIFO,orderCodeRe:"",priceTakeProfit:0,priceStopLose:0,orderSerial:0,amId:0,cmDealerId:0,sendType:"",orderTime:_fmtDate(new Date),symbolId:t.symbolId,pointAsk:t.pointAsk,pointBid:t.pointBid,accId:t.accId,pickInfo:"",orderCode:"",validDateType:"0",validDate:""}
o.makeOrderWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,orderData:i,onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})}t||e.onFailure&&e.onFailure(BIZ_ERR_INVALID_SYMBOL,"无效的交易商品")},limitOpen:function(e){var o=new BizOrder({requestCode:M_Q_LIMITOPEN,responseCode:M_R_LIMITOPEN,webSocket:_wsTC}),t=_symbolInfos[e.symbolCode]
if(t){var n=e.orderPrice-(e.bsCode===BSCODE_BUY?t.ask:t.bid),i=_getLimitType(e.bsCode,n),r={orderType:i,symbolCode:e.symbolCode,orderQuantity:e.quantity,bsCode:e.bsCode,orderPrice:e.orderPrice,priceTakeProfit:e.priceTakeProfit,priceStopLose:e.priceStopLose,validDateType:e.validDateType,limitType:i,memo:e.memo,pointOffset:0,orderSerial:0,orderTime:_fmtDate(new Date),revQuantity:0,amId:0,cmDealerId:0,sendType:"",symbolId:t.symbolId,pointAsk:t.pointAsk,pointBid:t.pointBid,accId:t.accId,cutType:"",pickInfo:"",orderCode:"",orderCodeRe:"",validDate:""}
o.makeOrderWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,orderData:r,onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})}else e.onFailure&&e.onFailure(BIZ_ERR_INVALID_SYMBOL,"无效的交易商品")},modifyOrder:function(e){var o=new BizOrder({requestCode:M_Q_MODIFYORDER,responseCode:M_R_MODIFYORDER,webSocket:_wsTC}),t=e.orderInfo
if(t){var n=_symbolInfos[t.symbolCode],i={orderType:M_Q_MODIFYORDER,symbolCode:t.symbolCode,orderCode:t.orderCode,priceStopLose:e.priceStopLose,priceTakeProfit:e.priceTakeProfit,memo:e.memo,orderQuantity:0,bsCode:"",orderPrice:0,revQuantity:0,pointOffset:0,orderCodeRe:"",orderSerial:0,amId:0,cmDealerId:0,sendType:"",orderTime:_fmtDate(new Date),symbolId:n.symbolId,pointAsk:n.pointAsk,pointBid:n.pointBid,accId:n.accId,cutType:"",pickInfo:"",validDateType:"0",validDate:""}
o.makeOrderWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,orderData:i,onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})}else e.onFailure&&e.onFailure(BIZ_ERR_INVALID_SYMBOL,"无效单据信息")},cancelOrder:function(e){var o=new BizOrder({requestCode:M_Q_LIMITUNDO,responseCode:M_R_LIMITUNDO,webSocket:_wsTC}),t=e.orderInfo
if(t){var n=_symbolInfos[t.symbolCode],i=(t.bsCode===BSCODE_BUY?BSCODE_SELL:BSCODE_BUY,t.bsCode===BSCODE_BUY?n.bid:n.ask,{orderType:eOT_CancelLimit,symbolCode:t.symbolCode,orderCode:t.orderCode,memo:e.memo,orderQuantity:0,bsCode:"",orderPrice:0,pointOffset:0,orderCodeRe:"",revQuantity:0,priceTakeProfit:0,priceStopLose:0,orderSerial:0,amId:0,cmDealerId:0,sendType:"",orderTime:_fmtDate(new Date),symbolId:n.symbolId,pointAsk:n.pointAsk,pointBid:n.pointBid,accId:n.accId,cutType:"",pickInfo:"",validDateType:"0",validDate:""})
o.makeOrderWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,orderData:i,onSuccess:function(o){"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})}n||e.onFailure&&e.onFailure(BIZ_ERR_INVALID_SYMBOL,"无效的交易商品")},binOptionOpen:function(e){var o=new BizOrder({requestCode:M_Q_BINMARKETOPEN,responseCode:M_R_BINMARKETOPEN,webSocket:_wsTC}),t=_symbolInfos[e.symbolCode]
if(t){var n={orderType:eOT_MarketOpen,symbolCode:e.symbolCode,contract:"",orderQuantity:e.quantity,bsCode:e.bsCode,orderPrice:e.orderPrice,timeExpire:60,memo:e.memo,orderSerial:0,orderTime:_fmtDate(new Date),revQuantity:0,amId:0,cmDealerId:0,sendType:"",pointOffset:0,priceTakeProfit:0,priceStopLose:0,symbolId:t.symbolId,pointAsk:t.pointAsk,pointBid:t.pointBid,accId:t.accId,cutType:"",pickInfo:"",orderCode:"",orderCodeRe:"",validDateType:"0",validDate:"",pwd:"",marginCalculetType:"1",marginUsedCalc:"100",contractId:e.contractId}
o.makeOrderWithSID({sid:_modLoginInfo.sid,uid:_modLoginInfo.uid,orderData:n,onSuccess:function(o){console.log("111111"),console.log(o),"function"==typeof e.onSuccess&&e.onSuccess(o)},onFailure:e.onFailure})}else e.onFailure&&e.onFailure(BIZ_ERR_INVALID_SYMBOL,"无效的交易商品")},on:function(e,o,t){if("function"==typeof o){var n
n=_subscrib[e]?_subscrib[e]:[],_callBackID++,o.key="callback_"+_callBackID,n.push({fn:o,scope:t}),_subscrib[e]=n}},un:function(e,o){var t,n=0
if(_subscrib[e]){if(t=_subscrib[e],o)for(var i=0;i<t.length;i++)if(t[i].fn.key===o.key){n=i
break}t.splice(n,1),0===t.length&&delete _subscrib[e]}}}}()
sdk=WETBizSDK,console.log("load wetBizSDK complete")
