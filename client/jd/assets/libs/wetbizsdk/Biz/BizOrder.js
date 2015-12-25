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
