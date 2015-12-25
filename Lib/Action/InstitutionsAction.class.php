<?php
require_once "./Common/phpqrcode/phpqrcode.php";
class InstitutionsAction extends CommAction {
    public function index(){
        $this->display($this->theme_name.'/Institutions-index');
    }
    public function signin(){
        $this->display($this->theme_name.'/Institutions-signin');
    }
    public function qrcode(){
        if(!session('?wxuser')){
            $app_id=$this->config['wx_app_id'];
            $app_secret=$this->config['wx_app_secret'];
            $app_url=$this->config['app_url'];
            $redirect_uri = $app_url.'/Server/wxCallBack/g/'.$this->group_name ;
            $scope='snsapi_userinfo';
            $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $app_id . '&redirect_uri=' . $redirect_uri . '&response_type=code&scope='.$scope.'&status=1#wechat_redirect';
            session('back_url',$this->config['app_url'].'/Institutions/qrcode/g/'.$this->group_name);
            header("Location:" . $url);
        }else{
            session('back_url',null);
        }
        $this->user_obj=session('wxuser');
        if($this->user_obj['errcode']){
            echo $this->user_obj['errmsg'];
            exit;
        }

        $user_obj=$_SESSION["wxuser"];
        $url3 = $this->config['jg_server_url']."/wechet/orginfo_scode";
        $post_data3['unionId'] = $user_obj['unionid'];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url3);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data3);
        $output = curl_exec($ch);
        curl_close($ch);
        $output=json_decode($output, true);

        if($output['retCode']==0){
            $sc=$output['orgSequence'];

            include('./Common/jssdk/jssdk.php');
            $app_id=$this->config['wx_app_id'];
            $app_secret=$this->config['wx_app_secret'];
            $jssdk = new JSSDK($app_id, $app_secret);
            $this->signPackage =$jssdk->GetSignPackage();
        }else{
            $sc='';
        }
        $this->assign('sc',$sc);
        $this->display($this->theme_name.'/Institutions-qrcode');
    }
    public function unbind(){

        if(!session('?wxuser')){
            $app_id=$this->config['wx_app_id'];
            $app_secret=$this->config['wx_app_secret'];
            $app_url=$this->config['app_url'];
            $redirect_uri = $app_url.'/Server/wxCallBack/g/'.$this->group_name ;
            $scope='snsapi_userinfo';
            $url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' . $app_id . '&redirect_uri=' . $redirect_uri . '&response_type=code&scope='.$scope.'&status=1#wechat_redirect';
            session('back_url',$this->config['app_url'].'/Institutions/unbind/g/'.$this->group_name);
            header("Location:" . $url);
        }else{
            session('back_url',null);
        }
        $this->user_obj=session('wxuser');
        if($this->user_obj['errcode']){
            echo $this->user_obj['errmsg'];
            exit;
        }

        $user_obj=$_SESSION["wxuser"];
        $url3 = $this->config['jg_server_url']."/wechet/orginfo_scode";
        $post_data3['unionId'] = $user_obj['unionid'];
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url3);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post_data3);
        $output = curl_exec($ch);
        curl_close($ch);
        $output=json_decode($output, true);

        if($output['retCode']==0){
            $sc=$output['orgSequence'];

            include('./Common/jssdk/jssdk.php');
            $app_id=$this->config['wx_app_id'];
            $app_secret=$this->config['wx_app_secret'];
            $jssdk = new JSSDK($app_id, $app_secret);
            $this->signPackage =$jssdk->GetSignPackage();
        }else{
            $sc='';
        }
        $this->assign('sc',$sc);

        $this->display($this->theme_name.'/Institutions-qrcode');
    }


    public function simpleqrcode(){
        ob_end_clean();
        $data=$_GET['data'];
        $size=$_GET['size'];
        if(empty($data)) exit;
        // 纠错级别：L、M、Q、H
        $level = 'L';
        // 点的大小：1到10,用于手机端4就可以了
        if($_GET['size']){
            $size = $size;
        }else{
            $size = 10;
        }
        // 下面注释了把二维码图片保存到本地的代码,如果要保存图片,用$fileName替换第二个参数false
        $margin=1;
        // 生成的文件名
        QRcode::png($data, false, $level, $size,$margin);
    }

    public function logoqrcode(){
        ob_end_clean();
        $key=$_GET['key'];
        if($key == FALSE){
            $key=time();
        }
        $data=$_GET['data'];
        $size=$_GET['size'];
        if(empty($data)) exit;
        $errorCorrectionLevel = 'L';//容错级别
        $matrixPointSize = 6;//生成图片大小

        $path= "./Runtime/";
        $outname=$path.$key.'.png';
        // 生成的文件名
        QRcode::png($data, $outname, $errorCorrectionLevel, $matrixPointSize,2);

        if(empty($this->config['logo'])){
            $logo = './client/logo/qrlogo.png';//logo图片
        }else{
            $logo = './client/logo/'.$this->config['logo'];//logo图片
        }

        $QR = $outname;//原始二维码图

        if ($logo !== FALSE) {
            $QR = imagecreatefromstring(file_get_contents($QR));
            $logo = imagecreatefromstring(file_get_contents($logo));
            $QR_width = imagesx($QR);//二维码图片宽度
            $QR_height = imagesy($QR);//二维码图片高度
            $logo_width = imagesx($logo);//logo图片宽度
            $logo_height = imagesy($logo);//logo图片高度
            $logo_qr_width = $QR_width / 6;
            $scale = $logo_width/$logo_qr_width;
            $logo_qr_height = $logo_height/$scale;
            $from_width = ($QR_width - $logo_qr_width) / 2;
            //重新组合图片并调整大小
            imagecopyresampled($QR, $logo, $from_width, $from_width, 0, 0, $logo_qr_width, $logo_qr_height, $logo_width, $logo_height);
        }
        //输出图片
        Header("Content-type: image/png");
        ImagePng($QR);
    }
}