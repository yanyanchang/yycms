<?php
return array(
    //URL模式,1=>pathinfo模式,2=>隐藏index.php
    'URL_MODEL' => 1,
    'URL_ROUTER_ON'   => true, //开启路由
    'URL_ROUTE_RULES' => array( //定义路由规则
        'wp/:g'    => 'Wp/index',
        'register/:g'    => 'Wp/register',
        'qrcode/:g'      =>'Institutions/qrcode',
        'unbind/:g'      =>'Institutions/unbind',
    ),
    'URL_CASE_INSENSITIVE' => true,
    'TMPL_SWITCH_ON' => true,
    'TMPL_DETECT_THEME' => true,
    'TMPL_ACTION_ERROR' => '/success',
    'TMPL_ACTION_SUCCESS' => '/success',
    'TMPL_DETECT_THEME' => true,
    //'THEME_LIST' => 'default',
    //'DEFAULT_THEME' => 'default',
    //多语言
    'LANG_SWITCH_ON' => false,
    'DEFAULT_LANG' => 'zh-cn',
    'LANG_AUTO_DETECT' => true,
    'LANG_LIST' => 'zh-cn,en-us',
    //'LAYOUT_ON' => true,
    //'LAYOUT_NAME' => 'layout',
    //允许上传的文件类型
    'FILE_UPLOAD_ALLOWEXTS' => 'jpg,jpeg,bmp,png,gif',
    'URL_HTML_SUFFIX' => '',
    // 'DEFAULT_THEME' => 'default',
    'URL_PATHINFO_DEPR' => '/',
    //分组
    //'APP_GROUP_LIST' => 'Wp,Institutions',
    //'DEFAULT_GROUP' => 'Institutions',
    'TMPL_FILE_DEPR' => "-",

    //调试
    //'SHOW_DIY_TRACE'  =>0,
    'SHOW_PAGE_TRACE' => false,
    //'SHOW_ADV_TIME'   =>0,
    //'LOG_RECORD'      => false,
    //'LOG_LEVEL'       => 'EMERG,ALERT,CRIT,ERR,WARN,NOTIC,INFO,DEBUG,SQL',// 允许记录的日志级别
    'LOG_RECORD' => false, // 开启日志记录
    'LOG_LEVEL' => 'EMERG,ALERT,CRIT,ERR', // 只记录EMERG ALERT CRIT ERR 错误


    //系统设置
    'DEFAULT_GROUP'=>'',
    // 'THEME_LIST'=>'default',
    // 'DEFAULT_THEME'=>'default',
);
?>
