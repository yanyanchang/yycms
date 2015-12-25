/**
 * Created by dev on 14-4-5.
 */
/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modCERInfo.js
 * @brief 		汇率数据模型
 *
 *
 * @version 	v1.0  build:20141011
 * @author		dev
 * @date		2014-04-11
 *
 */

Ext.define('TC.model.modCERInfo', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modCERInfo',
    fields		: [
        {name: 'currencyBase', type:'string'}, // 基准货币代码
        {name: 'currencyExchange', type:'string'}, // 兑换货币代码
        {name: 'exchangeRate', type:'float'}, // 兑换率
        {name: 'exchangeRateId', type:'string'}, // ID
        {name: 'sourceCode', type:'string'}, // 行情源代码
        {name: 'tradeDate', type:'string'}  // 交易日
    ]
});