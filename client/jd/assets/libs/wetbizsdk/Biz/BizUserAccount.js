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


