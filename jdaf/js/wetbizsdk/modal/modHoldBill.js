/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modHoldBill.js
 * @brief 		持仓单信息数据模型
 *
 *
 * @version 	v1.0  build:20140510
 * @author		dev
 * @date		2014-05-10
 *
 */

Ext.define('TC.model.modHoldBill', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modHoldBill',
    fields		: [
        {name: 'accId', type:'int'}, // 资金账户Id
        {name: 'bsCode', type:'string'}, // 买卖方向
        {name: 'chargeInterest', type:'float'}, // 递延费
        {name: 'chargeOpen', type:'float'}, // 建仓手续费
        {name: 'marginUsed', type:'float'}, // 占用保证金
        {name: 'openDate', type:'string'}, // 建仓时间
        {name: 'orderCode', type:'string'}, // 委托单号
        {name: 'priceHold', type:'float'}, // 持仓价
        {name: 'priceOpen', type:'float'}, // 建仓价
        {name: 'quantityHold', type:'float'}, // 持仓数量
        {name: 'priceStopLose', type:'float'}, // 止损价
        {name: 'symbolCode', type:'string'}, // 商品代码
        {name: 'symbolId', type:'int'}, // 商品代码
        {name: 'priceTakeProfit', type:'float'}, // 止盈价

        // ----- 以下是与商品信息相关的数据 ------
        {name: 'profitSettl', type:'float'}, // 结算盈亏

        {name: 'decimal', type:'int'}, // 最小变动单位
        {name: 'markPrice', type:'float'},  // 最新价
        {name: 'dynProfitPrice', type:'float'},  // 浮动盈亏( 以报价货币计算的盈亏)
        {name: 'dynProfit', type:'float'},  // 浮动盈亏
        {name: 'upOrDown', type:'int'},  // 涨跌方向
        {name: 'symbolName', type:'string'}, // 商品名称
        {name: 'pointPF', type:'int'} // 盈亏点
    ]
});