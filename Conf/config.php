<?php
$config = require './Conf/sys_config.php';
$array = array(
 	'001jd'=>array(
       'app_name'=>'金德大宗商品交易中心-模似盘',
        'app_key'=>'',
        'app_url'=>'http://demo.gdmex.com/',
        'wx_app_id'=>'',
        'wx_app_secret'=>'',
        'jg_server_url'=>'http://120.24.165.77:16061',//机构申请推广&微交易
        'server_url'=>'http://120.24.165.77:16060',//微交易在线开户
        'sms_server_url'=>'http://120.24.165.77:16060',//短信服务==微交易在线开户
        'query_server_url'=>'http://120.25.121.131:14020',//管理后台查询服务wetgate_query
        'assets_path'=>'http://demo.gdmex.com/client/jd/assets/',//资源地址
        'api_path'=>'http://demo.gdmex.com/index.php',//服务地址
        //应用设置
        'theme'=>'jd',
		'dealerId'=>'', 
    ),
);
return array_merge($config, $array);
?>
