/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modPayPort.js
 * @brief 		支付机构数据模型
 *
 *
 * @version 	v1.0  build:20141215
 * @author		dev
 * @date		2014-12-15
 *
 */

Ext.define('TC.model.modPayPort', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modPayPort',
    fields		: [
        {name: 'cleanType', type:'string'}, // 清算类型
        {name: 'needToCheckin', type:'string'}, // 是否签到标志
        {name: 'payPortBizCode', type:'string'}, // 关联商户编号
        {name: 'payPortCode', type:'string'}, // 支付接口编号
        {name: 'payPortId', type:'int'}, // 支付机构ID
        {name: 'payPortName', type:'string'}, // 支付机构名称
        {name: 'payPortType', type:'string'}, // 支付接口类型
        {name: 'timeCheckin', type:'string'}, // 签到时间
        {name: 'timeCheckout', type:'string'}, // 签退时间
        {name: 'timeClean', type:'string'} // 对账清算时间
    ]
});