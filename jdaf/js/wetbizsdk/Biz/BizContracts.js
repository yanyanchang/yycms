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