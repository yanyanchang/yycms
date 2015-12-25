<?php
class WpAction extends CommAction {
    public function index(){
		if($this->config['dealerId']){
			$data['dealerId']=$this->config['dealerId'];
		}
        if($_GET['g']=='0198sbl'){
			$data['kf']=$_GET['g'];
		}
		if(count($data)>0){
			$url=str_ireplace('/index.php','',$this->config['app_url']).'jdWPT/html5/jdWP.php?'.http_build_query($data);
		}else{
			$url=str_ireplace('/index.php','',$this->config['app_url']).'jdWPT/html5/jdWP.php';
		}
        header("Location:" . $url);
        //$this->display($this->theme_name.'/Wp-index');
    }
    public function register(){
        include('./Common/jssdk/jssdk.php');
        $app_id=$this->config['wx_app_id'];
        $app_secret=$this->config['wx_app_secret'];
        $jssdk = new JSSDK($app_id, $app_secret,$this->group_name);
        $this->signPackage =$jssdk->GetSignPackage();

        $this->display($this->theme_name.'/Wp-register');
    }
	 public function register2(){
        include('./Common/jssdk/jssdk.php');
        $app_id=$this->config['wx_app_id'];
        $app_secret=$this->config['wx_app_secret'];
        $jssdk = new JSSDK($app_id, $app_secret,$this->group_name);
        $this->signPackage =$jssdk->GetSignPackage();

        $this->display($this->theme_name.'/Wp-register2');
    }
}