/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modLimitBill.js
 * @brief 		限价单信息数据模型
 *
 *
 * @version 	v1.0  build:20140513
 * @author		dev
 * @date		2014-05-13
 *
 */

Ext.define('TC.model.modLimitBill', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modLimitBill',
    fields		: [

        {name: 'accId', type:'int'}, // 资金账户Id
        {name: 'bsCode', type:'string'}, // 买卖方向
        {name: 'limitType', type:'string'}, // 单据类型
        {name: 'marginFreezed', type:'float'}, // 冻结保证金
        {name: 'memo', type:'string'}, // 备注
        {name: 'openDate', type:'string'}, // 建仓日期
        {name: 'openTime', type:'string'}, // 建仓日期
        {name: 'orderCode', type:'string'}, // 委托单号
        {name: 'orderPrice', type:'float'}, // 委托价
        {name: 'priceStopLose', type:'float'}, // 止损价
        {name: 'priceTakeProfit', type:'float'}, // 止盈价
        {name: 'quantityComplete', type:'float'}, // 成交数量
        {name: 'quantityOrder', type:'float'}, // 委托数量
        {name: 'symbolCode', type:'string'}, // 商品代码
        {name: 'validDate', type:'string'}, // 有效日期
        {name: 'validDateType', type:'string'}, // 单据有效期类型

        // ----- 以下是与商品信息相关的数据 ------
        {name: 'symbolName', type:'string'} // 商品名称
    ]
});