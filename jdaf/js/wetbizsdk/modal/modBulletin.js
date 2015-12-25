/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modBulletin.js
 * @brief 		交易商公告数据模型
 *
 *
 * @version 	v1.0  build:20140519
 * @author		dev
 * @date		2014-05-19
 *
 */

Ext.define('TC.model.modBulletin', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modBulletin',
    fields		: [
        {name: 'content', type:'string'}, // 公告内容
        {name: 'contentId', type:'string'}, // 公告Id
        {name: 'date', type:'string'}, // 发布日期
        {name: 'level', type:'string'}, // 重要级别
        {name: 'publish', type:'string'}, // 公告发布者
        {name: 'readFlag', type:'string'}, // 阅读标记
        {name: 'title', type:'string'}  // 公告标题
    ]
});