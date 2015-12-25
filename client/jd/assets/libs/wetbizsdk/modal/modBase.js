/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modBase.js
 * @brief 		货币代码数据模型
 *
 *
 * @version 	v1.0  build:20131024
 * @author		dev
 * @date		2014-03-29
 *
 */

Ext.define('TC.model.modBase', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modBase',
    fields		: [
        {name: 'currencyName',		type:'string'}, // 货币名称
        {name: 'currencyCode',		type:'string'} // 货币编号
    ]
});