/**
 * Created by he.zhiyi on 15/2/25.
 */
/**
 * @brief   界面数据处理函数集
 */
function uiFunction(){
    /**
     *  @brief  截取字符串 Left 函数
     *  @param  str         被截取的字符串
     *  @param  length      要截取的长度
     */
    var _strLeft = function(str,length) {
        var sl = str ;
        sl = sl.substring(0,length) ;
        return sl;
    };
    /**
     *  @brief  截取字符串 Right 函数
     *
     *  @param  str         被截取的字符串
     *  @param  length      要截取的长度
     */
    var _strRight = function(str,length) {
        var sr = str;
        sr = sr.substring(sr.length-length,sr.length);
        return sr;
    };

    return {
        /**
         * @brief               将日期数据转换成 Epoch
         * @param dDate
         * @returns {*}
         */
        Date2Epoch : function(dDate) {

            if (typeof dDate=='string') {
                var d = dDate.replace(/-/g,'/') ;
                dDate = new Date(d) ;
            }

            var x ;
            var GMT = true ;
            if ( GMT ) {
                x = parseInt(
                    Date.UTC(
                        dDate.getUTCFullYear(),
                        dDate.getUTCMonth(),
                        dDate.getUTCDate(),
                        dDate.getUTCHours(),
                        dDate.getUTCMinutes(),
                        dDate.getUTCSeconds(),
                        dDate.getUTCMilliseconds()
                    )/1000
                );
            } else {
                x = ( dDate.getTime()-dDate.getMilliseconds() ) / 1000;
                //x += dDate.getTimezoneOffset();
            }
            return x;
        },

        /**
         * @brief               将 Epoch 时间格式转换成 日期型
         * @param mEpoch
         * @returns {Date}
         * @constructor
         */
        Epoch2Date : function(mEpoch){

            var dDate =new Date() ;

            if( mEpoch<10000000000 ){
                mEpoch *= 1000;
            } // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)

            dDate.setTime(mEpoch);
            return dDate;
        },

        /**
         *  @brief 格式化报价
         *
         *  格式化报价数据，提取报价数字的末两位
         *
         *  @param  val         价格数据
         *  @param  decimal     有效小数位数
         */
        fmtPrice : function(val,decimal) {
            if (!val) {
                val = 0;
            }

            if ( typeof val === 'string' ) {
                val = parseFloat(val) ;
            }
            return val.toFixed(decimal) ;
        },
        /**
         * @brief           根据点差计算价格
         * @param price
         * @param point
         */
        calculPrice : function(price,point,decimal) {
            var ret   = price ;
            var scale = Math.pow(10, decimal);

            ret = ( ret * scale + point ) / scale;

            ret = ret.toFixed(decimal) ;

            return ret ;
        },

        /**
         * @brief           为交易对话框格式化报价信息
         * @param val
         * @param decimal
         * @returns {*}
         */
        fmtShowPrice : function(val,decimal) {
            if (!val) {
                val = 0;
            }

            var ret = {price:val.toString()} ;

            //this.price = val.toString() ;

            if (val) {

                var scale    = Math.pow(10,decimal) ;
                var strPrice = (Math.round(val * scale)).toString() ;
                var p1       = strPrice.indexOf('.') ;
                if ( p1 >= 0 ) {
                    strPrice = _strLeft(strPrice,p1) ;
                }

                var n = Math.min(decimal,2) ;

                ret.price1 = _strLeft(strPrice,strPrice.length - n) ;
                ret.price2 = strPrice.replace(ret.price1,'') ;

                if (decimal===0) {
                    var lenStr = ret.price1.length ;
                    switch (lenStr)
                    {
                        case 0:
                        case 1:
                        case 2:
                        {
                            ret.price2 = ret.price1 ;
                            ret.price1 = '' ;
                            break ;
                        }
                        default:
                        {
                            ret.price2 = _strRight(ret.price1,2) ;
                            ret.price1 = _strLeft(ret.price1,lenStr-2) ;
                        }
                    }
                }else {

                    if (decimal>2) {
                        ret.price1 = (parseInt(_strLeft(strPrice,strPrice.length-n) + '11') / scale ).toString() ;
                        ret.price1 = _strLeft(ret.price1,ret.price1.length-n) ;
                    }
                    if (decimal > 0 && ret.price1.indexOf('.') == -1) {
                        ret.price2 = '.' + ret.price2 ;
                    }
                }

            } else {
                ret.price1 = '0' ;
                ret.price2 = '' ;
            }

            ret.price = ret.price1 + ret.price2 ;
            return ret ;
        },
        /**
         *	@brief	格式化日期
         *
         *  根据限价点差计算限价
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 yyyy-mm-dd hh:mm:ss 的日期字符串
         */
        fmtDate : function(date) {
            var sRet;
            sRet = date.getFullYear() + "-";                        // 取年份
            sRet += _strRight('0' + (date.getMonth() + 1),2) + "-";  // 取月份
            sRet += _strRight('0' + date.getDate(),2) + " ";         // 取日期
            sRet += _strRight('0' + date.getHours(),2) + ":";        // 取小时
            sRet += _strRight('0' + date.getMinutes(),2) + ":";      // 取分
            sRet += _strRight('0' + date.getSeconds(),2);            // 取秒

            return sRet;
        },
        fmtMSDate : function(date) {
            var sRet;
            sRet = date.getFullYear() + "-";                        // 取年份
            sRet += _strRight('0' + (date.getMonth() + 1),2) + "-";  // 取月份
            sRet += _strRight('0' + date.getDate(),2) + " ";         // 取日期
            sRet += _strRight('0' + date.getHours(),2) + ":";        // 取小时
            sRet += _strRight('0' + date.getMinutes(),2) + ":";      // 取分
            sRet += _strRight('0' + date.getSeconds(),2) + ":";            // 取秒
            sRet += _strRight('0000' + date.getMilliseconds(),4);    // 取毫秒

            return sRet;
        },
        /**
         *	@brief	格式化日期
         *
         *  根据限价点差计算限价
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 yyyymmddhhmmss 的日期字符串
         */
        fmtDate2 : function(date) {
            var sRet;
            sRet = date.getFullYear() ;                        // 取年份
            sRet += _strRight('0' + (date.getMonth() + 1),2) ;  // 取月份
            sRet += _strRight('0' + date.getDate(),2) ;         // 取日期
            sRet += _strRight('0' + date.getHours(),2) ;        // 取小时
            sRet += _strRight('0' + date.getMinutes(),2) ;      // 取分
            sRet += _strRight('0' + date.getSeconds(),2);       // 取秒

            return sRet;
        },

        /**
         *	@brief	格式化日期
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 yyyy-mm-dd 的日期字符串
         */
        fmtShortDate : function(date) {

            if (typeof date === 'string'){
                return date ;
            }

            var sRet;
            sRet = date.getFullYear();                        // 取年份
            sRet += '/';
            sRet += _strRight('0' + (date.getMonth() + 1),2);  // 取月份
            sRet += '/';
            sRet += _strRight('0' + date.getDate(),2);         // 取日期

            return sRet;

        },

        /**
         *  @brief   格式化日期
         *
         *  @param  date         日期
         *
         *  @return 返回格式为 mm-dd 的日期字符串
         */
        fmtMDDate : function(date) {
            if (typeof date === 'string'){
                var index = date.indexOf('-') ;
                if (index>=0) {
                    date = _strRight(date, date.length - index - 1) ;
                }
                return date ;
            }

            var sRet;
            sRet += _strRight('0' + (date.getMonth() + 1),2);  // 取月份
            sRet += '-';
            sRet += _strRight('0' + date.getDate(),2);         // 取日期

            return sRet;
        },

        /**
         *  @brief  截取字符串 Left 函数
         *  @param  str         被截取的字符串
         *  @param  length      要截取的长度
         */
        strLeft : function(str,length) {
            //var sl = str ;
            //sl = sl.substring(0,length) ;
            return _strLeft(str,length);
        },
        /**
         *  @brief  截取字符串 Right 函数
         *
         *  @param  str         被截取的字符串
         *  @param  length      要截取的长度
         */
        strRight : function(str,length) {
            //var sr = str;
            //sr = sr.substring(sr.length-length,sr.length);
            return _strRight(str,length);
        },
        /**
         * @brief               取 GUID
         * @returns {string}    返回值
         */
        getGuid : function() {
            var guid = "";
            for (var i = 1; i <= 32; i++){
                var n = Math.floor(Math.random()*16.0).toString(16);
                guid +=   n;
                if((i==8)||(i==12)||(i==16)||(i==20))
                    guid += "-";
            }
            return guid;
        },

        /**
         * @brief           创建Ajax对象
         * @returns {*}
         */
        getXmlHttpObject : function()
        {
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
        }
    } ;
}