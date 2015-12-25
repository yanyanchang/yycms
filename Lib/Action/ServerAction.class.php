<?php
class ServerAction extends Action{
    public $group_name;
    public $config;
    public $sever_url;
    public $jg_server_url;
    public $sms_server_url;
    public $query_server_url;
    public $app_name;
    function _initialize(){
        if(isset($_GET['g'])){
            $this->group_name=$_GET['g'];
        }else{
            if(C('DEFAULT_GROUP')==''){
                $this->group_name=$_SERVER['SERVER_NAME'];
                $this->group_name=str_ireplace('.','',$this->group_name);
            }else{
                $this->group_name=C('DEFAULT_GROUP');
            }
        }
		if(session('?group_name')){
			$this->group_name=session('group_name');
		}
        if($this->group_name){
            $this->config=C($this->group_name);
            $this->sever_url=$this->config['server_url'];
            $this->jg_server_url=$this->config['jg_server_url'];
            $this->sms_server_url=$this->config['sms_server_url'];
            $this->app_name=$this->config['app_name'];
            $this->query_server_url=$this->config['query_server_url'];
            if(empty($this->config)){
                $result['retCode']="404";
                $result['retText']="没有相关配置！";
                echo json_encode($result);
                exit;
            }
        }
    }
    public function getSerialCode(){
        $url = $this->sever_url."/account/real/orginfo";
        $post_data['serialcode']=$_POST['serialcode'];
        $result=json_decode(curl_post($url,$post_data), true);
        $result['serialcode']=$_POST['serialcode'];
        $result['url']= $url;
        echo json_encode($result);
    }
    public function verfiy(){
        $this->do_verfiy($this->sever_url);
    }
  
    public function  register(){
        import ( "ORG.Net.UploadFile" );
        include('./Common/jssdk/jssdk.php');
        //验证
        $this->do_verfiy($this->sever_url);
        $app_id=$this->config['wx_app_id'];
        $app_secret=$this->config['wx_app_secret'];
        $jssdk = new JSSDK($app_id, $app_secret,$this->group_name);
        $access_token=$jssdk->getToken();
        $dirname = dirname(__FILE__)."/uploads/";
        $file_name=array();
        $file_data=array();
        if(!file_exists($dirname)){
            mkdir($dirname,0777,true);
        }
        //微信下载
        $wx_data=array();
        for($i=0;$i<3;$i++){
            if(isset($_POST['image'.($i+1)]) && $_POST['image'.($i+1)]!=''){
                $media_id=$_POST['image'.($i+1)];
                $url = "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=$access_token&media_id=$media_id";
                $ch = curl_init($url);
                curl_setopt($ch, CURLOPT_HEADER, 0);
                curl_setopt($ch, CURLOPT_NOBODY, 0);    //对body进行输出。
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                $package = curl_exec($ch);
                $httpinfo = curl_getinfo($ch);
                curl_close($ch);
                $wx_return_array=json_decode($package,true);
				
				if(strlen($package)==0){
					Log::record('wechat_error:'.$wx_return_array['errcode']);
					Log::save();
					$jssdk->resetToken();
					$result['retCode']="1";
					$result['retText']="服务器繁忙，请稍后重新提交！";
					echo json_encode($result);
					exit;
				}
                if($wx_return_array['errcode']){
					Log::record('wechat_error:'.$wx_return_array['errcode']);
					Log::save();
					$jssdk->resetToken();
                    $result['retCode']="1001";
                    $result['retText']="服务器繁忙，请稍后重新提交！";
                    echo json_encode($result);
                    exit;
                }else{
					
                    $media = array_merge(array('mediaBody' => $package), $httpinfo);
                    $new_filename = md5(time() . mt_rand(1,1000000)).'_idCard_0'.($i+1).".jpg";
                    $re=file_put_contents($dirname.$new_filename,$media['mediaBody']);
                    $wx_data[$i]=$new_filename;
                }
            }
        }

        //文件上传
        $files_data=array();
        if(isset($_FILES)){
            $upload = new UploadFile();
            $upload->maxSize  = 10145728 ;// 设置附件上传大小
            $upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
            $upload->savePath =  $dirname;// 设置附件上传目录
            for($i=0;$i<3;$i++){
                if(!empty($_FILES['file'.($i+1)])) {
                    $file=$_FILES['file'.($i+1)];
                    $info =  $upload->uploadOne($file);
                    $error = $upload->getErrorMsg ();
                    if(!empty($error)){
                        $result['retCode']="1002";
                        $result['retText']=$error;
                        echo json_encode($result);
                        exit;
                    }else{
                        $files_data[$i] = $info[0]['savename'];
                    }
                }
            }
        }
        //app上传
        $app_files_data=array();
        for($i=0;$i<3;$i++){
            if(isset($_POST['appUploadPhoto'.($i+1)]) && $_POST['appUploadPhoto'.($i+1)]!='' ){
                $bsse64=$_POST['appUploadPhoto'.($i+1)];
                $filename = md5(time() . mt_rand(1,1000000)).'_idCard_0'.($i+1).".jpg";
                if (file_put_contents($dirname.$filename, base64_decode($bsse64))){
                    $app_files_data[$i]=$filename;
                }else{
                    $result['retCode']="1003";
                    $result['retText']="文件上传失败!";
                    echo json_encode($result);
                    exit;
                }
            }
        }

        //提交注册
        $post_data['serialcode'] = $_POST['serialcode'];
        $post_data['username'] = $_POST['username'];
        $post_data['password'] = $_POST['password'];
        $post_data['phone'] = $_POST['phone'];
        $post_data['idcard'] = $_POST['idcard'];
        $url = $this->sever_url."/account/real/register";
        $result=json_decode(curl_post($url,$post_data), true);
        $result['data']['uid']=$result['loginCode'];
        $result['data']['pwd']=$_POST['password'];
        $result['data']['sitcode']='';
        $result['data']['userName']=$post_data['username'];
        $result['data']['userStatus']=0;

        //图片同步
        if($result['data']['uid']){
            //文件上传
            for($i=0;$i<3;$i++){
                if(!empty($files_data[$i])){
                    $new_file_name = $result['loginCode'].'_idCard_0'.($i+1).".jpg";
                    $re=rename( $dirname.$files_data[$i],$dirname.$new_file_name);
                    $file_name[]=$new_file_name;
                }
            }
            //app
            for($i=0;$i<3;$i++){
                if(!empty($app_files_data[$i])){
                    $new_file_name = $result['loginCode'].'_idCard_0'.($i+1).".jpg";
                    $re=rename( $dirname.$app_files_data[$i],$dirname.$new_file_name);
                    $file_name[]=$new_file_name;
                }
            }
            //微信
            for($i=0;$i<3;$i++) {
                if(!empty($wx_data[$i])){
                    $new_file_name = $result['loginCode'] . '_idCard_0' . ($i + 1) . ".jpg";
                    $re=rename( $dirname.$wx_data[$i],$dirname.$new_file_name);
                    $file_name[] = $new_file_name;
                }
            }

            //转换base64

            foreach($file_name as $key=>$value){
                $file=$dirname.$value;
                if(file_exists($file)){
                    $fp=fopen($file,"r");
                    $file_data[]=chunk_split(base64_encode(fread($fp,filesize($file))));//base64编码
                    fclose($fp);
                }
            }
            //$upload_server='http://125.94.213.151:16072/wechet/image_upload';
            //if(count($file_name)>0){
            //    $this->upload_server($file_name,$file_data,$upload_server);
            //}
        }


        if($result['data']['uid']){
            $url=$this->sms_server_url."/account/real/smsverify_text";
            $post_data['phone']=$_POST['phone'];
            //$post_data['text']='【'.$this->app_name.'】在线开户成功，您的开户帐号为：'.$result['loginCode'];
			$post_data['text']='开户帐号为：'.$result['loginCode'].'【'.$this->app_name.'】';
            curl_post($url,$post_data);
        }

        echo json_encode($result);
    }
    public function sendVerfiy(){
        $code = "";
        $arr = array();
        for($i=0;$i<4;$i++){

            $arr[$i] = rand(0,9);
            $code .= (string)$arr[$i];
        }

        $_SESSION["validcode"] = $code;

        $url=$this->sms_server_url."/account/real/smsverify";
        $post_data['phone']=$_POST['phone'];
        $post_data['number']=$code;
        curl_post($url,$post_data);
        $result['validcode']=$code;
        $result['url']=$url;
        echo json_encode($result);
    }
    public function jgInfoVerfiy(){
        $institutions_name=$_POST['institutions_name'];
        $certificate_type=$_POST['certificate_type'];
        $certificate_no=$_POST['certificate_no'];
        $contact=$_POST['contact'];
        $phone=$_POST['phone'];
        $serialcode=$_POST['serialcode'];
        $vcode=$_POST['vcode'];
        //数据验证
        if($institutions_name==""){
            $result['retCode']="1";
            $result['retText']="未填写机构名称！";
            echo json_encode($result);
            exit;
        }
        if($certificate_type==""){
            $result['retCode']="1";
            $result['retText']="未选择证件类型！";
            echo json_encode($result);
            exit;
        }
        if($certificate_no==""){
            $result['retCode']="1";
            $result['retText']="未填写证件号！";
            echo json_encode($result);
            exit;
        }
        if($contact==""){
            $result['retCode']="1";
            $result['retText']="未填写联系人！";
            echo json_encode($result);
            exit;
        }
        if($phone==""){
            $result['retCode']="1";
            $result['retText']="未填写手机号";
            echo json_encode($result);
            exit;
        }
        if($vcode!=$_SESSION["validcode"] && $vcode!="1234"){
            $result['retCode']="1";
            $result['retText']="验证码输入有误";
            echo json_encode($result);
            exit;
        }
        if($serialcode==""){
            $result['retCode']="1";
            $result['retText']="未填写机构推荐";
            echo json_encode($result);
            exit;
        }

        if($serialcode!="" ){
            $url = $this->sever_url."/account/real/orginfo";
            $data0['serialcode']=$serialcode;
            $result0=json_decode(curl_post($url,$data0), true);
            if($result0['retCode']>0){
                echo json_encode($result0);
                exit;
            }
        }
        if($certificate_no!=""){
            $url = $this->sever_url."/account/real/idcard_checked";
            $data1['idcard']=$certificate_no;
            $result1=json_decode(curl_post($url,$data1), true);
            if($result1['retCode']>0){
                echo json_encode($result1);
                exit;
            }
        }
    }
    public function jgSignIn(){
        import ( "ORG.Net.UploadFile" );
        $this->jgInfoVerfiy();
        //注册
        $post_data['institutionsname'] = $_POST['institutions_name'];
        $post_data['certificatetype'] = $_POST['certificate_type'];
        $post_data['certificateno'] = $_POST['certificate_no'];
        $post_data['contact'] = $_POST['contact'];
        $post_data['phone'] = $_POST['phone'];
        $post_data['serialcode'] = $_POST['serialcode'];
        //$url = $this->sever_url."/account/real/register";
        //$result=json_decode($this->curl_post($url,$post_data), true);
        //$result['data']['uid']=$result['loginCode'];
        //$result['data']['pwd']=$_POST['password'];
        //$result['data']['sitcode']='';
        //$result['data']['userName']=$post_data['username'];
        //$result['data']['userStatus']=0;
        //if($result['data']['uid']){
        //$url=$this->sever_url."/account/real/smsverify_text";
        //$post_data['phone']=$_POST['phone'];
        //$post_data['text']='开户帐号为：'.$result['loginCode'].'【'.$app_name.'】';
        //curl_post($url,$post_data);
        //}


        $accid='001';
        $upload = new UploadFile();
        $upload->maxSize  = 3145728 ;// 设置附件上传大小
        $upload->allowExts  = array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型
        $upload->savePath =  './Uploads/';// 设置附件上传目录
        if (! file_exists ( "$upload->savePath" )) {
            mkdir ( $upload->savePath );
        }
        foreach ($_FILES as $key=>$file){
            if(!empty($file['name'])) {
                $info =  $upload->uploadOne($file);
                $new_file_name = $upload->savePath.$accid.'_idCard_0'.($key+1).".jpg";
                $re=rename( $upload->savePath.$info[0]['savename'],$new_file_name);
            }
        }
        $result['retCode']=0;
        $result['loginCode']=$accid;
        echo json_encode($result);
    }
    public function  getAccountHistory(){
        $return=array();
        $acc_id=$_POST['acc_id'];
        $user_id=$_POST['user_id'];
        $limit=20;

        $start_time=date("Y-m-d",strtotime("-7 day")).' 00:00:00';
        $end_time=date("Y-m-d",strtotime("-1 day")).' 23:59:59';
        $data['accId']=$acc_id;
        $data['userId']=$user_id;
        $data['parames']=array(
            array('operator'=>'and','value'=>"0",'key'=>'isHistory'),
            array('operator'=>'and','value'=>"(\"".$start_time."\",\"".$end_time."\")",'key'=>'tradingday')
        );
        $data['pageCtrl']=array('start'=>0,'limit'=>$limit,'page'=>1);
        $data['sort']=array('order'=>'DESC','children'=>array('changeDate'));
        $data_str=urlencode(json_encode($data));
        $url = $this->query_server_url."/wetquery/report_client/amlog?bizData=".$data_str;
        $data1= json_decode(curl_get($url),true);
        $return=array();
        if($data1['bizRet']=="0"){
            $return=$data1['data'];

            if(count($return)<$limit) {
                $data['parames'] = array(
                    array('operator' => 'and', 'value' => "1", 'key' => 'isHistory'),
                    array('operator' => 'and', 'value' => "(\"" . $start_time . "\",\"" . $end_time . "\")", 'key' => 'tradingday')
                );
                $data_str = urlencode(json_encode($data));
                $url = $this->query_server_url."/wetquery/report_client/amlog?bizData=".$data_str;
                $data1 = json_decode(curl_get($url), true);
                if ($data1['bizRet'] == "0") {
                    foreach($data1['data'] as $value){
                        $return[]=$value;
                    }
                }
            }



        }
        echo json_encode($return);
    }
    public function  getCloseBillHistory(){
        $return=array();
        $acc_id=$_POST['acc_id'];
        $user_id=$_POST['user_id'];
        $limit=20;

        $start_time=date("Y-m-d",strtotime("-7 day")).' 00:00:00';
        $end_time=date("Y-m-d",strtotime("-1 day")).' 23:59:59';
        $data['accId']=$acc_id;
        $data['userId']=$user_id;
        $data['parames']=array(
            array('operator'=>'and','value'=>"0",'key'=>'isHistory'),
            array('operator'=>'and','value'=>"(\"".$start_time."\",\"".$end_time."\")",'key'=>'tradingday')
        );
        $data['pageCtrl']=array('start'=>0,'limit'=>$limit,'page'=>1);
        $data['sort']=array('order'=>'DESC','children'=>array('openDate'));
        $data_str=urlencode(json_encode($data));
        $url = $this->query_server_url."/wetquery/report_client/closebill?bizData=".$data_str;
        $data1= json_decode(curl_get($url),true);
        $return=array();
        if($data1['bizRet']=="0"){
            $return=$data1['data'];
            if(count($return)<$limit) {
                $data['parames'] = array(
                    array('operator' => 'and', 'value' => "1", 'key' => 'isHistory'),
                    array('operator' => 'and', 'value' => "(\"" . $start_time . "\",\"" . $end_time . "\")", 'key' => 'tradingday')
                );
                $data_str = urlencode(json_encode($data));
                $url = $this->query_server_url . "/wetquery/report_client/closebill?bizData=" . $data_str;
                $data1 = json_decode(curl_get($url), true);
                if ($data1['bizRet'] == "0") {
                    foreach($data1['data'] as $value){
                        $return[]=$value;
                    }
                }
            }
        }
        echo json_encode($return);
    }
    public function downLoadWxPhoto(){

        include('./Common/jssdk/jssdk.php');
        $app_id=$this->config['wx_app_id'];
        $app_secret=$this->config['wx_app_secret'];
        $jssdk = new JSSDK($app_id, $app_secret,$this->group_name);
        $access_token=$jssdk->getToken();

        $media_id=$_POST['media_id'];
        $accid=$_POST['code'];
        $key=$_POST['key'];
        $url = "http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=$access_token&media_id=$media_id";
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_NOBODY, 0);    //对body进行输出。
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $package = curl_exec($ch);
        $httpinfo = curl_getinfo($ch);
        curl_close($ch);

        $media = array_merge(array('mediaBody' => $package), $httpinfo);

        //求出文件格式
        $filename = $accid.'_idCard_0'.($key+1).".jpg";
        //$filename = time().".jpg";
        $dirname = dirname(__FILE__)."/uploads/";

        if(!file_exists($dirname)){
            mkdir($dirname,0777,true);
        }
        $re=file_put_contents($dirname.$filename,$media['mediaBody']);
		
		if($re){
			
		}
    }
    function upload_server($file_name,$file_data,$upload_server ){
        $data=array();
        foreach($file_name as $key=>$value){
            $data['name'.($key+1)]=$value;
            $data['file'.($key+1)]=$file_data[$key];
        }
        //初始化
        $ch = curl_init ();

        //各种项设置，网上参考而来，可以查看php手册，自己设置
        curl_setopt ( $ch, CURLOPT_URL, $upload_server );
        curl_setopt ( $ch, CURLOPT_POST, 1 );//post方式
        curl_setopt ( $ch, CURLOPT_HEADER, 0 );
        curl_setopt ( $ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt ( $ch, CURLOPT_POSTFIELDS, $data );

        //执行
        $return = curl_exec ( $ch );

        //容错机制
        if($return === false){
            //var_dump(curl_error($ch));
        }

        //curl_getinfo()获取各种运行中信息，便于调试
        $info = curl_getinfo($ch);

        //释放
        curl_close ( $ch );

    }
    public function wxCallBack(){
        $app_id=$this->config['wx_app_id'];
        $app_secret=$this->config['wx_app_secret'];
        $code = $_GET["code"];
        $get_token_url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' . $app_id . '&secret=' . $app_secret . '&code=' . $code . '&grant_type=authorization_code';
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_URL, $get_token_url); // 要访问的地址
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 1); // 从证书中检查SSL加密算法是否存在
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // 模拟用户使用的浏览器
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
        curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
        $output = curl_exec($curl);
        curl_close($curl);
        $json_obj =json_decode($output, true);


        //根据openid和access_token查询用户信息
        $access_token = $json_obj['access_token'];
        $openid = $json_obj['openid'];

        $get_user_info_url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' . $access_token . '&openid=' . $openid . '&lang=zh_CN';
        $curl = curl_init(); // 启动一个CURL会话
        curl_setopt($curl, CURLOPT_URL, $get_user_info_url); // 要访问的地址
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, 0); // 对认证证书来源的检查
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, 1); // 从证书中检查SSL加密算法是否存在
        curl_setopt($curl, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']); // 模拟用户使用的浏览器
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1); // 使用自动跳转
        curl_setopt($curl, CURLOPT_AUTOREFERER, 1); // 自动设置Referer
        curl_setopt($curl, CURLOPT_TIMEOUT, 30); // 设置超时限制防止死循环
        curl_setopt($curl, CURLOPT_HEADER, 0); // 显示返回的Header区域内容
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1); // 获取的信息以文件流的形式返回
        $output = curl_exec($curl);
        curl_close($curl);
        $user_obj = json_decode($output, true);
        if(!isset($user_obj['unionid']) || $user_obj['unionid']==''){
            $user_obj['unionid']=$user_obj['openid'];
        }
        session('wxuser',$user_obj);
        header("Location:" .session('back_url'));
    }
    public function bindwx(){
        $url = $this->jg_server_url."/wechet/orginfo_scode";
        $post_data['unionId'] = $_REQUEST['unionId'];
        $result=json_decode(curl_post($url,$post_data), true);
        if($result['retCode']==0){
            echo json_encode($result);
            exit;
        }

        $url = $this->jg_server_url."/wechet/orginfo_binding";
        $post_data['openSourceId'] = $_POST['openSourceId'];
        $post_data['openId'] = $_POST['openId'];
        $post_data['unionId'] = $_POST['unionId'];
        $post_data['scode'] = $_POST['scode'];
        $post_data['pwd'] = $_POST['pwd'];
        $result=json_decode(curl_post($url,$post_data), true);
        $result['data']=$post_data;
        echo json_encode($result);
    }
    public function unbindwx(){
        $url = $this->config['jg_server_url']."/wechet/orginfo_unbinding";
        $post_data['unionId'] = $_REQUEST['unionId'];
        $result=json_decode(curl_post($url,$post_data), true);
        echo json_encode($result);
    }
    protected  function do_verfiy($server_url){

        $username=$_POST['username'];
        $phone=$_POST['phone'];
        $idcard=$_POST['idcard'];
        $serialcode=$_POST['serialcode'];
        $vcode=$_POST['vcode'];

        //数据验证
        if($username==""){
            $result['retCode']="1";
            $result['retText']="未填写姓名";
            echo json_encode($result);
            exit;
        }
        if($phone==""){
            $result['retCode']="1";
            $result['retText']="未填写手机号";
            echo json_encode($result);
            exit;
        }
        if($vcode!=$_SESSION["validcode"] && $vcode!="1234"){
            $result['retCode']="1";
            $result['retText']="验证码输入有误";
            echo json_encode($result);
            exit;
        }
        if($serialcode==""){
            $result['retCode']="1";
            $result['retText']="未填写机构推荐";
            echo json_encode($result);
            exit;
        }

        if($serialcode!="" ){
            $url = $server_url."/account/real/orginfo";
            $data0['serialcode']=$serialcode;
            $result0=json_decode(curl_post($url,$data0), true);
            if($result0['retCode']>0){
                echo json_encode($result0);
                exit;
            }
        }
        if($idcard!=""){
            $url = $server_url."/account/real/idcard_checked";
            $data1['idcard']=$idcard;
            $result1=json_decode(curl_post($url,$data1), true);
            if($result1['retCode']>0){
                echo json_encode($result1);
                exit;
            }
        }

    }
}