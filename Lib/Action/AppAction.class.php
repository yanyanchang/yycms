<?php
class AppAction extends CommAction{
    public function news(){
        $this->display($this->theme_name.'/App-news');
    }
}