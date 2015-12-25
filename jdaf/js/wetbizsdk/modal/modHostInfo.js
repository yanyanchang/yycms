/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modHostInfo.js
 * @brief 		主机信息模型
 * 
 * 客户端成功登录网关后，将从服务端获得客户端需要访问的主机服务地址，例如：历史
 * 行情服务、资讯服务等
 *
 * @version 	v1.0  build:
 * @author	
 * @date		
 *
 */


Ext.define('TC.model.modHostInfo', {
    extend			    : 'Ext.data.Model',
    alternateClassName  : 'modHostInfo',
    fields		        : [
        {name: 'tradeProxy',		type:'string'}, // 交易服务代理服务地址
        {name: 'quotedProxy',		type:'string'}, // 实时行情代理服务地址
        {name: 'backOfficeProxy',	type:'string'}, // 后台管理代理服务地址
        {name: 'hisQuoted',			type:'string'}, // 历史行情代理服务地址
        {name: 'newsService',		type:'string'}  // 新闻资讯代理服务地址
    ]
});
