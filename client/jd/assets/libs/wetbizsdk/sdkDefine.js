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
