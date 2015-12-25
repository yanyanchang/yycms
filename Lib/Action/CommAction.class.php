<?php
class CommAction extends Action{
    public $group_name;
    public $theme_name;
    public $config;
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
        if($this->group_name){
            $this->config=C($this->group_name);
            if(isset($this->config)){
                $this->theme_name=$this->config['theme'];
                $this->assign($this->config);
            }
        }
        
		session('group_name',$this->group_name);
		
        if(empty($this->config)){
            echo '服务未开通！';
            exit;
        }
    }
}