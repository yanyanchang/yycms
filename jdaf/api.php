<?php
ini_set("display_errors", 0);
session_start();
$action=$_REQUEST['action'];

if($action =='history'){
	$acc_id=$_POST['acc_id'];
	$start_time=$_POST['startDate'];
	$end_time=$_POST['endDate'];
	
	if($start_time=='' || $end_time==''){
		$start_time = toDate(time(), 'Y-m-d') .' 00:00:00';
		$end_time = toDate(time(), 'Y-m-d').' 23:59:59';
		$is_history="0";
	}else{
		$start_time = $start_time .' 00:00:00';
		$end_time = $end_time.' 23:59:59';
	    $is_history="1";
	}
	$limit=100;
	$return=array();
	$data['accId']=$acc_id;
	$data['parames']=array(
		array('operator'=>'and','value'=>$is_history,'key'=>'isHistory'),
		array('operator'=>'and','value'=>"(\"".$start_time."\",\"".$end_time."\")",'key'=>'tradingday')
	);
    $data['pageCtrl']=array('start'=>0,'limit'=>$limit,'page'=>1);
    $data['sort']=array('order'=>'DESC','children'=>array('orderTime'));
	$url = urlencode(json_encode($data));
    $url = "http://120.24.165.77:14020/wetquery/report_client/binaryoptionsorder?bizData=".$url;
	$data1= json_decode(curl_get($url),true);
	
	if($data1['bizRet']=="0"){
		$return=$data1['data'];
	}
	echo json_encode($return);

}
function toDate($time, $format = 'Y-m-d H:i:s') {
	if (empty ( $time )) {
		return '';
	}
	$format = str_replace ( '#', ':', $format );
	return date ($format, $time );
}
function curl_get($url){
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = curl_exec($ch);
    curl_close($ch);
	return $output;
}

?>