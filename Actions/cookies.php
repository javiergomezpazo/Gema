<?php

function comprobarCookieBanner(){
    if (isset($_COOKIE['bannerCookies']) or comprobarSession()) {
        echo "true";
    }else{
        echo "false";
    }
}

function cerrarBanner(){
    if (!isset($_COOKIE['bannerCookies'])){
        setcookie('bannerCookies', "Banner Close", time() + 3600 * 80);
    }
    
}