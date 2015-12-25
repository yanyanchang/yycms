/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modQuoted.js
 * @brief 		商品报价信息数据模型
 *
 *
 * @version 	v1.0  build:20131024
 * @author		dev
 * @date		2014-03-29
 *
 */

Ext.define('TC.model.modQuoted', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modQuoted',
    fields		: [

        {name: 'ask', type:'float'}, // 买价
        {name: 'bid', type:'float'}, // 卖价
        {name: 'lastTime', type:'string'}, // 更新时间
        {name: 'priceClose', type:'float'}, // 收盘价
        {name: 'priceCurrent', type:'float'}, // 最新价
        {name: 'priceHighest', type:'float'}, // 最高价
        {name: 'priceLowest', type:'float'}, // 最低价
        {name: 'dailyHighest', type:'float'}, // 最高价(日间)
        {name: 'dailyLowest', type:'float'}, // 最低价(日间)
        {name: 'symbolCode', type:'string'}, // 商品代码
        {name: 'upOrDown', type:'int'},  // 涨跌方向

        // --- 关联
        {name: 'tradeMarketName', type:'string'}, // 交易市场名称
        {name: 'statusTrade', type:'string'}, // 交易状态

        {name: 'decimal', type:'int'}, // 最小变动单位
        {name: 'spread', type:'int'}, // 是否休市
        {name: 'symbolName', type:'string'}, // 商品名称
        {name: 'isClose', type:'boolean'}, // 是否休市
        {name: 'isTrade', type:'boolean'}  // 是否交易商品
//
//        {name: 'allowShortPosition', type:'boolean'}, // 空头单
//        {name: 'contractSize', type:'string'}, // 合约单位
//        {name: 'filterLevel', type:'string'}, // 买卖价点差限制
//        {name: 'filterTimes', type:'string'}, // 滤价次数
//        {name: 'limitPriceDown', type:'string'}, // 跌停限制
//        {name: 'limitPriceType', type:'string'}, // 涨跌停限制类型
//        {name: 'limitPriceUp', type:'string'}, // 涨停限制
//        {name: 'longOnly', type:'boolean'}, // 单边持仓限制
//        {name: 'quotedDecimal', type:'string'}, // 行情有效小数位数
//        {name: 'extSymbolCode', type:'string'}, // 行情源商品代码
//        {name: 'extSymbolCurrency', type:'string'}, // 行情源货币代码
//        {name: 'symbolCode', type:'string'}, // 商品代码
//        {name: 'symbolCurrency', type:'string'}, // 报价货币代码
//        {name: 'symbolId', type:'string'}, // 商品Id
//        {name: 'symbolName', type:'string'}, // 商品名称
//        {name: 'symbolType', type:'string'}, // 商品类型
//        {name: 'timeoutRange', type:'string'}, // 超时时间段
//        {name: 'tradeMarketId', type:'string'}, // 交易市场Id
//        {name: 'traderAccess', type:'string'}, // 交易权限
//        {name: 'tradeTMRange', type:'string'}, // 交易时间段
//
//        // ----- 以下是需要关联到交易市场的数据 ------
//        {name: 'tradeMarketName', type:'string'}, // 交易市场名称
//
//        // ----- 以下是与商品属性相关的数据 ------
//        {name: 'pointBuy', type:'string'}, // 买价点差
//        {name: 'pointSell', type:'string'}, // 卖出点差
//        {name: 'pointTakeProfit', type:'string'}, // 止盈点差
//        {name: 'pointStopLose', type:'string'}, // 止损点差
//        {name: 'pointLimit', type:'string'}, // 限价点差
//
//        // ----- 以下是与报价相关的数据 ------
//        {name: 'ask', type:'string'}, // 买价价
//        {name: 'bid', type:'string'}, // 卖价价
//        {name: 'open', type:'string'}, // 开盘价
//        {name: 'high', type:'string'}, // 最高价
//        {name: 'low', type:'string'}, // 最低价
//        {name: 'last', type:'string'} // 最新价
    ]
});