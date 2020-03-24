<?php
/**
 * This file contains common functions used throughout the application.
 *
 * @package    Actions
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */

/**
 * Validate if the user have close banner cookies
 *
 * Return between AJAX, true or false
 * 
 */
function comprobarCookieBanner(){
    if (isset($_COOKIE['bannerCookies']) or comprobarSession()) {
        echo "true";
    }else{
        echo "false";
    }
}

/**
 * Create cookies "bannerCookies"
 * 
 */
function cerrarBanner(){
    if (!isset($_COOKIE['bannerCookies'])){
        setcookie('bannerCookies', "Banner Close", time() + 3600 * 80);
    }
    
}