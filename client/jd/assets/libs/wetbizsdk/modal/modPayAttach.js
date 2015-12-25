/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modPayAttach.js
 * @brief 		客户签约解约数据模型
 *
 *
 * @version 	v1.0  build:20141216
 * @author		dev
 * @date		2014-12-16
 *
 */

Ext.define('TC.model.modPayAttach', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modPayAttach',
    fields		: [
        {name: 'pwd', type:'string'}, // 账户密码
        {name: 'applicationType', type:'string'}, // 申请类型
        {name: 'changeDate', type:'string'}, // 申请时间
        {name: 'confirmDate', type:'string'}, // 审核时间
        {name: 'confirmType', type:'string'}, // 提交人类型
        {name: 'confirmUserId', type:'string'}, // 审核人Id
        {name: 'Id', type:'string'}, // ID
        {name: 'infoIDCard', type:'string'}, // 账户持有人身份证
        {name: 'infoIDType', type:'string'}, // 账户持有人身份证类型
        {name: 'memo', type:'string'}, // 备注
        {name: 'opType', type:'string'}, // 审核人类型
        {name: 'opUserId', type:'string'}, // 申请人Id
        {name: 'payAccount', type:'string'}, // 支付接口帐号
        {name: 'payAccountName', type:'string'}, // 支付接口账户名
        {name: 'payPortId', type:'string'}, // 支付机构ID
        {name: 'rejectMemo', type:'string'}, // 驳回原因
        {name: 'serialCode', type:'string'}, // 申请流水号
        {name: 'serialId', type:'string'}, // 流水编号
        {name: 'status', type:'string'}, // 审核状态
        {name: 'payPortId',type:'int'},
        {name: 'userId', type:'string'} // 用户账户Id
    ]
});