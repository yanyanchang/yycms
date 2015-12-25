/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modHoldPosition.js
 * @brief 		头寸信息数据模型
 *
 *
 * @version 	v1.0  build:20140919
 * @author		dev
 * @date		2014-09-19
 *
 */

Ext.define('TC.model.modHoldPosition', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modHoldPosition',
    fields		: [

        {name: 'accId', type:'string'}, // 资金账户Id
        {name: 'moneyBuy', type:'float'}, // 买方成交金额
        {name: 'moneySell', type:'float'}, // 卖方成交金额
        {name: 'quantityBuy', type:'float'}, // 买方数量
        {name: 'quantitySell', type:'float'}, // 卖方数量
        {name: 'symbolId', type:'string'}, // 商品Id

        {name: 'accCode', type:'string'}, //
        {name: 'symbolName', type:'string'}, // 商品名称
        {name: 'symbolCode', type:'string'}, // 商品名称
        {name: 'tradeMarketName', type:'string'},//

        // -------- 关联的交割申请信息  -------------
        {name: 'ask', type:'float'}, //
        {name: 'bid', type:'float'}, //
        {name: 'dpBuy', type:'float'}, //
        {name: 'dpSell', type:'float'}, //

        {name: 'quantityApplication', type:'float'}, // 申报数量
        {name: 'bsCode', type:'string'}, // 买卖方向
        {name: 'marginDelivery', type:'float'} // 交割履约保证金

    ]
});