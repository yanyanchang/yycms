/**
 * Created by he.zhiyi on 15/6/1.
 */

function BizRegister(args){

    var ret = new IBiz(args) ;

    var _request_code  = '10001' ;
    var _response_code = '10002' ;

    ret.submit = function(args) {
        var me = this ;

        var msgOrder = me.getMsgOrder() ;
        // 生成登录报文
        var bizData = {
            'mobile'   : args.mobile,
            'password' : args.password,
            'vcode'    : args.vcode,
            'action'   : ACTION_ADD,
            'children' : []
        } ;

        var wet = {
            'event'    : _request_code,
            'msgOrder' : msgOrder,
            'encrypt'  : M_DATA_ENCRYPT,
            'data'     : bizData
        };

        switch ( args.method )
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
                if ( !args.url ) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '无效的URL参数设置');
                    }
                    return;
                }

                var xmlHttp = me.getXmlHttpObject() ;

                if ( !xmlHttp ) {
                    if ( typeof args.onFailure === 'function') {
                        args.onFailure(BIZ_ERR_INVALIDWS, '无法创建AJAX对象');
                    }
                    return;
                }

                var strJSON = JSON.stringify(wet) ;
                var url     = args.url ;

                // 将回调函数压入队列
                // TODO : 没有处理超时调用，会造成泄漏
                me.pushQueue(msgOrder,args.onSuccess,args.onFailure) ;

                url += "?jsonData=" + strJSON ;
                url += "&sid=" + Math.random();

                console.log(url) ;

                xmlHttp.onreadystatechange = function() {
                    if ( xmlHttp.readyState===4 )
                    {

                        //console.log(_xmlHttp.responseText) ;

                        var msg = JSON.parse( xmlHttp.responseText );

                        var handler = me.popQueue(msg.msgOrder) ;

                        if ( typeof msg === 'object' && msg.event ) {

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
                xmlHttp.open("GET",url,true);
                xmlHttp.send(null);

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

    } ;

    return ret ;
}
