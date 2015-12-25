/**
 * Created by lmd on 2015/8/16.
 */
function BizBinHoldBill(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_BINHOLDBILL ;
    ret.response_code = M_R_BINHOLDBILL ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}

// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

function BizCERInfo(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_CER_INFO ;
    ret.response_code = M_R_CER_INFO ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}

//require(["dojo/ready","bizSDK/Biz/IBiz","bizSDK/sdkDefine"],function(ready){
//
//    ready(function(){
//
//        dojo.declare('BizCERInfo',IBiz,{
//            constructor : function(args) {
//                this._request_code  = M_Q_CER_INFO ;
//                this._response_code = M_R_CER_INFO ;
//            },
//
//            // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
//            pushData : function(rows) {
//                return rows ;
//            }
//        }) ;
//    }) ;
//}) ;
//

// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

function BizCloseBill(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_CLOSEBILL ;
    ret.response_code = M_R_CLOSEBILL ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}

//require(["dojo/ready","bizSDK/Biz/IBiz","bizSDK/sdkDefine"],function(ready){
//
//    ready(function(){
//
//        dojo.declare('BizCERInfo',IBiz,{
//            constructor : function(args) {
//                this._request_code  = M_Q_CER_INFO ;
//                this._response_code = M_R_CER_INFO ;
//            },
//
//            // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
//            pushData : function(rows) {
//                return rows ;
//            }
//        }) ;
//    }) ;
//}) ;
//

// -----------------------------------------------------------------------------
/**
 * Created by lmd on 2015/8/16.
 */
function BizContracts(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_CONTRACTS ;
    ret.response_code = M_R_CONTRACTS ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}
// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

function BizHoldBill(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_BINHOLDBILL ;
    ret.response_code = M_R_BINHOLDBILL ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}

//require(["dojo/ready","bizSDK/Biz/IBiz","bizSDK/sdkDefine"],function(ready){
//
//    ready(function(){
//
//        dojo.declare('BizCERInfo',IBiz,{
//            constructor : function(args) {
//                this._request_code  = M_Q_CER_INFO ;
//                this._response_code = M_R_CER_INFO ;
//            },
//
//            // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
//            pushData : function(rows) {
//                return rows ;
//            }
//        }) ;
//    }) ;
//}) ;
//

// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

function BizHoldPosition(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_HOLDPOSITION ;
    ret.response_code = M_R_HOLDPOSITION ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}

//require(["dojo/ready","bizSDK/Biz/IBiz","bizSDK/sdkDefine"],function(ready){
//
//    ready(function(){
//
//        dojo.declare('BizCERInfo',IBiz,{
//            constructor : function(args) {
//                this._request_code  = M_Q_CER_INFO ;
//                this._response_code = M_R_CER_INFO ;
//            },
//
//            // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
//            pushData : function(rows) {
//                return rows ;
//            }
//        }) ;
//    }) ;
//}) ;
//

// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

function BizLimitBill(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_LIMITBILL ;
    ret.response_code = M_R_LIMITBILL ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}

//require(["dojo/ready","bizSDK/Biz/IBiz","bizSDK/sdkDefine"],function(ready){
//
//    ready(function(){
//
//        dojo.declare('BizCERInfo',IBiz,{
//            constructor : function(args) {
//                this._request_code  = M_Q_CER_INFO ;
//                this._response_code = M_R_CER_INFO ;
//            },
//
//            // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
//            pushData : function(rows) {
//                return rows ;
//            }
//        }) ;
//    }) ;
//}) ;
//

// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

function BizLogin(args){

    var ret = new IBiz(args) ;
    ret.loginWithUID = function(args) {

        var me = this ;

        if (!me.ws) {
            if ( typeof args.onFailure === 'function' ) {
                args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
            }
            return  ;
        }

        var bizData = {
            'uid'      : args.uid,
            'pwd'      : args.pwd,
            'vcode'    : args.vcode,
            'userType' : M_USER_TYPE
        } ;

        var wet = {
            'event'    : M_Q_LOGIN_GW,
            'msgOrder' : me.getMsgOrder(),
            'encrypt'  : M_DATA_ENCRYPT,
            'data'     : bizData
        };

        me.ws.send({
            wetPackage : wet,
            onSuccess  : function(wetPackage) {
                if ( wetPackage.retCode===M_RETCODE_SUCCESS ) {
                    //var mod = {
                    //    tradeproxy   : wetPackage.data.tradeproxy,
                    //    quotedproxy  : wetPackage.data.quotedproxy,
                    //    new_quotedproxy  : wetPackage.data.new_quotedproxy,
                    //    hisQuoted    : wetPackage.data.hisQuoted,
                    //    messageProxy : wetPackage.data.messageProxy,
                    //    sid          : wetPackage.data.sid
                    //} ;

                    // TODO : for test
                    wetPackage.data.hisQueryProxy = 'http://120.24.159.238:14020/wetquery/report_client/binaryoptionsorder' ;
                    var mod = wetPackage.data ;

                    if ( typeof args.onSuccess === 'function' ) {
                        args.onSuccess(mod) ;
                    }

                }else{
                    if (typeof args.onFailure === 'function') {
                        args.onFailure(wetPackage.retCode,wetPackage.message) ;
                    }
                }
            },
            onFailure  : function(retCode,message) {
                if (typeof args.onFailure === 'function') {
                    args.onFailure(retCode,message) ;
                }
            }
        }) ;

    } ;

    ret.loginWithSID = function(args) {
        var me = this ;

        if (!me.ws) {
            if ( typeof args.onFailure === 'function' ) {
                args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
            }
            return  ;
        }

        var bizData = {
            'sid'      : args.sid,
            'uid'      : args.uid,
            'userId'   : args.uid,
            'pwd'      : args.pwd,
            'vcode'    : args.vcode,
            'userType' : M_USER_TYPE
        } ;

        var wet = {
            'event'    : M_Q_LOGIN,
            'msgOrder' : me.getMsgOrder(),
            'encrypt'  : M_DATA_UNENCRYPT,
            'data'     : bizData
        };

        me.ws.send({
            wetPackage : wet,
            onSuccess  : function(wetPackage) {
                if ( wetPackage.retCode===M_RETCODE_SUCCESS ) {
                    var mod = {
                        token : wetPackage.data.token
                    } ;

                    if ( typeof args.onSuccess === 'function' ) {
                        args.onSuccess(mod) ;
                    }

                }else{
                    if (typeof args.onFailure === 'function') {
                        args.onFailure(wetPackage.retCode,wetPackage.message) ;
                    }
                }
            },
            onFailure  : function(retCode,message) {
                if (typeof args.onFailure === 'function') {
                    args.onFailure(retCode,message) ;
                }
            }
        }) ;

    };


    return ret ;
}

//require(["dojo/ready","bizSDK/Biz/IBiz","bizSDK/sdkDefine"],function(ready){
//
//    ready(function(){
//
//        dojo.declare('BizLogin',IBiz,{
//
//            constructor : function(args) {
//            },
//
//            loginWithUID : function(args) {
//
//                var me = this ;
//
//                if (!me.ws) {
//                    if ( typeof args.onFailure === 'function' ) {
//                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
//                    }
//                    return  ;
//                }
//
//                var bizData = {
//                    'uid'      : args.uid,
//                    'pwd'      : args.pwd,
//                    'vcode'    : args.vcode,
//                    'userType' : M_USER_TYPE
//                } ;
//
//                var wet = {
//                    'event'    : M_Q_LOGIN_GW,
//                    'msgOrder' : me.getMsgOrder(),
//                    'encrypt'  : M_DATA_ENCRYPT,
//                    'data'     : bizData
//                };
//
//                me.ws.send({
//                    wetPackage : wet,
//                    onSuccess  : function(wetPackage) {
//                        if ( wetPackage.retCode===M_RETCODE_SUCCESS ) {
//                            var mod = {
//                                tradeproxy   : wetPackage.data.tradeproxy,
//                                quotedproxy  : wetPackage.data.quotedproxy,
//                                hisQuoted    : wetPackage.data.hisQuoted,
//                                messageProxy : wetPackage.data.messageProxy,
//                                sid          : wetPackage.data.sid
//                            } ;
//
//                            if ( typeof args.onSuccess === 'function' ) {
//                                args.onSuccess(mod) ;
//                            }
//
//                        }else{
//                            if (typeof args.onFailure === 'function') {
//                                args.onFailure(wetPackage.retCode,wetPackage.message) ;
//                            }
//                        }
//                    },
//                    onFailure  : function(retCode,message) {
//                        if (typeof args.onFailure === 'function') {
//                            args.onFailure(retCode,message) ;
//                        }
//                    }
//                }) ;
//
//            },
//
//            loginWithSID : function(args) {
//                var me = this ;
//
//                if (!me.ws) {
//                    if ( typeof args.onFailure === 'function' ) {
//                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
//                    }
//                    return  ;
//                }
//
//                var bizData = {
//                    'sid'      : args.sid,
//                    'uid'      : args.uid,
//                    'userId'   : args.uid,
//                    'pwd'      : args.pwd,
//                    'vcode'    : args.vcode,
//                    'userType' : M_USER_TYPE
//                } ;
//
//                var wet = {
//                    'event'    : M_Q_LOGIN,
//                    'msgOrder' : me.getMsgOrder(),
//                    'encrypt'  : M_DATA_UNENCRYPT,
//                    'data'     : bizData
//                };
//
//                me.ws.send({
//                    wetPackage : wet,
//                    onSuccess  : function(wetPackage) {
//                        if ( wetPackage.retCode===M_RETCODE_SUCCESS ) {
//                            var mod = {
//                                token : wetPackage.data.token
//                            } ;
//
//                            if ( typeof args.onSuccess === 'function' ) {
//                                args.onSuccess(mod) ;
//                            }
//
//                        }else{
//                            if (typeof args.onFailure === 'function') {
//                                args.onFailure(wetPackage.retCode,wetPackage.message) ;
//                            }
//                        }
//                    },
//                    onFailure  : function(retCode,message) {
//                        if (typeof args.onFailure === 'function') {
//                            args.onFailure(retCode,message) ;
//                        }
//                    }
//                }) ;
//
//            },
//
//            pushData : function() {}
//        }) ;
//    }) ;
//}) ;



// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

function BizOrder(args){
    var ret = new IBiz(args) ;
    var _request_code  = args.requestCode ;
    var _response_code = args.responseCode ;

    ret.makeOrderWithSID = function(args) {
        var me = this ;

        // 生成登录报文
        var bizData = {
            'uid'      : args.uid,
            'trUid'    : args.uid,
            'sid'      : args.sid,
            'action'   : ACTION_ADD,
            'children' : [args.orderData]
        } ;

        var wet = {
            'event'    : _request_code,
            'msgOrder' : me.getMsgOrder(),
            'encrypt'  : M_DATA_ENCRYPT,
            'data'     : bizData
        };

        me.ws.send({
            wetPackage : wet,
            onSuccess  : function(wetPackage) {
				console.log('wetPackage');
				console.log(wetPackage);
                if ( wetPackage.retCode===M_RETCODE_SUCCESS ) {

                    var rows = wetPackage.data.children ;

                    if ( typeof args.onSuccess === 'function' ) {
                        args.onSuccess(wetPackage.data);
                    }

                }else{
                    if (typeof args.onFailure === 'function') {
                        args.onFailure(wetPackage.retCode,wetPackage.message) ;
                    }
                }
            },
            onFailure  : function(retCode,message) {
                if (typeof args.onFailure === 'function') {
                    args.onFailure(retCode,message) ;
                }
            },
            onPush:function(){

            }
        }) ;

    } ;

    return ret ;

}

//require(["dojo/ready","bizSDK/Biz/IBiz","bizSDK/sdkDefine"],function(ready){
//
//    ready(function(){
//
//        dojo.declare('BizCERInfo',IBiz,{
//            constructor : function(args) {
//                this._request_code  = M_Q_CER_INFO ;
//                this._response_code = M_R_CER_INFO ;
//            },
//
//            // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
//            pushData : function(rows) {
//                return rows ;
//            }
//        }) ;
//    }) ;
//}) ;
//

// -----------------------------------------------------------------------------
/**
 * Created by lmd on 2015/9/2.
 */
function BizPassword(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_CHANGEPWD ;
    ret.response_code = M_R_CHANGEPWD ;

    ret.changeUserPassword = function(args) {
        var me = this ;

        // 生成登录报文
         var _Data = {
            'pwdType'  : "1",
            'newPWD'   : args.newPWD,
            'oldPWD'   : args.oldPWD,
            'userId'   : args.userId,
        } ;
		 var bizData = {
            'uid'      : args.uid,
            'trUid'    : args.uid,
            'sid'      : args.sid,
            'action'   : ACTION_ADD,
            'children' : [_Data]
        } ;

        var wet = {
            'event'    : M_Q_CHANGEPWD,
            'msgOrder' : me.getMsgOrder(),
            'encrypt'  : M_DATA_ENCRYPT,
            'data'     : bizData,
			'ver'      : '0.0'
			//'token'    : args.token
        };

        me.ws.send({
            wetPackage : wet,
            onSuccess  : function(wetPackage) {

                if ( wetPackage.retCode===M_RETCODE_SUCCESS ) {

                    var rows = wetPackage.data.children ;

                    if ( typeof args.onSuccess === 'function' ) {
                        args.onSuccess(wetPackage.data);
                    }

                }else{
                    if (typeof args.onFailure === 'function') {
                        args.onFailure(wetPackage.retCode,wetPackage.message) ;
                    }
                }
            },
            onFailure  : function(retCode,message) {
                if (typeof args.onFailure === 'function') {
                    args.onFailure(retCode,message) ;
                }
            },
            onPush:function(){

            }
        }) ;

    } ;

    return ret ;

}


// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/6/2.
 */

function BizPayPort(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_AMOUNT ;
    ret.response_code = M_R_AMOUNT ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}
// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/6/1.
 */

function BizRegister(args){

    var ret = new IBiz(args) ;

    var _request_code  = '10001' ;
    var _response_code = '10002' ;

    ret.submit = function(args) {
        var me = this ;

        var msgOrder = me.getMsgOrder() ;
        // 生成登录报文
        var bizData = {
            'mobile'   : args.mobile,
            'password' : args.password,
            'vcode'    : args.vcode,
            'action'   : ACTION_ADD,
            'children' : []
        } ;

        var wet = {
            'event'    : _request_code,
            'msgOrder' : msgOrder,
            'encrypt'  : M_DATA_ENCRYPT,
            'data'     : bizData
        };

        switch ( args.method )
        {
            case 'get' :
            case 'post' :
            {
                /*
                 if (options.type == "GET") {
                 xhr.open("GET", options.url + "?" + params, true);
                 xhr.send(null);
                 } else if (options.type == "POST") {
                 xhr.open("POST", options.url, true);
                 //设置表单提交时的内容类型
                 xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                 xhr.send(params);
                 }
                 * */
                if ( !args.url ) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '无效的URL参数设置');
                    }
                    return;
                }

                var xmlHttp = me.getXmlHttpObject() ;

                if ( !xmlHttp ) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '无法创建AJAX对象');
                    }
                    return;
                }

                var strJSON = JSON.stringify(wet) ;
                var url     = args.url ;

                // 将回调函数压入队列
                // TODO : 没有处理超时调用，会造成泄漏
                me.pushQueue(msgOrder,args.onSuccess,args.onFailure) ;

                url += "?jsonData=" + strJSON ;
                url += "&sid=" + Math.random();

                console.log(url) ;

                xmlHttp.onreadystatechange = function() {
                    if ( xmlHttp.readyState===4 )
                    {

                        //console.log(_xmlHttp.responseText) ;

                        var msg = JSON.parse( xmlHttp.responseText );

                        var handler = me.popQueue(msg.msgOrder) ;

                        if ( typeof msg === 'object' && msg.event ) {

                            // 匹配 MessageOrder ，如果没有则是服务端主动发起的推送消息
                            if (handler) {

                                if ( msg.retCode === M_RETCODE_SUCCESS ) {

                                    if ( typeof handler.onSuccess === 'function') {
                                        handler.onSuccess(msg) ;
                                    }
                                } else {
                                    if ( typeof handler.onFailure === 'function') {
                                        handler.onFailure(msg.retCode,msg.message) ;
                                    }
                                }

                            }else{
                            }

                        } else {

                            if ( handler && typeof handler.onFailure === 'function') {
                                handler.onFailure(WS_ERR_UNKNOWPACKAGE,'收到异常包') ;
                            }
                            console.log('收到异常包') ;
                        }


                    }else{

                    }
                };
                xmlHttp.open("GET",url,true);
                xmlHttp.send(null);

                break ;
            }
            case 'websocket' :
            default :
            {
                if (!me.ws) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return;
                }

                me.ws.send({
                    wetPackage : wet,
                    onSuccess  : function(wetPackage) {
                        if ( wetPackage.retCode===M_RETCODE_SUCCESS ) {

                            var rows = wetPackage.data.children ;

                            if ( typeof args.onSuccess === 'function' ) {
                                args.onSuccess(me.pushData(rows)) ;
                            }

                        }else{
                            if (typeof args.onFailure === 'function') {
                                args.onFailure(wetPackage.retCode,wetPackage.message) ;
                            }
                        }
                    },
                    onFailure  : function(retCode,message) {
                        if (typeof args.onFailure === 'function') {
                            args.onFailure(retCode,message) ;
                        }
                    }
                }) ;
            }
        }

    } ;

    return ret ;
}

// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

function BizSymbolInfo(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_SYMBOL ;
    ret.response_code = M_R_SYMBOL ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}

//require(["dojo/ready","bizSDK/Biz/IBiz","bizSDK/sdkDefine"],function(ready){
//
//    ready(function(){
//
//        dojo.declare('BizSymbolInfo',IBiz,{
//            constructor : function(args) {
//                this._request_code  = M_Q_SYMBOL ;
//                this._response_code = M_R_SYMBOL ;
//            },
//
//            // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
//            pushData : function(rows) {
//                return rows ;
//            }
//        }) ;
//    }) ;
//}) ;


// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/6/1.
 */

function BizTest(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_AMOUNT ;
    ret.response_code = M_R_AMOUNT ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}

// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

function BizUserAccount(args){
    var ret = new IBiz(args) ;
    ret.request_code  = M_Q_AMOUNT ;
    ret.response_code = M_R_AMOUNT ;

    // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
    ret.pushData = function(rows) {
        return rows ;
    } ;

    return ret ;

}

//require(["dojo/ready","bizSDK/Biz/IBiz","bizSDK/sdkDefine"],function(ready){
//
//    ready(function(){
//
//        dojo.declare('BizUserAccount',IBiz,{
//            constructor : function(args) {
//                this._request_code  = M_Q_AMOUNT ;
//                this._response_code = M_R_AMOUNT ;
//            },
//
//            // 这里可以对查询返回的数据进行预处理，然后再返回给调用者
//            pushData : function(rows) {
//                return rows ;
//            }
//        }) ;
//    }) ;
//}) ;



// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */
function IBiz(args) {

    if (!IBiz.prototype.statics) {
        IBiz.prototype.statics= { orderNo : 0 };
    }

    var _xmlHttp = null ;

    var _queue = [] ; // 回调函数队列

    // TODO : 这里存在泄漏问题，如果请求发出去没有回应，或回应的数据格式不是预期的格式，则队列里的回调记录不会被清除
    var _pushQueue = function(msgOrder,onSuccess,onFailure) {
        var key = 'queue_' + msgOrder ;
        _queue[key] = {
            onSuccess : onSuccess,
            onFailure : onFailure
        };
    };

    var _popQueue  = function(msgOrder) {
        var key = 'queue_' + msgOrder ;
        var ret = null ;
        if (_queue[key]) {
            ret = {
                onSuccess : _queue[key].onSuccess,
                onFailure : _queue[key].onFailure
            } ;

            delete _queue[key] ;
        }

        return ret ;
    };

    var _stateChanged = function() {

        // console.log('_xmlHttp.readyState = ' + _xmlHttp.readyState.toString()) ;

        if ( _xmlHttp.readyState===4 )
        {

            //console.log(_xmlHttp.responseText) ;

            var msg = JSON.parse(_xmlHttp.responseText);

            var handler = _popQueue(msg.msgOrder) ;

            if (typeof msg === 'object' && msg.event) {

                // 匹配 MessageOrder ，如果没有则是服务端主动发起的推送消息
                if (handler) {

                    if ( msg.retCode === M_RETCODE_SUCCESS ) {

                        if ( typeof handler.onSuccess === 'function') {
                            handler.onSuccess(msg) ;
                        }
                    } else {
                        if ( typeof handler.onFailure === 'function') {
                            handler.onFailure(msg.retCode,msg.message) ;
                        }
                    }

                }else{
                }

            } else {

                if ( handler && typeof handler.onFailure === 'function') {
                    handler.onFailure(WS_ERR_UNKNOWPACKAGE,'收到异常包') ;
                }
                console.log('收到异常包') ;
            }


        }else{

        }
    };

    var _getXmlHttpObject = function() {
        var xmlHttp=null;
        try
        {
            // Firefox, Opera 8.0+, Safari
            xmlHttp = new XMLHttpRequest();
        }
        catch (e)
        {
            // Internet Explorer
            try
            {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e)
            {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xmlHttp;
    } ;


    return {
        ws  : args.webSocket,

        popQueue : _popQueue,
        pushQueue : _pushQueue,

        getMsgOrder : function() {
            IBiz.prototype.statics.orderNo ++ ;
            return IBiz.prototype.statics.orderNo ;
        },

        getXmlHttpObject : _getXmlHttpObject,

        /**
         * @brief       通用数据查询接口
         * @param args
         */
        loadDataWithSID : function(args) {

            var me = this ;
            var msgOrder = me.getMsgOrder() ;

            var bizData = {
                'uid'      : args.uid,
                'sid'      : args.sid,
                'action'   : ACTION_QUERY
            } ;

            var wet = {
                'event'    : me.request_code,
                'msgOrder' : msgOrder,
                'encrypt'  : M_DATA_ENCRYPT,
                'data'     : bizData
            };

            switch (args.method)
            {
                case 'get' :
                case 'post' :
                {
                    /*
                     if (options.type == "GET") {
                     xhr.open("GET", options.url + "?" + params, true);
                     xhr.send(null);
                     } else if (options.type == "POST") {
                     xhr.open("POST", options.url, true);
                     //设置表单提交时的内容类型
                     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                     xhr.send(params);
                     }
                     * */
                    if (!args.url) {
                        if ( typeof args.onFailure === 'function') {
                            args.onFailure(BIZ_ERR_INVALIDWS, '无效的URL参数设置');
                        }
                        return;
                    }

                    _xmlHttp = _getXmlHttpObject() ;

                    if (!_xmlHttp) {
                        if ( typeof args.onFailure === 'function') {
                            args.onFailure(BIZ_ERR_INVALIDWS, '无法创建AJAX对象');
                        }
                        return;
                    }

                    var strJSON = JSON.stringify(wet) ;
                    var url     = args.url ;

                    // 将回调函数压入队列
                    _pushQueue(msgOrder,args.onSuccess,args.onFailure) ;

                    url += "?jsonData=" + strJSON ;
                    url += "&sid=" + Math.random();

                    _xmlHttp.onreadystatechange = _stateChanged;
                    _xmlHttp.open("GET",url,true);
                    _xmlHttp.send(null);

                    break ;
                }
                case 'websocket' :
                default :
                {
                    if (!me.ws) {
                        if ( typeof args.onFailure === 'function') {
                            args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                        }
                        return;
                    }

                    me.ws.send({
                        wetPackage : wet,
                        onSuccess  : function(wetPackage) {
                            if ( wetPackage.retCode===M_RETCODE_SUCCESS ) {

                                var rows = wetPackage.data.children ;

                                if ( typeof args.onSuccess === 'function' ) {
                                    args.onSuccess(me.pushData(rows)) ;
                                }

                            }else{
                                if (typeof args.onFailure === 'function') {
                                    args.onFailure(wetPackage.retCode,wetPackage.message) ;
                                }
                            }
                        },
                        onFailure  : function(retCode,message) {
                            if (typeof args.onFailure === 'function') {
                                args.onFailure(retCode,message) ;
                            }
                        }
                    }) ;
                }
            }

        },

        pushData : function() {}
    };
}

console.log('load IBiz complete') ;
// -----------------------------------------------------------------------------
/*
 CryptoJS v3.1.2
 code.google.com/p/crypto-js
 (c) 2009-2013 by Jeff Mott. All rights reserved.
 code.google.com/p/crypto-js/wiki/License
 */
var CryptoJS=CryptoJS||function(u,p){var d={},l=d.lib={},s=function(){},t=l.Base={extend:function(a){s.prototype=this;var c=new s;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
    r=l.WordArray=t.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=p?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,e=a.words,j=this.sigBytes;a=a.sigBytes;this.clamp();if(j%4)for(var k=0;k<a;k++)c[j+k>>>2]|=(e[k>>>2]>>>24-8*(k%4)&255)<<24-8*((j+k)%4);else if(65535<e.length)for(k=0;k<a;k+=4)c[j+k>>>2]=e[k>>>2];else c.push.apply(c,e);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
        32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=t.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],e=0;e<a;e+=4)c.push(4294967296*u.random()|0);return new r.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++){var k=c[j>>>2]>>>24-8*(j%4)&255;e.push((k>>>4).toString(16));e.push((k&15).toString(16))}return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j+=2)e[j>>>3]|=parseInt(a.substr(j,
        2),16)<<24-4*(j%8);return new r.init(e,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var e=[],j=0;j<a;j++)e.push(String.fromCharCode(c[j>>>2]>>>24-8*(j%4)&255));return e.join("")},parse:function(a){for(var c=a.length,e=[],j=0;j<c;j++)e[j>>>2]|=(a.charCodeAt(j)&255)<<24-8*(j%4);return new r.init(e,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
    q=l.BufferedBlockAlgorithm=t.extend({reset:function(){this._data=new r.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,e=c.words,j=c.sigBytes,k=this.blockSize,b=j/(4*k),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*k;j=u.min(4*a,j);if(a){for(var q=0;q<a;q+=k)this._doProcessBlock(e,q);q=e.splice(0,a);c.sigBytes-=j}return new r.init(q,j)},clone:function(){var a=t.clone.call(this);
        a._data=this._data.clone();return a},_minBufferSize:0});l.Hasher=q.extend({cfg:t.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){q.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,e){return(new a.init(e)).finalize(b)}},_createHmacHelper:function(a){return function(b,e){return(new n.HMAC.init(a,
    e)).finalize(b)}}});var n=d.algo={};return d}(Math);
(function(){var u=CryptoJS,p=u.lib.WordArray;u.enc.Base64={stringify:function(d){var l=d.words,p=d.sigBytes,t=this._map;d.clamp();d=[];for(var r=0;r<p;r+=3)for(var w=(l[r>>>2]>>>24-8*(r%4)&255)<<16|(l[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|l[r+2>>>2]>>>24-8*((r+2)%4)&255,v=0;4>v&&r+0.75*v<p;v++)d.push(t.charAt(w>>>6*(3-v)&63));if(l=t.charAt(64))for(;d.length%4;)d.push(l);return d.join("")},parse:function(d){var l=d.length,s=this._map,t=s.charAt(64);t&&(t=d.indexOf(t),-1!=t&&(l=t));for(var t=[],r=0,w=0;w<
    l;w++)if(w%4){var v=s.indexOf(d.charAt(w-1))<<2*(w%4),b=s.indexOf(d.charAt(w))>>>6-2*(w%4);t[r>>>2]|=(v|b)<<24-8*(r%4);r++}return p.create(t,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function p(b,n,a,c,e,j,k){b=b+(n&a|~n&c)+e+k;return(b<<j|b>>>32-j)+n}function d(b,n,a,c,e,j,k){b=b+(n&c|a&~c)+e+k;return(b<<j|b>>>32-j)+n}function l(b,n,a,c,e,j,k){b=b+(n^a^c)+e+k;return(b<<j|b>>>32-j)+n}function s(b,n,a,c,e,j,k){b=b+(a^(n|~c))+e+k;return(b<<j|b>>>32-j)+n}for(var t=CryptoJS,r=t.lib,w=r.WordArray,v=r.Hasher,r=t.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;r=r.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
    _doProcessBlock:function(q,n){for(var a=0;16>a;a++){var c=n+a,e=q[c];q[c]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360}var a=this._hash.words,c=q[n+0],e=q[n+1],j=q[n+2],k=q[n+3],z=q[n+4],r=q[n+5],t=q[n+6],w=q[n+7],v=q[n+8],A=q[n+9],B=q[n+10],C=q[n+11],u=q[n+12],D=q[n+13],E=q[n+14],x=q[n+15],f=a[0],m=a[1],g=a[2],h=a[3],f=p(f,m,g,h,c,7,b[0]),h=p(h,f,m,g,e,12,b[1]),g=p(g,h,f,m,j,17,b[2]),m=p(m,g,h,f,k,22,b[3]),f=p(f,m,g,h,z,7,b[4]),h=p(h,f,m,g,r,12,b[5]),g=p(g,h,f,m,t,17,b[6]),m=p(m,g,h,f,w,22,b[7]),
        f=p(f,m,g,h,v,7,b[8]),h=p(h,f,m,g,A,12,b[9]),g=p(g,h,f,m,B,17,b[10]),m=p(m,g,h,f,C,22,b[11]),f=p(f,m,g,h,u,7,b[12]),h=p(h,f,m,g,D,12,b[13]),g=p(g,h,f,m,E,17,b[14]),m=p(m,g,h,f,x,22,b[15]),f=d(f,m,g,h,e,5,b[16]),h=d(h,f,m,g,t,9,b[17]),g=d(g,h,f,m,C,14,b[18]),m=d(m,g,h,f,c,20,b[19]),f=d(f,m,g,h,r,5,b[20]),h=d(h,f,m,g,B,9,b[21]),g=d(g,h,f,m,x,14,b[22]),m=d(m,g,h,f,z,20,b[23]),f=d(f,m,g,h,A,5,b[24]),h=d(h,f,m,g,E,9,b[25]),g=d(g,h,f,m,k,14,b[26]),m=d(m,g,h,f,v,20,b[27]),f=d(f,m,g,h,D,5,b[28]),h=d(h,f,
            m,g,j,9,b[29]),g=d(g,h,f,m,w,14,b[30]),m=d(m,g,h,f,u,20,b[31]),f=l(f,m,g,h,r,4,b[32]),h=l(h,f,m,g,v,11,b[33]),g=l(g,h,f,m,C,16,b[34]),m=l(m,g,h,f,E,23,b[35]),f=l(f,m,g,h,e,4,b[36]),h=l(h,f,m,g,z,11,b[37]),g=l(g,h,f,m,w,16,b[38]),m=l(m,g,h,f,B,23,b[39]),f=l(f,m,g,h,D,4,b[40]),h=l(h,f,m,g,c,11,b[41]),g=l(g,h,f,m,k,16,b[42]),m=l(m,g,h,f,t,23,b[43]),f=l(f,m,g,h,A,4,b[44]),h=l(h,f,m,g,u,11,b[45]),g=l(g,h,f,m,x,16,b[46]),m=l(m,g,h,f,j,23,b[47]),f=s(f,m,g,h,c,6,b[48]),h=s(h,f,m,g,w,10,b[49]),g=s(g,h,f,m,
            E,15,b[50]),m=s(m,g,h,f,r,21,b[51]),f=s(f,m,g,h,u,6,b[52]),h=s(h,f,m,g,k,10,b[53]),g=s(g,h,f,m,B,15,b[54]),m=s(m,g,h,f,e,21,b[55]),f=s(f,m,g,h,v,6,b[56]),h=s(h,f,m,g,x,10,b[57]),g=s(g,h,f,m,t,15,b[58]),m=s(m,g,h,f,D,21,b[59]),f=s(f,m,g,h,z,6,b[60]),h=s(h,f,m,g,C,10,b[61]),g=s(g,h,f,m,j,15,b[62]),m=s(m,g,h,f,A,21,b[63]);a[0]=a[0]+f|0;a[1]=a[1]+m|0;a[2]=a[2]+g|0;a[3]=a[3]+h|0},_doFinalize:function(){var b=this._data,n=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;n[c>>>5]|=128<<24-c%32;var e=u.floor(a/
        4294967296);n[(c+64>>>9<<4)+15]=(e<<8|e>>>24)&16711935|(e<<24|e>>>8)&4278255360;n[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(n.length+1);this._process();b=this._hash;n=b.words;for(a=0;4>a;a++)c=n[a],n[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});t.MD5=v._createHelper(r);t.HmacMD5=v._createHmacHelper(r)})(Math);
(function(){var u=CryptoJS,p=u.lib,d=p.Base,l=p.WordArray,p=u.algo,s=p.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:p.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,r){for(var p=this.cfg,s=p.hasher.create(),b=l.create(),u=b.words,q=p.keySize,p=p.iterations;u.length<q;){n&&s.update(n);var n=s.update(d).finalize(r);s.reset();for(var a=1;a<p;a++)n=s.finalize(n),s.reset();b.concat(n)}b.sigBytes=4*q;return b}});u.EvpKDF=function(d,l,p){return s.create(p).compute(d,
    l)}})();
CryptoJS.lib.Cipher||function(u){var p=CryptoJS,d=p.lib,l=d.Base,s=d.WordArray,t=d.BufferedBlockAlgorithm,r=p.enc.Base64,w=p.algo.EvpKDF,v=d.Cipher=t.extend({cfg:l.extend(),createEncryptor:function(e,a){return this.create(this._ENC_XFORM_MODE,e,a)},createDecryptor:function(e,a){return this.create(this._DEC_XFORM_MODE,e,a)},init:function(e,a,b){this.cfg=this.cfg.extend(b);this._xformMode=e;this._key=a;this.reset()},reset:function(){t.reset.call(this);this._doReset()},process:function(e){this._append(e);return this._process()},
    finalize:function(e){e&&this._append(e);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(b,k,d){return("string"==typeof k?c:a).encrypt(e,b,k,d)},decrypt:function(b,k,d){return("string"==typeof k?c:a).decrypt(e,b,k,d)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=p.mode={},x=function(e,a,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var d=0;d<b;d++)e[a+d]^=
    c[d]},q=(d.BlockCipherMode=l.extend({createEncryptor:function(e,a){return this.Encryptor.create(e,a)},createDecryptor:function(e,a){return this.Decryptor.create(e,a)},init:function(e,a){this._cipher=e;this._iv=a}})).extend();q.Encryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize;x.call(this,e,a,c);b.encryptBlock(e,a);this._prevBlock=e.slice(a,a+c)}});q.Decryptor=q.extend({processBlock:function(e,a){var b=this._cipher,c=b.blockSize,d=e.slice(a,a+c);b.decryptBlock(e,a);x.call(this,
    e,a,c);this._prevBlock=d}});b=b.CBC=q;q=(p.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,d=c<<24|c<<16|c<<8|c,l=[],n=0;n<c;n+=4)l.push(d);c=s.create(l,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:q}),reset:function(){v.reset.call(this);var a=this.cfg,b=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var c=a.createEncryptor;else c=a.createDecryptor,this._minBufferSize=1;this._mode=c.call(a,
    this,b&&b.words)},_doProcessBlock:function(a,b){this._mode.processBlock(a,b)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var b=this._process(!0)}else b=this._process(!0),a.unpad(b);return b},blockSize:4});var n=d.CipherParams=l.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(p.format={}).OpenSSL={stringify:function(a){var b=a.ciphertext;a=a.salt;return(a?s.create([1398893684,
    1701076831]).concat(a).concat(b):b).toString(r)},parse:function(a){a=r.parse(a);var b=a.words;if(1398893684==b[0]&&1701076831==b[1]){var c=s.create(b.slice(2,4));b.splice(0,4);a.sigBytes-=16}return n.create({ciphertext:a,salt:c})}},a=d.SerializableCipher=l.extend({cfg:l.extend({format:b}),encrypt:function(a,b,c,d){d=this.cfg.extend(d);var l=a.createEncryptor(c,d);b=l.finalize(b);l=l.cfg;return n.create({ciphertext:b,key:c,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
    decrypt:function(a,b,c,d){d=this.cfg.extend(d);b=this._parse(b,d.format);return a.createDecryptor(c,d).finalize(b.ciphertext)},_parse:function(a,b){return"string"==typeof a?b.parse(a,this):a}}),p=(p.kdf={}).OpenSSL={execute:function(a,b,c,d){d||(d=s.random(8));a=w.create({keySize:b+c}).compute(a,d);c=s.create(a.words.slice(b),4*c);a.sigBytes=4*b;return n.create({key:a,iv:c,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:p}),encrypt:function(b,c,d,l){l=this.cfg.extend(l);d=l.kdf.execute(d,
    b.keySize,b.ivSize);l.iv=d.iv;b=a.encrypt.call(this,b,c,d.key,l);b.mixIn(d);return b},decrypt:function(b,c,d,l){l=this.cfg.extend(l);c=this._parse(c,l.format);d=l.kdf.execute(d,b.keySize,b.ivSize,c.salt);l.iv=d.iv;return a.decrypt.call(this,b,c,d.key,l)}})}();
(function(){for(var u=CryptoJS,p=u.lib.BlockCipher,d=u.algo,l=[],s=[],t=[],r=[],w=[],v=[],b=[],x=[],q=[],n=[],a=[],c=0;256>c;c++)a[c]=128>c?c<<1:c<<1^283;for(var e=0,j=0,c=0;256>c;c++){var k=j^j<<1^j<<2^j<<3^j<<4,k=k>>>8^k&255^99;l[e]=k;s[k]=e;var z=a[e],F=a[z],G=a[F],y=257*a[k]^16843008*k;t[e]=y<<24|y>>>8;r[e]=y<<16|y>>>16;w[e]=y<<8|y>>>24;v[e]=y;y=16843009*G^65537*F^257*z^16843008*e;b[k]=y<<24|y>>>8;x[k]=y<<16|y>>>16;q[k]=y<<8|y>>>24;n[k]=y;e?(e=z^a[a[a[G^z]]],j^=a[a[j]]):e=j=1}var H=[0,1,2,4,8,
    16,32,64,128,27,54],d=d.AES=p.extend({_doReset:function(){for(var a=this._key,c=a.words,d=a.sigBytes/4,a=4*((this._nRounds=d+6)+1),e=this._keySchedule=[],j=0;j<a;j++)if(j<d)e[j]=c[j];else{var k=e[j-1];j%d?6<d&&4==j%d&&(k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255]):(k=k<<8|k>>>24,k=l[k>>>24]<<24|l[k>>>16&255]<<16|l[k>>>8&255]<<8|l[k&255],k^=H[j/d|0]<<24);e[j]=e[j-d]^k}c=this._invKeySchedule=[];for(d=0;d<a;d++)j=a-d,k=d%4?e[j]:e[j-4],c[d]=4>d||4>=j?k:b[l[k>>>24]]^x[l[k>>>16&255]]^q[l[k>>>
    8&255]]^n[l[k&255]]},encryptBlock:function(a,b){this._doCryptBlock(a,b,this._keySchedule,t,r,w,v,l)},decryptBlock:function(a,c){var d=a[c+1];a[c+1]=a[c+3];a[c+3]=d;this._doCryptBlock(a,c,this._invKeySchedule,b,x,q,n,s);d=a[c+1];a[c+1]=a[c+3];a[c+3]=d},_doCryptBlock:function(a,b,c,d,e,j,l,f){for(var m=this._nRounds,g=a[b]^c[0],h=a[b+1]^c[1],k=a[b+2]^c[2],n=a[b+3]^c[3],p=4,r=1;r<m;r++)var q=d[g>>>24]^e[h>>>16&255]^j[k>>>8&255]^l[n&255]^c[p++],s=d[h>>>24]^e[k>>>16&255]^j[n>>>8&255]^l[g&255]^c[p++],t=
    d[k>>>24]^e[n>>>16&255]^j[g>>>8&255]^l[h&255]^c[p++],n=d[n>>>24]^e[g>>>16&255]^j[h>>>8&255]^l[k&255]^c[p++],g=q,h=s,k=t;q=(f[g>>>24]<<24|f[h>>>16&255]<<16|f[k>>>8&255]<<8|f[n&255])^c[p++];s=(f[h>>>24]<<24|f[k>>>16&255]<<16|f[n>>>8&255]<<8|f[g&255])^c[p++];t=(f[k>>>24]<<24|f[n>>>16&255]<<16|f[g>>>8&255]<<8|f[h&255])^c[p++];n=(f[n>>>24]<<24|f[g>>>16&255]<<16|f[h>>>8&255]<<8|f[k&255])^c[p++];a[b]=q;a[b+1]=s;a[b+2]=t;a[b+3]=n},keySize:8});u.AES=p._createHelper(d)})();

// ---------------

/*
 CryptoJS v3.1.2
 code.google.com/p/crypto-js
 (c) 2009-2013 by Jeff Mott. All rights reserved.
 code.google.com/p/crypto-js/wiki/License
 */
var CryptoJS=CryptoJS||function(u,l){var d={},n=d.lib={},p=function(){},s=n.Base={extend:function(a){p.prototype=this;var c=new p;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
    q=n.WordArray=s.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=l?c:4*a.length},toString:function(a){return(a||v).stringify(this)},concat:function(a){var c=this.words,m=a.words,f=this.sigBytes;a=a.sigBytes;this.clamp();if(f%4)for(var t=0;t<a;t++)c[f+t>>>2]|=(m[t>>>2]>>>24-8*(t%4)&255)<<24-8*((f+t)%4);else if(65535<m.length)for(t=0;t<a;t+=4)c[f+t>>>2]=m[t>>>2];else c.push.apply(c,m);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
        32-8*(c%4);a.length=u.ceil(c/4)},clone:function(){var a=s.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],m=0;m<a;m+=4)c.push(4294967296*u.random()|0);return new q.init(c,a)}}),w=d.enc={},v=w.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var m=[],f=0;f<a;f++){var t=c[f>>>2]>>>24-8*(f%4)&255;m.push((t>>>4).toString(16));m.push((t&15).toString(16))}return m.join("")},parse:function(a){for(var c=a.length,m=[],f=0;f<c;f+=2)m[f>>>3]|=parseInt(a.substr(f,
        2),16)<<24-4*(f%8);return new q.init(m,c/2)}},b=w.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var m=[],f=0;f<a;f++)m.push(String.fromCharCode(c[f>>>2]>>>24-8*(f%4)&255));return m.join("")},parse:function(a){for(var c=a.length,m=[],f=0;f<c;f++)m[f>>>2]|=(a.charCodeAt(f)&255)<<24-8*(f%4);return new q.init(m,c)}},x=w.Utf8={stringify:function(a){try{return decodeURIComponent(escape(b.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return b.parse(unescape(encodeURIComponent(a)))}},
    r=n.BufferedBlockAlgorithm=s.extend({reset:function(){this._data=new q.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=x.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,m=c.words,f=c.sigBytes,t=this.blockSize,b=f/(4*t),b=a?u.ceil(b):u.max((b|0)-this._minBufferSize,0);a=b*t;f=u.min(4*a,f);if(a){for(var e=0;e<a;e+=t)this._doProcessBlock(m,e);e=m.splice(0,a);c.sigBytes-=f}return new q.init(e,f)},clone:function(){var a=s.clone.call(this);
        a._data=this._data.clone();return a},_minBufferSize:0});n.Hasher=r.extend({cfg:s.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){r.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,m){return(new a.init(m)).finalize(c)}},_createHmacHelper:function(a){return function(c,m){return(new e.HMAC.init(a,
    m)).finalize(c)}}});var e=d.algo={};return d}(Math);
(function(){var u=CryptoJS,l=u.lib.WordArray;u.enc.Base64={stringify:function(d){var n=d.words,l=d.sigBytes,s=this._map;d.clamp();d=[];for(var q=0;q<l;q+=3)for(var w=(n[q>>>2]>>>24-8*(q%4)&255)<<16|(n[q+1>>>2]>>>24-8*((q+1)%4)&255)<<8|n[q+2>>>2]>>>24-8*((q+2)%4)&255,v=0;4>v&&q+0.75*v<l;v++)d.push(s.charAt(w>>>6*(3-v)&63));if(n=s.charAt(64))for(;d.length%4;)d.push(n);return d.join("")},parse:function(d){var n=d.length,p=this._map,s=p.charAt(64);s&&(s=d.indexOf(s),-1!=s&&(n=s));for(var s=[],q=0,w=0;w<
    n;w++)if(w%4){var v=p.indexOf(d.charAt(w-1))<<2*(w%4),b=p.indexOf(d.charAt(w))>>>6-2*(w%4);s[q>>>2]|=(v|b)<<24-8*(q%4);q++}return l.create(s,q)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}})();
(function(u){function l(b,e,a,c,m,f,t){b=b+(e&a|~e&c)+m+t;return(b<<f|b>>>32-f)+e}function d(b,e,a,c,m,f,t){b=b+(e&c|a&~c)+m+t;return(b<<f|b>>>32-f)+e}function n(b,e,a,c,m,f,t){b=b+(e^a^c)+m+t;return(b<<f|b>>>32-f)+e}function p(b,e,a,c,m,f,t){b=b+(a^(e|~c))+m+t;return(b<<f|b>>>32-f)+e}for(var s=CryptoJS,q=s.lib,w=q.WordArray,v=q.Hasher,q=s.algo,b=[],x=0;64>x;x++)b[x]=4294967296*u.abs(u.sin(x+1))|0;q=q.MD5=v.extend({_doReset:function(){this._hash=new w.init([1732584193,4023233417,2562383102,271733878])},
    _doProcessBlock:function(r,e){for(var a=0;16>a;a++){var c=e+a,m=r[c];r[c]=(m<<8|m>>>24)&16711935|(m<<24|m>>>8)&4278255360}var a=this._hash.words,c=r[e+0],m=r[e+1],f=r[e+2],t=r[e+3],y=r[e+4],q=r[e+5],s=r[e+6],w=r[e+7],v=r[e+8],u=r[e+9],x=r[e+10],z=r[e+11],A=r[e+12],B=r[e+13],C=r[e+14],D=r[e+15],g=a[0],h=a[1],j=a[2],k=a[3],g=l(g,h,j,k,c,7,b[0]),k=l(k,g,h,j,m,12,b[1]),j=l(j,k,g,h,f,17,b[2]),h=l(h,j,k,g,t,22,b[3]),g=l(g,h,j,k,y,7,b[4]),k=l(k,g,h,j,q,12,b[5]),j=l(j,k,g,h,s,17,b[6]),h=l(h,j,k,g,w,22,b[7]),
        g=l(g,h,j,k,v,7,b[8]),k=l(k,g,h,j,u,12,b[9]),j=l(j,k,g,h,x,17,b[10]),h=l(h,j,k,g,z,22,b[11]),g=l(g,h,j,k,A,7,b[12]),k=l(k,g,h,j,B,12,b[13]),j=l(j,k,g,h,C,17,b[14]),h=l(h,j,k,g,D,22,b[15]),g=d(g,h,j,k,m,5,b[16]),k=d(k,g,h,j,s,9,b[17]),j=d(j,k,g,h,z,14,b[18]),h=d(h,j,k,g,c,20,b[19]),g=d(g,h,j,k,q,5,b[20]),k=d(k,g,h,j,x,9,b[21]),j=d(j,k,g,h,D,14,b[22]),h=d(h,j,k,g,y,20,b[23]),g=d(g,h,j,k,u,5,b[24]),k=d(k,g,h,j,C,9,b[25]),j=d(j,k,g,h,t,14,b[26]),h=d(h,j,k,g,v,20,b[27]),g=d(g,h,j,k,B,5,b[28]),k=d(k,g,
            h,j,f,9,b[29]),j=d(j,k,g,h,w,14,b[30]),h=d(h,j,k,g,A,20,b[31]),g=n(g,h,j,k,q,4,b[32]),k=n(k,g,h,j,v,11,b[33]),j=n(j,k,g,h,z,16,b[34]),h=n(h,j,k,g,C,23,b[35]),g=n(g,h,j,k,m,4,b[36]),k=n(k,g,h,j,y,11,b[37]),j=n(j,k,g,h,w,16,b[38]),h=n(h,j,k,g,x,23,b[39]),g=n(g,h,j,k,B,4,b[40]),k=n(k,g,h,j,c,11,b[41]),j=n(j,k,g,h,t,16,b[42]),h=n(h,j,k,g,s,23,b[43]),g=n(g,h,j,k,u,4,b[44]),k=n(k,g,h,j,A,11,b[45]),j=n(j,k,g,h,D,16,b[46]),h=n(h,j,k,g,f,23,b[47]),g=p(g,h,j,k,c,6,b[48]),k=p(k,g,h,j,w,10,b[49]),j=p(j,k,g,h,
            C,15,b[50]),h=p(h,j,k,g,q,21,b[51]),g=p(g,h,j,k,A,6,b[52]),k=p(k,g,h,j,t,10,b[53]),j=p(j,k,g,h,x,15,b[54]),h=p(h,j,k,g,m,21,b[55]),g=p(g,h,j,k,v,6,b[56]),k=p(k,g,h,j,D,10,b[57]),j=p(j,k,g,h,s,15,b[58]),h=p(h,j,k,g,B,21,b[59]),g=p(g,h,j,k,y,6,b[60]),k=p(k,g,h,j,z,10,b[61]),j=p(j,k,g,h,f,15,b[62]),h=p(h,j,k,g,u,21,b[63]);a[0]=a[0]+g|0;a[1]=a[1]+h|0;a[2]=a[2]+j|0;a[3]=a[3]+k|0},_doFinalize:function(){var b=this._data,e=b.words,a=8*this._nDataBytes,c=8*b.sigBytes;e[c>>>5]|=128<<24-c%32;var m=u.floor(a/
        4294967296);e[(c+64>>>9<<4)+15]=(m<<8|m>>>24)&16711935|(m<<24|m>>>8)&4278255360;e[(c+64>>>9<<4)+14]=(a<<8|a>>>24)&16711935|(a<<24|a>>>8)&4278255360;b.sigBytes=4*(e.length+1);this._process();b=this._hash;e=b.words;for(a=0;4>a;a++)c=e[a],e[a]=(c<<8|c>>>24)&16711935|(c<<24|c>>>8)&4278255360;return b},clone:function(){var b=v.clone.call(this);b._hash=this._hash.clone();return b}});s.MD5=v._createHelper(q);s.HmacMD5=v._createHmacHelper(q)})(Math);
(function(){var u=CryptoJS,l=u.lib,d=l.Base,n=l.WordArray,l=u.algo,p=l.EvpKDF=d.extend({cfg:d.extend({keySize:4,hasher:l.MD5,iterations:1}),init:function(d){this.cfg=this.cfg.extend(d)},compute:function(d,l){for(var p=this.cfg,v=p.hasher.create(),b=n.create(),u=b.words,r=p.keySize,p=p.iterations;u.length<r;){e&&v.update(e);var e=v.update(d).finalize(l);v.reset();for(var a=1;a<p;a++)e=v.finalize(e),v.reset();b.concat(e)}b.sigBytes=4*r;return b}});u.EvpKDF=function(d,l,n){return p.create(n).compute(d,
    l)}})();
CryptoJS.lib.Cipher||function(u){var l=CryptoJS,d=l.lib,n=d.Base,p=d.WordArray,s=d.BufferedBlockAlgorithm,q=l.enc.Base64,w=l.algo.EvpKDF,v=d.Cipher=s.extend({cfg:n.extend(),createEncryptor:function(m,a){return this.create(this._ENC_XFORM_MODE,m,a)},createDecryptor:function(m,a){return this.create(this._DEC_XFORM_MODE,m,a)},init:function(m,a,b){this.cfg=this.cfg.extend(b);this._xformMode=m;this._key=a;this.reset()},reset:function(){s.reset.call(this);this._doReset()},process:function(a){this._append(a);return this._process()},
    finalize:function(a){a&&this._append(a);return this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(m){return{encrypt:function(f,b,e){return("string"==typeof b?c:a).encrypt(m,f,b,e)},decrypt:function(f,b,e){return("string"==typeof b?c:a).decrypt(m,f,b,e)}}}});d.StreamCipher=v.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var b=l.mode={},x=function(a,f,b){var c=this._iv;c?this._iv=u:c=this._prevBlock;for(var e=0;e<b;e++)a[f+e]^=
    c[e]},r=(d.BlockCipherMode=n.extend({createEncryptor:function(a,f){return this.Encryptor.create(a,f)},createDecryptor:function(a,f){return this.Decryptor.create(a,f)},init:function(a,f){this._cipher=a;this._iv=f}})).extend();r.Encryptor=r.extend({processBlock:function(a,f){var b=this._cipher,c=b.blockSize;x.call(this,a,f,c);b.encryptBlock(a,f);this._prevBlock=a.slice(f,f+c)}});r.Decryptor=r.extend({processBlock:function(a,b){var c=this._cipher,e=c.blockSize,d=a.slice(b,b+e);c.decryptBlock(a,b);x.call(this,
    a,b,e);this._prevBlock=d}});b=b.CBC=r;r=(l.pad={}).Pkcs7={pad:function(a,b){for(var c=4*b,c=c-a.sigBytes%c,e=c<<24|c<<16|c<<8|c,d=[],l=0;l<c;l+=4)d.push(e);c=p.create(d,c);a.concat(c)},unpad:function(a){a.sigBytes-=a.words[a.sigBytes-1>>>2]&255}};d.BlockCipher=v.extend({cfg:v.cfg.extend({mode:b,padding:r}),reset:function(){v.reset.call(this);var a=this.cfg,c=a.iv,a=a.mode;if(this._xformMode==this._ENC_XFORM_MODE)var b=a.createEncryptor;else b=a.createDecryptor,this._minBufferSize=1;this._mode=b.call(a,
    this,c&&c.words)},_doProcessBlock:function(a,c){this._mode.processBlock(a,c)},_doFinalize:function(){var a=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){a.pad(this._data,this.blockSize);var c=this._process(!0)}else c=this._process(!0),a.unpad(c);return c},blockSize:4});var e=d.CipherParams=n.extend({init:function(a){this.mixIn(a)},toString:function(a){return(a||this.formatter).stringify(this)}}),b=(l.format={}).OpenSSL={stringify:function(a){var c=a.ciphertext;a=a.salt;return(a?p.create([1398893684,
    1701076831]).concat(a).concat(c):c).toString(q)},parse:function(a){a=q.parse(a);var c=a.words;if(1398893684==c[0]&&1701076831==c[1]){var b=p.create(c.slice(2,4));c.splice(0,4);a.sigBytes-=16}return e.create({ciphertext:a,salt:b})}},a=d.SerializableCipher=n.extend({cfg:n.extend({format:b}),encrypt:function(a,c,b,d){d=this.cfg.extend(d);var l=a.createEncryptor(b,d);c=l.finalize(c);l=l.cfg;return e.create({ciphertext:c,key:b,iv:l.iv,algorithm:a,mode:l.mode,padding:l.padding,blockSize:a.blockSize,formatter:d.format})},
    decrypt:function(a,c,b,e){e=this.cfg.extend(e);c=this._parse(c,e.format);return a.createDecryptor(b,e).finalize(c.ciphertext)},_parse:function(a,c){return"string"==typeof a?c.parse(a,this):a}}),l=(l.kdf={}).OpenSSL={execute:function(a,c,b,d){d||(d=p.random(8));a=w.create({keySize:c+b}).compute(a,d);b=p.create(a.words.slice(c),4*b);a.sigBytes=4*c;return e.create({key:a,iv:b,salt:d})}},c=d.PasswordBasedCipher=a.extend({cfg:a.cfg.extend({kdf:l}),encrypt:function(c,b,e,d){d=this.cfg.extend(d);e=d.kdf.execute(e,
    c.keySize,c.ivSize);d.iv=e.iv;c=a.encrypt.call(this,c,b,e.key,d);c.mixIn(e);return c},decrypt:function(c,b,e,d){d=this.cfg.extend(d);b=this._parse(b,d.format);e=d.kdf.execute(e,c.keySize,c.ivSize,b.salt);d.iv=e.iv;return a.decrypt.call(this,c,b,e.key,d)}})}();
(function(){function u(b,a){var c=(this._lBlock>>>b^this._rBlock)&a;this._rBlock^=c;this._lBlock^=c<<b}function l(b,a){var c=(this._rBlock>>>b^this._lBlock)&a;this._lBlock^=c;this._rBlock^=c<<b}var d=CryptoJS,n=d.lib,p=n.WordArray,n=n.BlockCipher,s=d.algo,q=[57,49,41,33,25,17,9,1,58,50,42,34,26,18,10,2,59,51,43,35,27,19,11,3,60,52,44,36,63,55,47,39,31,23,15,7,62,54,46,38,30,22,14,6,61,53,45,37,29,21,13,5,28,20,12,4],w=[14,17,11,24,1,5,3,28,15,6,21,10,23,19,12,4,26,8,16,7,27,20,13,2,41,52,31,37,47,
    55,30,40,51,45,33,48,44,49,39,56,34,53,46,42,50,36,29,32],v=[1,2,4,6,8,10,12,14,15,17,19,21,23,25,27,28],b=[{"0":8421888,268435456:32768,536870912:8421378,805306368:2,1073741824:512,1342177280:8421890,1610612736:8389122,1879048192:8388608,2147483648:514,2415919104:8389120,2684354560:33280,2952790016:8421376,3221225472:32770,3489660928:8388610,3758096384:0,4026531840:33282,134217728:0,402653184:8421890,671088640:33282,939524096:32768,1207959552:8421888,1476395008:512,1744830464:8421378,2013265920:2,
    2281701376:8389120,2550136832:33280,2818572288:8421376,3087007744:8389122,3355443200:8388610,3623878656:32770,3892314112:514,4160749568:8388608,1:32768,268435457:2,536870913:8421888,805306369:8388608,1073741825:8421378,1342177281:33280,1610612737:512,1879048193:8389122,2147483649:8421890,2415919105:8421376,2684354561:8388610,2952790017:33282,3221225473:514,3489660929:8389120,3758096385:32770,4026531841:0,134217729:8421890,402653185:8421376,671088641:8388608,939524097:512,1207959553:32768,1476395009:8388610,
    1744830465:2,2013265921:33282,2281701377:32770,2550136833:8389122,2818572289:514,3087007745:8421888,3355443201:8389120,3623878657:0,3892314113:33280,4160749569:8421378},{"0":1074282512,16777216:16384,33554432:524288,50331648:1074266128,67108864:1073741840,83886080:1074282496,100663296:1073758208,117440512:16,134217728:540672,150994944:1073758224,167772160:1073741824,184549376:540688,201326592:524304,218103808:0,234881024:16400,251658240:1074266112,8388608:1073758208,25165824:540688,41943040:16,58720256:1073758224,
    75497472:1074282512,92274688:1073741824,109051904:524288,125829120:1074266128,142606336:524304,159383552:0,176160768:16384,192937984:1074266112,209715200:1073741840,226492416:540672,243269632:1074282496,260046848:16400,268435456:0,285212672:1074266128,301989888:1073758224,318767104:1074282496,335544320:1074266112,352321536:16,369098752:540688,385875968:16384,402653184:16400,419430400:524288,436207616:524304,452984832:1073741840,469762048:540672,486539264:1073758208,503316480:1073741824,520093696:1074282512,
    276824064:540688,293601280:524288,310378496:1074266112,327155712:16384,343932928:1073758208,360710144:1074282512,377487360:16,394264576:1073741824,411041792:1074282496,427819008:1073741840,444596224:1073758224,461373440:524304,478150656:0,494927872:16400,511705088:1074266128,528482304:540672},{"0":260,1048576:0,2097152:67109120,3145728:65796,4194304:65540,5242880:67108868,6291456:67174660,7340032:67174400,8388608:67108864,9437184:67174656,10485760:65792,11534336:67174404,12582912:67109124,13631488:65536,
    14680064:4,15728640:256,524288:67174656,1572864:67174404,2621440:0,3670016:67109120,4718592:67108868,5767168:65536,6815744:65540,7864320:260,8912896:4,9961472:256,11010048:67174400,12058624:65796,13107200:65792,14155776:67109124,15204352:67174660,16252928:67108864,16777216:67174656,17825792:65540,18874368:65536,19922944:67109120,20971520:256,22020096:67174660,23068672:67108868,24117248:0,25165824:67109124,26214400:67108864,27262976:4,28311552:65792,29360128:67174400,30408704:260,31457280:65796,32505856:67174404,
    17301504:67108864,18350080:260,19398656:67174656,20447232:0,21495808:65540,22544384:67109120,23592960:256,24641536:67174404,25690112:65536,26738688:67174660,27787264:65796,28835840:67108868,29884416:67109124,30932992:67174400,31981568:4,33030144:65792},{"0":2151682048,65536:2147487808,131072:4198464,196608:2151677952,262144:0,327680:4198400,393216:2147483712,458752:4194368,524288:2147483648,589824:4194304,655360:64,720896:2147487744,786432:2151678016,851968:4160,917504:4096,983040:2151682112,32768:2147487808,
    98304:64,163840:2151678016,229376:2147487744,294912:4198400,360448:2151682112,425984:0,491520:2151677952,557056:4096,622592:2151682048,688128:4194304,753664:4160,819200:2147483648,884736:4194368,950272:4198464,1015808:2147483712,1048576:4194368,1114112:4198400,1179648:2147483712,1245184:0,1310720:4160,1376256:2151678016,1441792:2151682048,1507328:2147487808,1572864:2151682112,1638400:2147483648,1703936:2151677952,1769472:4198464,1835008:2147487744,1900544:4194304,1966080:64,2031616:4096,1081344:2151677952,
    1146880:2151682112,1212416:0,1277952:4198400,1343488:4194368,1409024:2147483648,1474560:2147487808,1540096:64,1605632:2147483712,1671168:4096,1736704:2147487744,1802240:2151678016,1867776:4160,1933312:2151682048,1998848:4194304,2064384:4198464},{"0":128,4096:17039360,8192:262144,12288:536870912,16384:537133184,20480:16777344,24576:553648256,28672:262272,32768:16777216,36864:537133056,40960:536871040,45056:553910400,49152:553910272,53248:0,57344:17039488,61440:553648128,2048:17039488,6144:553648256,
    10240:128,14336:17039360,18432:262144,22528:537133184,26624:553910272,30720:536870912,34816:537133056,38912:0,43008:553910400,47104:16777344,51200:536871040,55296:553648128,59392:16777216,63488:262272,65536:262144,69632:128,73728:536870912,77824:553648256,81920:16777344,86016:553910272,90112:537133184,94208:16777216,98304:553910400,102400:553648128,106496:17039360,110592:537133056,114688:262272,118784:536871040,122880:0,126976:17039488,67584:553648256,71680:16777216,75776:17039360,79872:537133184,
    83968:536870912,88064:17039488,92160:128,96256:553910272,100352:262272,104448:553910400,108544:0,112640:553648128,116736:16777344,120832:262144,124928:537133056,129024:536871040},{"0":268435464,256:8192,512:270532608,768:270540808,1024:268443648,1280:2097152,1536:2097160,1792:268435456,2048:0,2304:268443656,2560:2105344,2816:8,3072:270532616,3328:2105352,3584:8200,3840:270540800,128:270532608,384:270540808,640:8,896:2097152,1152:2105352,1408:268435464,1664:268443648,1920:8200,2176:2097160,2432:8192,
    2688:268443656,2944:270532616,3200:0,3456:270540800,3712:2105344,3968:268435456,4096:268443648,4352:270532616,4608:270540808,4864:8200,5120:2097152,5376:268435456,5632:268435464,5888:2105344,6144:2105352,6400:0,6656:8,6912:270532608,7168:8192,7424:268443656,7680:270540800,7936:2097160,4224:8,4480:2105344,4736:2097152,4992:268435464,5248:268443648,5504:8200,5760:270540808,6016:270532608,6272:270540800,6528:270532616,6784:8192,7040:2105352,7296:2097160,7552:0,7808:268435456,8064:268443656},{"0":1048576,
    16:33555457,32:1024,48:1049601,64:34604033,80:0,96:1,112:34603009,128:33555456,144:1048577,160:33554433,176:34604032,192:34603008,208:1025,224:1049600,240:33554432,8:34603009,24:0,40:33555457,56:34604032,72:1048576,88:33554433,104:33554432,120:1025,136:1049601,152:33555456,168:34603008,184:1048577,200:1024,216:34604033,232:1,248:1049600,256:33554432,272:1048576,288:33555457,304:34603009,320:1048577,336:33555456,352:34604032,368:1049601,384:1025,400:34604033,416:1049600,432:1,448:0,464:34603008,480:33554433,
    496:1024,264:1049600,280:33555457,296:34603009,312:1,328:33554432,344:1048576,360:1025,376:34604032,392:33554433,408:34603008,424:0,440:34604033,456:1049601,472:1024,488:33555456,504:1048577},{"0":134219808,1:131072,2:134217728,3:32,4:131104,5:134350880,6:134350848,7:2048,8:134348800,9:134219776,10:133120,11:134348832,12:2080,13:0,14:134217760,15:133152,2147483648:2048,2147483649:134350880,2147483650:134219808,2147483651:134217728,2147483652:134348800,2147483653:133120,2147483654:133152,2147483655:32,
    2147483656:134217760,2147483657:2080,2147483658:131104,2147483659:134350848,2147483660:0,2147483661:134348832,2147483662:134219776,2147483663:131072,16:133152,17:134350848,18:32,19:2048,20:134219776,21:134217760,22:134348832,23:131072,24:0,25:131104,26:134348800,27:134219808,28:134350880,29:133120,30:2080,31:134217728,2147483664:131072,2147483665:2048,2147483666:134348832,2147483667:133152,2147483668:32,2147483669:134348800,2147483670:134217728,2147483671:134219808,2147483672:134350880,2147483673:134217760,
    2147483674:134219776,2147483675:0,2147483676:133120,2147483677:2080,2147483678:131104,2147483679:134350848}],x=[4160749569,528482304,33030144,2064384,129024,8064,504,2147483679],r=s.DES=n.extend({_doReset:function(){for(var b=this._key.words,a=[],c=0;56>c;c++){var d=q[c]-1;a[c]=b[d>>>5]>>>31-d%32&1}b=this._subKeys=[];for(d=0;16>d;d++){for(var f=b[d]=[],l=v[d],c=0;24>c;c++)f[c/6|0]|=a[(w[c]-1+l)%28]<<31-c%6,f[4+(c/6|0)]|=a[28+(w[c+24]-1+l)%28]<<31-c%6;f[0]=f[0]<<1|f[0]>>>31;for(c=1;7>c;c++)f[c]>>>=
    4*(c-1)+3;f[7]=f[7]<<5|f[7]>>>27}a=this._invSubKeys=[];for(c=0;16>c;c++)a[c]=b[15-c]},encryptBlock:function(b,a){this._doCryptBlock(b,a,this._subKeys)},decryptBlock:function(b,a){this._doCryptBlock(b,a,this._invSubKeys)},_doCryptBlock:function(e,a,c){this._lBlock=e[a];this._rBlock=e[a+1];u.call(this,4,252645135);u.call(this,16,65535);l.call(this,2,858993459);l.call(this,8,16711935);u.call(this,1,1431655765);for(var d=0;16>d;d++){for(var f=c[d],n=this._lBlock,p=this._rBlock,q=0,r=0;8>r;r++)q|=b[r][((p^
    f[r])&x[r])>>>0];this._lBlock=p;this._rBlock=n^q}c=this._lBlock;this._lBlock=this._rBlock;this._rBlock=c;u.call(this,1,1431655765);l.call(this,8,16711935);l.call(this,2,858993459);u.call(this,16,65535);u.call(this,4,252645135);e[a]=this._lBlock;e[a+1]=this._rBlock},keySize:2,ivSize:2,blockSize:2});d.DES=n._createHelper(r);s=s.TripleDES=n.extend({_doReset:function(){var b=this._key.words;this._des1=r.createEncryptor(p.create(b.slice(0,2)));this._des2=r.createEncryptor(p.create(b.slice(2,4)));this._des3=
    r.createEncryptor(p.create(b.slice(4,6)))},encryptBlock:function(b,a){this._des1.encryptBlock(b,a);this._des2.decryptBlock(b,a);this._des3.encryptBlock(b,a)},decryptBlock:function(b,a){this._des3.decryptBlock(b,a);this._des2.encryptBlock(b,a);this._des1.decryptBlock(b,a)},keySize:6,ivSize:2,blockSize:2});d.TripleDES=n._createHelper(s)})();


// ---------------

/*
 CryptoJS v3.1.2
 code.google.com/p/crypto-js
 (c) 2009-2013 by Jeff Mott. All rights reserved.
 code.google.com/p/crypto-js/wiki/License
 */
CryptoJS.mode.ECB=function(){var a=CryptoJS.lib.BlockCipherMode.extend();a.Encryptor=a.extend({processBlock:function(a,b){this._cipher.encryptBlock(a,b)}});a.Decryptor=a.extend({processBlock:function(a,b){this._cipher.decryptBlock(a,b)}});return a}();



// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/1/30.
 */

var sdkDefine = sdkDefine || {} ;

var encrypt_iv     = '34F6f83CaC57865F' ;
var encrypt_key    = '0082D4FA04d85FfF' ;


var WS_ERR_BUSY = '10001' ;
var WS_ERR_UNKNOWPACKAGE = '10002' ;

// ---------------------------------------------------------
// 通讯协议枚举
// ---------------------------------------------------------
var WS_PROTOCOL_DEFAULT = 0 ;  // JSON 协议
var WS_PROTOCOL_QCMP = 1 ;       // 逗号分割实时行情

var BIZ_ERR_INVALIDWS = '3001' ;
var BIZ_ERR_INVALID_SYMBOL = '3002' ;       // 无效的商品

var M_USER_TYPE = "1" ;                               // 登录账户类型 1=交易客户端
var M_RETCODE_SUCCESS ="0" ;                         // 应答报文返回码 - 成功
var M_RETCODE_FAIL ="1";                             // 应答报文返回码 - 未知错误
var M_DATA_UNENCRYPT ="0" ;                          // 报文数据体加密状态 - 不加密
var M_DATA_ENCRYPT ="1" ;                            // 报文数据体加密状态 - 加密
var M_HEARTBEAT =60 ;                                 // 心跳包等待间隔
var M_REQ_TIMEOUT =10 ;                               // 请求超时等待


// 查询参数定义
var M_NOTIC_MAXROW = 20 ;                    // 设置公告查询返回的最大记录数
var ACTION_ADD = "1" ;                      // 新增操作
var ACTION_MODIFY = "2" ;                   // 修改操作
var ACTION_DELETE = "3" ;                   // 删除操作
var ACTION_QUERY = "4" ;                    // 查询操作
var ACTION_CANCEL = "5" ;                   // 取消操作


var M_Q_PWDKEY = '1001';          // 密钥请求
var M_R_PWDKEY = '1002';          // 密钥应答
var M_Q_LOGIN_GW = '1003';        // 终端网关登录请求
var M_R_LOGIN_GW = '1004';        // 终端网关登录应答
var M_Q_LOGIN = '1005';           // 业务系统登录请求
var M_R_LOGIN = '1006';           // 业务系统登录应答
var M_Q_LOGOUT = '1007';          // 业务系统登出请求
var M_R_LOGOUT = '1008';          // 业务系统登出应答
var M_Q_CHANGEPWD = '1009';       // 修改登录密码请求
var M_R_CHANGEPWD = '1010';       // 修改登录密码应答
var M_Q_LOGIN_ACC = '1011';       // 管理后台代客下单的交易账户登录请求
var M_R_LOGIN_ACC = '1012';       // 管理后台代客下单的交易账户登录应答

var M_Q_AMOUNT = '2001';                // 资金账户信息查询请求
var M_R_AMOUNT = '2002';                // 资金账户信息查询应答
var M_Q_HOLDBILL = '2003';              // 持仓单查询请求
var M_R_HOLDBILL = '2004';              // 持仓单查询应答
var M_Q_BINHOLDBILL = '3203';              // 二元持仓单查询请求
var M_R_BINHOLDBILL = '3204';              // 二元持仓单查询应答
var M_Q_LIMITBILL = '2005';             // 限价单查询请求
var M_R_LIMITBILL = '2006';             // 限价单查询应答
var M_Q_CLOSEBILL = '2007';             // 平仓单查询请求
var M_R_CLOSEBILL = '2008';             // 平仓单查询应答
var M_Q_SYMBOL = '2009';                // 商品信息查询请求
var M_R_SYMBOL = '2010';                // 商品信息查询应答
var M_Q_RULER = '2011';                 // 交易规则查询请求
var M_R_RULER = '2012';                 // 交易规则查询应答
var M_Q_NOTIC = '2013';                 // 交易商公告查询请求
var M_R_NOTIC = '2014';                 // 交易商公告查询应答
var M_Q_NOTICDETAIL = '2015';           // 交易商公告内容查询请求
var M_R_NOTICDETAIL = '2016';           // 交易商公告内容查询应答
var M_Q_TRADEPORT = '2017';             // 交易接口查询请求
var M_R_TRADEPORT = '2018';             // 交易接口查询应答
var M_Q_TOKENCHECK = '2019' ;           // 授权码有效性查询请求
var M_R_TOKENCHECK = '2020' ;           // 授权码有效性查询应答
var M_Q_SYMBOLPRICE = '2021' ;          // 商品最新价格查询请求
var M_R_SYMBOLPRICE = '2022' ;          // 商品最新价格查询应答
var M_Q_HIS_QUOTE    = "2023" ;         // 历史行情数据查询请求
var M_R_HIS_QUOTE    = "2024" ;         // 历史行情数据查询应答
var M_Q_HOLDPOSITION = "2027" ;         // 头寸查询
var M_R_HOLDPOSITION = "2028" ;         // 头寸查询
var M_Q_CER_INFO = '2029';              // 汇率
var M_R_CER_INFO = '2030';              // 汇率
var M_Q_INOUT_MONEY = '2031' ;          // 出入金查询请求
var M_R_INOUT_MONEY = '2032' ;          // 出入金查询应答应答
var M_Q_CANCEL_DW = '2033' ;            // 出入金撤销申请请求
var M_R_CANCEL_DW = '2034' ;            // 出入金撤销申请应答
var M_Q_AMOUNTINOUT = '2035';           // 出入金申请请求
var M_R_AMOUNTINOUT = '2036';           // 出入金申请应答

var M_Q_DELIVERY_ORDER = '2037' ;       // 交割单查询请求
var M_R_DELIVERY_ORDER = '2038' ;       // 交割单查询应答
var M_Q_POSITION_CLOSE_ORDER = '2039' ; // 按头寸平仓请求
var M_R_POSITION_CLOSE_ORDER = '2040' ; // 按头寸平仓应答
var M_Q_GROUP_CLOSE_ORDER = '2041' ;    // 按批量平仓请求
var M_R_GROUP_CLOSE_ORDER = '2042' ;    // 按批量平仓应答
var M_Q_MARKET_STATUS = '2043' ;        // 按市场状态查询请求
var M_R_MARKET_STATUS = '2044' ;        // 按市场状态查询应答

var M_Q_QTY_PAYPORT = '2101';           // 查询签约银行请求
var M_R_QTY_PAYPORT = '2102';           // 查询签约银行应答
var M_Q_QTY_SYS_PAYPORT = '2103';       // 查询系统支持银行请求
var M_R_QTY_SYS_PAYPORT = '2104';       // 查询系统支持银行应答
var M_Q_PAYPORT_REGIST = '2105';        // 银行签约申请请求
var M_R_PAYPORT_REGIST = '2106';        // 银行签约申请应答
var M_Q_PAYPORT_UNREGIST = '2107';      // 银行解约申请请求
var M_R_PAYPORT_UNREGIST = '2108';      // 银行解约申请应答


var M_Q_MARKETOPEN = '3001';            // 市价建仓委托请求
var M_R_MARKETOPEN = '3002';            // 市价建仓委托应答
var M_Q_BINMARKETOPEN = '3209';            // 二元市价建仓委托请求
var M_R_BINMARKETOPEN = '3210';            // 二元市价建仓委托应答
var M_Q_MARKETCLOSE = '3003';           // 市价平仓委托请求
var M_R_MARKETCLOSE = '3004';           // 市价平仓委托应答
var M_Q_LIMITOPEN = '3005';             // 限价建仓委托请求
var M_R_LIMITOPEN = '3006';             // 限价建仓委托应答
var M_Q_LIMITCLOSE = '3007';            // 限价平仓委托请求
var M_R_LIMITCLOSE = '3008';            // 限价平仓委托应答
var M_Q_LIMITUNDO = '3009';             // 撤销限价单委托请求
var M_R_LIMITUNDO = '3010';             // 撤销限价单委托应答
var M_Q_MODIFYORDER = '3011';           // 修改单据请求
var M_R_MODIFYORDER = '3012';           // 修改单据应答
var M_Q_CONTRACTS = '3201';               //合约号请求
var M_R_CONTRACTS = '3202';               //合约号返回


var M_R_PUSH_QUOTE = '4002';            // 实时行情应答
var M_R_PUSH_SYMBOLINFO = '4004';       // 商品信息修改通知应答
var PUSH_TRCOMPLETE = '4006';           // 委托单成交通知
var PUSH_ACCCHANGE = '4008';            // 资金变动通知
var PUSH_SAMEUSER_LOGIN = '4010';       // 同名账户登录通知
var PUSH_BE_LOGOUT = '4012';            // 客户端重新登录通知
var PUSH_HOLDBILLCHANGE = '4016';       // 持仓单变更通知
var PUSH_LIMITBILLCHANGE = '4018';      // 限价单变化通知
var PUSH_CLOSEBILLCHANGE = '4020';      // 平仓单变化通知
var PUSH_POSITIONCHANGE = '4022';       // 头寸变化通知
var PUSH_EXCHANGERATE = '4024' ;        // 汇率变更通知
var PUSH_DW_CHANGE = '4026' ;           // 出入金变化通知
var PUSH_SYMBOL_INFO = '4028' ;         // 商品信息变化通知
var PUSH_RISK_DOWN = '4030' ;           // 风险下降变化通知
var PUSH_RISK_UP = '4032' ;             // #风险上升变化通知
var PUSH_SPOTDELIVERY = '4034' ;        // #风险上升变化通知
var PUSH_BULLETIN = '8002' ;            // 交易商公告推送通知
var PUSH_MODIFY_PASSWORD  = '4038';     // 密码变更通知通知
var PUSH_PAYPORT_INFO  = '4040';        // 签约银行通知
var PUSH_BANK_IN_URL  = '4042';         // 签约银行通知
var PUSH_BINMARKETBILL ='3208'          //接收下单回调应答

var M_Q_SUB_QUOTE = '5001';             // 订阅商品行情请求
var M_R_SUB_QUOTE = '5002';             // 订阅商品行情应答
var M_Q_UNSUB_QUOTE = '5003';           // 取消订阅商品行情请求
var M_R_UNSUB_QUOTE = '5004';           // 取消订阅商品行情应答

// ---------------------------------------------------------
// 单据类型
// ---------------------------------------------------------
var eOT_MarketOpen = "1" ;                  // 市价建仓单
var eOT_MarketClose = "2" ;                 // 市价平仓单
var eOT_LimitOrder = "3" ;                  // 限价止限单
var eOT_StopOrder = "4" ;                   // 限价停损单
var eOT_LimitClose = "5" ;                  // 限价平仓单
var eOT_CancelLimit = "6" ;                 // 撤销委托
var eOT_ModifyOrder = "7" ;                 // 修改单据
var eOT_ForceClose = "8" ;                  // 强制平仓
var eOT_SystemCancel = "9" ;                // 系统撤单
var eOT_DeliveryOrder = "A" ;               // 交割单

// ---------------------------------------------------------
// 按头寸平仓顺序
// ---------------------------------------------------------
var COT_FIFO = "1" ;                        // 先建仓先平
var COT_LIFO = "2" ;                        // 后建仓先平
var COT_TPFO = "3" ;                        // 高盈利单先平
var COT_SLFO = "4" ;                        // 高亏损单先平
var COT_ALLKL = "5" ;                       // 全平（不含挂单）
var COT_ALL = "6" ;                         // 全平（含挂单）

var BSCODE_BUY = "b" ;
var BSCODE_SELL = "s" ;

// ---------------------------------------------------------
// 商品类型
// ---------------------------------------------------------
var M_SYMBOLTYPE_NORMA = "1" ;              // 直接商品
var M_SYMBOLTYPE_INDIRECT = "2" ;           // 间接商品
var M_SYMBOLTYPE_INDIRECT_2 = "4" ;         // 间接商品（实盘）
var M_SYMBOLTYPE_CROSS = "3" ;              // 交叉商品


console.log('load sdkDefine complete') ;

// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/2/25.
 */
/**
 * @brief   界面数据处理函数集
 */
function uiFunction(){
    /**
     *  @brief  截取字符串 Left 函数
     *  @param  str         被截取的字符串
     *  @param  length      要截取的长度
     */
    var _strLeft = function(str,length) {
        var sl = str ;
        sl = sl.substring(0,length) ;
        return sl;
    };
    /**
     *  @brief  截取字符串 Right 函数
     *
     *  @param  str         被截取的字符串
     *  @param  length      要截取的长度
     */
    var _strRight = function(str,length) {
        var sr = str;
        sr = sr.substring(sr.length-length,sr.length);
        return sr;
    };

    return {
        /**
         * @brief               将日期数据转换成 Epoch
         * @param dDate
         * @returns {*}
         */
        Date2Epoch : function(dDate) {

            if (typeof dDate=='string') {
                var d = dDate.replace(/-/g,'/') ;
                dDate = new Date(d) ;
            }

            var x ;
            var GMT = true ;
            if ( GMT ) {
                x = parseInt(
                    Date.UTC(
                        dDate.getUTCFullYear(),
                        dDate.getUTCMonth(),
                        dDate.getUTCDate(),
                        dDate.getUTCHours(),
                        dDate.getUTCMinutes(),
                        dDate.getUTCSeconds(),
                        dDate.getUTCMilliseconds()
                    )/1000
                );
            } else {
                x = ( dDate.getTime()-dDate.getMilliseconds() ) / 1000;
                //x += dDate.getTimezoneOffset();
            }
            return x;
        },

        /**
         * @brief               将 Epoch 时间格式转换成 日期型
         * @param mEpoch
         * @returns {Date}
         * @constructor
         */
        Epoch2Date : function(mEpoch){

            var dDate =new Date() ;

            if( mEpoch<10000000000 ){
                mEpoch *= 1000;
            } // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)

            dDate.setTime(mEpoch);
            return dDate;
        },

        /**
         *  @brief 格式化报价
         *
         *  格式化报价数据，提取报价数字的末两位
         *
         *  @param  val         价格数据
         *  @param  decimal     有效小数位数
         */
        fmtPrice : function(val,decimal) {
            if (!val) {
                val = 0;
            }

            if ( typeof val === 'string' ) {
                val = parseFloat(val) ;
            }
            return val.toFixed(decimal) ;
        },
        /**
         * @brief           根据点差计算价格
         * @param price
         * @param point
         */
        calculPrice : function(price,point,decimal) {
            var ret   = price ;
            var scale = Math.pow(10, decimal);

            ret = ( ret * scale + point ) / scale;

            ret = ret.toFixed(decimal) ;

            return ret ;
        },

        /**
         * @brief           为交易对话框格式化报价信息
         * @param val
         * @param decimal
         * @returns {*}
         */
        fmtShowPrice : function(val,decimal) {
            if (!val) {
                val = 0;
            }

            var ret = {price:val.toString()} ;

            //this.price = val.toString() ;

            if (val) {

                var scale    = Math.pow(10,decimal) ;
                var strPrice = (Math.round(val * scale)).toString() ;
                var p1       = strPrice.indexOf('.') ;
                if ( p1 >= 0 ) {
                    strPrice = _strLeft(strPrice,p1) ;
                }

                var n = Math.min(decimal,2) ;

                ret.price1 = _strLeft(strPrice,strPrice.length - n) ;
                ret.price2 = strPrice.replace(ret.price1,'') ;

                if (decimal===0) {
                    var lenStr = ret.price1.length ;
                    switch (lenStr)
                    {
                        case 0:
                        case 1:
                        case 2:
                        {
                            ret.price2 = ret.price1 ;
                            ret.price1 = '' ;
                            break ;
                        }
                        default:
                        {
                            ret.price2 = _strRight(ret.price1,2) ;
                            ret.price1 = _strLeft(ret.price1,lenStr-2) ;
                        }
                    }
                }else {

                    if (decimal>2) {
                        ret.price1 = (parseInt(_strLeft(strPrice,strPrice.length-n) + '11') / scale ).toString() ;
                        ret.price1 = _strLeft(ret.price1,ret.price1.length-n) ;
                    }
                    if (decimal > 0 && ret.price1.indexOf('.') == -1) {
                        ret.price2 = '.' + ret.price2 ;
                    }
                }

            } else {
                ret.price1 = '0' ;
                ret.price2 = '' ;
            }

            ret.price = ret.price1 + ret.price2 ;
            return ret ;
        },
        /**
         *	@brief	格式化日期
         *
         *  根据限价点差计算限价
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 yyyy-mm-dd hh:mm:ss 的日期字符串
         */
        fmtDate : function(date) {
            var sRet;
            sRet = date.getFullYear() + "-";                        // 取年份
            sRet += _strRight('0' + (date.getMonth() + 1),2) + "-";  // 取月份
            sRet += _strRight('0' + date.getDate(),2) + " ";         // 取日期
            sRet += _strRight('0' + date.getHours(),2) + ":";        // 取小时
            sRet += _strRight('0' + date.getMinutes(),2) + ":";      // 取分
            sRet += _strRight('0' + date.getSeconds(),2);            // 取秒

            return sRet;
        },
        fmtMSDate : function(date) {
            var sRet;
            sRet = date.getFullYear() + "-";                        // 取年份
            sRet += _strRight('0' + (date.getMonth() + 1),2) + "-";  // 取月份
            sRet += _strRight('0' + date.getDate(),2) + " ";         // 取日期
            sRet += _strRight('0' + date.getHours(),2) + ":";        // 取小时
            sRet += _strRight('0' + date.getMinutes(),2) + ":";      // 取分
            sRet += _strRight('0' + date.getSeconds(),2) + ":";            // 取秒
            sRet += _strRight('0000' + date.getMilliseconds(),4);    // 取毫秒

            return sRet;
        },
        /**
         *	@brief	格式化日期
         *
         *  根据限价点差计算限价
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 yyyymmddhhmmss 的日期字符串
         */
        fmtDate2 : function(date) {
            var sRet;
            sRet = date.getFullYear() ;                        // 取年份
            sRet += _strRight('0' + (date.getMonth() + 1),2) ;  // 取月份
            sRet += _strRight('0' + date.getDate(),2) ;         // 取日期
            sRet += _strRight('0' + date.getHours(),2) ;        // 取小时
            sRet += _strRight('0' + date.getMinutes(),2) ;      // 取分
            sRet += _strRight('0' + date.getSeconds(),2);       // 取秒

            return sRet;
        },

        /**
         *	@brief	格式化日期
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 yyyy-mm-dd 的日期字符串
         */
        fmtShortDate : function(date) {

            if (typeof date === 'string'){
                return date ;
            }

            var sRet;
            sRet = date.getFullYear();                        // 取年份
            sRet += '/';
            sRet += _strRight('0' + (date.getMonth() + 1),2);  // 取月份
            sRet += '/';
            sRet += _strRight('0' + date.getDate(),2);         // 取日期

            return sRet;

        },

        /**
         *  @brief   格式化日期
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 mm-dd 的日期字符串
         */
        fmtMDDate : function(date) {
            if (typeof date === 'string'){
                var index = date.indexOf('-') ;
                if (index>=0) {
                    date = _strRight(date, date.length - index - 1) ;
                }
                return date ;
            }

            var sRet;
            sRet += _strRight('0' + (date.getMonth() + 1),2);  // 取月份
            sRet += '-';
            sRet += _strRight('0' + date.getDate(),2);         // 取日期

            return sRet;
        },

        /**
         *  @brief  截取字符串 Left 函数
         *  @param  str         被截取的字符串
         *  @param  length      要截取的长度
         */
        strLeft : function(str,length) {
            //var sl = str ;
            //sl = sl.substring(0,length) ;
            return _strLeft(str,length);
        },
        /**
         *  @brief  截取字符串 Right 函数
         *
         *  @param  str         被截取的字符串
         *  @param  length      要截取的长度
         */
        strRight : function(str,length) {
            //var sr = str;
            //sr = sr.substring(sr.length-length,sr.length);
            return _strRight(str,length);
        },
        /**
         * @brief               取 GUID
         * @returns {string}    返回值
         */
        getGuid : function() {
            var guid = "";
            for (var i = 1; i <= 32; i++){
                var n = Math.floor(Math.random()*16.0).toString(16);
                guid +=   n;
                if((i==8)||(i==12)||(i==16)||(i==20))
                    guid += "-";
            }
            return guid;
        },

        /**
         * @brief           创建Ajax对象
         * @returns {*}
         */
        getXmlHttpObject : function()
        {
            var xmlHttp=null;
            try
            {
                // Firefox, Opera 8.0+, Safari
                xmlHttp = new XMLHttpRequest();
            }
            catch (e)
            {
                // Internet Explorer
                try
                {
                    xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
                }
                catch (e)
                {
                    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
            return xmlHttp;
        }
    } ;
}
// -----------------------------------------------------------------------------
/**
 * @brief   WebSocket 封装对象
 */
function webSocket(args){

    var _strLeft = function(str,length) {
        var sl = str ;
        sl = sl.substring(0,length) ;
        return sl;
    } ;
    var _strRight = function(str,length) {
        var sr = str;
        sr = sr.substring(sr.length-length,sr.length);
        return sr;
    };

    var _queue = [] ;

    var _pushQueue = function(msgOrder,onSuccess,onFailure) {
        var key = 'queue_' + msgOrder ;
        _queue[key] = {
            onSuccess : onSuccess,
            onFailure : onFailure
        };
    };

    var _popQueue  = function(msgOrder) {
        var key = 'queue_' + msgOrder ;
        var ret = null ;
        if (_queue[key]) {
            ret = {
                onSuccess : _queue[key].onSuccess,
                onFailure : _queue[key].onFailure
            } ;

            delete _queue[key] ;
        }

        return ret ;
    };

    var _isopen    = false ;
    var _sending   = false ;

    var _encrypt_key = args.key ;
    var _encrypt_iv  = args.iv ;
    var _isEncrypt   = args.isEncrypt ;
    var _heartBeat   = args.heartBeat ;
    var _lastReceivedTime = new Date() ;
    var _lastSendTime = new Date() ;
    var _timeOutLimit = 120000 ;

    var _protocol     = args.protocol ||  WS_PROTOCOL_DEFAULT ; // 0=JSON 协议  1=逗号分割实时行情

    //WS_PROTOCOL_DEFAULT   = 0,  // JSON 协议
    //    WS_PROTOCOL_QCMP = 1        // 逗号分割实时行情


    var _ws = null ;
    var _url = null ;

    var _closeByHost = true ;
    var _closeByCall = false ; // 表示网络关闭是客户端主动发起的
    var _queryTask = null ;

    var _initWebSocket = function(url) {
        var me = this ;
        if (_ws) {
            _closeByCall = true ;
            _ws.close() ;
        }

        _url = url ;
        _ws = new WebSocket(url) ;
        _ws.scope = me ;

        _ws.onopen = function() {

            // this 指向的是 WebSocket ，_ws.scope 是在初始化 _ws 对象时传入的参数，指向 webSocket 实例
            var me = _ws.scope || this ;
            _closeByCall = false ;  // 初始化 _closeByCall 为 false，当收到服务端的断网通知时，需要回调 onClose 函数

            if ( typeof me.onopen === 'function') {
                var caller = me.scope || this ;
                me.onopen.call(caller) ;
            }

            _isopen = true ;

            // 如果设置了心跳参数，则启动心跳处理逻辑
            if ( _heartBeat ) {
                _startTask.call(me) ;
            }
        } ;

        _ws.onclose = function() {
            // TODO : 处理重连
            _isopen = false ;
            if ( typeof me.onclose === 'function') {
                var caller = me.scope || this ;

                // 收到网络断开消息，且 _closeByCall ＝ false 表示，该网络是因服务端或网络异常引起的
                // 这种情况下需要通知应用层处理
                if (!_closeByCall) {
                    me.onclose.call(caller) ;
                }
            }
        } ;

        _ws.onmessage = function(message) {
            var me = this.scope ; // onOpen 是通过 dojox.socket 的事件绑定被回调，this 指向的是 dojox.socket(WebSocket)

            var responseData    = message.data ;
            _lastReceivedTime = new Date() ;

            // 数据长度为 0  的是心跳包，仅需更新 lastReceivedTime
            if (responseData.length===0) {
                // 接收到心跳包 - {1}',me.url,me.name)) : isDebug ;
                console.log('收到心跳包') ;
                return;
            }

            if ( _isEncrypt=== M_DATA_ENCRYPT && _strLeft(responseData,1)!=='{' ) {
                var decrypted = CryptoJS.AES.decrypt(message.data, _encrypt_key,{ iv: _encrypt_iv, mode: CryptoJS.mode.ECB });
                responseData = decrypted.toString(CryptoJS.enc.Utf8) ;
            }

            if ( responseData.length<=2 ) {
                // 接收到心跳包 - {1}',me.url,me.name)) : isDebug ;
                console.log('收到心跳包') ;
                return;
            }

            _sending = false ;

            switch (_protocol)
            {
                case WS_PROTOCOL_QCMP :
                {
                    // 压缩版实时行情协议，逗号分割
                    var funCode = responseData.substring(0,1);
                    if ( funCode === "0" ) {
                        // 收到实时行情包
                        msg = {
                            event : M_R_PUSH_QUOTE,
                            data  : {
                                children : [responseData]
                            }
                        } ;
                        if (typeof me.onpush === 'function'){
                            me.onpush.call(me,msg) ;
                        }
                    }

                    break ;
                }
                case WS_PROTOCOL_DEFAULT :
                default :
                {
                    var msg = JSON.parse(responseData);

                    console.log(JSON.stringify(msg)) ;

                    var handler = _popQueue(msg.msgOrder) ;

                    if (typeof msg === 'object' && msg.event) {

                        // 匹配 MessageOrder ，如果没有则是服务端主动发起的推送消息
                        if (handler) {
                            if ( typeof handler.onSuccess === 'function') {
                                handler.onSuccess(msg) ;
                            }
                        }else{
                            // console.log('收到推送消息 ' + msg.event);
                            if (typeof me.onpush === 'function'){
                                me.onpush.call(me,msg) ;
                            }
                        }

                    } else {

                        if ( handler && typeof handler.onFailure === 'function') {
                            handler.onFailure(WS_ERR_UNKNOWPACKAGE,'收到异常包') ;
                        }
                        console.log('收到异常包') ;
                    }
                }
            }

        } ;

        return _ws ;
    } ;

    var _Date2Epoch = function(dDate) {
        if (typeof dDate=='string') {
            var d = dDate.replace(/-/g,'/') ;
            dDate = new Date(d) ;
        }

        var x ;
        var GMT = true ;
        if ( GMT ) {
            x = parseInt(
                Date.UTC(
                    dDate.getUTCFullYear(),
                    dDate.getUTCMonth(),
                    dDate.getUTCDate(),
                    dDate.getUTCHours(),
                    dDate.getUTCMinutes(),
                    dDate.getUTCSeconds(),
                    dDate.getUTCMilliseconds()
                )/1000
            );
        } else {
            x = ( dDate.getTime()-dDate.getMilliseconds() ) / 1000;
//    x += dDate.getTimezoneOffset();
        }
        return x;
    } ;

    /**
     * @brief       发送心跳包
     */
    var _sendHeartBeat = function() {
        var me = this ;
        if (_isopen) {
            _lastSendTime = new Date() ;
            console.log('发送心跳包 : ' + _url);
            _ws.send(_heartBeat.msg) ;
        }
    };

    /**
     * @brief               启动任务
     */
    var _startTask = function() {
        var me = this ;

        if (!_queryTask) {
            _queryTask = setInterval( function() {
                    // 计算未收到服务端报文的时间间隔
                    // timeOutLimit 是指网络的超时判断，即超过 timeOutLimit 指定的时间，客户端仍未收到
                    // 服务端的任何报文，则可判断网络超时，此时需要发起网络重连操作
                    var tmDelay = (_Date2Epoch(new Date()) - _Date2Epoch(_lastReceivedTime)) * 1000 ;
                    if (tmDelay > _timeOutLimit) {
                        // me.reConnect() ;
                    }else{
                        // heartBeat.timeout 是指心跳包的发送判断，即从最后一次向服务端发送报文至当前时间，
                        // 超过 heartBeat.timeout 指定的时间，客户端未有任何报文发送至服务端的，则客户端需
                        // 要主动向服务端发起心跳包
                        tmDelay = (_Date2Epoch(new Date()) - _Date2Epoch(_lastSendTime)) * 1000 ;
                        if ( _heartBeat && tmDelay > _heartBeat.timeout ) {
                            _sendHeartBeat.call(me) ; // 向服务端发送心跳包
                        } else {
                            //console.log( _url +  ' - 等待: ' + tmDelay ) ;
                        }
                    }
                },
                _heartBeat.interval
            );
        }
        //_queryTask.start() ;
    };

    var _stopTask = function() {
        var me = this ;
        if (_queryTask) {
            clearInterval(_queryTask) ;
            _queryTask = null ;
        }
    };

    return {
        token : '',
        //heartBeat : { interval:5000, timeout:60000, msg:'' },
        open  : function(args) {
            var me = this ;

            if (_isopen) {
                return ;
            }

            me.onopen  = args.onOpen ;      // 回调外部的函数
            me.onpush  = args.onPush ;
            me.onclose = args.onClose ;
            me.scope   = args.scope ;

            _ws      = _initWebSocket.call(me,args.url) ;

        },
        close : function() {
            _closeByCall = true;
            if (_ws)
            {
                _ws.close() ;
            }
        },
        reConnect : function(url){

            var me = this ;

            url = url || _url ;

            console.log('重连：' + url) ;

            var initWS = setTimeout(function(){
                _initWebSocket.call(me,url) ;
            },1000) ;
        },

        send : function(args) {
            var me = this ;

            if (_sending) {

                if (me.onFailure) {
                    me.onFailure(WS_ERR_BUSY,"上次请求仍在处理中") ;
                }

                return ;
            }

            if (!_ws) {
                if (me.onFailure) {
                    me.onFailure(WS_ERR_BUSY,"通讯组件未就绪") ;
                }

                return ;
            }

            _sending = true ;
            _lastSendTime = new Date() ;

            var wetPackage = args.wetPackage ;
            wetPackage.data.token = me.token ;

            _pushQueue(wetPackage.msgOrder,args.onSuccess,args.onFailure) ;

            var sendData = JSON.stringify (wetPackage) ;

           //
            console.log(sendData) ;

            if ( _isEncrypt === M_DATA_ENCRYPT ) {
                var encrypted = CryptoJS.AES.encrypt( sendData, _encrypt_key,{ iv: _encrypt_iv, mode: CryptoJS.mode.ECB } ) ;
                _ws.send ( encrypted );
            } else {
                _ws.send ( sendData );
            }

            // 启动超时等待
        }

    } ;
}


// -----------------------------------------------------------------------------
/**
 * Created by he.zhiyi on 15/2/8.
 */
var procJSONP = [] ;
function jsonP(url,callBack) {

    procJSONP.push(callBack) ;

    var items  = url.split('?') ;
    var tmpUrl = items[0] + '?callBack=callBack' ;
    if ( items.length>1 ) {
        tmpUrl += '&' + items[1] ;
    }

    var script = document.createElement('script');
    script.setAttribute('src', tmpUrl);
    document.getElementsByTagName('head')[0].appendChild(script);
    // document.getElementsByTagName('head')[0].removeChild(script);

    // 这里需要做一个延时操作，否则低版本的IE不能正常显示
    setTimeout(function(){
        document.getElementsByTagName('head')[0].removeChild(script);
    },10000) ;

}

function callBack(data){

    if ( procJSONP.length>0 ) {
        var updateList = procJSONP[0] ;
        procJSONP.slice(0,1) ;
        if (typeof  updateList === 'function') {
            updateList(data) ;
        }
    }
}

var sdk = null ;

var WETBizSDK = (
    function() {
        var _encrypt_key,_encrypt_iv ;      // 初始化加密密钥
        var _modLoginInfo ;

        var _requires = [] ;
        _requires.push('encrypt') ;
        _requires.push('uiFunction') ;
        _requires.push('sdkDefine') ;
        _requires.push('websocket/webSocket') ;
        _requires.push('Biz/IBiz') ;
        _requires.push('Biz/BizTest') ;
        _requires.push('Biz/BizLogin') ;
        _requires.push('Biz/BizUserAccount') ;
        _requires.push('Biz/BizSymbolInfo') ;
        _requires.push('Biz/BizContracts') ;
        _requires.push('Biz/BizCERInfo') ;
        _requires.push('Biz/BizHoldBill') ;
        _requires.push('Biz/BizLimitBill') ;
        _requires.push('Biz/BizCloseBill') ;
        _requires.push('Biz/BizHoldPosition') ;
        _requires.push('Biz/BizOrder') ;
        _requires.push('Biz/BizPayPort') ;
        _requires.push('Biz/BizRegister') ;
        _requires.push('Biz/BizBinHoldBill') ;
        _requires.push('Biz/BizPassword') ;

        var _wsLogin  = null ;
        var _wsTC     = null ;
        var _wsQuoted = null ;
        var _wsMSG    = null ;
        var _callBackID = 0  ;      // 调用 on 订阅消息时，用于唯一标识回调函数的编号，当调用 un 注销时需要使用

        var _symbolInfos  = [] ;
        var _accInfos     = [] ;
        var _exchangeRate = [] ;
        var _holdBills    = [] ;
        var _binHoldBills    = [] ;
        var _limitBills   = [] ;
        var _holdPosition = [] ;
        var _bankInfos    = [] ;    // 缓存银行信息
        var _contracts    = [] ;    // 缓存合约信息

        var _hostHisQuery = '' ;    // 历史查询服务地址

        var _subscrib     = [] ;
        var _keepQuoted   = false ;

        var _onReady      = null ;

        var _rootPath     = './' ;

        // 动态加载JS代码
        var _loadRequire = function(callBack) {

            var root = _rootPath ; //this.rootPath ;

            for (var i = 0; i<_requires.length; i++) {

                var fnName = _requires[i].split('/') ;
                var oFn    = fnName[fnName.length-1] ;

                switch (oFn)
                {
                    case 'encrypt' : {
                        oFn = 'CryptoJS' ;
                        break;
                    }
                    case 'sdkDefine' : {
                        oFn = 'sdkDefine' ;
                        break;
                    }
                    default : {}
                }

                try {
                    var func = eval(oFn) ;
                    console.log(oFn + ' --> has ' + (typeof func)) ;
                } catch (e){
                    //console.log(oFn + ' --> ' + (typeof oFn)) ;

                    var fn      = root + '/' + _requires[i] + '.js' ;
                    // var fn      =  './' + _requires[i] + '.js' ;
                    var fileref = document.createElement('script') ;
                    fileref.setAttribute("type","text/javascript") ;
                    fileref.setAttribute("src", fn) ;

                    if (typeof fileref!="undefined") {
                        document.getElementsByTagName("head")[0].appendChild(fileref)
                    }

                }

            }

            if (typeof callBack === 'function') {
                callBack.call() ;
            }
        } ;
        //_loadRequire() ;

        // 消息路由
        var _msgRote = function(wetPackage) {
            var eventCode = wetPackage.event ;

            console.log('event : ' + eventCode) ;

            if ( _subscrib[eventCode] ) {

                var callBacks = _subscrib[eventCode] ;
                for (var i=0; i<callBacks.length; i++) {
                    if (typeof callBacks[i].fn === 'function') {
                        var scope = callBacks[i].scope || this ;


                        try {
                            var mods  = wetPackage.data.children || [] ;
                            callBacks[i].fn.call(scope,mods) ;
                        } catch(err) {
                            console.log('wetbizsdk._msgRote  收到异常包') ;
                        }

                    }
                }
            } else {
                console.log('消息 : ' + eventCode + ' 未订阅') ;
            }

            switch (eventCode)
            {
                case PUSH_SAMEUSER_LOGIN :
                {
                    if (_wsTC)
                    {
                        _wsTC.close() ;
                    }
                    if (_wsQuoted && _keepQuoted===false)
                    {
                        _wsQuoted.close() ;
                    }

                    for (var key in _subscrib)
                    {
                        // TODO : 这里做了特殊处理，在只查看实时行情的应用个场景中，即使出现同名登录，也希望保持实时行情不中断
                        if ( key==='4002' && _keepQuoted===true ) {} else {
                            delete _subscrib[key] ;
                        }
                    }

                    // _subscrib = [] ; // 清除所有订阅
                    break ;
                }
                default : {}
            }

        } ;

        /**
         * @brief           （内部函数）登录网关
         * @param args
         * @private
         */
        var _loginWithUserId = function(args) {
            var me = this ;

            // 创建登录服务对象
            _wsLogin = new webSocket({
                key         : _encrypt_key,
                iv          : _encrypt_iv,
                isEncrypt   : M_DATA_ENCRYPT
            }) ;

            _wsLogin.open({
                url    : args.urls[0],
                scope  : me,
                onOpen : function() {

                    var me = this ;
                    console.log('链接已建立');

                    var biz = new BizLogin({
                        webSocket : _wsLogin
                    }) ;

                    biz.loginWithUID({
                        uid       : args.uid,
                        pwd       : args.pwd,
                        vcode     : args.vcode,
                        onSuccess : function(mod) {

                            _modLoginInfo     = mod ;
                            _modLoginInfo.uid = args.uid ;
                            _modLoginInfo.pwd = args.pwd ;
                            _modLoginInfo.userId = mod.Uid ;//TODO
                            console.log(mod);

                            // 登录交易网关
                            _loginTraderProxy.call(me,{
                                onSuccess    : args.onSuccess,
                                onFailure    : args.onFailure
                            }) ;

                            _wsLogin.close() ;

                        },
                        onFailure : args.onFailure
                    }) ;

                },
                onPush : function() {}
            }) ;

        };

        /**
         * @brief           （内部函数）修改登录密码
         * @param args
         * @private
         */
        var _passwordChange = function(args) {
            var me = this ;
            if (!_wsTC) {
                if ( typeof args.onFailure === 'function') {
                    args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                }
                return  ;
            }

            var biz = new BizPassword({
                webSocket : _wsTC
            }) ;

            biz.changeUserPassword({
				'ver': '0.1',
                'pwdType'  : 1,
                'newPWD'   : args.newPWD,
                'oldPWD'   : args.oldPWD,
                'userId'   : args.userId,
                onSuccess : function(mods) {
                    if (typeof args.onSuccess==='function') {
                        args.onSuccess(mods) ;
                    }
                },
                onFailure : args.onFailure
            }) ;
        };

        /**
         * @brief           （内部函数）登录交易网关
         * @param args
         * @private
         */
        var _loginTraderProxy = function(args) {

            var me = this ;

            // 创建交易网关服务对象
            _wsTC = new webSocket({
                heartBeat   : { interval:5000, timeout:60000, msg:'' },
                key         : _encrypt_key,
                iv          : _encrypt_iv,
                isEncrypt   : M_DATA_ENCRYPT
            }) ;

            _wsTC.open({
                url    : _modLoginInfo.tradeproxy,
                onOpen : function() {

                    var biz = new BizLogin({
                        webSocket : _wsTC
                    }) ;

                    // 登录交易网关
                    biz.loginWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        pwd       : _modLoginInfo.pwd,
                        onSuccess : function(mod) {
                            _wsTC.token = mod.token ;

                            // 登录消息公告服务
                            _loginMsgProxy({
                                onSuccess    : args.onSuccess,
                                onFailure    : args.onFailure
                            }) ;

                            // 初始化历史数据查询服务
                            _loginHisQueryProxy({
                                onSuccess    : args.onSuccess,
                                onFailure    : args.onFailure
                            }) ;

                            // 查询资金账户信息
                            me.queryAccount({
                                onSuccess : function(mods) {
                                    //_accInfos = mods ;

                                    // 查询商品信息
                                    me.querySymbol({
                                        onSuccess : function(mods) {
                                            // me.symbolInfos = mods ;

                                            // 查询汇率信息
                                            me.queryCERInfo({
                                                onSuccess : function(mods) {
                                                    // 登录实时行情服务
                                                    _loginQuotedProxy({
                                                        onSuccess    : args.onSuccess,
                                                        onFailure    : args.onFailure
                                                    }) ;
                                                    // 二元交易合约编号查询
                                                    console.log('二元交易合约编号查询');
                                                    me.queryContracts({
                                                        onSuccess: function (mods) {
                                                            console.log(mods);
                                                        },
                                                        onFailure: function (){

                                                        }
                                                    }) ;
                                                },
                                                onFailure : args.onFailure
                                            }) ;
                                        },
                                        onFailure : args.onFailure
                                    }) ;

                                },
                                onFailure : args.onFailure
                            }) ;

                        },
                        onFailure : args.onFailure
                    }) ;

                },
                onClose : function() {
                    console.log('TraderProxy is close') ;
                    _wsTC.reConnect() ;
                },
                onPush : function(wetPackage) {
                    // 收到交易服务推送过来的消息
                    _msgRote.call(me,wetPackage) ;
                }
            }) ;

        };

        /**
         * @brief           （内部函数）登录实时行情服务
         * @param args
         * @private
         */
        var _loginQuotedProxy = function(args) {
            var me = this ;

            var hostURL  = _modLoginInfo.new_quotedproxy || _modLoginInfo.quotedproxy ;
            var protocol = (_modLoginInfo.new_quotedproxy) ? WS_PROTOCOL_QCMP : WS_PROTOCOL_DEFAULT ;

            // 创建交易网关服务对象
            _wsQuoted = new webSocket({
                protocol    : protocol,
                heartBeat   : { interval:5000, timeout:60000, msg:'' },
                key         : _encrypt_key,
                iv          : _encrypt_iv,
                isEncrypt   : M_DATA_UNENCRYPT
            }) ;

            // var hostURL = _modLoginInfo.quotedproxy ;

            _wsQuoted.open({
                url    : hostURL,
                scope  : me,
                onOpen : function() {

                    if (!_modLoginInfo.new_quotedproxy) {
                        // 旧版实时行情服务需要执行登录逻辑
                        var biz = new BizLogin({
                            webSocket : _wsQuoted
                        }) ;

                        // 登录实时行情网关
                        biz.loginWithSID({
                            sid       : _modLoginInfo.sid,
                            uid       : _modLoginInfo.uid,
                            pwd       : _modLoginInfo.pwd,
                            onSuccess : function(mod) {
                                _wsQuoted.token = mod.token ;
                                args.onSuccess();

                                // me._demoQuoted() ;
                            },
                            onFailure : args.onFailure
                        }) ;
                    }else{
                        args.onSuccess();
                    }

                },
                onClose : function() {
                    console.log('QuotedProxy is close') ;
                },
                onPush : function(wetPackage) {

                    // 接收到的行情数据
                    var mods = wetPackage.data.children ;

                    if ( protocol === WS_PROTOCOL_QCMP) {

                        // 0 -> 功能号
                        // 1 -> lastTime        最后更新时间（整型值）
                        // 2 -> exchange_name   （暂不使用）
                        // 3 -> symbolCode      商品代码
                        // 4 -> priceCurrent    最新价（用于计算ask,bid）
                        // 5 -> priceOpen       （暂不使用）
                        // 6 -> priceHighest    最高价（用于图表显示）
                        // 7 -> priceLowest     最低价（用于图表显示）
                        // 8 -> priceClose      （暂不使用）
                        // 9 -> dailyHight      当日最高价（用于报价列表显示）
                        // 10 -> dailyLow       当日最低价（用于报价列表显示）
                        // 11 -> volume         （暂不使用）

                        var quotedList = mods ;
                        mods = [] ;
                        for (var i=0; i<quotedList.length; i++)
                        {
                            var item = quotedList[i].split(',') ;

                            var lastTime = me.sdk.uf.fmtDate( me.sdk.uf.Epoch2Date( new Date(parseInt( item[1] )) ) );
                            var quoted = {
                                symbolCode   : item[3],
                                priceCurrent : parseFloat(item[4]),
                                priceHighest : parseFloat(item[6]),
                                priceLowest  : parseFloat(item[7]),
                                dailyHight   : parseFloat(item[9]),
                                dailyLow     : parseFloat(item[10]),
                                volume       : parseFloat(item[11]),
                                lastTime     : lastTime
                            };

                            mods.push(quoted) ;
                            //console.log('接收到新版实时行情') ;

                        }
                    }

                    var ret  = [] ;

                    for (var i=0; i<mods.length; i++)
                    {
                        var mod = mods[i] ;

                        if (_symbolInfos[mod.symbolCode]) {

                            _symbolInfos[mod.symbolCode].lastTime =  mod.lastTime ;

                            // 根据报价点差计算买卖价
                            var symbolInfo   = _symbolInfos[mod.symbolCode] ;
                            var currentPrice = parseFloat( mod.priceCurrent );       // 取实时行情最新价
                            var decimal      = symbolInfo.decimal;
                            var scale        = Math.pow(10, decimal);
                            var askPoint     = symbolInfo.pointAsk ;
                            var bidPoint     = symbolInfo.pointBid;

                            var newAsk = ( currentPrice * scale + askPoint ) / scale;
                            var newBid = ( currentPrice * scale - bidPoint ) / scale;

                            // ---------------------------------------------------------------------------------
                            // 更新缓存商品的价格信息
                            // ---------------------------------------------------------------------------------
                            _symbolInfos[mod.symbolCode].upOrDown = (newAsk * scale - symbolInfo.ask * scale) ;
                            _symbolInfos[mod.symbolCode].ask  = parseFloat( newAsk );
                            _symbolInfos[mod.symbolCode].bid  = parseFloat( newBid );

                            _symbolInfos[mod.symbolCode].priceCurrent  = currentPrice;
                            _symbolInfos[mod.symbolCode].priceHighest  = parseFloat(mod.priceHighest);
                            _symbolInfos[mod.symbolCode].priceLowest   = parseFloat(mod.priceLowest);
                            _symbolInfos[mod.symbolCode].dailyHighest  = parseFloat(mod.dailyHight) ;
                            _symbolInfos[mod.symbolCode].dailyLowest   = parseFloat(mod.dailyLow) ;
                            _symbolInfos[mod.symbolCode].spread        = Math.abs(askPoint - bidPoint) ;

                            ret.push(_symbolInfos[mod.symbolCode]) ;

                            // ---------------------------------------------------------------------------------
                            // 根据持仓单数据，计算浮动盈亏
                            // ---------------------------------------------------------------------------------
                            _updateHoldBill(_symbolInfos[mod.symbolCode]) ;
                        }

                    }

                    if (_subscrib && _subscrib[M_R_PUSH_QUOTE] && ret.length>0) {
                        var callBacks = _subscrib[M_R_PUSH_QUOTE] ;
                        for (var i=0; i<callBacks.length; i++) {
                            if (typeof callBacks[i].fn === 'function') {
                                var scope = callBacks[i].scope || this ;
                                callBacks[i].fn.call(scope,ret) ;
                            }
                        }
                    }
                    // TODO : 发布实时行情
                    //console.log('发布实时行情') ;
                }
            }) ;

        };

        /**
         * @brief           （内部函数）登录消息公告服务
         * @param args
         * @private
         */
        var _loginMsgProxy = function(args){
            var me = this ;

            // 创建交易网关服务对象
            _wsMSG = new webSocket({
                heartBeat   : { interval:5000, timeout:60000, msg:'' },
                key         : _encrypt_key,
                iv          : _encrypt_iv,
                isEncrypt   : M_DATA_ENCRYPT
            }) ;

            _wsMSG.open({
                url    : _modLoginInfo.messageProxy,
                onOpen : function() {

                    var biz = new BizLogin({
                        webSocket : _wsMSG
                    }) ;

                    // 登录交易网关
                    biz.loginWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        pwd       : _modLoginInfo.pwd,
                        onSuccess : function(mod) {
                            console.log('Message login success') ;
                            _wsMSG.token = mod.token ;
                        },
                        onFailure : args.onFailure
                    }) ;

                },
                onClose : function() {
                    console.log('MessageProxy is close') ;
                    _wsMSG.reConnect() ;
                },
                onPush : function(wetPackage) {
                    // 收到交易服务推送过来的消息
                    _msgRote.call(me,wetPackage) ;
                }
            }) ;
        } ;

        /**
         * @brief           （内部函数）登录历史数据查询服务
         * @param args
         *      {
         *          onSuccess
         *          onFailure
         *      }
         * @private
         */
        var _loginHisQueryProxy = function (args) {
            if (_strLeft(_modLoginInfo.hisQueryProxy,7)==='http://') {
                _hostHisQuery = _modLoginInfo.hisQueryProxy ;

                console.log('HisQueryProxy login success') ;
            }
        };
        /**
         * @brief           （内部函数）取汇率
         * @param baseCode
         * @param exchangeCode
         * @private
         */
        var _getExchangeRate = function(baseCode,exchangeCode){

            var mod = null ;
            var ret = 1.0 ;

            if (_exchangeRate) {
                var key = baseCode + '_' + exchangeCode ;
                mod = _exchangeRate[key] ;
                if (mod)
                {
                    ret = mod.exchangeRate ;
                }
            }

            return ret ;
        } ;

        /**
         * @brief           （内部函数）计算浮动盈亏
         * @param pClose
         * @param pHold
         * @param quantity
         * @param bsCode
         * @param unit
         * @param symbolType
         * @private
         */
        var _calculateDynProfit = function(pClose, pHold, quantity, bsCode, unit, symbolType){

            var ret  = 0.0 ;

            var flag = 1 ;		// 持仓方向标志，1=买， -1=卖

            if ( bsCode===BSCODE_BUY ) {
                flag = 1 ;
            }else{
                flag = -1 ;
            }

            try {
                if ( symbolType === M_SYMBOLTYPE_NORMA ) {
                    // 直接商品
                    ret = (pClose - pHold) * flag * unit * quantity ;
                } else if ( symbolType === M_SYMBOLTYPE_INDIRECT ) {
                    // 间接商品(非美元合约)
                    ret = (1/pClose - 1/pHold) * flag * unit * quantity ;
                } else if ( symbolType === M_SYMBOLTYPE_INDIRECT_2 ) {
                    // 间接商品(实盘)
                    // ToDo : 暂不支持
                    // if ( pClose <= 0.000001 ) {
                    //     errCode = ;
                    // } else {
                    //    result = (pClose - pOpen) * flag * unit * quantity / pClose;
                    // }
                } else if ( symbolType === M_SYMBOLTYPE_CROSS ) {
                    // 交叉商品
                    // ToDo : 暂不支持
                    // if ( exchangeRate <= 0.000001 ) {
                    //     errCode = ;
                    // } else {
                    //    result = (pClose - pOpen) * flag * unit * quantity / exchangeRate;
                    // }
                } else {
                }
            }
            catch (err) {
                //
            }
            finally {
                //
            }

            return ret ;
        } ;

        var _holdBillDynProfit = function(mod) {

            var bsCode = mod.bsCode ;
            var symbolInfo    = _symbolInfos[mod.symbolCode] ;

            var pClose        = (bsCode === BSCODE_BUY) ? symbolInfo.bid : symbolInfo.ask ;
            var pHold         = mod.priceHold ;
            var quantity      = mod.quantityHold ;
            var unit          = symbolInfo.unit ;
            var symbolType    = symbolInfo.symbolType ;
            var exchangeRate  = _getExchangeRate(symbolInfo.symbolCurrency,symbolInfo.accCurrency);

            // 更新持仓单上的最新价
            mod.markPrice = pClose ;

            // 以报价货币计算的浮动盈亏
            mod.dynProfitPrice   = _calculateDynProfit(pClose, pHold, quantity, bsCode, unit, symbolType) ;
            // 以结算货币计算的浮动盈亏
            mod.dynProfit        = mod.dynProfitPrice * exchangeRate ;
        } ;

        /**
         * @brief           （内部函数）更新持仓单
         * @param symbolInfo
         * @private
         */
        var _updateHoldBill = function(symbolInfo) {

            var ret = [] ;
            for(var key in _holdBills){
                var mod = _holdBills[key];

                if ( mod.symbolCode===symbolInfo.symbolCode ) {

                    var accInfo_profitDyn   = 0.0 ;
                    var holdPosition_dpBuy  = 0.0 ;
                    var holdPosition_dpSell = 0.0 ;

                    _holdBillDynProfit(mod,symbolInfo) ;

                    ret.push(mod) ;
                }
            }

            if (ret.length>0) {
                // 广播持仓单变更消息
                if (_subscrib && _subscrib[PUSH_HOLDBILLCHANGE]) {
                    var callBacks = _subscrib[PUSH_HOLDBILLCHANGE] ;
                    for (var i=0; i<callBacks.length; i++) {
                        if (typeof callBacks[i].fn === 'function') {
                            var scope = callBacks[i].scope || this ;
                            callBacks[i].fn.call(scope,ret) ;
                        }
                    }
                }
            }
        } ;

        /**
         * @brief           （内部函数）判断限价单类型
         * @param bsCode
         * @param priceOver
         * @private
         */
        var _getLimitType = function(bsCode,priceOver) {

            var strRet = eOT_LimitOrder ;
            if ( bsCode===BSCODE_BUY && priceOver<0 ) {

                strRet = eOT_LimitOrder ;

            }else if ( bsCode===BSCODE_SELL && priceOver>0 ){

                strRet = eOT_LimitOrder ;

            }else if (bsCode===BSCODE_BUY && priceOver>0){

                strRet = eOT_StopOrder ;

            }else if (bsCode===BSCODE_SELL && priceOver<0){

                strRet = eOT_StopOrder ;

            }

            return strRet ;
        };
        /**
         *  @brief  截取字符串 Left 函数
         *  @param  str         被截取的字符串
         *  @param  length      要截取的长度
         */
        var _strLeft = function(str,length) {
            var sl = str ;
            sl = sl.substring(0,length) ;
            return sl;
        };
        /**
         *  @brief  截取字符串 Right 函数
         *
         *  @param  str         被截取的字符串
         *  @param  length      要截取的长度
         */
        var _strRight = function(str,length) {
            var sr = str;
            sr = sr.substring(sr.length-length,sr.length);
            return sr;
        } ;

        /**
         *	@brief	格式化日期
         *
         *  根据限价点差计算限价
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 yyyy-mm-dd hh:mm:ss 的日期字符串
         */
        var _fmtDate = function(date) {
            var sRet;
            sRet = date.getFullYear() + "-";                        // 取年份
            sRet += _strRight('0' + (date.getMonth() + 1),2) + "-";  // 取月份
            sRet += _strRight('0' + date.getDate(),2) + " ";         // 取日期
            sRet += _strRight('0' + date.getHours(),2) + ":";        // 取小时
            sRet += _strRight('0' + date.getMinutes(),2) + ":";      // 取分
            sRet += _strRight('0' + date.getSeconds(),2);            // 取秒

            return sRet;
        } ;

        return {

            /**
             * @brief       当出现同名账户登录时，是否保留实时行情链路不中断，true＝保留，false＝不保留
             * @param       bFlag
             */
            keepQuoted : function(bFlag) {_keepQuoted=bFlag},
            /**
             * @brief       SDK UI数据处理函数集
             * @note        成功初始化后方可使用
             */
            uf : null,

            /**
             * @brief       SDK 根目录
             */
            rootPath : '',


            /**
             * @brief       初始化SDK
             * @param key   用于AES加密/解密的密钥
             * @param iv
             * @param rootPath
             * @param callBack
             */
            init : function(key,iv,rootPath,callBack){
                var me = this ;

                me.setRoot(rootPath) ; // '../js/wetbizsdk'

                if (!_rootPath || _rootPath.length===0) {
                    console.log('未指定 SDK 根目录') ;
                    return ;
                }

                _loadRequire.call(this,function(){

                    var testTimes = 5 ;

                    var checker = setInterval(function(){

                        try {

                            if (CryptoJS) {
                                console.log('SDK 依赖项加载已完成！') ;
                                clearInterval(checker) ;

                                _encrypt_key = CryptoJS.enc.Latin1.parse(key);
                                _encrypt_iv  = CryptoJS.enc.Latin1.parse(iv);

                                me.uf = new uiFunction() ;

                                if (_onReady)
                                {
                                    _onReady.call(me) ;
                                }

                                if (typeof callBack === 'function')
                                {
                                    callBack.call() ;
                                }

                            }else{
                                testTimes -- ;
                            }

                        } catch (err) {
                            testTimes -- ;
                        }

                        console.log('test CryptoJS') ;
                        if ( testTimes<=0 ) {
                            clearInterval(checker) ;
                            console.log('SDK 依赖项加载失败！') ;
                        }

                    },1000) ;

                }) ;

            },

            /**
             * @brief       sdk 就绪事件
             * @param callBack
             */
            onReady : function(callBack) {

                if (typeof callBack === 'function')
                {
                    _onReady = callBack ;
                }
            },

            setRoot : function(strRootPath) {
                _rootPath = strRootPath ;
                // _loadRequire() ;
            },

            //strRight : _strRight,
            //strLeft  : _strLeft,

            /**  ---------------------------------------------------------------------
             *      登录类
             *   --------------------------------------------------------------------/
            /**
             * @brief       登录请求
             * @param args
             *
             *      {
             *          uid       : <登录帐号>
             *          pwd       : <登录密码>
             *          vaildCode : [登录校验码 (可选) ]
             *          URLs      : <登录服务地址 (数组)>
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            loginWithUserId : function(args) {
                var me = this ;
                // console.log('loginWithUserId be call + uid : ' + args.uid) ;
                _loginWithUserId.call(me,args) ;
            },

            /**
             * @brief       注销登录
             */
            logout : function() {
                console.log('logout be call') ;
            },

            /**
             * @brief       修改登录密码
             * @param newPWD
             * @param onsuccess
             * @param onfailure
             */
            passwordChange : function(args){
                var me = this ;
                _passwordChange.call(me,args) ;
                console.log('passwordChange be call') ;
            },


            /**  ---------------------------------------------------------------------
             *      在线注册类
             *   --------------------------------------------------------------------/
             /**
             * @brief       交易账户在线注册
             * @param args
             *
             *      {
             *          userName  : 账户姓名
             *          password  : 交易密码
             *          mobile    : 手机号码
             *          email     : 邮件地址
             *          smsCode   : 短信验证码
             *          bankCode  : 银行代码
             *          bankAccount : 银行卡号
             *          referee   : 推荐人编号
             *          attach    : 附件文件列表（以逗号分隔的字符串）
             *
             *          onSuccess : [执行成功回调函数]，注册成功时返回 msg 对象，msg.registCode 为签约席位号
             *          onFailure : [执行失败回调函数]
             *      }
             */
            registUser : function(args) {
                var me = this ;

                //if (!_wsTC) {
                //    if ( typeof args.onFailure === 'function') {
                //        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                //    }
                //    return  ;
                //}

                var biz = new BizRegister({
                    webSocket : _wsTC
                }) ;

                biz.submit({
                    method    : 'get',
                    url       : '../debug/testCall.php', // http://127.0.0.1/wetbizsdk/debug/testCall.php
                    mobile    : args.mobile,
                    password  : args.password,
                    vcode     : args.vcode,
                    token     : '',
                    onSuccess : function(mods) {

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       机构在线注册
             * @param args
             *
             *      {
             *          orgName   : 机构名称
             *          mobile    : 手机号码
             *          smsCode   : 短信验证码
             *          bankCode  : 银行代码
             *          bankAccount : 银行卡号
             *          referee   : 推荐人编号
             *
             *          onSuccess : [执行成功回调函数]，注册成功时返回 msg 对象，msg.registCode 为签约席位号
             *          onFailure : [执行失败回调函数]
             *      }
             */
            registOrg : function(args) {},

            queryTest : function(args) {
                var me = this ;

                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizTest({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    method    : 'get',
                    url       : '../debug/testCall.php', // http://127.0.0.1/wetbizsdk/debug/testCall.php
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;

            },


            /**  ---------------------------------------------------------------------
             *      查询类
             *   --------------------------------------------------------------------/

            /**
             * @brief       取登录账户信息
             * @returns MODLoginInfo
             */
            getUserInfo : function()
            {
                return _modLoginInfo ;
            },

            /**
             * @brief       查询资金帐户
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODUserAccount 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryAccount : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizUserAccount({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以 accId 为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = 'key_' + mod.accId ;
                            mod.userName = _modLoginInfo.userName ;
                            _accInfos[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;

            },

            /**
             * @brief       根据资金账户accID取资金账户信息
             * @param accId
             * @returns MODUserAccount
             */
            getAccount : function(accId) {
                var mod = null ;
                if (_accInfos) {
                    var key = 'key_' + accId ;
                    mod = _accInfos[key] ;

                    if (!mod) {
                        for ( key in _accInfos ) {
                            mod = _accInfos[key] ;
                            break ;
                        }
                    }
                }

                return mod ;
            },

            /**
             * @brief       查询商品信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODSymbolInfo 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            querySymbol : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizSymbolInfo({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {
                        // 以字典方式缓存商品数据
                        _symbolInfos = [] ;
                        for (var i=0; i<mods.length; i++)
                        {
                            var mod = mods[i] ;
                            _symbolInfos[mod.symbolCode] = mod ;
                            _symbolInfos[mod.symbolCode].lastTime = _symbolInfos[mod.symbolCode].date ;
                            _symbolInfos[mod.symbolCode].dailyHighest = _symbolInfos[mod.symbolCode].priceHighest ;
                            _symbolInfos[mod.symbolCode].dailyLowest = _symbolInfos[mod.symbolCode].priceLowest ;
                            _symbolInfos[mod.symbolCode].upOrDown = 0 ;
                            _symbolInfos[mod.symbolCode].spread = Math.abs(mod.pointAsk - mod.pointBid) ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }

                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       根据商品代码查询商品信息
             * @param symbolCode
             * @returns MODSymbolInfo
             */
            getSymbol : function(symbolCode) {
                var mod = null ;
                if (_symbolInfos) {
                    mod = _symbolInfos[symbolCode] ;
                }
                return mod ;
            },

            /**
             *  @brief      取商品信息对象
             *
             *  @note       根据给定的资金账户accID，获取商品信息
             *  @param      accId           资金账户ID，－1 表示返回所有的商品
             *  @return     modSymbolInfo   商品信息数据
             *
             */
            getSymbols : function(accId) {

                var ret = [] ;

                for(var key in _symbolInfos){
                    var mod = _symbolInfos[key];

                    if ( accId===-1 || accId === mod.accId ) {
                        ret.push(mod) ;
                    }

                }

                return ret ;
            },
            symbolId2Code:function(symbolId){
                for(var key in _symbolInfos){
                    var mod = _symbolInfos[key];
                    if ( symbolId === mod.symbolId ) {
                        return mod.symbolCode;
                    }
                }
                return '';
            },


            /**
             *  @brief      取商品信息对象
             *
             *  @note       根据给定的资金账户accID，获取商品信息
             *  @param      accId           资金账户ID，－1 表示返回所有的商品
             *  @return     modSymbolInfo   商品信息数据
             *
             */
            getContract : function(symbolCode) {
                return _contracts[symbolCode] ;
            },
            /**
             * @brief       查询合约编号
             * @param args
             *      {
             *          symbolCode  商品代码（可选填）
             *
             *          onSuccess : [执行成功回调函数] (返回 MODContractInfo 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryContracts : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }
                if(!_symbolInfos){
                    args.onFailure(BIZ_ERR_INVALIDWS, '商品信息未初始化');
                    return;
                }

                var biz = new BizContracts({
                    webSocket : _wsTC
                }) ;



                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {
                        // 建立汇率字典
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var symbolCode = me.symbolId2Code(mod.symbolId) ;
                            if (!_contracts[symbolCode]) {
                                _contracts[symbolCode] = [] ;
                            }
                            _contracts[symbolCode].push(mod) ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       查询汇率信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODCERInfo 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryCERInfo : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizCERInfo({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 建立汇率字典
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.currencyBase + '_' + mod.currencyExchange ;
                            _exchangeRate[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            getExchangeRate : _getExchangeRate,

            /**
             * @brief       查询持仓单信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODHoldBill 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryHoldBill : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizHoldBill({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以单号为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.orderCode ;
                            _holdBills[key] = mod ;
                            _holdBillDynProfit(mod) ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },
            queryBinHoldBill : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizBinHoldBill({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以单号为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.orderCode ;
                            _binHoldBills[key] = mod ;
                            //_holdBillDynProfit(mod) ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       根据持仓单号查询单据信息
             * @param orderCode
             * @returns MODHoldBill
             */
            getHoldBill : function(orderCode) {
                var mod = null ;
                if (_holdBills) {
                    mod = _holdBills[orderCode] ;
                }
                return mod ;
            },

            /**
             * @brief       查询持仓汇总信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODHoldPosition 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryHoldPosition : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizHoldPosition({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以商品代码为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.symbolCode ;
                            _holdPosition[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       根据商品代码查询持仓汇总信息
             * @param symbolCode
             * @returns MODHoldPosition
             */
            getHoldPosition : function(symbolCode) {
                var mod = null ;
                if (_holdPosition) {
                    mod = _holdPosition[symbolCode] ;
                }
                return mod ;
            },

            /**
             * @brief       查询限价单信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODLimitBill 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryLimitBill : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizLimitBill({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        // 以单号为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = mod.orderCode ;
                            _limitBills[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       根据限价单号查询限价单信息
             * @param orderCode
             * @returns MODLimitBill
             */
            getLimitBill : function(orderCode) {
                var mod = null ;
                if (_limitBills) {
                    mod = _limitBills[orderCode] ;
                }
                return mod ;
            },

            /**
             * @brief       查询限价单信息
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODCloseBill 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryCloseBill : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizCloseBill({
                    webSocket : _wsTC
                }) ;

                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;
            },

            /**
             * @brief       查询微交易合约
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODBineBill 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryBinBill : function(args) {},

            /**
             * @brief       查询历史行情数据
             * @param args
             *
             *      {
             *          symbolCode : 商品代码
             *          period     : 周期
             *          barCount   : 指定返回条目数
             *          time       : 时间基线（ barCount > 0 时，取大于 time 的数据 ）
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryHisQuoted : function(args) {

            },

            /**
             * @brief       查询系统支持的银行
             * @param args
             *
             *      {
             *          onSuccess : [执行成功回调函数] (返回 MODPayPort 数组)
             *          onFailure : [执行失败回调函数]
             *      }
             */
            queryPayPort : function(args) {
                var me = this ;
                if (!_wsTC) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                    }
                    return  ;
                }

                var biz = new BizPayPort({
                    webSocket : _wsTC
                }) ;


                biz.loadDataWithSID({
                    sid       : _modLoginInfo.sid,
                    uid       : _modLoginInfo.uid,
                    token     : _modLoginInfo.token,
                    onSuccess : function(mods) {

                        _bankInfos = [] ;

                        // 以 payPortId 为键值缓存数据
                        for (var i=0; i<mods.length; i++) {
                            var mod = mods[i] ;
                            var key = 'key_' + mod.payPortId ;
                            _bankInfos[key] = mod ;
                        }

                        if (typeof args.onSuccess==='function') {
                            args.onSuccess(mods) ;
                        }
                    },
                    onFailure : args.onFailure
                }) ;

            },

            /**
             * @brief       根据支付接口 payPortId 查询支付接口信息
             * @param payPortId
             * @returns MODPayPort
             */
            getPayPortInfo : function(payPortId) {

                var mod = null ;
                var key = 'key_' + payPortId ;
                if (_bankInfos) {
                    mod = _bankInfos[key] ;
                }
                return mod ;

            },

            /**
             * @brief       查询交易历史（针对金德微交易）
             * @param args
             * {
             *      startTime,      开始时间（格式：yyyy-mm-dd 00:00:00）
             *      endTime,        结束时间（格式：yyyy-mm-dd 23:59:59）
             *      pageStart,      分页参数 - 数据记录开始下标
             *      pageLimit,      分页参数 - 每页返回记录数
             *      pageEnd,        分页参数 - 保留，占不使用
             *      page            分页参数 - 保留，占不使用
             * }
             */
            getHisTradeLog : function(args) {

                var me = this ;
                //_hostHisQuery = 'http://120.24.159.238:14020/wetquery/report_client/closebill' ;
                //_hostHisQuery = 'http://192.168.1.108:20040/report_client/binaryoptionsorder';


                if (args && args.hisQueryProxy) {
                    _hostHisQuery = args.hisQueryProxy;
                }else{
                    _hostHisQuery = 'http://192.168.1.108:20040/report_client/binaryoptionsorder';
                }


                if (_hostHisQuery)
                {
                    var _historyValue="1";//TODO
                    if(args.startTime=="" && args.startTime==""){//TODO
                        _historyValue="0";//TODO
                    }//TODO
                    var url = _hostHisQuery + "?bizData=";
                    var parames =[
                        {
                            'operator' : 'and',  //and,rlike,or
                            'value'    : _historyValue,//TODO
                            'key'      : 'isHistory'
                        },
                        {
                            'operator' : 'and',
                            'value'    : '("' + args.startTime + '","' + args.endTime + '")',
                            'key'      : 'tradingday'
                        }
                    ];
                    var sort = {
                        'order': 'DESC', //DESC,ASC
                        'children': [
                            "orderTime"
                        ]
                    };

                    var pageCtrl ={
                        'start': '0',
                        'limit': '20',
                        'page' : '1'
                    };

                    var accs=this.getAccount(-1);//TODO
                    var bizData = {
                        'accId'     :  accs.accId,//TODO
                        'userId'    : _modLoginInfo.userId, // TODO
                        'parames'   : parames,
                        'pageCtrl'  : pageCtrl,
                        'sort'      : sort

                    };

                    url += encodeURIComponent(JSON.stringify(bizData));

                    // console.log(url) ;

                    jsonP(url,function(dat){

                         //console.log(dat)  ;

                        if (dat && dat.bizRet && dat.bizRet === "0") {
                            // console.log(dat.bizMsg) ;

                            if ( typeof args.onSuccess === 'function')
                            {
                                if(dat.data.length>0){//TODO
                                    dat.data[0].totalCount=dat.totalCount;//TODO
                                }//TODO
                                args.onSuccess(dat.data) ;
                            }
                        }

                    }) ;

                }
            },

            /**  ---------------------------------------------------------------------
             *      交易类
             *   --------------------------------------------------------------------/
             /**
             * @brief       市价建仓单
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          contract            合约编号
             *          quantity            委托数量
             *          bsCode              买卖方向
             *          orderPrice          委托价格
             *          pointOffset         允许偏离点差
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            marketOpen : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_MARKETOPEN,
                    responseCode : M_R_MARKETOPEN,
                    webSocket    : _wsTC
                }) ;

                var symbolInfo = _symbolInfos[args.symbolCode] ;

                if (symbolInfo) {

                    var modOrder = {
                        orderType       : eOT_MarketOpen ,
                        symbolCode      : args.symbolCode ,
                        orderQuantity   : args.quantity ,
                        bsCode          : args.bsCode ,
                        orderPrice      : args.orderPrice ,
                        pointOffset     : args.pointOffset ,
                        priceTakeProfit : args.priceTakeProfit ,
                        priceStopLose   : args.priceStopLose ,
                        memo            : args.memo ,

                        orderSerial     : 0,
                        orderTime       : _fmtDate(new Date()),
                        revQuantity     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        orderCode       : "" ,
                        orderCodeRe     : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;

                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }

            },

            /**
             * @brief       市价平仓单（按单号平仓）
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          quantity            委托数量
             *          bsCode              买卖方向
             *          orderPrice          委托价格
             *          pointOffset         允许偏离点差
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            marketCloseWithOrder : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_MARKETCLOSE,
                    responseCode : M_R_MARKETCLOSE,
                    webSocket    : _wsTC
                }) ;

                var orderInfo  = args.orderInfo ;

                if (orderInfo) {
                    var symbolInfo = _symbolInfos[orderInfo.symbolCode] ;
                    var bsCode     = (orderInfo.bsCode === BSCODE_BUY) ? BSCODE_SELL : BSCODE_BUY ;
                    var orderPrice = (orderInfo.bsCode === BSCODE_BUY) ? symbolInfo.bid : symbolInfo.ask ;

                    var modOrder = {
                        orderType       : eOT_MarketClose ,
                        symbolCode      : orderInfo.symbolCode ,
                        orderQuantity   : args.quantity ,
                        bsCode          : bsCode ,
                        orderPrice      : orderPrice ,
                        pointOffset     : args.pointOffset ,
                        orderCodeRe     : orderInfo.orderCode ,
                        revQuantity     : args.revQuantity,
                        memo            : args.memo ,

                        priceTakeProfit : 0 ,
                        priceStopLose   : 0 ,
                        orderSerial     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",

                        orderTime       : _fmtDate(new Date()),
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        orderCode       : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;
                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效单据信息') ;
                    }
                }

            },

            /**
             * @brief       市价平仓单（按商品平仓）
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          quantity            委托数量
             *          bsCode              买卖方向
             *          orderPrice          委托价格
             *          pointOffset         允许偏离点差
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            marketCloseWithSymbol : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_POSITION_CLOSE_ORDER,
                    responseCode : M_R_POSITION_CLOSE_ORDER,
                    webSocket    : _wsTC
                }) ;

                var symbolInfo = _symbolInfos[args.symbolCode] ;

                if (symbolInfo) {
                    var orderPrice = (args.bsCode === BSCODE_BUY) ? symbolInfo.bid : symbolInfo.ask ;

                    var modOrder = {
                        orderType       : eOT_MarketClose ,
                        symbolCode      : args.symbolCode ,
                        orderQuantity   : args.quantity ,
                        bsCode          : args.bsCode ,
                        orderPrice      : orderPrice ,
                        pointOffset     : args.pointOffset ,
                        revQuantity     : args.revQuantity,
                        memo            : args.memo ,
                        cutType         : COT_FIFO ,

                        orderCodeRe     : "" ,
                        priceTakeProfit : 0 ,
                        priceStopLose   : 0 ,
                        orderSerial     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",

                        orderTime       : _fmtDate(new Date()),
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        pickInfo        : "" ,
                        orderCode       : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;
                }

                if (symbolInfo) {


                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }


            },

            /**
             * @brief       限价建仓单
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          quantity            委托数量
             *          bsCode              买卖方向
             *          orderPrice          委托价格
             *          pointOffset         允许偏离点差
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            limitOpen : function(args) {
                var biz = new BizOrder({
                    requestCode  : M_Q_LIMITOPEN,
                    responseCode : M_R_LIMITOPEN,
                    webSocket    : _wsTC
                }) ;

                var symbolInfo = _symbolInfos[args.symbolCode] ;

                if (symbolInfo) {

                    // 根据买卖方向、委托价、现价（ASK/BID）判定限价单的单据类型（止限单/停损单）
                    var priceOver       = (args.orderPrice - ( args.bsCode===BSCODE_BUY ? symbolInfo.ask : symbolInfo.bid )) ;
                    var limitType       = _getLimitType(args.bsCode,priceOver) ;

                    var modOrder = {
                        orderType       : limitType ,
                        symbolCode      : args.symbolCode ,
                        orderQuantity   : args.quantity ,
                        bsCode          : args.bsCode ,
                        orderPrice      : args.orderPrice ,
                        priceTakeProfit : args.priceTakeProfit ,
                        priceStopLose   : args.priceStopLose ,
                        validDateType   : args.validDateType ,
                        limitType       : limitType ,
                        memo            : args.memo ,

                        pointOffset     : 0 ,
                        orderSerial     : 0,
                        orderTime       : _fmtDate(new Date()),
                        revQuantity     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        orderCode       : "" ,
                        orderCodeRe     : "" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;

                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }
            },

            /**
             * @brief       修改委托单
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          orderCode           委托单号
             *          priceStopLose       止损价
             *          priceTakeProfit     止盈价
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            modifyOrder : function(args) {
                var biz = new BizOrder({
                    requestCode  : M_Q_MODIFYORDER,
                    responseCode : M_R_MODIFYORDER,
                    webSocket    : _wsTC
                }) ;

                var orderInfo  = args.orderInfo ;

                if (orderInfo) {
                    var symbolInfo = _symbolInfos[orderInfo.symbolCode] ;
                    var modOrder = {
                        orderType       : M_Q_MODIFYORDER ,
                        symbolCode      : orderInfo.symbolCode ,
                        orderCode       : orderInfo.orderCode,
                        priceStopLose   : args.priceStopLose,
                        priceTakeProfit : args.priceTakeProfit,
                        memo            : args.memo ,

                        orderQuantity   : 0 ,
                        bsCode          : "" ,
                        orderPrice      : 0 ,
                        revQuantity     : 0,
                        pointOffset     : 0 ,
                        orderCodeRe     : "" ,
                        orderSerial     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",

                        orderTime       : _fmtDate(new Date()),
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;
                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效单据信息') ;
                    }
                }
            },
            /**
             * @brief       撤销委托单（限价单）
             * @param args
             *
             *      {
             *          orderInfo           单据信息
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            cancelOrder : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_LIMITUNDO,
                    responseCode : M_R_LIMITUNDO,
                    webSocket    : _wsTC
                }) ;

                var orderInfo  = args.orderInfo ;

                if (orderInfo) {
                    var symbolInfo = _symbolInfos[orderInfo.symbolCode] ;
                    var bsCode     = (orderInfo.bsCode === BSCODE_BUY) ? BSCODE_SELL : BSCODE_BUY ;
                    var orderPrice = (orderInfo.bsCode === BSCODE_BUY) ? symbolInfo.bid : symbolInfo.ask ;

                    var modOrder = {
                        orderType       : eOT_CancelLimit ,
                        symbolCode      : orderInfo.symbolCode ,
                        orderCode       : orderInfo.orderCode ,
                        memo            : args.memo ,

                        orderQuantity   : 0 ,
                        bsCode          : "" ,
                        orderPrice      : 0 ,
                        pointOffset     : 0 ,
                        orderCodeRe     : "" ,
                        revQuantity     : 0,
                        priceTakeProfit : 0 ,
                        priceStopLose   : 0 ,
                        orderSerial     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",

                        orderTime       : _fmtDate(new Date()),
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        validDateType   : "0" ,
                        validDate       : ""
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure
                    }) ;
                }

                if (symbolInfo) {


                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }

            },

            /**
             * @brief       微交易建仓单
             * @param args
             *
             *      {
             *          symbolCode          商品代码
             *          contract            合约编号
             *          quantity            委托数量
             *          bsCode              涨跌方向( 'b' = 买涨，'s' = 买跌 )
             *          orderPrice          委托价格
             *          timeExpire          到期时间
             *          memo                备注
             *
             *          onSuccess : [执行成功回调函数]
             *          onFailure : [执行失败回调函数]
             *      }
             */
            binOptionOpen : function(args) {

                var biz = new BizOrder({
                    requestCode  : M_Q_BINMARKETOPEN,
                    responseCode : M_R_BINMARKETOPEN,
                    webSocket    : _wsTC
                }) ;

                var symbolInfo = _symbolInfos[args.symbolCode] ;

                if (symbolInfo) {

                    var modOrder = {
                        orderType       : eOT_MarketOpen ,
                        symbolCode      : args.symbolCode ,
                        contract        : '', // TODO
                        orderQuantity   : args.quantity ,
                        bsCode          : args.bsCode ,
                        orderPrice      : args.orderPrice ,
                        timeExpire      : 60, // TODO
                        memo            : args.memo ,

                        orderSerial     : 0,
                        orderTime       : _fmtDate(new Date()),
                        revQuantity     : 0,
                        amId            : 0,
                        cmDealerId      : 0,
                        sendType        : "",
                        pointOffset     : 0 ,
                        priceTakeProfit : 0 ,
                        priceStopLose   : 0 ,
                        symbolId        : symbolInfo.symbolId ,
                        pointAsk        : symbolInfo.pointAsk ,
                        pointBid        : symbolInfo.pointBid ,
                        accId           : symbolInfo.accId ,
                        //seatsCode       : symbolInfo.seatsCode ,


                        cutType         : "" ,
                        pickInfo        : "" ,
                        orderCode       : "" ,
                        orderCodeRe     : "" ,
                        validDateType   : "0" ,
                        validDate       : "",

                        'pwd': '',
                        'marginCalculetType': '1',//NEW
                        'marginUsedCalc': '100',//NEW
                        'contractId':args.contractId //NEW
                    } ;

                    biz.makeOrderWithSID({
                        sid       : _modLoginInfo.sid,
                        uid       : _modLoginInfo.uid,
                        orderData : modOrder,
                        onSuccess : function(mods) {
							console.log('111111');
							console.log(mods);

                            if (typeof args.onSuccess==='function') {
                                args.onSuccess(mods) ;
                            }
                        },
                        onFailure : args.onFailure

                    }) ;

                }else{
                    if (args.onFailure) {
                        args.onFailure(BIZ_ERR_INVALID_SYMBOL,'无效的交易商品') ;
                    }
                }

            },

            /**
             * @brief       订阅事件
             * @param eventCode
             * @param callBack
             */
            on : function(eventCode,callBack,scope) {

                if (typeof callBack === 'function') {
                    var callBacks ;
                    if (_subscrib[eventCode]) {
                        callBacks = _subscrib[eventCode] ;
                    }else{
                        callBacks = [] ;
                    }

                    //callBack.key = 'asf_' + Math.random() * 100000 + 1 ;
                    _callBackID ++ ;
                    callBack.key = 'callback_' + _callBackID ;

                    // console.log('订阅 ： ' + eventCode + '  key :' + callBack.key) ;

                    callBacks.push({fn:callBack,scope:scope}) ;
                    _subscrib[eventCode] = callBacks ;
                }
            },

            /**
             * @brief       取消订阅
             * @param eventCode
             * @param callBack
             */
            un : function(eventCode,callBack) {
                var callBacks ;

                // 查找是否有订阅
                // 如果订阅了，则按先进先出原则，把对同一个事件源的订阅移除
                // 当指定的事件源的所有订阅都移除完时，就把整个事件源的订阅删除
                var removeID = 0 ;
                if (_subscrib[eventCode]) {
                    callBacks = _subscrib[eventCode] ;

                    if (callBack) {

                        for (var i=0; i<callBacks.length; i++) {
                            if (callBacks[i].fn.key === callBack.key) {
                                removeID = i ;
                                break ;
                            }
                        }

                    }else{
                    }

                    callBacks.splice(removeID,1) ;

                    if (callBacks.length===0) {
                        delete _subscrib[eventCode] ;
                    }
                }

            }

        };
    }
)() ;

sdk = WETBizSDK ;

console.log('load wetBizSDK complete') ;

// -----------------------------------------------------------------------------
