<?php
class EmptyAction extends Action{
    function _empty(){
        header("HTTP/1.0 404 Not Found");//使HTTP返回404状态码
        echo '404 页面不存在！';
        //$this->display("Public:404");
    }

    function index() {
        header("HTTP/1.0 404 Not Found");
        echo '404 页面不存在！';
        //$this->display("Public:404");
    }
}