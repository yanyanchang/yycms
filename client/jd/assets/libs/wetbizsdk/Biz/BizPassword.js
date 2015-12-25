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
        var bizData = {
            'pwdType'  : 1,
            'newPWD'   : args.newPWD,
            'oldPWD'   : args.oldPWD,
            'userId'   : args.userId
        } ;

        var wet = {
            'event'    : M_Q_CHANGEPWD,
            'msgOrder' : me.getMsgOrder(),
            'encrypt'  : M_DATA_ENCRYPT,
            'data'     : bizData
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

