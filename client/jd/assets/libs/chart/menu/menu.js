/**
 * Created by he.zhiyi on 15/2/2.
 */
var timeout         = 500;
var closetimer		= 0;
var ddmenuitem      = 0;

// open hidden layer
function mopen(id)
{
    // cancel close timer
    mcancelclosetime();

    // close old layer
    if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';

    // get new layer and show it
    ddmenuitem = document.getElementById(id);
    ddmenuitem.style.visibility = 'visible';

}
// close showed layer
function mclose()
{
    if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';
}

// go close timer
function mclosetime()
{
    closetimer = window.setTimeout(mclose, timeout);
}

// cancel close timer
function mcancelclosetime()
{
    if(closetimer)
    {
        window.clearTimeout(closetimer);
        closetimer = null;
    }
}

function onMenuItemClick(key) {
    // console.log(key) ;
    var url = 'chart.html?chartStyle=0&symbolCode={#symbolCode}&period=4&theme=white&interval=5' ;
    var o = document.getElementById('frame_01') ;
    url = url.replace('{#symbolCode}',key) ;
    o.src = url ;

    url = 'chart.html?chartStyle=1&symbolCode={#symbolCode}&period=9&theme=white' ;
    o = document.getElementById('frame_02') ;
    url = url.replace('{#symbolCode}',key) ;
    o.src = url ;

}
