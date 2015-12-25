/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modOrder.js
 * @brief 		委托单数据模型
 *
 *
 * @version 	v1.0  build:20140518
 * @author		dev
 * @date		2014-05-18
 *
 */

Ext.define('TC.model.modOrder', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modOrder',
    fields		: [

        {name: 'accId', type:'int'}, // 资金帐户Id
        {name: 'orderType', type:'string'}, // 挂单类型
        {name: 'pointAsk', type:'float'}, // 买点差
        {name: 'pointBid', type:'float'}, // 卖点差
        {name: 'bsCode', type:'string'}, // 买卖方向
        {name: 'orderSerial', type:'int'}, // 报单编号
        {name: 'memo', type:'string'}, // 备注
        {name: 'orderCode', type:'string'}, // 建仓委托单号
        {name: 'orderCodeRe', type:'string'}, // 关联单号
        {name: 'orderPrice', type:'float'}, // 委托价
        {name: 'orderQuantity', type:'float'}, // 委托数量
        {name: 'orderTime', type:'string'}, // 委托时间
        {name: 'pointOffset', type:'int'}, // 偏离点差
        {name: 'priceStopLose', type:'float'}, // 止损价
        {name: 'priceTakeProfit', type:'float'}, // 止盈价
        {name: 'revQuantity', type:'float'}, // 反手建仓数量
        {name: 'seatsCode', type:'string'}, // 席位号
        {name: 'symbolCode', type:'string'}, // 商品代码
        {name: 'symbolId', type:'int'}, // 商品代码
        {name: 'validDateType', type:'string'}, // 有效期类型
        {name: 'validDate', type:'string'},  // 有效日期
        {name: 'amId', type:'int'},  // 出入金流水ID，针对撤销出入金的业务
        {name: 'cmDealerId', type:'int'},  // 结算会员ID，用于综合会员下单业务
        {name: 'sendType', type:'string'},  // 保留，暂不使用，1=自营盘，2=对冲盘

        {name: 'pwd', type:'string'} // 需要资金密码的委托业务必填

    ]
});