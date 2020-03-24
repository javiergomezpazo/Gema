<?php

/**
 * This file contains common functions used throughout the application.
 *
 * @package    Actions
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */

spl_autoload_register(function ($class) {
    include "" . $class . '.php';
});

use Clases\Bd as Bd;

/**
 * Verify data that user write in form
 */
function comprobarDatosUsuario() {
    try {
       if($_POST['vat_socio'] == ""){
            $aux = null;
        }else{
            $aux=$_POST['vat_socio'];
        }
    $bd = new Bd(3);
    if ($bd->getError() === true) {
        
    } else {
        $stmt = $bd->query("SELECT * FROM socios WHERE usuario='" . $_POST['usuario_socio'] . "' OR email='" . $_POST['email_socio'] . "' OR vat='" . $aux."'");
        
        if ($stmt !== false) {
            if($stmt->rowCount()<1){
                echo "true";
            }else{
                echo "false";
            }
        } else {
            echo "Error";
        }
    }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}
