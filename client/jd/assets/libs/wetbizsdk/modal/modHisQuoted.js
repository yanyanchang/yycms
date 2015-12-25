/**
 * COPYRIGHT NOTICE
 * Copyright (c) 2013, Winner ETrader Client.
 * All rights reserved
 *
 * @file		modHisQuoted.js
 * @brief 		历史行情数据数据模型
 *
 *
 * @version 	v1.0  build:20140519
 * @author		dev
 * @date		2014-05-19
 *
 */

/*
 quoteTime: parseInt(rawData[0]),
 preClose: parseFloat(rawData[1]),
 open: parseFloat(rawData[2]),
 high: parseFloat(rawData[3]),
 low: parseFloat(rawData[4]),
 close: parseFloat(rawData[5]),
 volume: parseInt(rawData[6]),
 amount: parseInt(rawData[7])

 */

Ext.define('TC.model.modHisQuoted', {
    extend		: 'Ext.data.Model',
    alternateClassName  : 'modHisQuoted',
    fields		: [
        {name: 'row', type:'string'},
        {name: 'symbolCode', type:'string'},
        {name: 'quoteTime', type:'int'},
        {name: 'preClose', type:'float'},
        {name: 'open', type:'float'},
        {name: 'high', type:'float'},
        {name: 'low', type:'float'},
        {name: 'close', type:'float'},
        {name: 'volume', type:'float'},
        {name: 'amount', type:'float'}
    ]

});