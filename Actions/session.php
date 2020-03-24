<?php

/**
 * This file contains common functions used throughout the application.
 *
 * @package    Actions
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */

/**
 * Verify if user is connected
 *
 * @return boolean Return true or false
 */
function comprobarSession() {
    session_start();
    if (isset($_SESSION['user'])) {
        return true;
    } else {
        return false;
    }
}

/**
 * Verify if user is connected
 *
 * Return true if user is connected, else return false
 */
function comprobarSession_AJAX() {
    session_start();

    if (isset($_SESSION['user'])) {
        echo "true";
    } else {
        echo "false";
    }
}

/**
 * Session destroy
 */
function cerrarSession_AJAX() {
    session_start();
    $_SESSION = array();
    session_destroy(); // eliminar la sesion
    setcookie(session_name(), 123, time() - 1000);
}
