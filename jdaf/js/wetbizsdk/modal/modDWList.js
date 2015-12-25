/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modDWList.js
 * @brief 		出入金信息数据模型
 *
 *
 * @version 	v1.0  build:20141105
 * @author		dev
 * @date		2014-11-05
 *
 */

Ext.define('TC.model.modDWList', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modDWList',
    fields		: [
        {name: 'accId', type:'string'}, // 资金账户Id
        {name: 'amChange', type:'string'}, // 变动金额
        {name: 'amId', type:'string'}, // 出入金流水ID
        {name: 'amType', type:'string'}, // 出入金类型
        {name: 'changeDate', type:'string'}, // 申请时间
        {name: 'confirmDate', type:'string'}, // 审核时间
        {name: 'confirmType', type:'string'}, // 提交人类型
        {name: 'confirmUserId', type:'string'}, // 审核人Id
        {name: 'memo', type:'string'}, // 备注信息
        {name: 'opType', type:'string'}, // 申请人类型
        {name: 'opUserId', type:'string'}, // 申请人Id
        {name: 'payAccount', type:'string'}, // 支付接口帐号
        {name: 'payId', type:'string'}, // ID
        {name: 'payPortId', type:'string'}, // 支付接口类型Id
        {name: 'rejectMemo', type:'string'}, // 驳回原因
        {name: 'serialCode', type:'string'}, // 申请流水号
        {name: 'serialId', type:'string'}, // 流水编号
        {name: 'status', type:'string'}, // 状态

        // ----- 以下是与商品信息相关的数据 ------
        {name: 'tradeMarketName', type:'string'}  // 交易市场名称
    ]
});