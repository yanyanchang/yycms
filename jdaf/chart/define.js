/**
 * Created by he.zhiyi on 15/4/17.
 */
var M_URL_QUOTEDATA = 'http://120.24.165.77:16020/quotes/quotes_data.js' ;
var M_URL_HISDATA = 'http://120.24.165.77:16020/quotes/hisquotes_data.js' ;


var g_symbolName = [] ;

// 商品信息
g_symbolName['CLBI']   = '美国原油(V)' ;
g_symbolName['DXBI']   = '美元指数(V)' ;
g_symbolName['HSIBI']  = '恒生指数(V)' ;
g_symbolName['NHCUBI'] = '南海铜(V)' ;


var g_menu = [] ;
g_menu['m1']={text:'自贸铜',children: [
        ['Cu5T','自贸铜5T'],
        ['CU1T','自贸铜1T']
    ]} ;

g_menu['m2'] ={text:'自贸铝',children: [
        ['Al5T','自贸铝5T'],
        ['Al1T','自贸铝1T']
    ]} ;

g_menu['m3'] ={text:'自贸银',children:  [
        ['Ag10KG','自贸银10千克'],
        ['Ag100KG','自贸银100千克'],
        ['Ag200KG','自贸银200千克']
    ]} ;
    
g_menu['m4'] ={text:'自贸油',children:  [
        ['OIL10T','自贸油10吨'],
        ['OIL100T','自贸油100吨'],
        ['OIL200T','自贸油200吨']
    ]} ;

