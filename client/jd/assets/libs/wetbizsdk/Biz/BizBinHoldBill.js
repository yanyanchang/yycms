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
