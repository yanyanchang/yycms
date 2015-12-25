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
