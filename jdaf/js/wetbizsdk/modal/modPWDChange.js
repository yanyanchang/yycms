/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modPWDChange.js
 * @brief 		修改密码数据模型
 *
 *
 * @version 	v1.0  build:20140519
 * @author		dev
 * @date		2014-05-19
 *
 */

Ext.define('TC.model.modPWDChange', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modPWDChange',
    fields		: [

        {name: 'pwdType', type:'string'}, // 密码类型
        {name: 'newPWD', type:'string'}, // 新密码
        {name: 'oldPWD', type:'string'}, // 旧密码
        {name: 'userId', type:'string'}  // 账户ID

    ]
});