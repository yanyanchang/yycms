/**
 * Created by dev on 14-4-5.
 */
/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modMessage.js
 * @brief 		消息数据模型
 *
 *
 * @version 	v1.0  build:20141208
 * @author		dev
 * @date		2014-12-08
 *
 */

Ext.define('TC.model.modMessage', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modMessage',
    fields		: [
        {name: 'msgType', type: 'string'}, // 消息类型，1=系统推送消息，2=交易商公告
        {name: 'title', type:'string'}, //
        {name: 'msgTime', type:'string'}, //
        {name: 'bulletinId', type:'int'}, //
        {name: 'content', type:'string'}  //
    ]
});