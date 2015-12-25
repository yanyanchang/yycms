/**
 * Created by dev on 14-4-5.
 */
/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modUserAccount.js
 * @brief 		用户资金账户数据模型
 *
 *
 * @version 	v1.0  build:20131024
 * @author		dev
 * @date		2014-04-05
 *
 */

Ext.define('TC.model.modUserAccount', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modUserAccount',
    fields		: [
        {name: 'accCode', type:'string'}, // 资金账户编号
        {name: 'accId', type:'int'}, // 资金账户Id
        {name: 'amWithdrawable', type:'string'}, // 可出资金
        {name: 'amMarginFree', type:'float'}, // 可用保证金
        {name: 'amMarginFreezed', type:'float'}, // 冻结保证金
        {name: 'amMarginRemain', type:'float'}, // 剩余保证金
        {name: 'amMarginUsed', type:'float'}, // 占用保证金
        {name: 'amDailyCloseProfit', type:'float'}, // 当日累计平仓盈亏
        {name: 'amDailyCharge', type:'float'}, // 当日累计手续费
        {name: 'currencyCode', type:'string'}, // 结算货币
        {name: 'netValue', type:'float'}, // 净值
        {name: 'profitClose', type:'float'}, // 平仓盈亏
        {name: 'profitDyn', type:'float'}, // 浮动盈亏
        {name: 'pointPF', type:'int'}, // 盈亏点
        {name: 'risk', type:'float'}, // 风险率
        {name: 'riskType', type:'string'}, // 风险率计算方式
        {name: 'riskCustomWarning', type:'float'}, // 客户预警风险率
        {name: 'riskCustomCut', type:'float'}, // 客户强平风险率
        {name: 'riskLevel', type:'int'}, // 量化的风险等级: 0=无风险，1=低风险，2=中风险，3=高风险
        {name: 'riskPercent', type:'float'}, // 风险进度值: 0=高风险，1=无风险
        {name: 'seatsCode', type:'string'}, // 席位号
        {name: 'tradeMarketName', type:'string'}  // 交易市场名称
    ]
});