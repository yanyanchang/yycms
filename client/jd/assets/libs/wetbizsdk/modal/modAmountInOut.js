function modAmountInOut() {
    return {

    } ;
}


/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modAmountInOut.js
 * @brief 		出入金申请数据模型
 *
 *
 * @version 	v1.0  build:20140519
 * @author		dev
 * @date		2014-05-19
 *
 */

Ext.define('TC.model.modAmountInOut', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modAmountInOut',
    fields		: [

        {name: 'accId', type:'string'}, // 资金账户Id
        {name: 'amChange', type:'string'}, // 变动金额
        {name: 'amType', type:'string'}, // 资金变动类型
        {name: 'changeDate', type:'string'}, // 申请日期
        {name: 'memo', type:'string'}, // 备注
        {name: 'pwd', type:'string'}, // 备注
        {name: 'userId', type:'string'} // 申请人账户Id

    ]
});