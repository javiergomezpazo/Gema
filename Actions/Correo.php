<?php

/**
 * This file contains common functions used throughout the application.
 *
 * @package    Actions
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */

use PHPMailer\PHPMailer\PHPMailer;

require_once 'vendor/autoload.php';


/**
 * Send email to partner
 *
 * @param string $correo Partner email 
 * @param string $cuerpo User email
 * @param string $asunto A valid PDO object
 * @return boolean|string Returns If it fail return a string with error info, else it return true
 */
function enviar_correo($correo, $cuerpo, $asunto = "") {
    $res = leer_configCorreo();
    $mail = new PHPMailer();
    $mail->IsSMTP();
    
    $mail->SMTPDebug = 0;  // cambiar a 1 o 2 para ver errores
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
    $mail->Host = "smtp.gmail.com";
    $mail->Port = 587;
    $mail->Username = $res[0];  //usuario de gmail
    $mail->Password = $res[1]; //contraseña de gmail          
    $mail->SetFrom('myemail@gmail.com',"Gema");
    $mail->Subject = $asunto;
    $mail->MsgHTML($cuerpo);
    $mail->AddAddress($correo);
    if (!$mail->Send()) {
        return $mail->ErrorInfo;
    } else {
        return TRUE;
    }
}

/**
 * Load config to send an email
 *
 * @throws InvalidArgumentException If correo.xml not validated with correo.xsd
 * @return array Returns an array with username and password
 */
function leer_configCorreo() {
    $nombre = "config/correo.xml";
    $esquema = "config/correo.xsd";
    $config = new \DOMDocument();
    $config->load($nombre);
    $res = $config->schemaValidate($esquema);
    if ($res === FALSE) {
        throw new InvalidArgumentException("Revise fichero de configuración");
    }
    $datos = simplexml_load_file($nombre);
    $usu = $datos->xpath("//usuario");
    $clave = $datos->xpath("//clave");
    $resul = [];
    $resul[] = $usu[0];
    $resul[] = $clave[0];
    return $resul;
}
