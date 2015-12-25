/**
 * Created by dev on 14-4-5.
 */
/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modSymbol.js
 * @brief 		商品信息数据模型
 *
 *
 * @version 	v1.0  build:20131024
 * @author		dev
 * @date		2014-04-05
 *
 */

Ext.define('TC.model.modSymbol', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modSymbol',
    fields		: [
        {name: 'accId', type:'int'}, // 资金账户Id
        {name: 'ask', type:'float'}, // 买入价
        {name: 'bid', type:'float'}, // 卖出价
        {name: 'decimal', type:'int'}, // 最小变动单位
        {name: 'exchangeRate', type:'string'}, // 汇率
        {name: 'isClose', type:'boolean'}, // 是否休市 //
        {name: 'statusTrade', type:'string'}, // 交易状态
        {name: 'isTrade', type:'boolean'}, // 是否交易商品
        {name: 'maxPointOffset', type:'int'}, // 最大偏离点差
        {name: 'maxTradeQuantity', type:'int'}, // 最大可交易数量
        {name: 'minTradeQuantity', type:'int'}, // 最小可交易数量
        {name: 'moveRate', type:'int'}, // 贴水
        {name: 'pointAsk', type:'int'}, // 买方点差
        {name: 'pointBid', type:'int'}, // 卖方点差
        {name: 'pointLimit', type:'int'}, // 限价点差
        {name: 'pointStopLose', type:'int'}, // 止损点差
        {name: 'pointTakeProfit', type:'int'}, // 止盈点差
        {name: 'priceClose', type:'float'}, // 昨收价
        {name: 'priceCurrent', type:'float'}, // 最新价
        {name: 'priceHighest', type:'float'}, // 最高价
        {name: 'priceLowest', type:'float'}, // 最低价
        {name: 'priceOpen', type:'float'}, // 开盘价
        {name: 'quantityStep', type:'string'}, // 交易数量递增步长
        {name: 'seatsCode', type:'string'}, // 交易关联席位号
        {name: 'symbolCode', type:'string'}, // 商品代码
        {name: 'symbolCurrency', type:'string'}, // 报价货币代码
        {name: 'symbolId', type:'int'}, // 商品ID
        {name: 'symbolName', type:'string'}, // 商品名称
        {name: 'symbolType', type:'int'}, // 商品类型
        {name: 'tradeMarketId', type:'string'}, // 交易市场Id
        {name: 'tradeMarketName', type:'string'}, // 交易市场名称
        {name: 'unit', type:'int'},  // 合约单位
        {name: 'date', type:'string'},  // 行情最后更新时间

        {name: 'spread', type:'int'},   // 点差
        {name: 'beginTime', type:'int'},   // 开市时间
        {name: 'endTime', type:'int'},   // 收市时间
        {name: 'beginTradeTime', type:'string'},   // 开市时间
        {name: 'endTradeTime', type:'string'}   // 收市时间
    ]
});