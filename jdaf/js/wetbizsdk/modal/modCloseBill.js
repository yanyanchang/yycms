/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modCloseBill.js
 * @brief 		平仓单信息数据模型
 *
 *
 * @version 	v1.0  build:20140513
 * @author		dev
 * @date		2014-05-13
 *
 */

Ext.define('TC.model.modCloseBill', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modCloseBill',
    fields		: [
        {name: 'accId', type:'int'}, // 资金账户Id
        {name: 'bsCode', type:'string'}, // 买卖方向
        {name: 'chargeClose', type:'float'}, // 平仓手续费
        {name: 'chargeInterest', type:'float'}, // 递延费
        {name: 'chargeOpen', type:'float'}, // 建仓手续费
        {name: 'closeDate', type:'string'}, // 平仓时间
        {name: 'closeType', type:'string'}, // 平仓方式
        {name: 'openDate', type:'string'}, // 建仓时间
        {name: 'orderCode', type:'string'}, // 平仓委托单号
        {name: 'orderCodeRe', type:'string'}, // 关联单号
        {name: 'priceClose', type:'float'}, // 平仓价
        {name: 'priceHold', type:'float'}, // 持仓价
        {name: 'priceOpen', type:'float'}, // 建仓价
        {name: 'priceStopLose', type:'float'}, // 止损价
        {name: 'priceTakeProfit', type:'float'}, // 止盈价
        {name: 'profitClose', type:'float'}, // 平仓盈亏
        {name: 'quantityClose', type:'float'}, // 平仓数量
        {name: 'quantityHold', type:'float'}, // 持仓数量
        {name: 'symbolId', type:'int'}, // 商品Id


//        {name: 'accId', type:'string'}, // 资金账户Id
//        {name: 'bsCode', type:'string'}, // 买卖方向
//        {name: 'chargeClose', type:'string'}, // 平仓手续费
//        {name: 'chargeInterest', type:'string'}, // 递延费
//        {name: 'chargeOpen', type:'string'}, // 建仓手续费
//        {name: 'closeDate', type:'string'}, // 平仓时间
//        {name: 'closeType', type:'string'}, // 平仓方式
//        {name: 'openDate', type:'string'}, // 建仓时间
//        {name: 'orderCode', type:'string'}, // 委托单号
//        {name: 'orderCodeClose', type:'string'}, // 平仓委托单号
//        {name: 'priceClose', type:'string'}, // 平仓价
//        {name: 'priceHold', type:'string'}, // 持仓价
//        {name: 'priceOpen', type:'string'}, // 建仓价
//        {name: 'profitClose', type:'string'}, // 平仓盈亏
//        {name: 'quantityClose', type:'string'}, // 平仓数量
//        {name: 'quantityHold', type:'string'}, // 持仓数量
//        {name: 'priceStopLose', type:'string'}, // 止损价
//        {name: 'symbolCode', type:'string'}, // 商品代码
//        {name: 'priceTakeProfit', type:'string'}, // 止盈价

        // ----- 以下是与商品信息相关的数据 ------
        {name: 'closeTime', type:'string'}, // 平仓时间
        {name: 'openTime', type:'string'}, // 建仓时间
        {name: 'symbolCode', type:'string'}, // 商品Id
        {name: 'symbolName', type:'string'} // 商品名称
    ]
});