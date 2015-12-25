function BizBinHoldBill(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_BINHOLDBILL, b.response_code = M_R_BINHOLDBILL, b.pushData = function(a) {
        return a;
    }, b;
}

function BizCERInfo(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_CER_INFO, b.response_code = M_R_CER_INFO, b.pushData = function(a) {
        return a;
    }, b;
}

function BizCloseBill(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_CLOSEBILL, b.response_code = M_R_CLOSEBILL, b.pushData = function(a) {
        return a;
    }, b;
}

function BizContracts(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_CONTRACTS, b.response_code = M_R_CONTRACTS, b.pushData = function(a) {
        return a;
    }, b;
}

function BizHoldBill(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_BINHOLDBILL, b.response_code = M_R_BINHOLDBILL, b.pushData = function(a) {
        return a;
    }, b;
}

function BizHoldPosition(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_HOLDPOSITION, b.response_code = M_R_HOLDPOSITION, b.pushData = function(a) {
        return a;
    }, b;
}

function BizLimitBill(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_LIMITBILL, b.response_code = M_R_LIMITBILL, b.pushData = function(a) {
        return a;
    }, b;
}

function BizLogin(a) {
    var b = new IBiz(a);
    return b.loginWithUID = function(a) {
        var b, c, d = this;
        return d.ws ? (b = {
            uid: a.uid,
            pwd: a.pwd,
            vcode: a.vcode,
            userType: M_USER_TYPE
        }, c = {
            event: M_Q_LOGIN_GW,
            msgOrder: d.getMsgOrder(),
            encrypt: M_DATA_ENCRYPT,
            data: b
        }, d.ws.send({
            wetPackage: c,
            onSuccess: function(b) {
                if (b.retCode === M_RETCODE_SUCCESS) {
                    b.data.hisQueryProxy = "http://120.24.159.238:14020/wetquery/report_client/binaryoptionsorder";
                    var c = b.data;
                    "function" == typeof a.onSuccess && a.onSuccess(c);
                } else "function" == typeof a.onFailure && a.onFailure(b.retCode, b.message);
            },
            onFailure: function(b, c) {
                "function" == typeof a.onFailure && a.onFailure(b, c);
            }
        }), void 0) : ("function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
        void 0);
    }, b.loginWithSID = function(a) {
        var b, c, d = this;
        return d.ws ? (b = {
            sid: a.sid,
            uid: a.uid,
            userId: a.uid,
            pwd: a.pwd,
            vcode: a.vcode,
            userType: M_USER_TYPE
        }, c = {
            event: M_Q_LOGIN,
            msgOrder: d.getMsgOrder(),
            encrypt: M_DATA_UNENCRYPT,
            data: b
        }, d.ws.send({
            wetPackage: c,
            onSuccess: function(b) {
                if (b.retCode === M_RETCODE_SUCCESS) {
                    var c = {
                        token: b.data.token,
                        data: b.data
                    };
                    "function" == typeof a.onSuccess && a.onSuccess(c);
                } else "function" == typeof a.onFailure && a.onFailure(b.retCode, b.message);
            },
            onFailure: function(b, c) {
                "function" == typeof a.onFailure && a.onFailure(b, c);
            }
        }), void 0) : ("function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
        void 0);
    }, b;
}

function BizOrder(a) {
    var b = new IBiz(a), c = a.requestCode;
    return a.responseCode, b.makeOrderWithSID = function(a) {
        var b = this, d = {
            uid: a.uid,
            trUid: a.uid,
            sid: a.sid,
            action: ACTION_ADD,
            children: [ a.orderData ]
        }, e = {
            event: c,
            msgOrder: b.getMsgOrder(),
            encrypt: M_DATA_ENCRYPT,

            data: d
        };
        b.ws.send({
            wetPackage: e,
            onSuccess: function(b) {
                console.log("wetPackage"), console.log(b), b.retCode === M_RETCODE_SUCCESS ? (b.data.children, 
                "function" == typeof a.onSuccess && a.onSuccess(b.data)) : "function" == typeof a.onFailure && a.onFailure(b.retCode, b.message);
            },
            onFailure: function(b, c) {
                "function" == typeof a.onFailure && a.onFailure(b, c);
            },
            onPush: function() {}
        });
    }, b;
}

function BizPassword(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_CHANGEPWD, b.response_code = M_R_CHANGEPWD, b.changeUserPassword = function(a) {
        var b = this, c = {
            pwdType: "1",
            newPWD: a.newPWD,
            oldPWD: a.oldPWD,
            userId: a.userId
        }, d = {
            uid: a.uid,
            trUid: a.uid,
            sid: a.sid,
            action: ACTION_ADD,
            children: [ c ]
        }, e = {
            event: M_Q_CHANGEPWD,
            msgOrder: b.getMsgOrder(),
            encrypt: M_DATA_ENCRYPT,
            data: d,
            ver: "0.0"
        };
        b.ws.send({
            wetPackage: e,
            onSuccess: function(b) {
                b.retCode === M_RETCODE_SUCCESS ? (b.data.children, "function" == typeof a.onSuccess && a.onSuccess(b.data)) : "function" == typeof a.onFailure && a.onFailure(b.retCode, b.message);
            },
            onFailure: function(b, c) {
                "function" == typeof a.onFailure && a.onFailure(b, c);
            },
            onPush: function() {}
        });
    }, b;
}

function BizPayPort(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_AMOUNT, b.response_code = M_R_AMOUNT, b.pushData = function(a) {
        return a;
    }, b;
}

function BizRegister(a) {
    var b = new IBiz(a), c = "10001";
    return b.submit = function(a) {
        var b, d, e, f = this, g = f.getMsgOrder(), h = {
            mobile: a.mobile,
            password: a.password,
            vcode: a.vcode,
            action: ACTION_ADD,
            children: []
        }, i = {
            event: c,
            msgOrder: g,
            encrypt: M_DATA_ENCRYPT,
            data: h
        };
        switch (a.method) {
          case "get":
          case "post":
            if (!a.url) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "无效的URL参数设置"), 
            void 0;
            if (b = f.getXmlHttpObject(), !b) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "无法创建AJAX对象"), 
            void 0;
            d = JSON.stringify(i), e = a.url, f.pushQueue(g, a.onSuccess, a.onFailure), e += "?jsonData=" + d, 
            e += "&sid=" + Math.random(), console.log(e), b.onreadystatechange = function() {
                var a, c;
                4 === b.readyState && (a = JSON.parse(b.responseText), c = f.popQueue(a.msgOrder), 
                "object" == typeof a && a.event ? c && (a.retCode === M_RETCODE_SUCCESS ? "function" == typeof c.onSuccess && c.onSuccess(a) : "function" == typeof c.onFailure && c.onFailure(a.retCode, a.message)) : (c && "function" == typeof c.onFailure && c.onFailure(WS_ERR_UNKNOWPACKAGE, "收到异常包"), 
                console.log("收到异常包")));
            }, b.open("GET", e, !0), b.send(null);
            break;

          case "websocket":
          default:
            if (!f.ws) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            f.ws.send({
                wetPackage: i,
                onSuccess: function(b) {
                    if (b.retCode === M_RETCODE_SUCCESS) {
                        var c = b.data.children;
                        "function" == typeof a.onSuccess && a.onSuccess(f.pushData(c));
                    } else "function" == typeof a.onFailure && a.onFailure(b.retCode, b.message);
                },
                onFailure: function(b, c) {
                    "function" == typeof a.onFailure && a.onFailure(b, c);
                }
            });
        }
    }, b;
}

function BizSymbolInfo(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_SYMBOL, b.response_code = M_R_SYMBOL, b.pushData = function(a) {
        return a;
    }, b;
}

function BizTest(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_AMOUNT, b.response_code = M_R_AMOUNT, b.pushData = function(a) {
        return a;
    }, b;
}

function BizUserAccount(a) {
    var b = new IBiz(a);
    return b.request_code = M_Q_AMOUNT, b.response_code = M_R_AMOUNT, b.pushData = function(a) {
        return a;
    }, b;
}

function IBiz(a) {
    var b, c, d, e, f, g;
    return IBiz.prototype.statics || (IBiz.prototype.statics = {
        orderNo: 0
    }), b = null, c = [], d = function(a, b, d) {
        var e = "queue_" + a;
        c[e] = {
            onSuccess: b,
            onFailure: d
        };
    }, e = function(a) {
        var b = "queue_" + a, d = null;
        return c[b] && (d = {
            onSuccess: c[b].onSuccess,
            onFailure: c[b].onFailure
        }, delete c[b]), d;
    }, f = function() {
        var a, c;
        4 === b.readyState && (a = JSON.parse(b.responseText), c = e(a.msgOrder), "object" == typeof a && a.event ? c && (a.retCode === M_RETCODE_SUCCESS ? "function" == typeof c.onSuccess && c.onSuccess(a) : "function" == typeof c.onFailure && c.onFailure(a.retCode, a.message)) : (c && "function" == typeof c.onFailure && c.onFailure(WS_ERR_UNKNOWPACKAGE, "收到异常包"), 
        console.log("收到异常包")));
    }, g = function() {
        var a = null;
        try {
            a = new XMLHttpRequest();
        } catch (b) {
            try {
                a = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (b) {
                a = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return a;
    }, {
        ws: a.webSocket,
        popQueue: e,
        pushQueue: d,
        getMsgOrder: function() {
            return IBiz.prototype.statics.orderNo++, IBiz.prototype.statics.orderNo;
        },
        getXmlHttpObject: g,
        loadDataWithSID: function(a) {
            var c, e, h = this, i = h.getMsgOrder(), j = {
                uid: a.uid,
                sid: a.sid,
                action: ACTION_QUERY
            }, k = {
                event: h.request_code,
                msgOrder: i,
                encrypt: M_DATA_ENCRYPT,
                data: j
            };
            switch (a.method) {
              case "get":
              case "post":
                if (!a.url) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "无效的URL参数设置"), 
                void 0;
                if (b = g(), !b) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "无法创建AJAX对象"), 
                void 0;
                c = JSON.stringify(k), e = a.url, d(i, a.onSuccess, a.onFailure), e += "?jsonData=" + c, 
                e += "&sid=" + Math.random(), b.onreadystatechange = f, b.open("GET", e, !0), b.send(null);
                break;

              case "websocket":
              default:
                if (!h.ws) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
                void 0;
                h.ws.send({
                    wetPackage: k,
                    onSuccess: function(b) {
                        if (b.retCode === M_RETCODE_SUCCESS) {
                            var c = b.data.children;
                            "function" == typeof a.onSuccess && a.onSuccess(h.pushData(c));
                        } else "function" == typeof a.onFailure && a.onFailure(b.retCode, b.message);
                    },
                    onFailure: function(b, c) {
                        "function" == typeof a.onFailure && a.onFailure(b, c);
                    }
                });
            }
        },
        pushData: function() {}
    };
}

function uiFunction() {
    var a = function(a, b) {
        var c = a;
        return c = c.substring(0, b);
    }, b = function(a, b) {
        var c = a;
        return c = c.substring(c.length - b, c.length);
    };
    return {
        Date2Epoch: function(a) {
            var b, c, d;
            return "string" == typeof a && (b = a.replace(/-/g, "/"), a = new Date(b)), d = !0, 
            c = d ? parseInt(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds()) / 1e3) : (a.getTime() - a.getMilliseconds()) / 1e3;
        },
        Epoch2Date: function(a) {
            var b = new Date();
            return 1e10 > a && (a *= 1e3), b.setTime(a), b;
        },
        fmtPrice: function(a, b) {
            return a || (a = 0), "string" == typeof a && (a = parseFloat(a)), a.toFixed(b);
        },
        calculPrice: function(a, b, c) {
            var d = a, e = Math.pow(10, c);
            return d = (d * e + b) / e, d = d.toFixed(c);
        },
        fmtShowPrice: function(c, d) {
            var e, f, g, h, i, j;
            if (c || (c = 0), e = {
                price: c.toString()
            }, c) if (f = Math.pow(10, d), g = Math.round(c * f).toString(), h = g.indexOf("."), 
            h >= 0 && (g = a(g, h)), i = Math.min(d, 2), e.price1 = a(g, g.length - i), e.price2 = g.replace(e.price1, ""), 
            0 === d) switch (j = e.price1.length) {
              case 0:
              case 1:
              case 2:
                e.price2 = e.price1, e.price1 = "";
                break;

              default:
                e.price2 = b(e.price1, 2), e.price1 = a(e.price1, j - 2);
            } else d > 2 && (e.price1 = (parseInt(a(g, g.length - i) + "11") / f).toString(), 
            e.price1 = a(e.price1, e.price1.length - i)), d > 0 && -1 == e.price1.indexOf(".") && (e.price2 = "." + e.price2); else e.price1 = "0", 
            e.price2 = "";
            return e.price = e.price1 + e.price2, e;
        },
        fmtDate: function(a) {
            var c;
            return c = a.getFullYear() + "-", c += b("0" + (a.getMonth() + 1), 2) + "-", c += b("0" + a.getDate(), 2) + " ", 
            c += b("0" + a.getHours(), 2) + ":", c += b("0" + a.getMinutes(), 2) + ":", c += b("0" + a.getSeconds(), 2);
        },
        fmtMSDate: function(a) {
            var c;
            return c = a.getFullYear() + "-", c += b("0" + (a.getMonth() + 1), 2) + "-", c += b("0" + a.getDate(), 2) + " ", 
            c += b("0" + a.getHours(), 2) + ":", c += b("0" + a.getMinutes(), 2) + ":", c += b("0" + a.getSeconds(), 2) + ":", 
            c += b("0000" + a.getMilliseconds(), 4);
        },
        fmtDate2: function(a) {
            var c;
            return c = a.getFullYear(), c += b("0" + (a.getMonth() + 1), 2), c += b("0" + a.getDate(), 2), 
            c += b("0" + a.getHours(), 2), c += b("0" + a.getMinutes(), 2), c += b("0" + a.getSeconds(), 2);
        },
        fmtShortDate: function(a) {
            if ("string" == typeof a) return a;
            var c;
            return c = a.getFullYear(), c += "/", c += b("0" + (a.getMonth() + 1), 2), c += "/", 
            c += b("0" + a.getDate(), 2);
        },
        fmtMDDate: function(a) {
            var c, d;
            return "string" == typeof a ? (c = a.indexOf("-"), c >= 0 && (a = b(a, a.length - c - 1)), 
            a) : (d += b("0" + (a.getMonth() + 1), 2), d += "-", d += b("0" + a.getDate(), 2));
        },
        strLeft: function(b, c) {
            return a(b, c);
        },
        strRight: function(a, c) {
            return b(a, c);
        },
        getGuid: function() {
            var a, b, c = "";
            for (a = 1; 32 >= a; a++) b = Math.floor(16 * Math.random()).toString(16), c += b, 
            (8 == a || 12 == a || 16 == a || 20 == a) && (c += "-");
            return c;
        },
        getXmlHttpObject: function() {
            var a = null;
            try {
                a = new XMLHttpRequest();
            } catch (b) {
                try {
                    a = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (b) {
                    a = new ActiveXObject("Microsoft.XMLHTTP");
                }
            }
            return a;
        }
    };
}

function webSocket(a) {
    var b = function(a, b) {
        var c = a;
        return c = c.substring(0, b);
    }, c = [], d = function(a, b, d) {
        var e = "queue_" + a;
        c[e] = {
            onSuccess: b,
            onFailure: d
        };
    }, e = function(a) {
        var b = "queue_" + a, d = null;
        return c[b] && (d = {
            onSuccess: c[b].onSuccess,
            onFailure: c[b].onFailure
        }, delete c[b]), d;
    }, f = !1, g = !1, h = a.key, i = a.iv, j = a.isEncrypt, k = a.heartBeat, l = new Date(), m = new Date(), n = 12e4, o = a.protocol || WS_PROTOCOL_DEFAULT, p = null, q = null, r = !1, s = null, t = function(a) {
        var c = this;
        return p && (r = !0, p.close()), q = a, p = new WebSocket(a), p.scope = c, p.onerror = function() {
            alert("服务器繁忙,请稍后再重试！"), location.reload();
        }, p.onopen = function() {
            var a, b = p.scope || this;
            r = !1, "function" == typeof b.onopen && (a = b.scope || this, b.onopen.call(a)), 
            f = !0, k && w.call(b);
        }, p.onclose = function() {
            if (f = !1, "function" == typeof c.onclose) {
                var a = c.scope || this;
                r || c.onclose.call(a);
            }
        }, p.onmessage = function(a) {
            var c, d, f, k, m = this.scope, n = a.data;
            if (l = new Date(), 0 === n.length) return console.log("收到心跳包"), void 0;
            if (j === M_DATA_ENCRYPT && "{" !== b(n, 1) && (c = CryptoJS.AES.decrypt(a.data, h, {
                iv: i,
                mode: CryptoJS.mode.ECB
            }), n = c.toString(CryptoJS.enc.Utf8)), n.length <= 2) return console.log("收到心跳包"), 
            void 0;
            switch (g = !1, o) {
              case WS_PROTOCOL_QCMP:
                d = n.substring(0, 1), "0" === d && (f = {
                    event: M_R_PUSH_QUOTE,
                    data: {
                        children: [ n ]
                    }
                }, "function" == typeof m.onpush && m.onpush.call(m, f));
                break;

              case WS_PROTOCOL_DEFAULT:
              default:
                f = JSON.parse(n), console.log(JSON.stringify(f)), k = e(f.msgOrder), "object" == typeof f && f.event ? k ? "function" == typeof k.onSuccess && k.onSuccess(f) : "function" == typeof m.onpush && m.onpush.call(m, f) : (k && "function" == typeof k.onFailure && k.onFailure(WS_ERR_UNKNOWPACKAGE, "收到异常包"), 
                console.log("收到异常包"));
            }
        }, p;
    }, u = function(a) {
        var b, c, d;
        return "string" == typeof a && (b = a.replace(/-/g, "/"), a = new Date(b)), d = !0, 
        c = d ? parseInt(Date.UTC(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds()) / 1e3) : (a.getTime() - a.getMilliseconds()) / 1e3;
    }, v = function() {
        f && (m = new Date(), console.log("发送心跳包 : " + q), p.send(k.msg));
    }, w = function() {
        var a = this;
        s || (s = setInterval(function() {
            var b = 1e3 * (u(new Date()) - u(l));
            b > n || (b = 1e3 * (u(new Date()) - u(m)), k && b > k.timeout && v.call(a));
        }, k.interval));
    };
    return {
        token: "",
        open: function(a) {
            var b = this;
            f || (b.onopen = a.onOpen, b.onpush = a.onPush, b.onclose = a.onClose, b.scope = a.scope, 
            p = t.call(b, a.url));
        },
        close: function() {
            r = !0, p && p.close();
        },
        reConnect: function(a) {
            var b = this;
            a = a || q, console.log("重连：" + a), setTimeout(function() {
                t.call(b, a);
            }, 1e3);
        },
        send: function(a) {
            var b, c, e, f = this;
            return g ? (f.onFailure && f.onFailure(WS_ERR_BUSY, "上次请求仍在处理中"), void 0) : p ? (g = !0, 
            m = new Date(), b = a.wetPackage, b.data.token = f.token, d(b.msgOrder, a.onSuccess, a.onFailure), 
            c = JSON.stringify(b), console.log(c), j === M_DATA_ENCRYPT ? (e = CryptoJS.AES.encrypt(c, h, {
                iv: i,
                mode: CryptoJS.mode.ECB
            }), p.send(e)) : p.send(c), void 0) : (f.onFailure && f.onFailure(WS_ERR_BUSY, "通讯组件未就绪"), 
            void 0);
        }
    };
}

function jsonP(a, b) {
    var c, d, e;
    procJSONP.push(b), c = a.split("?"), d = c[0] + "?callBack=callBack", c.length > 1 && (d += "&" + c[1]), 
    e = document.createElement("script"), e.setAttribute("src", d), document.getElementsByTagName("head")[0].appendChild(e), 
    setTimeout(function() {
        document.getElementsByTagName("head")[0].removeChild(e);
    }, 1e4);
}

function callBack(a) {
    if (procJSONP.length > 0) {
        var b = procJSONP[0];
        procJSONP.slice(0, 1), "function" == typeof b && b(a);
    }
}

var CryptoJS, sdkDefine, encrypt_iv, encrypt_key, WS_ERR_BUSY, WS_ERR_UNKNOWPACKAGE, WS_PROTOCOL_DEFAULT, WS_PROTOCOL_QCMP, BIZ_ERR_INVALIDWS, BIZ_ERR_INVALID_SYMBOL, M_USER_TYPE, M_RETCODE_SUCCESS, M_RETCODE_FAIL, M_DATA_UNENCRYPT, M_DATA_ENCRYPT, M_HEARTBEAT, M_REQ_TIMEOUT, M_NOTIC_MAXROW, ACTION_ADD, ACTION_MODIFY, ACTION_DELETE, ACTION_QUERY, ACTION_CANCEL, M_Q_PWDKEY, M_R_PWDKEY, M_Q_LOGIN_GW, M_R_LOGIN_GW, M_Q_LOGIN, M_R_LOGIN, M_Q_LOGOUT, M_R_LOGOUT, M_Q_CHANGEPWD, M_R_CHANGEPWD, M_Q_LOGIN_ACC, M_R_LOGIN_ACC, M_Q_AMOUNT, M_R_AMOUNT, M_Q_HOLDBILL, M_R_HOLDBILL, M_Q_BINHOLDBILL, M_R_BINHOLDBILL, M_Q_LIMITBILL, M_R_LIMITBILL, M_Q_CLOSEBILL, M_R_CLOSEBILL, M_Q_SYMBOL, M_R_SYMBOL, M_Q_RULER, M_R_RULER, M_Q_NOTIC, M_R_NOTIC, M_Q_NOTICDETAIL, M_R_NOTICDETAIL, M_Q_TRADEPORT, M_R_TRADEPORT, M_Q_TOKENCHECK, M_R_TOKENCHECK, M_Q_SYMBOLPRICE, M_R_SYMBOLPRICE, M_Q_HIS_QUOTE, M_R_HIS_QUOTE, M_Q_HOLDPOSITION, M_R_HOLDPOSITION, M_Q_CER_INFO, M_R_CER_INFO, M_Q_INOUT_MONEY, M_R_INOUT_MONEY, M_Q_CANCEL_DW, M_R_CANCEL_DW, M_Q_AMOUNTINOUT, M_R_AMOUNTINOUT, M_Q_DELIVERY_ORDER, M_R_DELIVERY_ORDER, M_Q_POSITION_CLOSE_ORDER, M_R_POSITION_CLOSE_ORDER, M_Q_GROUP_CLOSE_ORDER, M_R_GROUP_CLOSE_ORDER, M_Q_MARKET_STATUS, M_R_MARKET_STATUS, M_Q_QTY_PAYPORT, M_R_QTY_PAYPORT, M_Q_QTY_SYS_PAYPORT, M_R_QTY_SYS_PAYPORT, M_Q_PAYPORT_REGIST, M_R_PAYPORT_REGIST, M_Q_PAYPORT_UNREGIST, M_R_PAYPORT_UNREGIST, M_Q_MARKETOPEN, M_R_MARKETOPEN, M_Q_BINMARKETOPEN, M_R_BINMARKETOPEN, M_Q_MARKETCLOSE, M_R_MARKETCLOSE, M_Q_LIMITOPEN, M_R_LIMITOPEN, M_Q_LIMITCLOSE, M_R_LIMITCLOSE, M_Q_LIMITUNDO, M_R_LIMITUNDO, M_Q_MODIFYORDER, M_R_MODIFYORDER, M_Q_CONTRACTS, M_R_CONTRACTS, M_R_PUSH_QUOTE, M_R_PUSH_SYMBOLINFO, PUSH_TRCOMPLETE, PUSH_ACCCHANGE, PUSH_SAMEUSER_LOGIN, PUSH_BE_LOGOUT, PUSH_HOLDBILLCHANGE, PUSH_LIMITBILLCHANGE, PUSH_CLOSEBILLCHANGE, PUSH_POSITIONCHANGE, PUSH_EXCHANGERATE, PUSH_DW_CHANGE, PUSH_SYMBOL_INFO, PUSH_RISK_DOWN, PUSH_RISK_UP, PUSH_SPOTDELIVERY, PUSH_BULLETIN, PUSH_MODIFY_PASSWORD, PUSH_PAYPORT_INFO, PUSH_BANK_IN_URL, PUSH_BINMARKETBILL, M_Q_SUB_QUOTE, M_R_SUB_QUOTE, M_Q_UNSUB_QUOTE, M_R_UNSUB_QUOTE, eOT_MarketOpen, eOT_MarketClose, eOT_LimitOrder, eOT_StopOrder, eOT_LimitClose, eOT_CancelLimit, eOT_ModifyOrder, eOT_ForceClose, eOT_SystemCancel, eOT_DeliveryOrder, COT_FIFO, COT_LIFO, COT_TPFO, COT_SLFO, COT_ALLKL, COT_ALL, BSCODE_BUY, BSCODE_SELL, M_SYMBOLTYPE_NORMA, M_SYMBOLTYPE_INDIRECT, M_SYMBOLTYPE_INDIRECT_2, M_SYMBOLTYPE_CROSS, procJSONP, sdk, WETBizSDK;

console.log("load IBiz complete"), CryptoJS = CryptoJS || function(a, b) {
    var c, d = {}, e = d.lib = {}, f = function() {}, g = e.Base = {
        extend: function(a) {
            f.prototype = this;
            var b = new f();
            return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function() {
                b.$super.init.apply(this, arguments);
            }), b.init.prototype = b, b.$super = this, b;
        },
        create: function() {
            var a = this.extend();
            return a.init.apply(a, arguments), a;
        },
        init: function() {},
        mixIn: function(a) {
            for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
            a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function() {
            return this.init.prototype.extend(this);
        }
    }, h = e.WordArray = g.extend({
        init: function(a, c) {
            a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length;
        },
        toString: function(a) {
            return (a || j).stringify(this);
        },
        concat: function(a) {
            var b, c = this.words, d = a.words, e = this.sigBytes;
            if (a = a.sigBytes, this.clamp(), e % 4) for (b = 0; a > b; b++) c[e + b >>> 2] |= (255 & d[b >>> 2] >>> 24 - 8 * (b % 4)) << 24 - 8 * ((e + b) % 4); else if (65535 < d.length) for (b = 0; a > b; b += 4) c[e + b >>> 2] = d[b >>> 2]; else c.push.apply(c, d);
            return this.sigBytes += a, this;
        },
        clamp: function() {
            var b = this.words, c = this.sigBytes;
            b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4);
        },
        clone: function() {
            var a = g.clone.call(this);
            return a.words = this.words.slice(0), a;
        },
        random: function(b) {
            for (var c = [], d = 0; b > d; d += 4) c.push(0 | 4294967296 * a.random());
            return new h.init(c, b);
        }
    }), i = d.enc = {}, j = i.Hex = {
        stringify: function(a) {
            var b, c, d, e = a.words;
            for (a = a.sigBytes, b = [], c = 0; a > c; c++) d = 255 & e[c >>> 2] >>> 24 - 8 * (c % 4), 
            b.push((d >>> 4).toString(16)), b.push((15 & d).toString(16));
            return b.join("");
        },
        parse: function(a) {
            for (var b = a.length, c = [], d = 0; b > d; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
            return new h.init(c, b / 2);
        }
    }, k = i.Latin1 = {
        stringify: function(a) {
            var b, c, d = a.words;
            for (a = a.sigBytes, b = [], c = 0; a > c; c++) b.push(String.fromCharCode(255 & d[c >>> 2] >>> 24 - 8 * (c % 4)));
            return b.join("");
        },
        parse: function(a) {
            for (var b = a.length, c = [], d = 0; b > d; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
            return new h.init(c, b);
        }
    }, l = i.Utf8 = {
        stringify: function(a) {
            try {
                return decodeURIComponent(escape(k.stringify(a)));
            } catch (b) {
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function(a) {
            return k.parse(unescape(encodeURIComponent(a)));
        }
    }, m = e.BufferedBlockAlgorithm = g.extend({
        reset: function() {
            this._data = new h.init(), this._nDataBytes = 0;
        },
        _append: function(a) {
            "string" == typeof a && (a = l.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
        },
        _process: function(b) {
            var c, d = this._data, e = d.words, f = d.sigBytes, g = this.blockSize, i = f / (4 * g);
            if (i = b ? a.ceil(i) : a.max((0 | i) - this._minBufferSize, 0), b = i * g, f = a.min(4 * b, f), 
            b) {
                for (c = 0; b > c; c += g) this._doProcessBlock(e, c);
                c = e.splice(0, b), d.sigBytes -= f;
            }
            return new h.init(c, f);
        },
        clone: function() {
            var a = g.clone.call(this);
            return a._data = this._data.clone(), a;
        },
        _minBufferSize: 0
    });
    return e.Hasher = m.extend({
        cfg: g.extend(),
        init: function(a) {
            this.cfg = this.cfg.extend(a), this.reset();
        },
        reset: function() {
            m.reset.call(this), this._doReset();
        },
        update: function(a) {
            return this._append(a), this._process(), this;
        },
        finalize: function(a) {
            return a && this._append(a), this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, c) {
                return new a.init(c).finalize(b);
            };
        },
        _createHmacHelper: function(a) {
            return function(b, d) {
                return new c.HMAC.init(a, d).finalize(b);
            };
        }
    }), c = d.algo = {}, d;
}(Math), function() {
    var a = CryptoJS, b = a.lib.WordArray;
    a.enc.Base64 = {
        stringify: function(a) {
            var b, c, d, e = a.words, f = a.sigBytes, g = this._map;
            for (a.clamp(), a = [], b = 0; f > b; b += 3) for (c = (255 & e[b >>> 2] >>> 24 - 8 * (b % 4)) << 16 | (255 & e[b + 1 >>> 2] >>> 24 - 8 * ((b + 1) % 4)) << 8 | 255 & e[b + 2 >>> 2] >>> 24 - 8 * ((b + 2) % 4), 
            d = 0; 4 > d && f > b + .75 * d; d++) a.push(g.charAt(63 & c >>> 6 * (3 - d)));
            if (e = g.charAt(64)) for (;a.length % 4; ) a.push(e);
            return a.join("");
        },
        parse: function(a) {
            var c, d, e, f, g = a.length, h = this._map, i = h.charAt(64);
            for (i && (i = a.indexOf(i), -1 != i && (g = i)), i = [], c = 0, d = 0; g > d; d++) d % 4 && (e = h.indexOf(a.charAt(d - 1)) << 2 * (d % 4), 
            f = h.indexOf(a.charAt(d)) >>> 6 - 2 * (d % 4), i[c >>> 2] |= (e | f) << 24 - 8 * (c % 4), 
            c++);
            return b.create(i, c);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    };
}(), function(a) {
    function b(a, b, c, d, e, f, g) {
        return a = a + (b & c | ~b & d) + e + g, (a << f | a >>> 32 - f) + b;
    }
    function c(a, b, c, d, e, f, g) {
        return a = a + (b & d | c & ~d) + e + g, (a << f | a >>> 32 - f) + b;
    }
    function d(a, b, c, d, e, f, g) {
        return a = a + (b ^ c ^ d) + e + g, (a << f | a >>> 32 - f) + b;
    }
    function e(a, b, c, d, e, f, g) {
        return a = a + (c ^ (b | ~d)) + e + g, (a << f | a >>> 32 - f) + b;
    }
    for (var f = CryptoJS, g = f.lib, h = g.WordArray, i = g.Hasher, g = f.algo, j = [], k = 0; 64 > k; k++) j[k] = 0 | 4294967296 * a.abs(a.sin(k + 1));
    g = g.MD5 = i.extend({
        _doReset: function() {
            this._hash = new h.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function(a, f) {
            var g, h, i, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B;
            for (g = 0; 16 > g; g++) h = f + g, i = a[h], a[h] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
            g = this._hash.words, h = a[f + 0], i = a[f + 1], k = a[f + 2], l = a[f + 3], m = a[f + 4], 
            n = a[f + 5], o = a[f + 6], p = a[f + 7], q = a[f + 8], r = a[f + 9], s = a[f + 10], 
            t = a[f + 11], u = a[f + 12], v = a[f + 13], w = a[f + 14], x = a[f + 15], y = g[0], 
            z = g[1], A = g[2], B = g[3], y = b(y, z, A, B, h, 7, j[0]), B = b(B, y, z, A, i, 12, j[1]), 
            A = b(A, B, y, z, k, 17, j[2]), z = b(z, A, B, y, l, 22, j[3]), y = b(y, z, A, B, m, 7, j[4]), 
            B = b(B, y, z, A, n, 12, j[5]), A = b(A, B, y, z, o, 17, j[6]), z = b(z, A, B, y, p, 22, j[7]), 
            y = b(y, z, A, B, q, 7, j[8]), B = b(B, y, z, A, r, 12, j[9]), A = b(A, B, y, z, s, 17, j[10]), 
            z = b(z, A, B, y, t, 22, j[11]), y = b(y, z, A, B, u, 7, j[12]), B = b(B, y, z, A, v, 12, j[13]), 
            A = b(A, B, y, z, w, 17, j[14]), z = b(z, A, B, y, x, 22, j[15]), y = c(y, z, A, B, i, 5, j[16]), 
            B = c(B, y, z, A, o, 9, j[17]), A = c(A, B, y, z, t, 14, j[18]), z = c(z, A, B, y, h, 20, j[19]), 
            y = c(y, z, A, B, n, 5, j[20]), B = c(B, y, z, A, s, 9, j[21]), A = c(A, B, y, z, x, 14, j[22]), 
            z = c(z, A, B, y, m, 20, j[23]), y = c(y, z, A, B, r, 5, j[24]), B = c(B, y, z, A, w, 9, j[25]), 
            A = c(A, B, y, z, l, 14, j[26]), z = c(z, A, B, y, q, 20, j[27]), y = c(y, z, A, B, v, 5, j[28]), 
            B = c(B, y, z, A, k, 9, j[29]), A = c(A, B, y, z, p, 14, j[30]), z = c(z, A, B, y, u, 20, j[31]), 
            y = d(y, z, A, B, n, 4, j[32]), B = d(B, y, z, A, q, 11, j[33]), A = d(A, B, y, z, t, 16, j[34]), 
            z = d(z, A, B, y, w, 23, j[35]), y = d(y, z, A, B, i, 4, j[36]), B = d(B, y, z, A, m, 11, j[37]), 
            A = d(A, B, y, z, p, 16, j[38]), z = d(z, A, B, y, s, 23, j[39]), y = d(y, z, A, B, v, 4, j[40]), 
            B = d(B, y, z, A, h, 11, j[41]), A = d(A, B, y, z, l, 16, j[42]), z = d(z, A, B, y, o, 23, j[43]), 
            y = d(y, z, A, B, r, 4, j[44]), B = d(B, y, z, A, u, 11, j[45]), A = d(A, B, y, z, x, 16, j[46]), 
            z = d(z, A, B, y, k, 23, j[47]), y = e(y, z, A, B, h, 6, j[48]), B = e(B, y, z, A, p, 10, j[49]), 
            A = e(A, B, y, z, w, 15, j[50]), z = e(z, A, B, y, n, 21, j[51]), y = e(y, z, A, B, u, 6, j[52]), 
            B = e(B, y, z, A, l, 10, j[53]), A = e(A, B, y, z, s, 15, j[54]), z = e(z, A, B, y, i, 21, j[55]), 
            y = e(y, z, A, B, q, 6, j[56]), B = e(B, y, z, A, x, 10, j[57]), A = e(A, B, y, z, o, 15, j[58]), 
            z = e(z, A, B, y, v, 21, j[59]), y = e(y, z, A, B, m, 6, j[60]), B = e(B, y, z, A, t, 10, j[61]), 
            A = e(A, B, y, z, k, 15, j[62]), z = e(z, A, B, y, r, 21, j[63]), g[0] = 0 | g[0] + y, 
            g[1] = 0 | g[1] + z, g[2] = 0 | g[2] + A, g[3] = 0 | g[3] + B;
        },
        _doFinalize: function() {
            var b, c = this._data, d = c.words, e = 8 * this._nDataBytes, f = 8 * c.sigBytes;
            for (d[f >>> 5] |= 128 << 24 - f % 32, b = a.floor(e / 4294967296), d[(f + 64 >>> 9 << 4) + 15] = 16711935 & (b << 8 | b >>> 24) | 4278255360 & (b << 24 | b >>> 8), 
            d[(f + 64 >>> 9 << 4) + 14] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8), 
            c.sigBytes = 4 * (d.length + 1), this._process(), c = this._hash, d = c.words, e = 0; 4 > e; e++) f = d[e], 
            d[e] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8);
            return c;
        },
        clone: function() {
            var a = i.clone.call(this);
            return a._hash = this._hash.clone(), a;
        }
    }), f.MD5 = i._createHelper(g), f.HmacMD5 = i._createHmacHelper(g);
}(Math), function() {
    var a = CryptoJS, b = a.lib, c = b.Base, d = b.WordArray, b = a.algo, e = b.EvpKDF = c.extend({
        cfg: c.extend({
            keySize: 4,
            hasher: b.MD5,
            iterations: 1
        }),
        init: function(a) {
            this.cfg = this.cfg.extend(a);
        },
        compute: function(a, b) {
            var c, e, f, g, h, i, j;
            for (c = this.cfg, e = c.hasher.create(), f = d.create(), g = f.words, h = c.keySize, 
            c = c.iterations; g.length < h; ) {
                for (i && e.update(i), i = e.update(a).finalize(b), e.reset(), j = 1; c > j; j++) i = e.finalize(i), 
                e.reset();
                f.concat(i);
            }
            return f.sigBytes = 4 * h, f;
        }
    });
    a.EvpKDF = function(a, b, c) {
        return e.create(c).compute(a, b);
    };
}(), CryptoJS.lib.Cipher || function(a) {
    var b, c, d, e, f, g, h = CryptoJS, i = h.lib, j = i.Base, k = i.WordArray, l = i.BufferedBlockAlgorithm, m = h.enc.Base64, n = h.algo.EvpKDF, o = i.Cipher = l.extend({
        cfg: j.extend(),
        createEncryptor: function(a, b) {
            return this.create(this._ENC_XFORM_MODE, a, b);
        },
        createDecryptor: function(a, b) {
            return this.create(this._DEC_XFORM_MODE, a, b);
        },
        init: function(a, b, c) {
            this.cfg = this.cfg.extend(c), this._xformMode = a, this._key = b, this.reset();
        },
        reset: function() {
            l.reset.call(this), this._doReset();
        },
        process: function(a) {
            return this._append(a), this._process();
        },
        finalize: function(a) {
            return a && this._append(a), this._doFinalize();
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function(a) {
            return {
                encrypt: function(b, c, d) {
                    return ("string" == typeof c ? g : f).encrypt(a, b, c, d);
                },
                decrypt: function(b, c, d) {
                    return ("string" == typeof c ? g : f).decrypt(a, b, c, d);
                }
            };
        }
    });
    i.StreamCipher = o.extend({
        _doFinalize: function() {
            return this._process(!0);
        },
        blockSize: 1
    }), b = h.mode = {}, c = function(b, c, d) {
        var e, f = this._iv;
        for (f ? this._iv = a : f = this._prevBlock, e = 0; d > e; e++) b[c + e] ^= f[e];
    }, d = (i.BlockCipherMode = j.extend({
        createEncryptor: function(a, b) {
            return this.Encryptor.create(a, b);
        },
        createDecryptor: function(a, b) {
            return this.Decryptor.create(a, b);
        },
        init: function(a, b) {
            this._cipher = a, this._iv = b;
        }
    })).extend(), d.Encryptor = d.extend({
        processBlock: function(a, b) {
            var d = this._cipher, e = d.blockSize;
            c.call(this, a, b, e), d.encryptBlock(a, b), this._prevBlock = a.slice(b, b + e);
        }
    }), d.Decryptor = d.extend({
        processBlock: function(a, b) {
            var d = this._cipher, e = d.blockSize, f = a.slice(b, b + e);
            d.decryptBlock(a, b), c.call(this, a, b, e), this._prevBlock = f;
        }
    }), b = b.CBC = d, d = (h.pad = {}).Pkcs7 = {
        pad: function(a, b) {
            for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], f = 0; c > f; f += 4) e.push(d);
            c = k.create(e, c), a.concat(c);
        },
        unpad: function(a) {
            a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2];
        }
    }, i.BlockCipher = o.extend({
        cfg: o.cfg.extend({
            mode: b,
            padding: d
        }),
        reset: function() {
            var a, b, c;
            o.reset.call(this), a = this.cfg, b = a.iv, a = a.mode, this._xformMode == this._ENC_XFORM_MODE ? c = a.createEncryptor : (c = a.createDecryptor, 
            this._minBufferSize = 1), this._mode = c.call(a, this, b && b.words);
        },
        _doProcessBlock: function(a, b) {
            this._mode.processBlock(a, b);
        },
        _doFinalize: function() {
            var a, b = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (b.pad(this._data, this.blockSize), 
            a = this._process(!0)) : (a = this._process(!0), b.unpad(a)), a;
        },
        blockSize: 4
    }), e = i.CipherParams = j.extend({
        init: function(a) {
            this.mixIn(a);
        },
        toString: function(a) {
            return (a || this.formatter).stringify(this);
        }
    }), b = (h.format = {}).OpenSSL = {
        stringify: function(a) {
            var b = a.ciphertext;
            return a = a.salt, (a ? k.create([ 1398893684, 1701076831 ]).concat(a).concat(b) : b).toString(m);
        },
        parse: function(a) {
            var b, c;
            return a = m.parse(a), b = a.words, 1398893684 == b[0] && 1701076831 == b[1] && (c = k.create(b.slice(2, 4)), 
            b.splice(0, 4), a.sigBytes -= 16), e.create({
                ciphertext: a,
                salt: c
            });
        }
    }, f = i.SerializableCipher = j.extend({
        cfg: j.extend({
            format: b
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            var f = a.createEncryptor(c, d);
            return b = f.finalize(b), f = f.cfg, e.create({
                ciphertext: b,
                key: c,
                iv: f.iv,
                algorithm: a,
                mode: f.mode,
                padding: f.padding,
                blockSize: a.blockSize,
                formatter: d.format
            });
        },
        decrypt: function(a, b, c, d) {
            return d = this.cfg.extend(d), b = this._parse(b, d.format), a.createDecryptor(c, d).finalize(b.ciphertext);
        },
        _parse: function(a, b) {
            return "string" == typeof a ? b.parse(a, this) : a;
        }
    }), h = (h.kdf = {}).OpenSSL = {
        execute: function(a, b, c, d) {
            return d || (d = k.random(8)), a = n.create({
                keySize: b + c
            }).compute(a, d), c = k.create(a.words.slice(b), 4 * c), a.sigBytes = 4 * b, e.create({
                key: a,
                iv: c,
                salt: d
            });
        }
    }, g = i.PasswordBasedCipher = f.extend({
        cfg: f.cfg.extend({
            kdf: h
        }),
        encrypt: function(a, b, c, d) {
            return d = this.cfg.extend(d), c = d.kdf.execute(c, a.keySize, a.ivSize), d.iv = c.iv, 
            a = f.encrypt.call(this, a, b, c.key, d), a.mixIn(c), a;
        },
        decrypt: function(a, b, c, d) {
            return d = this.cfg.extend(d), b = this._parse(b, d.format), c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt), 
            d.iv = c.iv, f.decrypt.call(this, a, b, c.key, d);
        }
    });
}(), function() {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w;
    for (a = CryptoJS, b = a.lib.BlockCipher, c = a.algo, d = [], e = [], f = [], g = [], 
    h = [], i = [], j = [], k = [], l = [], m = [], n = [], o = 0; 256 > o; o++) n[o] = 128 > o ? o << 1 : 283 ^ o << 1;
    for (p = 0, q = 0, o = 0; 256 > o; o++) r = q ^ q << 1 ^ q << 2 ^ q << 3 ^ q << 4, 
    r = 99 ^ (r >>> 8 ^ 255 & r), d[p] = r, e[r] = p, s = n[p], t = n[s], u = n[t], 
    v = 257 * n[r] ^ 16843008 * r, f[p] = v << 24 | v >>> 8, g[p] = v << 16 | v >>> 16, 
    h[p] = v << 8 | v >>> 24, i[p] = v, v = 16843009 * u ^ 65537 * t ^ 257 * s ^ 16843008 * p, 
    j[r] = v << 24 | v >>> 8, k[r] = v << 16 | v >>> 16, l[r] = v << 8 | v >>> 24, m[r] = v, 
    p ? (p = s ^ n[n[n[u ^ s]]], q ^= n[n[q]]) : p = q = 1;
    w = [ 0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54 ], c = c.AES = b.extend({
        _doReset: function() {
            var a, b, c, e, f, g;
            for (a = this._key, b = a.words, c = a.sigBytes / 4, a = 4 * ((this._nRounds = c + 6) + 1), 
            e = this._keySchedule = [], f = 0; a > f; f++) c > f ? e[f] = b[f] : (g = e[f - 1], 
            f % c ? c > 6 && 4 == f % c && (g = d[g >>> 24] << 24 | d[255 & g >>> 16] << 16 | d[255 & g >>> 8] << 8 | d[255 & g]) : (g = g << 8 | g >>> 24, 
            g = d[g >>> 24] << 24 | d[255 & g >>> 16] << 16 | d[255 & g >>> 8] << 8 | d[255 & g], 
            g ^= w[0 | f / c] << 24), e[f] = e[f - c] ^ g);
            for (b = this._invKeySchedule = [], c = 0; a > c; c++) f = a - c, g = c % 4 ? e[f] : e[f - 4], 
            b[c] = 4 > c || 4 >= f ? g : j[d[g >>> 24]] ^ k[d[255 & g >>> 16]] ^ l[d[255 & g >>> 8]] ^ m[d[255 & g]];
        },
        encryptBlock: function(a, b) {
            this._doCryptBlock(a, b, this._keySchedule, f, g, h, i, d);
        },
        decryptBlock: function(a, b) {
            var c = a[b + 1];
            a[b + 1] = a[b + 3], a[b + 3] = c, this._doCryptBlock(a, b, this._invKeySchedule, j, k, l, m, e), 
            c = a[b + 1], a[b + 1] = a[b + 3], a[b + 3] = c;
        },
        _doCryptBlock: function(a, b, c, d, e, f, g, h) {
            var i, j, k, l, m, n, o, p, q, r;
            for (i = this._nRounds, j = a[b] ^ c[0], k = a[b + 1] ^ c[1], l = a[b + 2] ^ c[2], 
            m = a[b + 3] ^ c[3], n = 4, o = 1; i > o; o++) p = d[j >>> 24] ^ e[255 & k >>> 16] ^ f[255 & l >>> 8] ^ g[255 & m] ^ c[n++], 
            q = d[k >>> 24] ^ e[255 & l >>> 16] ^ f[255 & m >>> 8] ^ g[255 & j] ^ c[n++], r = d[l >>> 24] ^ e[255 & m >>> 16] ^ f[255 & j >>> 8] ^ g[255 & k] ^ c[n++], 
            m = d[m >>> 24] ^ e[255 & j >>> 16] ^ f[255 & k >>> 8] ^ g[255 & l] ^ c[n++], j = p, 
            k = q, l = r;
            p = (h[j >>> 24] << 24 | h[255 & k >>> 16] << 16 | h[255 & l >>> 8] << 8 | h[255 & m]) ^ c[n++], 
            q = (h[k >>> 24] << 24 | h[255 & l >>> 16] << 16 | h[255 & m >>> 8] << 8 | h[255 & j]) ^ c[n++], 
            r = (h[l >>> 24] << 24 | h[255 & m >>> 16] << 16 | h[255 & j >>> 8] << 8 | h[255 & k]) ^ c[n++], 
            m = (h[m >>> 24] << 24 | h[255 & j >>> 16] << 16 | h[255 & k >>> 8] << 8 | h[255 & l]) ^ c[n++], 
            a[b] = p, a[b + 1] = q, a[b + 2] = r, a[b + 3] = m;
        },
        keySize: 8
    }), a.AES = b._createHelper(c);
}(), CryptoJS = CryptoJS || function(a, b) {
    var c, d = {}, e = d.lib = {}, f = function() {}, g = e.Base = {
        extend: function(a) {
            f.prototype = this;
            var b = new f();
            return a && b.mixIn(a), b.hasOwnProperty("init") || (b.init = function() {
                b.$super.init.apply(this, arguments);
            }), b.init.prototype = b, b.$super = this, b;
        },
        create: function() {
            var a = this.extend();
            return a.init.apply(a, arguments), a;
        },
        init: function() {},
        mixIn: function(a) {
            for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b]);
            a.hasOwnProperty("toString") && (this.toString = a.toString);
        },
        clone: function() {
            return this.init.prototype.extend(this);
        }
    }, h = e.WordArray = g.extend({
        init: function(a, c) {
            a = this.words = a || [], this.sigBytes = c != b ? c : 4 * a.length;
        },
        toString: function(a) {
            return (a || j).stringify(this);
        },
        concat: function(a) {
            var b, c = this.words, d = a.words, e = this.sigBytes;
            if (a = a.sigBytes, this.clamp(), e % 4) for (b = 0; a > b; b++) c[e + b >>> 2] |= (255 & d[b >>> 2] >>> 24 - 8 * (b % 4)) << 24 - 8 * ((e + b) % 4); else if (65535 < d.length) for (b = 0; a > b; b += 4) c[e + b >>> 2] = d[b >>> 2]; else c.push.apply(c, d);
            return this.sigBytes += a, this;
        },
        clamp: function() {
            var b = this.words, c = this.sigBytes;
            b[c >>> 2] &= 4294967295 << 32 - 8 * (c % 4), b.length = a.ceil(c / 4);
        },
        clone: function() {
            var a = g.clone.call(this);
            return a.words = this.words.slice(0), a;
        },
        random: function(b) {
            for (var c = [], d = 0; b > d; d += 4) c.push(0 | 4294967296 * a.random());
            return new h.init(c, b);
        }
    }), i = d.enc = {}, j = i.Hex = {
        stringify: function(a) {
            var b, c, d, e = a.words;
            for (a = a.sigBytes, b = [], c = 0; a > c; c++) d = 255 & e[c >>> 2] >>> 24 - 8 * (c % 4), 
            b.push((d >>> 4).toString(16)), b.push((15 & d).toString(16));
            return b.join("");
        },
        parse: function(a) {
            for (var b = a.length, c = [], d = 0; b > d; d += 2) c[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
            return new h.init(c, b / 2);
        }
    }, k = i.Latin1 = {
        stringify: function(a) {
            var b, c, d = a.words;
            for (a = a.sigBytes, b = [], c = 0; a > c; c++) b.push(String.fromCharCode(255 & d[c >>> 2] >>> 24 - 8 * (c % 4)));
            return b.join("");
        },
        parse: function(a) {
            for (var b = a.length, c = [], d = 0; b > d; d++) c[d >>> 2] |= (255 & a.charCodeAt(d)) << 24 - 8 * (d % 4);
            return new h.init(c, b);
        }
    }, l = i.Utf8 = {
        stringify: function(a) {
            try {
                return decodeURIComponent(escape(k.stringify(a)));
            } catch (b) {
                throw Error("Malformed UTF-8 data");
            }
        },
        parse: function(a) {
            return k.parse(unescape(encodeURIComponent(a)));
        }
    }, m = e.BufferedBlockAlgorithm = g.extend({
        reset: function() {
            this._data = new h.init(), this._nDataBytes = 0;
        },
        _append: function(a) {
            "string" == typeof a && (a = l.parse(a)), this._data.concat(a), this._nDataBytes += a.sigBytes;
        },
        _process: function(b) {
            var c, d = this._data, e = d.words, f = d.sigBytes, g = this.blockSize, i = f / (4 * g);
            if (i = b ? a.ceil(i) : a.max((0 | i) - this._minBufferSize, 0), b = i * g, f = a.min(4 * b, f), 
            b) {
                for (c = 0; b > c; c += g) this._doProcessBlock(e, c);
                c = e.splice(0, b), d.sigBytes -= f;
            }
            return new h.init(c, f);
        },
        clone: function() {
            var a = g.clone.call(this);
            return a._data = this._data.clone(), a;
        },
        _minBufferSize: 0
    });
    return e.Hasher = m.extend({
        cfg: g.extend(),
        init: function(a) {
            this.cfg = this.cfg.extend(a), this.reset();
        },
        reset: function() {
            m.reset.call(this), this._doReset();
        },
        update: function(a) {
            return this._append(a), this._process(), this;
        },
        finalize: function(a) {
            return a && this._append(a), this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function(a) {
            return function(b, c) {
                return new a.init(c).finalize(b);
            };
        },
        _createHmacHelper: function(a) {
            return function(b, d) {
                return new c.HMAC.init(a, d).finalize(b);
            };
        }
    }), c = d.algo = {}, d;
}(Math), function() {
    var a = CryptoJS, b = a.lib.WordArray;
    a.enc.Base64 = {
        stringify: function(a) {
            var b, c, d, e = a.words, f = a.sigBytes, g = this._map;
            for (a.clamp(), a = [], b = 0; f > b; b += 3) for (c = (255 & e[b >>> 2] >>> 24 - 8 * (b % 4)) << 16 | (255 & e[b + 1 >>> 2] >>> 24 - 8 * ((b + 1) % 4)) << 8 | 255 & e[b + 2 >>> 2] >>> 24 - 8 * ((b + 2) % 4), 
            d = 0; 4 > d && f > b + .75 * d; d++) a.push(g.charAt(63 & c >>> 6 * (3 - d)));
            if (e = g.charAt(64)) for (;a.length % 4; ) a.push(e);
            return a.join("");
        },
        parse: function(a) {
            var c, d, e, f, g = a.length, h = this._map, i = h.charAt(64);
            for (i && (i = a.indexOf(i), -1 != i && (g = i)), i = [], c = 0, d = 0; g > d; d++) d % 4 && (e = h.indexOf(a.charAt(d - 1)) << 2 * (d % 4), 
            f = h.indexOf(a.charAt(d)) >>> 6 - 2 * (d % 4), i[c >>> 2] |= (e | f) << 24 - 8 * (c % 4), 
            c++);
            return b.create(i, c);
        },
        _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    };
}(), function(a) {
    function b(a, b, c, d, e, f, g) {
        return a = a + (b & c | ~b & d) + e + g, (a << f | a >>> 32 - f) + b;
    }
    function c(a, b, c, d, e, f, g) {
        return a = a + (b & d | c & ~d) + e + g, (a << f | a >>> 32 - f) + b;
    }
    function d(a, b, c, d, e, f, g) {
        return a = a + (b ^ c ^ d) + e + g, (a << f | a >>> 32 - f) + b;
    }
    function e(a, b, c, d, e, f, g) {
        return a = a + (c ^ (b | ~d)) + e + g, (a << f | a >>> 32 - f) + b;
    }
    for (var f = CryptoJS, g = f.lib, h = g.WordArray, i = g.Hasher, g = f.algo, j = [], k = 0; 64 > k; k++) j[k] = 0 | 4294967296 * a.abs(a.sin(k + 1));
    g = g.MD5 = i.extend({
        _doReset: function() {
            this._hash = new h.init([ 1732584193, 4023233417, 2562383102, 271733878 ]);
        },
        _doProcessBlock: function(a, f) {
            var g, h, i, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B;
            for (g = 0; 16 > g; g++) h = f + g, i = a[h], a[h] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8);
            g = this._hash.words, h = a[f + 0], i = a[f + 1], k = a[f + 2], l = a[f + 3], m = a[f + 4], 
            n = a[f + 5], o = a[f + 6], p = a[f + 7], q = a[f + 8], r = a[f + 9], s = a[f + 10], 
            t = a[f + 11], u = a[f + 12], v = a[f + 13], w = a[f + 14], x = a[f + 15], y = g[0], 
            z = g[1], A = g[2], B = g[3], y = b(y, z, A, B, h, 7, j[0]), B = b(B, y, z, A, i, 12, j[1]), 
            A = b(A, B, y, z, k, 17, j[2]), z = b(z, A, B, y, l, 22, j[3]), y = b(y, z, A, B, m, 7, j[4]), 
            B = b(B, y, z, A, n, 12, j[5]), A = b(A, B, y, z, o, 17, j[6]), z = b(z, A, B, y, p, 22, j[7]), 
            y = b(y, z, A, B, q, 7, j[8]), B = b(B, y, z, A, r, 12, j[9]), A = b(A, B, y, z, s, 17, j[10]), 
            z = b(z, A, B, y, t, 22, j[11]), y = b(y, z, A, B, u, 7, j[12]), B = b(B, y, z, A, v, 12, j[13]), 
            A = b(A, B, y, z, w, 17, j[14]), z = b(z, A, B, y, x, 22, j[15]), y = c(y, z, A, B, i, 5, j[16]), 
            B = c(B, y, z, A, o, 9, j[17]), A = c(A, B, y, z, t, 14, j[18]), z = c(z, A, B, y, h, 20, j[19]), 
            y = c(y, z, A, B, n, 5, j[20]), B = c(B, y, z, A, s, 9, j[21]), A = c(A, B, y, z, x, 14, j[22]), 
            z = c(z, A, B, y, m, 20, j[23]), y = c(y, z, A, B, r, 5, j[24]), B = c(B, y, z, A, w, 9, j[25]), 
            A = c(A, B, y, z, l, 14, j[26]), z = c(z, A, B, y, q, 20, j[27]), y = c(y, z, A, B, v, 5, j[28]), 
            B = c(B, y, z, A, k, 9, j[29]), A = c(A, B, y, z, p, 14, j[30]), z = c(z, A, B, y, u, 20, j[31]), 
            y = d(y, z, A, B, n, 4, j[32]), B = d(B, y, z, A, q, 11, j[33]), A = d(A, B, y, z, t, 16, j[34]), 
            z = d(z, A, B, y, w, 23, j[35]), y = d(y, z, A, B, i, 4, j[36]), B = d(B, y, z, A, m, 11, j[37]), 
            A = d(A, B, y, z, p, 16, j[38]), z = d(z, A, B, y, s, 23, j[39]), y = d(y, z, A, B, v, 4, j[40]), 
            B = d(B, y, z, A, h, 11, j[41]), A = d(A, B, y, z, l, 16, j[42]), z = d(z, A, B, y, o, 23, j[43]), 
            y = d(y, z, A, B, r, 4, j[44]), B = d(B, y, z, A, u, 11, j[45]), A = d(A, B, y, z, x, 16, j[46]), 
            z = d(z, A, B, y, k, 23, j[47]), y = e(y, z, A, B, h, 6, j[48]), B = e(B, y, z, A, p, 10, j[49]), 
            A = e(A, B, y, z, w, 15, j[50]), z = e(z, A, B, y, n, 21, j[51]), y = e(y, z, A, B, u, 6, j[52]), 
            B = e(B, y, z, A, l, 10, j[53]), A = e(A, B, y, z, s, 15, j[54]), z = e(z, A, B, y, i, 21, j[55]), 
            y = e(y, z, A, B, q, 6, j[56]), B = e(B, y, z, A, x, 10, j[57]), A = e(A, B, y, z, o, 15, j[58]), 
            z = e(z, A, B, y, v, 21, j[59]), y = e(y, z, A, B, m, 6, j[60]), B = e(B, y, z, A, t, 10, j[61]), 
            A = e(A, B, y, z, k, 15, j[62]), z = e(z, A, B, y, r, 21, j[63]), g[0] = 0 | g[0] + y, 
            g[1] = 0 | g[1] + z, g[2] = 0 | g[2] + A, g[3] = 0 | g[3] + B;
        },
        _doFinalize: function() {
            var b, c = this._data, d = c.words, e = 8 * this._nDataBytes, f = 8 * c.sigBytes;
            for (d[f >>> 5] |= 128 << 24 - f % 32, b = a.floor(e / 4294967296), d[(f + 64 >>> 9 << 4) + 15] = 16711935 & (b << 8 | b >>> 24) | 4278255360 & (b << 24 | b >>> 8), 
            d[(f + 64 >>> 9 << 4) + 14] = 16711935 & (e << 8 | e >>> 24) | 4278255360 & (e << 24 | e >>> 8), 
            c.sigBytes = 4 * (d.length + 1), this._process(), c = this._hash, d = c.words, e = 0; 4 > e; e++) f = d[e], 
            d[e] = 16711935 & (f << 8 | f >>> 24) | 4278255360 & (f << 24 | f >>> 8);
            return c;
        },
        clone: function() {
            var a = i.clone.call(this);
            return a._hash = this._hash.clone(), a;
        }
    }), f.MD5 = i._createHelper(g), f.HmacMD5 = i._createHmacHelper(g);
}(Math), function() {
    var a = CryptoJS, b = a.lib, c = b.Base, d = b.WordArray, b = a.algo, e = b.EvpKDF = c.extend({
        cfg: c.extend({
            keySize: 4,
            hasher: b.MD5,
            iterations: 1
        }),
        init: function(a) {
            this.cfg = this.cfg.extend(a);
        },
        compute: function(a, b) {
            var c, e, f, g, h, i, j;
            for (c = this.cfg, e = c.hasher.create(), f = d.create(), g = f.words, h = c.keySize, 
            c = c.iterations; g.length < h; ) {
                for (i && e.update(i), i = e.update(a).finalize(b), e.reset(), j = 1; c > j; j++) i = e.finalize(i), 
                e.reset();
                f.concat(i);
            }
            return f.sigBytes = 4 * h, f;
        }
    });
    a.EvpKDF = function(a, b, c) {
        return e.create(c).compute(a, b);
    };
}(), CryptoJS.lib.Cipher || function(a) {
    var b, c, d, e, f, g, h = CryptoJS, i = h.lib, j = i.Base, k = i.WordArray, l = i.BufferedBlockAlgorithm, m = h.enc.Base64, n = h.algo.EvpKDF, o = i.Cipher = l.extend({
        cfg: j.extend(),
        createEncryptor: function(a, b) {
            return this.create(this._ENC_XFORM_MODE, a, b);
        },
        createDecryptor: function(a, b) {
            return this.create(this._DEC_XFORM_MODE, a, b);
        },
        init: function(a, b, c) {
            this.cfg = this.cfg.extend(c), this._xformMode = a, this._key = b, this.reset();
        },
        reset: function() {
            l.reset.call(this), this._doReset();
        },
        process: function(a) {
            return this._append(a), this._process();
        },
        finalize: function(a) {
            return a && this._append(a), this._doFinalize();
        },
        keySize: 4,
        ivSize: 4,
        _ENC_XFORM_MODE: 1,
        _DEC_XFORM_MODE: 2,
        _createHelper: function(a) {
            return {
                encrypt: function(b, c, d) {
                    return ("string" == typeof c ? g : f).encrypt(a, b, c, d);
                },
                decrypt: function(b, c, d) {
                    return ("string" == typeof c ? g : f).decrypt(a, b, c, d);
                }
            };
        }
    });
    i.StreamCipher = o.extend({
        _doFinalize: function() {
            return this._process(!0);
        },
        blockSize: 1
    }), b = h.mode = {}, c = function(b, c, d) {
        var e, f = this._iv;
        for (f ? this._iv = a : f = this._prevBlock, e = 0; d > e; e++) b[c + e] ^= f[e];
    }, d = (i.BlockCipherMode = j.extend({
        createEncryptor: function(a, b) {
            return this.Encryptor.create(a, b);
        },
        createDecryptor: function(a, b) {
            return this.Decryptor.create(a, b);
        },
        init: function(a, b) {
            this._cipher = a, this._iv = b;
        }
    })).extend(), d.Encryptor = d.extend({
        processBlock: function(a, b) {
            var d = this._cipher, e = d.blockSize;
            c.call(this, a, b, e), d.encryptBlock(a, b), this._prevBlock = a.slice(b, b + e);
        }
    }), d.Decryptor = d.extend({
        processBlock: function(a, b) {
            var d = this._cipher, e = d.blockSize, f = a.slice(b, b + e);
            d.decryptBlock(a, b), c.call(this, a, b, e), this._prevBlock = f;
        }
    }), b = b.CBC = d, d = (h.pad = {}).Pkcs7 = {
        pad: function(a, b) {
            for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, e = [], f = 0; c > f; f += 4) e.push(d);
            c = k.create(e, c), a.concat(c);
        },
        unpad: function(a) {
            a.sigBytes -= 255 & a.words[a.sigBytes - 1 >>> 2];
        }
    }, i.BlockCipher = o.extend({
        cfg: o.cfg.extend({
            mode: b,
            padding: d
        }),
        reset: function() {
            var a, b, c;
            o.reset.call(this), a = this.cfg, b = a.iv, a = a.mode, this._xformMode == this._ENC_XFORM_MODE ? c = a.createEncryptor : (c = a.createDecryptor, 
            this._minBufferSize = 1), this._mode = c.call(a, this, b && b.words);
        },
        _doProcessBlock: function(a, b) {
            this._mode.processBlock(a, b);
        },
        _doFinalize: function() {
            var a, b = this.cfg.padding;
            return this._xformMode == this._ENC_XFORM_MODE ? (b.pad(this._data, this.blockSize), 
            a = this._process(!0)) : (a = this._process(!0), b.unpad(a)), a;
        },
        blockSize: 4
    }), e = i.CipherParams = j.extend({
        init: function(a) {
            this.mixIn(a);
        },
        toString: function(a) {
            return (a || this.formatter).stringify(this);
        }
    }), b = (h.format = {}).OpenSSL = {
        stringify: function(a) {
            var b = a.ciphertext;
            return a = a.salt, (a ? k.create([ 1398893684, 1701076831 ]).concat(a).concat(b) : b).toString(m);
        },
        parse: function(a) {
            var b, c;
            return a = m.parse(a), b = a.words, 1398893684 == b[0] && 1701076831 == b[1] && (c = k.create(b.slice(2, 4)), 
            b.splice(0, 4), a.sigBytes -= 16), e.create({
                ciphertext: a,
                salt: c
            });
        }
    }, f = i.SerializableCipher = j.extend({
        cfg: j.extend({
            format: b
        }),
        encrypt: function(a, b, c, d) {
            d = this.cfg.extend(d);
            var f = a.createEncryptor(c, d);
            return b = f.finalize(b), f = f.cfg, e.create({
                ciphertext: b,
                key: c,
                iv: f.iv,
                algorithm: a,
                mode: f.mode,
                padding: f.padding,
                blockSize: a.blockSize,
                formatter: d.format
            });
        },
        decrypt: function(a, b, c, d) {
            return d = this.cfg.extend(d), b = this._parse(b, d.format), a.createDecryptor(c, d).finalize(b.ciphertext);
        },
        _parse: function(a, b) {
            return "string" == typeof a ? b.parse(a, this) : a;
        }
    }), h = (h.kdf = {}).OpenSSL = {
        execute: function(a, b, c, d) {
            return d || (d = k.random(8)), a = n.create({
                keySize: b + c
            }).compute(a, d), c = k.create(a.words.slice(b), 4 * c), a.sigBytes = 4 * b, e.create({
                key: a,
                iv: c,
                salt: d
            });
        }
    }, g = i.PasswordBasedCipher = f.extend({
        cfg: f.cfg.extend({
            kdf: h
        }),
        encrypt: function(a, b, c, d) {
            return d = this.cfg.extend(d), c = d.kdf.execute(c, a.keySize, a.ivSize), d.iv = c.iv, 
            a = f.encrypt.call(this, a, b, c.key, d), a.mixIn(c), a;
        },
        decrypt: function(a, b, c, d) {
            return d = this.cfg.extend(d), b = this._parse(b, d.format), c = d.kdf.execute(c, a.keySize, a.ivSize, b.salt), 
            d.iv = c.iv, f.decrypt.call(this, a, b, c.key, d);
        }
    });
}(), function() {
    function a(a, b) {
        var c = (this._lBlock >>> a ^ this._rBlock) & b;
        this._rBlock ^= c, this._lBlock ^= c << a;
    }
    function b(a, b) {
        var c = (this._rBlock >>> a ^ this._lBlock) & b;
        this._lBlock ^= c, this._rBlock ^= c << a;
    }
    var c = CryptoJS, d = c.lib, e = d.WordArray, d = d.BlockCipher, f = c.algo, g = [ 57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 ], h = [ 14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 ], i = [ 1, 2, 4, 6, 8, 10, 12, 14, 15, 17, 19, 21, 23, 25, 27, 28 ], j = [ {
        0: 8421888,
        268435456: 32768,
        536870912: 8421378,
        805306368: 2,
        1073741824: 512,
        1342177280: 8421890,
        1610612736: 8389122,
        1879048192: 8388608,
        2147483648: 514,
        2415919104: 8389120,
        2684354560: 33280,
        2952790016: 8421376,
        3221225472: 32770,
        3489660928: 8388610,
        3758096384: 0,
        4026531840: 33282,
        134217728: 0,
        402653184: 8421890,
        671088640: 33282,
        939524096: 32768,
        1207959552: 8421888,
        1476395008: 512,
        1744830464: 8421378,
        2013265920: 2,
        2281701376: 8389120,
        2550136832: 33280,
        2818572288: 8421376,
        3087007744: 8389122,
        3355443200: 8388610,
        3623878656: 32770,
        3892314112: 514,
        4160749568: 8388608,
        1: 32768,
        268435457: 2,
        536870913: 8421888,
        805306369: 8388608,
        1073741825: 8421378,
        1342177281: 33280,
        1610612737: 512,
        1879048193: 8389122,
        2147483649: 8421890,
        2415919105: 8421376,
        2684354561: 8388610,
        2952790017: 33282,
        3221225473: 514,
        3489660929: 8389120,
        3758096385: 32770,
        4026531841: 0,
        134217729: 8421890,
        402653185: 8421376,
        671088641: 8388608,
        939524097: 512,
        1207959553: 32768,
        1476395009: 8388610,
        1744830465: 2,
        2013265921: 33282,
        2281701377: 32770,
        2550136833: 8389122,
        2818572289: 514,
        3087007745: 8421888,
        3355443201: 8389120,
        3623878657: 0,
        3892314113: 33280,
        4160749569: 8421378
    }, {
        0: 1074282512,
        16777216: 16384,
        33554432: 524288,
        50331648: 1074266128,
        67108864: 1073741840,
        83886080: 1074282496,
        100663296: 1073758208,
        117440512: 16,
        134217728: 540672,
        150994944: 1073758224,
        167772160: 1073741824,
        184549376: 540688,
        201326592: 524304,
        218103808: 0,
        234881024: 16400,
        251658240: 1074266112,
        8388608: 1073758208,
        25165824: 540688,
        41943040: 16,
        58720256: 1073758224,
        75497472: 1074282512,
        92274688: 1073741824,
        109051904: 524288,
        125829120: 1074266128,
        142606336: 524304,
        159383552: 0,
        176160768: 16384,
        192937984: 1074266112,
        209715200: 1073741840,
        226492416: 540672,
        243269632: 1074282496,
        260046848: 16400,
        268435456: 0,
        285212672: 1074266128,
        301989888: 1073758224,
        318767104: 1074282496,
        335544320: 1074266112,
        352321536: 16,
        369098752: 540688,
        385875968: 16384,
        402653184: 16400,
        419430400: 524288,
        436207616: 524304,
        452984832: 1073741840,
        469762048: 540672,
        486539264: 1073758208,
        503316480: 1073741824,
        520093696: 1074282512,
        276824064: 540688,
        293601280: 524288,
        310378496: 1074266112,
        327155712: 16384,
        343932928: 1073758208,
        360710144: 1074282512,
        377487360: 16,
        394264576: 1073741824,
        411041792: 1074282496,
        427819008: 1073741840,
        444596224: 1073758224,
        461373440: 524304,
        478150656: 0,
        494927872: 16400,
        511705088: 1074266128,
        528482304: 540672
    }, {
        0: 260,
        1048576: 0,
        2097152: 67109120,
        3145728: 65796,
        4194304: 65540,
        5242880: 67108868,
        6291456: 67174660,
        7340032: 67174400,
        8388608: 67108864,
        9437184: 67174656,
        10485760: 65792,
        11534336: 67174404,
        12582912: 67109124,
        13631488: 65536,
        14680064: 4,
        15728640: 256,
        524288: 67174656,
        1572864: 67174404,
        2621440: 0,
        3670016: 67109120,
        4718592: 67108868,
        5767168: 65536,
        6815744: 65540,
        7864320: 260,
        8912896: 4,
        9961472: 256,
        11010048: 67174400,
        12058624: 65796,
        13107200: 65792,
        14155776: 67109124,
        15204352: 67174660,
        16252928: 67108864,
        16777216: 67174656,
        17825792: 65540,
        18874368: 65536,
        19922944: 67109120,
        20971520: 256,
        22020096: 67174660,
        23068672: 67108868,
        24117248: 0,
        25165824: 67109124,
        26214400: 67108864,
        27262976: 4,
        28311552: 65792,
        29360128: 67174400,
        30408704: 260,
        31457280: 65796,
        32505856: 67174404,
        17301504: 67108864,
        18350080: 260,
        19398656: 67174656,
        20447232: 0,
        21495808: 65540,
        22544384: 67109120,
        23592960: 256,
        24641536: 67174404,
        25690112: 65536,
        26738688: 67174660,
        27787264: 65796,
        28835840: 67108868,
        29884416: 67109124,
        30932992: 67174400,
        31981568: 4,
        33030144: 65792
    }, {
        0: 2151682048,
        65536: 2147487808,
        131072: 4198464,
        196608: 2151677952,
        262144: 0,
        327680: 4198400,
        393216: 2147483712,
        458752: 4194368,
        524288: 2147483648,
        589824: 4194304,
        655360: 64,
        720896: 2147487744,
        786432: 2151678016,
        851968: 4160,
        917504: 4096,
        983040: 2151682112,
        32768: 2147487808,
        98304: 64,
        163840: 2151678016,
        229376: 2147487744,
        294912: 4198400,
        360448: 2151682112,
        425984: 0,
        491520: 2151677952,
        557056: 4096,
        622592: 2151682048,
        688128: 4194304,
        753664: 4160,
        819200: 2147483648,
        884736: 4194368,
        950272: 4198464,
        1015808: 2147483712,
        1048576: 4194368,
        1114112: 4198400,
        1179648: 2147483712,
        1245184: 0,
        1310720: 4160,
        1376256: 2151678016,
        1441792: 2151682048,
        1507328: 2147487808,
        1572864: 2151682112,
        1638400: 2147483648,
        1703936: 2151677952,
        1769472: 4198464,
        1835008: 2147487744,
        1900544: 4194304,
        1966080: 64,
        2031616: 4096,
        1081344: 2151677952,
        1146880: 2151682112,
        1212416: 0,
        1277952: 4198400,
        1343488: 4194368,
        1409024: 2147483648,
        1474560: 2147487808,
        1540096: 64,
        1605632: 2147483712,
        1671168: 4096,
        1736704: 2147487744,
        1802240: 2151678016,
        1867776: 4160,
        1933312: 2151682048,
        1998848: 4194304,
        2064384: 4198464
    }, {
        0: 128,
        4096: 17039360,
        8192: 262144,
        12288: 536870912,
        16384: 537133184,
        20480: 16777344,
        24576: 553648256,
        28672: 262272,
        32768: 16777216,
        36864: 537133056,
        40960: 536871040,
        45056: 553910400,
        49152: 553910272,
        53248: 0,
        57344: 17039488,
        61440: 553648128,
        2048: 17039488,
        6144: 553648256,
        10240: 128,
        14336: 17039360,
        18432: 262144,
        22528: 537133184,
        26624: 553910272,
        30720: 536870912,
        34816: 537133056,
        38912: 0,
        43008: 553910400,
        47104: 16777344,
        51200: 536871040,
        55296: 553648128,
        59392: 16777216,
        63488: 262272,
        65536: 262144,
        69632: 128,
        73728: 536870912,
        77824: 553648256,
        81920: 16777344,
        86016: 553910272,
        90112: 537133184,
        94208: 16777216,
        98304: 553910400,
        102400: 553648128,
        106496: 17039360,
        110592: 537133056,
        114688: 262272,
        118784: 536871040,
        122880: 0,
        126976: 17039488,
        67584: 553648256,
        71680: 16777216,
        75776: 17039360,
        79872: 537133184,
        83968: 536870912,
        88064: 17039488,
        92160: 128,
        96256: 553910272,
        100352: 262272,
        104448: 553910400,
        108544: 0,
        112640: 553648128,
        116736: 16777344,
        120832: 262144,
        124928: 537133056,
        129024: 536871040
    }, {
        0: 268435464,
        256: 8192,
        512: 270532608,
        768: 270540808,
        1024: 268443648,
        1280: 2097152,
        1536: 2097160,
        1792: 268435456,
        2048: 0,
        2304: 268443656,
        2560: 2105344,
        2816: 8,
        3072: 270532616,
        3328: 2105352,
        3584: 8200,
        3840: 270540800,
        128: 270532608,
        384: 270540808,
        640: 8,
        896: 2097152,
        1152: 2105352,
        1408: 268435464,
        1664: 268443648,
        1920: 8200,
        2176: 2097160,
        2432: 8192,
        2688: 268443656,
        2944: 270532616,
        3200: 0,
        3456: 270540800,
        3712: 2105344,
        3968: 268435456,
        4096: 268443648,
        4352: 270532616,
        4608: 270540808,
        4864: 8200,
        5120: 2097152,
        5376: 268435456,
        5632: 268435464,
        5888: 2105344,
        6144: 2105352,
        6400: 0,
        6656: 8,
        6912: 270532608,
        7168: 8192,
        7424: 268443656,
        7680: 270540800,
        7936: 2097160,
        4224: 8,
        4480: 2105344,
        4736: 2097152,
        4992: 268435464,
        5248: 268443648,
        5504: 8200,
        5760: 270540808,
        6016: 270532608,
        6272: 270540800,
        6528: 270532616,
        6784: 8192,
        7040: 2105352,
        7296: 2097160,
        7552: 0,
        7808: 268435456,
        8064: 268443656
    }, {
        0: 1048576,
        16: 33555457,
        32: 1024,
        48: 1049601,
        64: 34604033,
        80: 0,
        96: 1,
        112: 34603009,
        128: 33555456,
        144: 1048577,
        160: 33554433,
        176: 34604032,
        192: 34603008,
        208: 1025,
        224: 1049600,
        240: 33554432,
        8: 34603009,
        24: 0,
        40: 33555457,
        56: 34604032,
        72: 1048576,
        88: 33554433,
        104: 33554432,
        120: 1025,
        136: 1049601,
        152: 33555456,
        168: 34603008,
        184: 1048577,
        200: 1024,
        216: 34604033,
        232: 1,
        248: 1049600,
        256: 33554432,
        272: 1048576,
        288: 33555457,
        304: 34603009,
        320: 1048577,
        336: 33555456,
        352: 34604032,
        368: 1049601,
        384: 1025,
        400: 34604033,
        416: 1049600,
        432: 1,
        448: 0,
        464: 34603008,
        480: 33554433,
        496: 1024,
        264: 1049600,
        280: 33555457,
        296: 34603009,
        312: 1,
        328: 33554432,
        344: 1048576,
        360: 1025,
        376: 34604032,
        392: 33554433,
        408: 34603008,
        424: 0,
        440: 34604033,
        456: 1049601,
        472: 1024,
        488: 33555456,
        504: 1048577
    }, {
        0: 134219808,
        1: 131072,
        2: 134217728,
        3: 32,
        4: 131104,
        5: 134350880,
        6: 134350848,
        7: 2048,
        8: 134348800,
        9: 134219776,
        10: 133120,
        11: 134348832,
        12: 2080,
        13: 0,
        14: 134217760,
        15: 133152,
        2147483648: 2048,
        2147483649: 134350880,
        2147483650: 134219808,
        2147483651: 134217728,
        2147483652: 134348800,
        2147483653: 133120,
        2147483654: 133152,
        2147483655: 32,
        2147483656: 134217760,
        2147483657: 2080,
        2147483658: 131104,
        2147483659: 134350848,
        2147483660: 0,
        2147483661: 134348832,
        2147483662: 134219776,
        2147483663: 131072,
        16: 133152,
        17: 134350848,
        18: 32,
        19: 2048,
        20: 134219776,
        21: 134217760,
        22: 134348832,
        23: 131072,
        24: 0,
        25: 131104,
        26: 134348800,
        27: 134219808,
        28: 134350880,
        29: 133120,
        30: 2080,
        31: 134217728,
        2147483664: 131072,
        2147483665: 2048,
        2147483666: 134348832,
        2147483667: 133152,
        2147483668: 32,
        2147483669: 134348800,
        2147483670: 134217728,
        2147483671: 134219808,
        2147483672: 134350880,
        2147483673: 134217760,
        2147483674: 134219776,
        2147483675: 0,
        2147483676: 133120,
        2147483677: 2080,
        2147483678: 131104,
        2147483679: 134350848
    } ], k = [ 4160749569, 528482304, 33030144, 2064384, 129024, 8064, 504, 2147483679 ], l = f.DES = d.extend({
        _doReset: function() {
            var a, b, c, d, e, f;
            for (a = this._key.words, b = [], c = 0; 56 > c; c++) d = g[c] - 1, b[c] = 1 & a[d >>> 5] >>> 31 - d % 32;
            for (a = this._subKeys = [], d = 0; 16 > d; d++) {
                for (e = a[d] = [], f = i[d], c = 0; 24 > c; c++) e[0 | c / 6] |= b[(h[c] - 1 + f) % 28] << 31 - c % 6, 
                e[4 + (0 | c / 6)] |= b[28 + (h[c + 24] - 1 + f) % 28] << 31 - c % 6;
                for (e[0] = e[0] << 1 | e[0] >>> 31, c = 1; 7 > c; c++) e[c] >>>= 4 * (c - 1) + 3;
                e[7] = e[7] << 5 | e[7] >>> 27;
            }
            for (b = this._invSubKeys = [], c = 0; 16 > c; c++) b[c] = a[15 - c];
        },
        encryptBlock: function(a, b) {
            this._doCryptBlock(a, b, this._subKeys);
        },
        decryptBlock: function(a, b) {
            this._doCryptBlock(a, b, this._invSubKeys);
        },
        _doCryptBlock: function(c, d, e) {
            var f, g, h, i, l, m;
            for (this._lBlock = c[d], this._rBlock = c[d + 1], a.call(this, 4, 252645135), a.call(this, 16, 65535), 
            b.call(this, 2, 858993459), b.call(this, 8, 16711935), a.call(this, 1, 1431655765), 
            f = 0; 16 > f; f++) {
                for (g = e[f], h = this._lBlock, i = this._rBlock, l = 0, m = 0; 8 > m; m++) l |= j[m][((i ^ g[m]) & k[m]) >>> 0];
                this._lBlock = i, this._rBlock = h ^ l;
            }
            e = this._lBlock, this._lBlock = this._rBlock, this._rBlock = e, a.call(this, 1, 1431655765), 
            b.call(this, 8, 16711935), b.call(this, 2, 858993459), a.call(this, 16, 65535), 
            a.call(this, 4, 252645135), c[d] = this._lBlock, c[d + 1] = this._rBlock;
        },
        keySize: 2,
        ivSize: 2,
        blockSize: 2
    });
    c.DES = d._createHelper(l), f = f.TripleDES = d.extend({
        _doReset: function() {
            var a = this._key.words;
            this._des1 = l.createEncryptor(e.create(a.slice(0, 2))), this._des2 = l.createEncryptor(e.create(a.slice(2, 4))), 
            this._des3 = l.createEncryptor(e.create(a.slice(4, 6)));
        },
        encryptBlock: function(a, b) {
            this._des1.encryptBlock(a, b), this._des2.decryptBlock(a, b), this._des3.encryptBlock(a, b);
        },
        decryptBlock: function(a, b) {
            this._des3.decryptBlock(a, b), this._des2.encryptBlock(a, b), this._des1.decryptBlock(a, b);
        },
        keySize: 6,
        ivSize: 2,
        blockSize: 2
    }), c.TripleDES = d._createHelper(f);
}(), CryptoJS.mode.ECB = function() {
    var a = CryptoJS.lib.BlockCipherMode.extend();
    return a.Encryptor = a.extend({
        processBlock: function(a, b) {
            this._cipher.encryptBlock(a, b);
        }
    }), a.Decryptor = a.extend({
        processBlock: function(a, b) {
            this._cipher.decryptBlock(a, b);
        }
    }), a;
}(), sdkDefine = sdkDefine || {}, encrypt_iv = "34F6f83CaC57865F", encrypt_key = "0082D4FA04d85FfF", 
WS_ERR_BUSY = "10001", WS_ERR_UNKNOWPACKAGE = "10002", WS_PROTOCOL_DEFAULT = 0, 
WS_PROTOCOL_QCMP = 1, BIZ_ERR_INVALIDWS = "3001", BIZ_ERR_INVALID_SYMBOL = "3002", 
M_USER_TYPE = "1", M_RETCODE_SUCCESS = "0", M_RETCODE_FAIL = "1", M_DATA_UNENCRYPT = "0", 
M_DATA_ENCRYPT = "1", M_HEARTBEAT = 60, M_REQ_TIMEOUT = 10, M_NOTIC_MAXROW = 20, 
ACTION_ADD = "1", ACTION_MODIFY = "2", ACTION_DELETE = "3", ACTION_QUERY = "4", 
ACTION_CANCEL = "5", M_Q_PWDKEY = "1001", M_R_PWDKEY = "1002", M_Q_LOGIN_GW = "1003", 
M_R_LOGIN_GW = "1004", M_Q_LOGIN = "1005", M_R_LOGIN = "1006", M_Q_LOGOUT = "1007", 
M_R_LOGOUT = "1008", M_Q_CHANGEPWD = "1009", M_R_CHANGEPWD = "1010", M_Q_LOGIN_ACC = "1011", 
M_R_LOGIN_ACC = "1012", M_Q_AMOUNT = "2001", M_R_AMOUNT = "2002", M_Q_HOLDBILL = "2003", 
M_R_HOLDBILL = "2004", M_Q_BINHOLDBILL = "3203", M_R_BINHOLDBILL = "3204", M_Q_LIMITBILL = "2005", 
M_R_LIMITBILL = "2006", M_Q_CLOSEBILL = "2007", M_R_CLOSEBILL = "2008", M_Q_SYMBOL = "2009", 
M_R_SYMBOL = "2010", M_Q_RULER = "2011", M_R_RULER = "2012", M_Q_NOTIC = "2013", 
M_R_NOTIC = "2014", M_Q_NOTICDETAIL = "2015", M_R_NOTICDETAIL = "2016", M_Q_TRADEPORT = "2017", 
M_R_TRADEPORT = "2018", M_Q_TOKENCHECK = "2019", M_R_TOKENCHECK = "2020", M_Q_SYMBOLPRICE = "2021", 
M_R_SYMBOLPRICE = "2022", M_Q_HIS_QUOTE = "2023", M_R_HIS_QUOTE = "2024", M_Q_HOLDPOSITION = "2027", 
M_R_HOLDPOSITION = "2028", M_Q_CER_INFO = "2029", M_R_CER_INFO = "2030", M_Q_INOUT_MONEY = "2031", 
M_R_INOUT_MONEY = "2032", M_Q_CANCEL_DW = "2033", M_R_CANCEL_DW = "2034", M_Q_AMOUNTINOUT = "2035", 
M_R_AMOUNTINOUT = "2036", M_Q_DELIVERY_ORDER = "2037", M_R_DELIVERY_ORDER = "2038", 
M_Q_POSITION_CLOSE_ORDER = "2039", M_R_POSITION_CLOSE_ORDER = "2040", M_Q_GROUP_CLOSE_ORDER = "2041", 
M_R_GROUP_CLOSE_ORDER = "2042", M_Q_MARKET_STATUS = "2043", M_R_MARKET_STATUS = "2044", 
M_Q_QTY_PAYPORT = "2101", M_R_QTY_PAYPORT = "2102", M_Q_QTY_SYS_PAYPORT = "2103", 
M_R_QTY_SYS_PAYPORT = "2104", M_Q_PAYPORT_REGIST = "2105", M_R_PAYPORT_REGIST = "2106", 
M_Q_PAYPORT_UNREGIST = "2107", M_R_PAYPORT_UNREGIST = "2108", M_Q_MARKETOPEN = "3001", 
M_R_MARKETOPEN = "3002", M_Q_BINMARKETOPEN = "3209", M_R_BINMARKETOPEN = "3210", 
M_Q_MARKETCLOSE = "3003", M_R_MARKETCLOSE = "3004", M_Q_LIMITOPEN = "3005", M_R_LIMITOPEN = "3006", 
M_Q_LIMITCLOSE = "3007", M_R_LIMITCLOSE = "3008", M_Q_LIMITUNDO = "3009", M_R_LIMITUNDO = "3010", 
M_Q_MODIFYORDER = "3011", M_R_MODIFYORDER = "3012", M_Q_CONTRACTS = "3201", M_R_CONTRACTS = "3202", 
M_R_PUSH_QUOTE = "4002", M_R_PUSH_SYMBOLINFO = "4004", PUSH_TRCOMPLETE = "4006", 
PUSH_ACCCHANGE = "4008", PUSH_SAMEUSER_LOGIN = "4010", PUSH_BE_LOGOUT = "4012", 
PUSH_HOLDBILLCHANGE = "4016", PUSH_LIMITBILLCHANGE = "4018", PUSH_CLOSEBILLCHANGE = "4020", 
PUSH_POSITIONCHANGE = "4022", PUSH_EXCHANGERATE = "4024", PUSH_DW_CHANGE = "4026", 
PUSH_SYMBOL_INFO = "4028", PUSH_RISK_DOWN = "4030", PUSH_RISK_UP = "4032", PUSH_SPOTDELIVERY = "4034", 
PUSH_BULLETIN = "8002", PUSH_MODIFY_PASSWORD = "4038", PUSH_PAYPORT_INFO = "4040", 
PUSH_BANK_IN_URL = "4042", PUSH_BINMARKETBILL = "3208", M_Q_SUB_QUOTE = "5001", 
M_R_SUB_QUOTE = "5002", M_Q_UNSUB_QUOTE = "5003", M_R_UNSUB_QUOTE = "5004", eOT_MarketOpen = "1", 
eOT_MarketClose = "2", eOT_LimitOrder = "3", eOT_StopOrder = "4", eOT_LimitClose = "5", 
eOT_CancelLimit = "6", eOT_ModifyOrder = "7", eOT_ForceClose = "8", eOT_SystemCancel = "9", 
eOT_DeliveryOrder = "A", COT_FIFO = "1", COT_LIFO = "2", COT_TPFO = "3", COT_SLFO = "4", 
COT_ALLKL = "5", COT_ALL = "6", BSCODE_BUY = "b", BSCODE_SELL = "s", M_SYMBOLTYPE_NORMA = "1", 
M_SYMBOLTYPE_INDIRECT = "2", M_SYMBOLTYPE_INDIRECT_2 = "4", M_SYMBOLTYPE_CROSS = "3", 
console.log("load sdkDefine complete"), procJSONP = [], sdk = null, WETBizSDK = function() {
    var _encrypt_key, _encrypt_iv, _modLoginInfo, _wsLogin, _wsTC, _wsQuoted, _wsMSG, _callBackID, _symbolInfos, _accInfos, _exchangeRate, _holdBills, _binHoldBills, _limitBills, _holdPosition, _bankInfos, _contracts, _hostHisQuery, _subscrib, _keepQuoted, _onReady, _rootPath, _islogin, _loadRequire, _msgRote, _loginWithUserId, _passwordChange, _loginTraderProxy, _loginQuotedProxy, _loginMsgProxy, _loginHisQueryProxy, _getExchangeRate, _calculateDynProfit, _holdBillDynProfit, _updateHoldBill, _getLimitType, _strLeft, _strRight, _fmtDate, _requires = [];
    return _requires.push("encrypt"), _requires.push("uiFunction"), _requires.push("sdkDefine"), 
    _requires.push("websocket/webSocket"), _requires.push("Biz/IBiz"), _requires.push("Biz/BizTest"), 
    _requires.push("Biz/BizLogin"), _requires.push("Biz/BizUserAccount"), _requires.push("Biz/BizSymbolInfo"), 
    _requires.push("Biz/BizContracts"), _requires.push("Biz/BizCERInfo"), _requires.push("Biz/BizHoldBill"), 
    _requires.push("Biz/BizLimitBill"), _requires.push("Biz/BizCloseBill"), _requires.push("Biz/BizHoldPosition"), 
    _requires.push("Biz/BizOrder"), _requires.push("Biz/BizPayPort"), _requires.push("Biz/BizRegister"), 
    _requires.push("Biz/BizBinHoldBill"), _requires.push("Biz/BizPassword"), _wsLogin = null, 
    _wsTC = null, _wsQuoted = null, _wsMSG = null, _callBackID = 0, _symbolInfos = [], 
    _accInfos = [], _exchangeRate = [], _holdBills = [], _binHoldBills = [], _limitBills = [], 
    _holdPosition = [], _bankInfos = [], _contracts = [], _hostHisQuery = "", _subscrib = [], 
    _keepQuoted = !1, _onReady = null, _rootPath = "./", _islogin = 0, _loadRequire = function(callBack) {
        var i, fnName, oFn, func, fn, fileref, root = _rootPath;
        for (i = 0; i < _requires.length; i++) {
            switch (fnName = _requires[i].split("/"), oFn = fnName[fnName.length - 1]) {
              case "encrypt":
                oFn = "CryptoJS";
                break;

              case "sdkDefine":
                oFn = "sdkDefine";
            }
            try {
                func = eval(oFn), console.log(oFn + " --> has " + typeof func);
            } catch (e) {
                fn = root + "/" + _requires[i] + ".js", fileref = document.createElement("script"), 
                fileref.setAttribute("type", "text/javascript"), fileref.setAttribute("src", fn), 
                "undefined" != typeof fileref && document.getElementsByTagName("head")[0].appendChild(fileref);
            }
        }
        "function" == typeof callBack && callBack.call();
    }, _msgRote = function(a) {
        var b, c, d, e, f, g = a.event;
        if (console.log("event : " + g), _subscrib[g]) {
            for (b = _subscrib[g], c = 0; c < b.length; c++) if ("function" == typeof b[c].fn) {
                d = b[c].scope || this;
                try {
                    e = a.data.children || [], b[c].fn.call(d, e);
                } catch (h) {
                    console.log("wetbizsdk._msgRote  收到异常包");
                }
            }
        } else console.log("消息 : " + g + " 未订阅");
        switch (g) {
          case PUSH_SAMEUSER_LOGIN:
            _wsTC && _wsTC.close(), _wsQuoted && _keepQuoted === !1 && _wsQuoted.close();
            for (f in _subscrib) "4002" === f && _keepQuoted === !0 || delete _subscrib[f];
        }
    }, _loginWithUserId = function(a) {
        var b = this;
        _wsLogin = new webSocket({
            key: _encrypt_key,
            iv: _encrypt_iv,
            isEncrypt: M_DATA_ENCRYPT
        }), _wsLogin.open({
            url: a.urls[0],
            scope: b,
            onOpen: function() {
                var b, c = this;
                console.log("链接已建立"), b = new BizLogin({
                    webSocket: _wsLogin
                }), b.loginWithUID({
                    uid: a.uid,
                    pwd: a.pwd,
                    vcode: a.vcode,
                    onSuccess: function(b) {
                        _modLoginInfo = b, _modLoginInfo.uid = a.uid, _modLoginInfo.pwd = a.pwd, _modLoginInfo.userId = b.Uid, 
                        console.log(b), _loginTraderProxy.call(c, {
                            onSuccess: a.onSuccess,
                            onFailure: a.onFailure
                        }), _wsLogin.close();
                    },
                    onFailure: a.onFailure
                });
            },
            onPush: function() {}
        });
    }, _passwordChange = function(a) {
        if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
        void 0;
        var b = new BizPassword({
            webSocket: _wsTC
        });
        b.changeUserPassword({
            ver: "0.1",
            pwdType: 1,
            newPWD: a.newPWD,
            oldPWD: a.oldPWD,
            userId: a.userId,
            onSuccess: function(b) {
                "function" == typeof a.onSuccess && a.onSuccess(b);
            },
            onFailure: a.onFailure
        });
    }, _loginTraderProxy = function(a) {
        var b = this;
        _wsTC = new webSocket({
            heartBeat: {
                interval: 5e3,
                timeout: 6e4,
                msg: ""
            },
            key: _encrypt_key,
            iv: _encrypt_iv,
            isEncrypt: M_DATA_ENCRYPT
        }), _wsTC.open({
            url: _modLoginInfo.tradeproxy,
            onOpen: function() {
                var c = new BizLogin({
                    webSocket: _wsTC
                });
                c.loginWithSID({
                    sid: _modLoginInfo.sid,
                    uid: _modLoginInfo.uid,
                    pwd: _modLoginInfo.pwd,
                    onSuccess: function(c) {
                        _wsTC.token = c.token, _modLoginInfo.userName = c.data.children[0]["userName"], 
                        _isLogin = 1, _loginMsgProxy({
                            onSuccess: a.onSuccess,
                            onFailure: a.onFailure
                        }), _loginHisQueryProxy({
                            onSuccess: a.onSuccess,
                            onFailure: a.onFailure
                        }), b.queryAccount({
                            onSuccess: function() {
                                b.querySymbol({
                                    onSuccess: function() {
                                        b.queryCERInfo({
                                            onSuccess: function() {
                                                _loginQuotedProxy({
                                                    onSuccess: a.onSuccess,
                                                    onFailure: a.onFailure
                                                }), console.log("二元交易合约编号查询"), b.queryContracts({
                                                    onSuccess: function(a) {
                                                        console.log(a);
                                                    },
                                                    onFailure: function() {}
                                                });
                                            },
                                            onFailure: a.onFailure
                                        });
                                    },
                                    onFailure: a.onFailure
                                });
                            },
                            onFailure: a.onFailure
                        });
                    },
                    onFailure: a.onFailure
                });
            },
            onClose: function() {
                console.log("TraderProxy is close"), 1 == _isLogin && _wsTC.reConnect();
            },
            onPush: function(a) {
                _msgRote.call(b, a);
            }
        });
    }, _loginQuotedProxy = function(a) {
        var b = this, c = _modLoginInfo.new_quotedproxy || _modLoginInfo.quotedproxy, d = _modLoginInfo.new_quotedproxy ? WS_PROTOCOL_QCMP : WS_PROTOCOL_DEFAULT;
        _wsQuoted = new webSocket({
            protocol: d,
            heartBeat: {
                interval: 5e3,
                timeout: 6e4,
                msg: ""
            },
            key: _encrypt_key,
            iv: _encrypt_iv,
            isEncrypt: M_DATA_UNENCRYPT
        }), _wsQuoted.open({
            url: c,
            scope: b,
            onOpen: function() {
                if (_modLoginInfo.new_quotedproxy) a.onSuccess(); else {
                    var b = new BizLogin({
                        webSocket: _wsQuoted
                    });
                    b.loginWithSID({
                        sid: _modLoginInfo.sid,
                        uid: _modLoginInfo.uid,
                        pwd: _modLoginInfo.pwd,
                        onSuccess: function(b) {
                            _wsQuoted.token = b.token, a.onSuccess();
                        },
                        onFailure: a.onFailure
                    });
                }
            },
            onClose: function() {
                console.log("QuotedProxy is close");
            },
            onPush: function(a) {
                var c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = a.data.children;
                if (d === WS_PROTOCOL_QCMP) for (c = u, u = [], e = 0; e < c.length; e++) f = c[e].split(","), 
                g = b.sdk.uf.fmtDate(b.sdk.uf.Epoch2Date(new Date(parseInt(f[1])))), h = {
                    symbolCode: f[3],
                    priceCurrent: parseFloat(f[4]),
                    priceHighest: parseFloat(f[6]),
                    priceLowest: parseFloat(f[7]),
                    dailyHight: parseFloat(f[9]),
                    dailyLow: parseFloat(f[10]),
                    volume: parseFloat(f[11]),
                    lastTime: g
                }, u.push(h);
                for (i = [], e = 0; e < u.length; e++) j = u[e], _symbolInfos[j.symbolCode] && (_symbolInfos[j.symbolCode].lastTime = j.lastTime, 
                k = _symbolInfos[j.symbolCode], l = parseFloat(j.priceCurrent), m = k.decimal, n = Math.pow(10, m), 
                o = k.pointAsk, p = k.pointBid, q = (l * n + o) / n, r = (l * n - p) / n, _symbolInfos[j.symbolCode].upOrDown = q * n - k.ask * n, 
                _symbolInfos[j.symbolCode].ask = parseFloat(q), _symbolInfos[j.symbolCode].bid = parseFloat(r), 
                _symbolInfos[j.symbolCode].priceCurrent = l, _symbolInfos[j.symbolCode].priceHighest = parseFloat(j.priceHighest), 
                _symbolInfos[j.symbolCode].priceLowest = parseFloat(j.priceLowest), _symbolInfos[j.symbolCode].dailyHighest = parseFloat(j.dailyHight), 
                _symbolInfos[j.symbolCode].dailyLowest = parseFloat(j.dailyLow), _symbolInfos[j.symbolCode].spread = Math.abs(o - p), 
                i.push(_symbolInfos[j.symbolCode]), _updateHoldBill(_symbolInfos[j.symbolCode]));
                if (_subscrib && _subscrib[M_R_PUSH_QUOTE] && i.length > 0) for (s = _subscrib[M_R_PUSH_QUOTE], 
                e = 0; e < s.length; e++) "function" == typeof s[e].fn && (t = s[e].scope || this, 
                s[e].fn.call(t, i));
            }
        });
    }, _loginMsgProxy = function(a) {
        var b = this;
        _wsMSG = new webSocket({
            heartBeat: {
                interval: 5e3,
                timeout: 6e4,
                msg: ""
            },
            key: _encrypt_key,
            iv: _encrypt_iv,
            isEncrypt: M_DATA_ENCRYPT
        }), _wsMSG.open({
            url: _modLoginInfo.messageProxy,
            onOpen: function() {
                var b = new BizLogin({
                    webSocket: _wsMSG
                });
                b.loginWithSID({
                    sid: _modLoginInfo.sid,
                    uid: _modLoginInfo.uid,
                    pwd: _modLoginInfo.pwd,
                    onSuccess: function(a) {
                        console.log("Message login success"), _wsMSG.token = a.token;
                    },
                    onFailure: a.onFailure
                });
            },
            onClose: function() {
                console.log("MessageProxy is close"), 1 == _isLogin && _wsMSG.reConnect();
            },
            onPush: function(a) {
                _msgRote.call(b, a);
            }
        });
    }, _loginHisQueryProxy = function() {
        "http://" === _strLeft(_modLoginInfo.hisQueryProxy, 7) && (_hostHisQuery = _modLoginInfo.hisQueryProxy, 
        console.log("HisQueryProxy login success"));
    }, _getExchangeRate = function(a, b) {
        var c, d = null, e = 1;
        return _exchangeRate && (c = a + "_" + b, d = _exchangeRate[c], d && (e = d.exchangeRate)), 
        e;
    }, _calculateDynProfit = function(a, b, c, d, e, f) {
        var g = 0, h = 1;
        h = d === BSCODE_BUY ? 1 : -1;
        try {
            f === M_SYMBOLTYPE_NORMA ? g = (a - b) * h * e * c : f === M_SYMBOLTYPE_INDIRECT && (g = (1 / a - 1 / b) * h * e * c);
        } catch (i) {} finally {}
        return g;
    }, _holdBillDynProfit = function(a) {
        var b = a.bsCode, c = _symbolInfos[a.symbolCode], d = b === BSCODE_BUY ? c.bid : c.ask, e = a.priceHold, f = a.quantityHold, g = c.unit, h = c.symbolType, i = _getExchangeRate(c.symbolCurrency, c.accCurrency);
        a.markPrice = d, a.dynProfitPrice = _calculateDynProfit(d, e, f, b, g, h), a.dynProfit = a.dynProfitPrice * i;
    }, _updateHoldBill = function(a) {
        var b, c, d, e, f, g = [];
        for (b in _holdBills) c = _holdBills[b], c.symbolCode === a.symbolCode && (_holdBillDynProfit(c, a), 
        g.push(c));
        if (g.length > 0 && _subscrib && _subscrib[PUSH_HOLDBILLCHANGE]) for (d = _subscrib[PUSH_HOLDBILLCHANGE], 
        e = 0; e < d.length; e++) "function" == typeof d[e].fn && (f = d[e].scope || this, 
        d[e].fn.call(f, g));
    }, _getLimitType = function(a, b) {
        var c = eOT_LimitOrder;
        return a === BSCODE_BUY && 0 > b ? c = eOT_LimitOrder : a === BSCODE_SELL && b > 0 ? c = eOT_LimitOrder : a === BSCODE_BUY && b > 0 ? c = eOT_StopOrder : a === BSCODE_SELL && 0 > b && (c = eOT_StopOrder), 
        c;
    }, _strLeft = function(a, b) {
        var c = a;
        return c = c.substring(0, b);
    }, _strRight = function(a, b) {
        var c = a;
        return c = c.substring(c.length - b, c.length);
    }, _fmtDate = function(a) {
        var b;
        return b = a.getFullYear() + "-", b += _strRight("0" + (a.getMonth() + 1), 2) + "-", 
        b += _strRight("0" + a.getDate(), 2) + " ", b += _strRight("0" + a.getHours(), 2) + ":", 
        b += _strRight("0" + a.getMinutes(), 2) + ":", b += _strRight("0" + a.getSeconds(), 2);
    }, {
        keepQuoted: function(a) {
            _keepQuoted = a;
        },
        uf: null,
        rootPath: "",
        init: function(a, b, c, d) {
            var e = this;
            return e.setRoot(c), _rootPath && 0 !== _rootPath.length ? (_loadRequire.call(this, function() {
                var c = 5, f = setInterval(function() {
                    try {
                        CryptoJS ? (console.log("SDK 依赖项加载已完成！"), clearInterval(f), _encrypt_key = CryptoJS.enc.Latin1.parse(a), 
                        _encrypt_iv = CryptoJS.enc.Latin1.parse(b), e.uf = new uiFunction(), _onReady && _onReady.call(e), 
                        "function" == typeof d && d.call()) : c--;
                    } catch (g) {
                        c--;
                    }
                    console.log("test CryptoJS"), 0 >= c && (clearInterval(f), console.log("SDK 依赖项加载失败！"));
                }, 1e3);
            }), void 0) : (console.log("未指定 SDK 根目录"), void 0);
        },
        onReady: function(a) {
            "function" == typeof a && (_onReady = a);
        },
        setRoot: function(a) {
            _rootPath = a;
        },
        loginWithUserId: function(a) {
            var b = this;
            _loginWithUserId.call(b, a);
        },
        logout: function() {
            console.log("logout be call");
        },
        passwordChange: function(a) {
            var b = this;
            _passwordChange.call(b, a), console.log("passwordChange be call");
        },
        registUser: function(a) {
            var b = new BizRegister({
                webSocket: _wsTC
            });
            b.submit({
                method: "get",
                url: "../debug/testCall.php",
                mobile: a.mobile,
                password: a.password,
                vcode: a.vcode,
                token: "",
                onSuccess: function(b) {
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        registOrg: function() {},
        queryTest: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizTest({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                method: "get",
                url: "../debug/testCall.php",
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        getUserInfo: function() {
            return _modLoginInfo;
        },
        queryAccount: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizUserAccount({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    var c, d, e;
                    for (c = 0; c < b.length; c++) d = b[c], e = "key_" + d.accId, d.userName = _modLoginInfo.userName, 
                    _accInfos[e] = d;
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        getAccount: function(a) {
            var b, c = null;
            if (_accInfos && (b = "key_" + a, c = _accInfos[b], !c)) for (b in _accInfos) {
                c = _accInfos[b];
                break;
            }
            return c;
        },
        querySymbol: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizSymbolInfo({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    var c, d;
                    for (_symbolInfos = [], c = 0; c < b.length; c++) d = b[c], _symbolInfos[d.symbolCode] = d, 
                    _symbolInfos[d.symbolCode].lastTime = _symbolInfos[d.symbolCode].date, _symbolInfos[d.symbolCode].dailyHighest = _symbolInfos[d.symbolCode].priceHighest, 
                    _symbolInfos[d.symbolCode].dailyLowest = _symbolInfos[d.symbolCode].priceLowest, 
                    _symbolInfos[d.symbolCode].upOrDown = 0, _symbolInfos[d.symbolCode].spread = Math.abs(d.pointAsk - d.pointBid);
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        getSymbol: function(a) {
            var b = null;
            return _symbolInfos && (b = _symbolInfos[a]), b;
        },
        getSymbols: function(a) {
            var b, c, d = [];
            for (b in _symbolInfos) c = _symbolInfos[b], (-1 === a || a === c.accId) && d.push(c);
            return d;
        },
        symbolId2Code: function(a) {
            var b, c;
            for (b in _symbolInfos) if (c = _symbolInfos[b], a === c.symbolId) return c.symbolCode;
            return "";
        },
        getContract: function(a) {
            return _contracts[a];
        },
        queryContracts: function(a) {
            var b, c = this;
            return _wsTC ? _symbolInfos ? (b = new BizContracts({
                webSocket: _wsTC
            }), b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    var d, e, f;
                    for (d = 0; d < b.length; d++) e = b[d], f = c.symbolId2Code(e.symbolId), _contracts[f] || (_contracts[f] = []), 
                    _contracts[f].push(e);
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            }), void 0) : (a.onFailure(BIZ_ERR_INVALIDWS, "商品信息未初始化"), void 0) : ("function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0);
        },
        queryCERInfo: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizCERInfo({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    var c, d, e;
                    for (c = 0; c < b.length; c++) d = b[c], e = d.currencyBase + "_" + d.currencyExchange, 
                    _exchangeRate[e] = d;
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        getExchangeRate: _getExchangeRate,
        queryHoldBill: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizHoldBill({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    var c, d, e;
                    for (c = 0; c < b.length; c++) d = b[c], e = d.orderCode, _holdBills[e] = d, _holdBillDynProfit(d);
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        queryBinHoldBill: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizBinHoldBill({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    var c, d, e;
                    for (c = 0; c < b.length; c++) d = b[c], e = d.orderCode, _binHoldBills[e] = d;
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        getHoldBill: function(a) {
            var b = null;
            return _holdBills && (b = _holdBills[a]), b;
        },
        queryHoldPosition: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizHoldPosition({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    var c, d, e;
                    for (c = 0; c < b.length; c++) d = b[c], e = d.symbolCode, _holdPosition[e] = d;
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        getHoldPosition: function(a) {
            var b = null;
            return _holdPosition && (b = _holdPosition[a]), b;
        },
        queryLimitBill: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizLimitBill({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    var c, d, e;
                    for (c = 0; c < b.length; c++) d = b[c], e = d.orderCode, _limitBills[e] = d;
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        getLimitBill: function(a) {
            var b = null;
            return _limitBills && (b = _limitBills[a]), b;
        },
        queryCloseBill: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizCloseBill({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        queryBinBill: function() {},
        queryHisQuoted: function() {},
        queryPayPort: function(a) {
            if (!_wsTC) return "function" == typeof a.onFailure && a.onFailure(BIZ_ERR_INVALIDWS, "通讯组件未初始化"), 
            void 0;
            var b = new BizPayPort({
                webSocket: _wsTC
            });
            b.loadDataWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                token: _modLoginInfo.token,
                onSuccess: function(b) {
                    var c, d, e;
                    for (_bankInfos = [], c = 0; c < b.length; c++) d = b[c], e = "key_" + d.payPortId, 
                    _bankInfos[e] = d;
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            });
        },
        getPayPortInfo: function(a) {
            var b = null, c = "key_" + a;
            return _bankInfos && (b = _bankInfos[c]), b;
        },
        getHisTradeLog: function(a) {
            var b, c, d, e, f, g, h;
            _hostHisQuery = a && a.hisQueryProxy ? a.hisQueryProxy : "http://192.168.1.108:20040/report_client/binaryoptionsorder", 
            _hostHisQuery && (b = "1", "" == a.startTime && "" == a.startTime && (b = "0"), 
            c = _hostHisQuery + "?bizData=", d = [ {
                operator: "and",
                value: b,
                key: "isHistory"
            }, {
                operator: "and",
                value: '("' + a.startTime + '","' + a.endTime + '")',
                key: "tradingday"
            } ], e = {
                order: "DESC",
                children: [ "orderTime" ]
            }, f = {
                start: "0",
                limit: "20",
                page: "1"
            }, g = this.getAccount(-1), h = {
                accId: g.accId,
                userId: _modLoginInfo.userId,
                parames: d,
                pageCtrl: f,
                sort: e
            }, c += encodeURIComponent(JSON.stringify(h)), jsonP(c, function(b) {
                b && b.bizRet && "0" === b.bizRet && "function" == typeof a.onSuccess && (b.data.length > 0 && (b.data[0].totalCount = b.totalCount), 
                a.onSuccess(b.data));
            }));
        },
        marketOpen: function(a) {
            var b, c = new BizOrder({
                requestCode: M_Q_MARKETOPEN,
                responseCode: M_R_MARKETOPEN,
                webSocket: _wsTC
            }), d = _symbolInfos[a.symbolCode];
            d ? (b = {
                orderType: eOT_MarketOpen,
                symbolCode: a.symbolCode,
                orderQuantity: a.quantity,
                bsCode: a.bsCode,
                orderPrice: a.orderPrice,
                pointOffset: a.pointOffset,
                priceTakeProfit: a.priceTakeProfit,
                priceStopLose: a.priceStopLose,
                memo: a.memo,
                orderSerial: 0,
                orderTime: _fmtDate(new Date()),
                revQuantity: 0,
                amId: 0,
                cmDealerId: 0,
                sendType: "",
                symbolId: d.symbolId,
                pointAsk: d.pointAsk,
                pointBid: d.pointBid,
                accId: d.accId,
                cutType: "",
                pickInfo: "",
                orderCode: "",
                orderCodeRe: "",
                validDateType: "0",
                validDate: ""
            }, c.makeOrderWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                orderData: b,
                onSuccess: function(b) {
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            })) : a.onFailure && a.onFailure(BIZ_ERR_INVALID_SYMBOL, "无效的交易商品");
        },
        marketCloseWithOrder: function(a) {
            var b, c, d, e, f = new BizOrder({
                requestCode: M_Q_MARKETCLOSE,
                responseCode: M_R_MARKETCLOSE,
                webSocket: _wsTC
            }), g = a.orderInfo;
            g ? (b = _symbolInfos[g.symbolCode], c = g.bsCode === BSCODE_BUY ? BSCODE_SELL : BSCODE_BUY, 
            d = g.bsCode === BSCODE_BUY ? b.bid : b.ask, e = {
                orderType: eOT_MarketClose,
                symbolCode: g.symbolCode,
                orderQuantity: a.quantity,
                bsCode: c,
                orderPrice: d,
                pointOffset: a.pointOffset,
                orderCodeRe: g.orderCode,
                revQuantity: a.revQuantity,
                memo: a.memo,
                priceTakeProfit: 0,
                priceStopLose: 0,
                orderSerial: 0,
                amId: 0,
                cmDealerId: 0,
                sendType: "",
                orderTime: _fmtDate(new Date()),
                symbolId: b.symbolId,
                pointAsk: b.pointAsk,
                pointBid: b.pointBid,
                accId: b.accId,
                cutType: "",
                pickInfo: "",
                orderCode: "",
                validDateType: "0",
                validDate: ""
            }, f.makeOrderWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                orderData: e,
                onSuccess: function(b) {
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            })) : a.onFailure && a.onFailure(BIZ_ERR_INVALID_SYMBOL, "无效单据信息");
        },
        marketCloseWithSymbol: function(a) {
            var b, c, d = new BizOrder({
                requestCode: M_Q_POSITION_CLOSE_ORDER,
                responseCode: M_R_POSITION_CLOSE_ORDER,
                webSocket: _wsTC
            }), e = _symbolInfos[a.symbolCode];
            e && (b = a.bsCode === BSCODE_BUY ? e.bid : e.ask, c = {
                orderType: eOT_MarketClose,
                symbolCode: a.symbolCode,
                orderQuantity: a.quantity,
                bsCode: a.bsCode,
                orderPrice: b,
                pointOffset: a.pointOffset,
                revQuantity: a.revQuantity,
                memo: a.memo,
                cutType: COT_FIFO,
                orderCodeRe: "",
                priceTakeProfit: 0,
                priceStopLose: 0,
                orderSerial: 0,
                amId: 0,
                cmDealerId: 0,
                sendType: "",
                orderTime: _fmtDate(new Date()),
                symbolId: e.symbolId,
                pointAsk: e.pointAsk,
                pointBid: e.pointBid,
                accId: e.accId,
                pickInfo: "",
                orderCode: "",
                validDateType: "0",
                validDate: ""
            }, d.makeOrderWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                orderData: c,
                onSuccess: function(b) {
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            })), e || a.onFailure && a.onFailure(BIZ_ERR_INVALID_SYMBOL, "无效的交易商品");
        },
        limitOpen: function(a) {
            var b, c, d, e = new BizOrder({
                requestCode: M_Q_LIMITOPEN,
                responseCode: M_R_LIMITOPEN,
                webSocket: _wsTC
            }), f = _symbolInfos[a.symbolCode];
            f ? (b = a.orderPrice - (a.bsCode === BSCODE_BUY ? f.ask : f.bid), c = _getLimitType(a.bsCode, b), 
            d = {
                orderType: c,
                symbolCode: a.symbolCode,
                orderQuantity: a.quantity,
                bsCode: a.bsCode,
                orderPrice: a.orderPrice,
                priceTakeProfit: a.priceTakeProfit,
                priceStopLose: a.priceStopLose,
                validDateType: a.validDateType,
                limitType: c,
                memo: a.memo,
                pointOffset: 0,
                orderSerial: 0,
                orderTime: _fmtDate(new Date()),
                revQuantity: 0,
                amId: 0,
                cmDealerId: 0,
                sendType: "",
                symbolId: f.symbolId,
                pointAsk: f.pointAsk,
                pointBid: f.pointBid,
                accId: f.accId,
                cutType: "",
                pickInfo: "",
                orderCode: "",
                orderCodeRe: "",
                validDate: ""
            }, e.makeOrderWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                orderData: d,
                onSuccess: function(b) {
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            })) : a.onFailure && a.onFailure(BIZ_ERR_INVALID_SYMBOL, "无效的交易商品");
        },
        modifyOrder: function(a) {
            var b, c, d = new BizOrder({
                requestCode: M_Q_MODIFYORDER,
                responseCode: M_R_MODIFYORDER,
                webSocket: _wsTC
            }), e = a.orderInfo;
            e ? (b = _symbolInfos[e.symbolCode], c = {
                orderType: M_Q_MODIFYORDER,
                symbolCode: e.symbolCode,
                orderCode: e.orderCode,
                priceStopLose: a.priceStopLose,
                priceTakeProfit: a.priceTakeProfit,
                memo: a.memo,
                orderQuantity: 0,
                bsCode: "",
                orderPrice: 0,
                revQuantity: 0,
                pointOffset: 0,
                orderCodeRe: "",
                orderSerial: 0,
                amId: 0,
                cmDealerId: 0,
                sendType: "",
                orderTime: _fmtDate(new Date()),
                symbolId: b.symbolId,
                pointAsk: b.pointAsk,
                pointBid: b.pointBid,
                accId: b.accId,
                cutType: "",
                pickInfo: "",
                validDateType: "0",
                validDate: ""
            }, d.makeOrderWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                orderData: c,
                onSuccess: function(b) {
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            })) : a.onFailure && a.onFailure(BIZ_ERR_INVALID_SYMBOL, "无效单据信息");
        },
        cancelOrder: function(a) {
            var b, c, d = new BizOrder({
                requestCode: M_Q_LIMITUNDO,
                responseCode: M_R_LIMITUNDO,
                webSocket: _wsTC
            }), e = a.orderInfo;
            e && (b = _symbolInfos[e.symbolCode], e.bsCode === BSCODE_BUY ? BSCODE_SELL : BSCODE_BUY, 
            e.bsCode === BSCODE_BUY ? b.bid : b.ask, c = {
                orderType: eOT_CancelLimit,
                symbolCode: e.symbolCode,
                orderCode: e.orderCode,
                memo: a.memo,
                orderQuantity: 0,
                bsCode: "",
                orderPrice: 0,
                pointOffset: 0,
                orderCodeRe: "",
                revQuantity: 0,
                priceTakeProfit: 0,
                priceStopLose: 0,
                orderSerial: 0,
                amId: 0,
                cmDealerId: 0,
                sendType: "",
                orderTime: _fmtDate(new Date()),
                symbolId: b.symbolId,
                pointAsk: b.pointAsk,
                pointBid: b.pointBid,
                accId: b.accId,
                cutType: "",
                pickInfo: "",
                validDateType: "0",
                validDate: ""
            }, d.makeOrderWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                orderData: c,
                onSuccess: function(b) {
                    "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            })), b || a.onFailure && a.onFailure(BIZ_ERR_INVALID_SYMBOL, "无效的交易商品");
        },
        binOptionOpen: function(a) {
            var b, c = new BizOrder({
                requestCode: M_Q_BINMARKETOPEN,
                responseCode: M_R_BINMARKETOPEN,
                webSocket: _wsTC
            }), d = _symbolInfos[a.symbolCode];
            d ? (b = {
                orderType: eOT_MarketOpen,
                symbolCode: a.symbolCode,
                contract: "",
                orderQuantity: a.quantity,
                bsCode: a.bsCode,
                orderPrice: a.orderPrice,
                timeExpire: 60,
                memo: a.memo,
                orderSerial: 0,
                orderTime: _fmtDate(new Date()),
                revQuantity: 0,
                amId: 0,
                cmDealerId: 0,
                sendType: "",
                pointOffset: 0,
                priceTakeProfit: 0,
                priceStopLose: 0,
                symbolId: d.symbolId,
                pointAsk: d.pointAsk,
                pointBid: d.pointBid,
                accId: d.accId,
                cutType: "",
                pickInfo: "",
                orderCode: "",
                orderCodeRe: "",
                validDateType: "0",
                validDate: "",
                pwd: "",
                marginCalculetType: "1",
                marginUsedCalc: "100",
                contractId: a.contractId
            }, c.makeOrderWithSID({
                sid: _modLoginInfo.sid,
                uid: _modLoginInfo.uid,
                orderData: b,
                onSuccess: function(b) {
                    console.log("111111"), console.log(b), "function" == typeof a.onSuccess && a.onSuccess(b);
                },
                onFailure: a.onFailure
            })) : a.onFailure && a.onFailure(BIZ_ERR_INVALID_SYMBOL, "无效的交易商品");
        },
        on: function(a, b, c) {
            if ("function" == typeof b) {
                var d;
                d = _subscrib[a] ? _subscrib[a] : [], _callBackID++, b.key = "callback_" + _callBackID, 
                d.push({
                    fn: b,
                    scope: c
                }), _subscrib[a] = d;
            }
        },
        un: function(a, b) {
            var c, d, e = 0;
            if (_subscrib[a]) {
                if (c = _subscrib[a], b) for (d = 0; d < c.length; d++) if (c[d].fn.key === b.key) {
                    e = d;
                    break;
                }
                c.splice(e, 1), 0 === c.length && delete _subscrib[a];
            }
        }
    };
}(), sdk = WETBizSDK, console.log("load wetBizSDK complete");