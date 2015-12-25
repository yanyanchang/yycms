/**
 * Created by he.zhiyi on 15/1/30.
 */
function IBiz(args) {

    if (!IBiz.prototype.statics) {
        IBiz.prototype.statics= { orderNo : 0 };
    }

    var _xmlHttp = null ;

    var _queue = [] ; // 回调函数队列

    // TODO : 这里存在泄漏问题，如果请求发出去没有回应，或回应的数据格式不是预期的格式，则队列里的回调记录不会被清除
    var _pushQueue = function(msgOrder,onSuccess,onFailure) {
        var key = 'queue_' + msgOrder ;
        _queue[key] = {
            onSuccess : onSuccess,
            onFailure : onFailure
        };
    };

    var _popQueue  = function(msgOrder) {
        var key = 'queue_' + msgOrder ;
        var ret = null ;
        if (_queue[key]) {
            ret = {
                onSuccess : _queue[key].onSuccess,
                onFailure : _queue[key].onFailure
            } ;

            delete _queue[key] ;
        }

        return ret ;
    };

    var _stateChanged = function() {

        // console.log('_xmlHttp.readyState = ' + _xmlHttp.readyState.toString()) ;

        if ( _xmlHttp.readyState===4 )
        {

            //console.log(_xmlHttp.responseText) ;

            var msg = JSON.parse(_xmlHttp.responseText);

            var handler = _popQueue(msg.msgOrder) ;

            if (typeof msg === 'object' && msg.event) {

                // 匹配 MessageOrder ，如果没有则是服务端主动发起的推送消息
                if (handler) {

                    if ( msg.retCode === M_RETCODE_SUCCESS ) {

                        if ( typeof handler.onSuccess === 'function') {
                            handler.onSuccess(msg) ;
                        }
                    } else {
                        if ( typeof handler.onFailure === 'function') {
                            handler.onFailure(msg.retCode,msg.message) ;
                        }
                    }

                }else{
                }

            } else {

                if ( handler && typeof handler.onFailure === 'function') {
                    handler.onFailure(WS_ERR_UNKNOWPACKAGE,'收到异常包') ;
                }
                console.log('收到异常包') ;
            }


        }else{

        }
    };

    var _getXmlHttpObject = function() {
        var xmlHttp=null;
        try
        {
            // Firefox, Opera 8.0+, Safari
            xmlHttp = new XMLHttpRequest();
        }
        catch (e)
        {
            // Internet Explorer
            try
            {
                xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e)
            {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xmlHttp;
    } ;


    return {
        ws  : args.webSocket,

        popQueue : _popQueue,
        pushQueue : _pushQueue,

        getMsgOrder : function() {
            IBiz.prototype.statics.orderNo ++ ;
            return IBiz.prototype.statics.orderNo ;
        },

        getXmlHttpObject : _getXmlHttpObject,

        /**
         * @brief       通用数据查询接口
         * @param args
         */
        loadDataWithSID : function(args) {

            var me = this ;
            var msgOrder = me.getMsgOrder() ;

            var bizData = {
                'uid'      : args.uid,
                'sid'      : args.sid,
                'action'   : ACTION_QUERY
            } ;

            var wet = {
                'event'    : me.request_code,
                'msgOrder' : msgOrder,
                'encrypt'  : M_DATA_ENCRYPT,
                'data'     : bizData
            };

            switch (args.method)
            {
                case 'get' :
                case 'post' :
                {
                    /*
                     if (options.type == "GET") {
                     xhr.open("GET", options.url + "?" + params, true);
                     xhr.send(null);
                     } else if (options.type == "POST") {
                     xhr.open("POST", options.url, true);
                     //设置表单提交时的内容类型
                     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                     xhr.send(params);
                     }
                     * */
                    if (!args.url) {
                        if ( typeof args.onFailure === 'function') {
                            args.onFailure(BIZ_ERR_INVALIDWS, '无效的URL参数设置');
                        }
                        return;
                    }

                    _xmlHttp = _getXmlHttpObject() ;

                    if (!_xmlHttp) {
                        if ( typeof args.onFailure === 'function') {
                            args.onFailure(BIZ_ERR_INVALIDWS, '无法创建AJAX对象');
                        }
                        return;
                    }

                    var strJSON = JSON.stringify(wet) ;
                    var url     = args.url ;

                    // 将回调函数压入队列
                    _pushQueue(msgOrder,args.onSuccess,args.onFailure) ;

                    url += "?jsonData=" + strJSON ;
                    url += "&sid=" + Math.random();

                    _xmlHttp.onreadystatechange = _stateChanged;
                    _xmlHttp.open("GET",url,true);
                    _xmlHttp.send(null);

                    break ;
                }
                case 'websocket' :
                default :
                {
                    if (!me.ws) {
                        if ( typeof args.onFailure === 'function') {
                            args.onFailure(BIZ_ERR_INVALIDWS, '通讯组件未初始化');
                        }
                        return;
                    }

                    me.ws.send({
                        wetPackage : wet,
                        onSuccess  : function(wetPackage) {
                            if ( wetPackage.retCode===M_RETCODE_SUCCESS ) {

                                var rows = wetPackage.data.children ;

                                if ( typeof args.onSuccess === 'function' ) {
                                    args.onSuccess(me.pushData(rows)) ;
                                }

                            }else{
                                if (typeof args.onFailure === 'function') {
                                    args.onFailure(wetPackage.retCode,wetPackage.message) ;
                                }
                            }
                        },
                        onFailure  : function(retCode,message) {
                            if (typeof args.onFailure === 'function') {
                                args.onFailure(retCode,message) ;
                            }
                        }
                    }) ;
                }
            }

        },

        pushData : function() {}
    };
}

console.log('load IBiz complete') ;