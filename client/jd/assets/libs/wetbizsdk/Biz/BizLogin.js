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
                    if(wetPackage.data.children){
                        mod.data=wetPackage.data.children[0];
                    }

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


