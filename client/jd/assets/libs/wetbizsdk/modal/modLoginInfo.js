/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modLoginInfo.js
 * @brief 		登录信息模型
 * 
 *
 * @version 	v1.0  build:20131024
 * @author		dev
 * @date		2014-03-13
 *
 */

Ext.define('TC.model.modLoginInfo', {
    extend				: 'Ext.data.Model',
    alternateClassName  : 'modLoginInfo',
    fields		        : [
        {name: 'hasIP',		type:'bool'},   // 设置是否有参数化 IP 地址，true 表示有
        {name: 'url',		type:'string'}, // 登录网关地址
        {name: 'uid',		type:'string'}, // 登录账户ID 这个是登录帐号
        {name: 'pwd',		type:'string'}, // 登录密码
        {name: 'vcode',		type:'string'}, // 登录验证码
        {name: 'userType',	type:'string'}, // 账户类型：1=交易账户，2=管理员账户
        {name: 'sid',		type:'string'}, // 登录服务分配的 session id
        {name: 'token',		type:'string'}, // 业务网关返回的授权码
        {name: 'userId',    type:'string'}, // 登录账户ID
        {name: 'userName',	type:'string'}  // 登录账户名称
    ],

	// 消息流水号
    msgOrder	: 0,
    getMsgOrder : function() {
		var me = this ;
		
		// TODO : 注意要处理溢出
		me.msgOrder ++ ;
		return me.msgOrder ;
    }
});