/**
 * Created by he.zhiyi on 15/2/16.
 */
(function(){
    var _requires = [] ;
    _requires.push('sdk/modal/modAmountInOut') ;

    // 动态加载JS代码
    var _loadRequire = function() {
        for (var i = 0; i<_requires.length; i++) {
            var fn = _requires[i] + '.js' ;
            var fileref=document.createElement('script') ;
            fileref.setAttribute("type","text/javascript") ;
            fileref.setAttribute("src", fn) ;
            if (typeof fileref!="undefined") {
                document.getElementsByTagName("head")[0].appendChild(fileref)
            }
        }
    } ;
    _loadRequire() ;

}());