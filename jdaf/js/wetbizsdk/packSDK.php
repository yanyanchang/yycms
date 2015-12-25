<?php
/**
 * Created by PhpStorm.
 * User: he.zhiyi
 * Date: 15/7/29
 * Time: 下午7:54
 */

/**
 * @brief       取文件后缀
 * @param $file
 * @return string
 */
function getFileExt($file)
{
    $sTmp = split("[.]",$file);
    $iSection = count($sTmp) - 1;

    if ($iSection >= 1 && strlen($sTmp[$iSection]) <= 5) {
        // 分出至少有两个段，且最后一段的内容长度不超过4位字符
        return $sTmp[$iSection] ;
    }else{
        return '' ;
    }
}

/**
 * @brief           排除指定的文件或文件夹
 * @param $str
 * @return bool|int
 */
function scanFilter($str)
{
    // $filter = 'ext,ux,ChartJS' ;
    $filter = 'ext,ux,UglifyJS2,wetbizsdk.min,' ;
    $sTmp   = explode(",",$filter) ;
    $iCnt   = count($sTmp) - 1 ;

    // echo ($str . "<br>") ;

    $bRet = false ;
    for ( $i=0; $i<$iCnt; $i++ )
    {
        $bRet = strpos($str,'/' . $sTmp[$i] ) ;

        if ($bRet) {
            // echo 'Find It' ;
            break ;
        }
    }

    return $bRet ;

}

/**
 * @brief       扫描目录，合并目录下的 JS 文件
 * @param $src
 */
function scanSrc($src)
{
//	echo($src . '<br>') ;

    $files = scandir($src);
    $iCnt  = count($files);

    global $log ;
    global $fnAllSrc ;
    global $crlf ;
    global $js_src ;
    global $sp_line ;

    global $arrDefine ;
    global $KEYs ;
    global $arrVALs ;


    for ( $i=0; $i<$iCnt; $i++ )
    {
        $tmpFilename = $files[$i] ;

        if (is_dir($src.'/'.$files[$i]))
        {// 当前是目录类型的，则递归调用遍历该目录
            if ( $files[$i]!='.'
                && $files[$i]!='..'
                && substr($files[$i],0,1)!='.'
                && substr($files[$i],0,6)!='modal'
                && substr($files[$i],0,6)!='locale'
                && substr($files[$i],0,6)!='backup'
                && substr($files[$i],0,4)!='ext-'
            )
            {
                // 排除以上特定目录，如果不是则开始递归
                scanSrc($src.'/'.$files[$i]) ;

            }
        } else {
            $srcFn = $src . '/' . $tmpFilename ;
			// $tagFn = str_replace('src','target',$srcFn) ;

            if ( substr( $tmpFilename, 0, strlen($fnAllSrc) ) != $fnAllSrc )
            {
                // 跳过处理 wetbizsdk-all_src 这个文件
                $ext   = strtolower(getFileExt($files[$i])) ;
                if ( $ext=='js' && !scanFilter($srcFn) )
                {
                    echo('--------'. $srcFn . '<br>') ;
                    $fileContent = file_get_contents($srcFn) . $crlf . $sp_line . $crlf;
                    $js_src     .= $fileContent ;

                }

            }

        }
    }

}

// =================================================================
//  Start Here
// =================================================================


$log       = '' ;                // 日志信息
$sDir      = realpath('.') ;    // 获取代码文件目录
$fnAllSrc  = 'wetbizsdk-all_src.js' ;
$cr        = chr(0x0d) ;
$lf        = chr(0x0a) ;
$crlf      = chr(0x0d) . chr(0x0a) ;

$js_src    = '' ;
$sp_line   = '// -----------------------------------------------------------------------------' ;

// 开始遍历目标路径
scanSrc($sDir) ;

// 输出合并文件
$srcRoot   = realpath('..') ;
$fnAll_src = $srcRoot . '/sdk/' . $fnAllSrc ;

file_put_contents( $fnAll_src, $js_src ) ;

?>