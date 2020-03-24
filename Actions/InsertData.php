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

use Clases\CentrosActividades\Instituciones as Instituciones;
use Clases\CentrosActividades\Empresa as Empresa;
use Clases\Socios as Socios;
use Clases\Responsable as Responsable;
use Clases\Alumno as Alumno;
use Clases\Bd as Bd;

require_once "Correo.php";

/**
 * Validate username and password
 *
 * @param string $username Partner username
 * @param string $password Partner password
 * @return boolean Return true or false
 */
function login($username, $password) {
    try {
        if (!comprobarSession()) {
            $bd = new Bd(3);
            if ($bd->getError() === true) {
                throw new PDOException("Se ha producido un error al conectarse a la base de datos.");
            } else {
                $statement = "SELECT password, rol, usuario, id_socio FROM socios WHERE usuario=:nombreUsuario";
                $param = array("nombreUsuario" => $username);

                $stmt = $bd->prepareQuery($statement, $param, 1);

                if ($stmt->rowCount() === 1) {
                    $data = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
                    var_dump($data);
                    if (password_verify($password, $data['password'])) {
                        return array('userName' => $data['usuario'], 'rol' => $data['rol'], 'id' => $data['id_socio']);
                    } else {
                        return false; //Contraseña incorrecta
                    }
                } else {
                    return false; //Usuario no existe
                }
            }
        }
    } catch (PDOException $pdoex) {
        echo $pdoex->getMessage();
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

/**
 * Sign up a partner and institution
 *
 * This method dont have parameter, because it is called by AJAX
 * 
 * @throws PDOException If a PDO object failed
 */
function signUp() {
    try {
        if (!comprobarSession()) {
            $bd = new Bd(3);
            if ($bd->getError() === true) {
                throw new PDOException("Se ha producido un error. Perdone las molestias");
            } else {
                $flag = true;
                $bd->startTransaction();
                $fecha_actual = new DateTime();
                $socio = new Socios("", $_POST['vat_socio'], password_hash($_POST['password_socio'], PASSWORD_DEFAULT), $_POST['usuario_socio'], $_POST['name_socio'], $_POST['email_socio'], $_POST['telephone_socio'], $_POST['cargo_socio'], $_POST['departamento_socio'], null, null, null, $_POST['pais_socio'], 2, $fecha_actual->format("Y-m-d H:i:s"));
                if ($socio->insertar($bd) === false) {
                    $flag = false;
                } else {
                    $id_socio = $bd->getPdo()->lastInsertId();

                    if ($bd->query("INSERT INTO historico_puntuaciones(FECHA, TIPO_PUNTUACION, SOCIO) VALUES ('" . $fecha_actual->format("Y-m-d H:i:s") . "', '5', '" . $id_socio . "')") !== false) {

                        $institucion = new Instituciones("", $_POST['vat_institucion'], $_POST['name_institucion'], $_POST['email_institucion'], $_POST['telephone_institucion'], $_POST['direccion_institucion'], $_POST['codigo_postal_institucion'], $_POST['web_institucion'], $_POST['pais_institucion'], $id_socio, $_POST['tipo_institucion'], $_POST['description_institucion'], $fecha_actual->format("Y-m-d H:i:s"));
                        if ($institucion->insertar($bd) === false) {
                            $flag = false;
                        } else {
                            $id_institucion = $bd->getPdo()->lastInsertId();
                            if ($bd->query("UPDATE socios SET institucion=$id_institucion where id_socio=$id_socio") !== false) {

                                if (enviar_correo($_POST['email_socio'], "Welcome to Gema," . $_POST['usuario_socio'] . "

You’re the newest member in this web site of over thousend institution who use Gema to have movility in the foraign country. Thanks for signing in our web site!", "Welcome to Gema") !== true) {

                                    $flag = false;
                                }
                            } else {
                                $flag = false;
                            }
                        }
                    } else {
                        $flag = false;
                    }
                }
                if ($flag === false) {
                    echo 52;
                    $bd->getPdo()->rollBack();
                } else {
                    $bd->getPdo()->commit();
                    echo 2;
                }
            }
        }
    } catch (PDOException $pdoEx) {
        echo 5;
        $bd->getPdo()->rollBack();
        $pdoEx->getMessage();
    } catch (Exception $ex) {
        echo 7;
        $bd->getPdo()->rollBack();
        $eEx->getMessage();
    } finally {
        unset($bd);
    }
}

/**
 * Sign up a business or  student
 *
 * This method dont have parameter, because it is called by AJAX
 * 
 * @throws PDOException If a PDO object failed
 */
function alta() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
            $flag = true;
            echo 3;
            if ($bd->getError() === false) {
                $date = new DateTime();
                echo 5;
                $bd->startTransaction();
                if ($_POST['class'] == "Empresa") {

                    echo $_POST['email_reponsble'];
                    $responsable = new Responsable("", $_POST['name_reponsble'], $_POST['email_reponsble'], $_POST['telephone_reponsble']);
                    if ($responsable->insertar($bd) === false) {
                        $flag = false;
                    } else {
                        echo 6;
                        $empresa = new Empresa("", $_POST['empresa_vat'], $_POST['empresa_name'], $_POST['empresa_email'], $_POST['empresa_telephone'], $_POST['empresa_direccion'], $_POST['empresa_codigo_postal'], $_POST['empresa_web'], $_POST['empresa_pais'], $_SESSION['user']['id'], $_POST['empresa_tipo'], $_POST['empresa_description'], $date->format("Y-m-d H:i:s"), $responsable->id, $_POST['cargo_responsable_empresa']);
                        if ($empresa->insertar($bd) === false) {
                            $flag = false;
                        } else {
                            if ($bd->query("INSERT INTO historico_puntuaciones(FECHA, TIPO_PUNTUACION, SOCIO) VALUES ('" . $date->format("Y-m-d H:i:s") . "', '3', '" . $_SESSION['user']['id'] . "')") === false) {
                                $flag = false;
                            }
                        }
                    }
                } else {
                    echo $_POST['genero_alumno'];
                    $alumno = new Alumno("", $_POST['vat_alumno'], $_POST['name_alumno'], $_POST['genero_alumno'], $_POST['fecha_nacimiento_alumno'], $date->format("Y-m-d H:i:s"), $_SESSION['user']['id']);
                    if ($alumno->insertar($bd) === false) {
                        $flag = false;
                    }
                }
                if (!$flag) {
                    throw new PDOException("Se ha producido un error");
                } else {
                    $bd->getPdo()->commit();

                    echo 1;
                }
            }
        }
    } catch (PDOException $pdoex) {
        $bd->getPdo()->rollBack();
        echo $pdoex->getMessage();
    } finally {
        unset($bd);
    }
}

/**
 * Sign up a movility between student and business or institution
 *
 * This method dont have parameter, because it is called by AJAX
 * 
 * @throws PDOException If a PDO object failed
 * @throws Exception If student have a movility in this moment
 */
function movilidades() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
            $flag = true;
            if ($bd->getError() === false) {
                $bd->startTransaction();
                echo $_POST['r_alojamiento'];
                $date = new DateTime();
                $puntuacion_socio = $bd->query("SELECT puntuacion FROM socios WHERE id_socio=" . $_SESSION['user']['id'])->fetchAll(PDO::FETCH_ASSOC);
                $deficit = $bd->query("SELECT valor FROM tipos_puntuacion WHERE id_tipo_puntuacion=1")->fetchAll(PDO::FETCH_ASSOC);
                $puntuacion_movilidad = $bd->query("SELECT valor FROM tipos_puntuacion WHERE id_tipo_puntuacion=5")->fetchAll(PDO::FETCH_ASSOC);

                if (($puntuacion_socio[0]['puntuacion'] + $puntuacion_movilidad[0]['valor']) > $deficit[0]['valor']) {
                    if ($_POST['institucion'] == "Empresa") {
                        $institucion = "movilidades_empresas";
                        $institucion_name = $_POST['business_name'];
                        $param_name = "EMPRESA";
                    } else {
                        $institucion = "movilidades_instituciones";
                        $institucion_name = $_POST['institution_name'];
                        $param_name = "INSTITUCION";
                    }
                    $fecha_actual = strtotime(date("Y-m-d"));
                    $stmt = $bd->query("SELECT FECHA_FIN_ESTIMADO, (SELECT mi.FECHA_FIN_ESTIMADO FROM movilidades_instituciones as mi WHERE mi.alumno=" . $_POST['alumno'] . " ORDER BY mi.ID_MOVILIDAD DESC LIMIT 1) as FECHA_FIN_ESTIMADO_MI FROM movilidades_empresas WHERE alumno=" . $_POST['alumno'] . " ORDER BY ID_MOVILIDAD DESC LIMIT 1 ")->fetchAll(PDO::FETCH_ASSOC);
                    var_dump($stmt);

                    if (isset($stmt[0]['FECHA_FIN_ESTIMADO']) OR isset($stmt[0]['FECHA_FIN_ESTIMADO_MI'])) {
                        if (isset($stmt[0]['FECHA_FIN_ESTIMADO']) && isset($stmt[0]['FECHA_FIN_ESTIMADO_MI'])) {
                            $fecha_entrada = strtotime($stmt[0]['FECHA_FIN_ESTIMADO']);
                            $fecha_entrada_mi = strtotime($stmt[0]['FECHA_FIN_ESTIMADO_MI']);
                            if ($fecha_actual > $fecha_entrada && $fecha_actual > $fecha_entrada_mi) {
                                $aux = true;
                            } else {
                                $aux = false;
                            }
                        } else {
                            if (isset($stmt[0]['FECHA_FIN_ESTIMADO_MI'])) {
                                if ($fecha_actual > strtotime($stmt[0]['FECHA_FIN_ESTIMADO_MI'])) {
                                    $aux = true;
                                } else {
                                    $aux = false;
                                }
                            } else {
                                if (isset($stmt[0]['FECHA_FIN_ESTIMADO'])) {
                                    if ($fecha_actual > strtotime($stmt[0]['FECHA_FIN_ESTIMADO'])) {
                                        $aux = true;
                                    } else {
                                        $aux = false;
                                    }
                                }
                            }
                        }
                    } else {
                        echo 2;
                        $aux = true;
                    }
                    if ($aux) {
                        $param = array("fecha_inicio" => $_POST['fecha_inicio'], "fecha_fin_estimado" => $_POST['fecha_fin'], "fecha_alta" => $date->format("Y-m-d H:i:s"), "institucion" => $institucion_name, "alumno" => $_POST['alumno']);
                        if (!$bd->prepareQuery("INSERT INTO $institucion( FECHA_INICIO, FECHA_FIN_ESTIMADO, FECHA_ALTA, $param_name, ALUMNO) VALUES (:fecha_inicio,:fecha_fin_estimado,:fecha_alta,:institucion,:alumno)", $param)) {
                            $flag = false;
                        } else {
                            if ($bd->query("INSERT INTO historico_puntuaciones(FECHA, TIPO_PUNTUACION, SOCIO) VALUES ('" . $date->format("Y-m-d H:i:s") . "', '5', '" . $_SESSION['user']['id'] . "')") !== false) {
                                if ($_POST['r_alojamiento'] == "true") {
                                    if ($bd->query("INSERT INTO historico_puntuaciones(FECHA, TIPO_PUNTUACION, SOCIO) VALUES ('" . $date->format("Y-m-d H:i:s") . "', '4', '" . $_SESSION['user']['id'] . "')") === false) {

                                        $flag = false;
                                    }
                                }
                            } else {
                                $flag = false;
                                echo 3;
                            }
                        }
                    } else {
                        throw new Exception("El alumno en dichas fechas ya se ecunetra realizando unas practicas.");
                    }
                } else {
                    throw new Exception("Puntos insuficintes.");
                }

                if (!$flag) {
                    throw new PDOException("Se ha producido un error");
                } else {
                    $bd->getPdo()->commit();

                    echo 112;
                }
            }
        }
    } catch (PDOException $pdoex) {
        $bd->getPdo()->rollBack();
        echo $pdoex->getMessage();
        echo "false";
    } catch (Exception $ex) {
        $bd->getPdo()->rollBack();
        echo $ex->getMessage();
        echo "false";
    } finally {
        unset($bd);
    }
}

/**
 * Update partner
 *
 * This method dont have parameter, because it is called by AJAX
 */
function updateSocio() {
    try {
        if (comprobarSession()) {
            $date = new DateTime();
            $bd = new Bd($_SESSION['user']['rol']);
            $stmt = $bd->query('SELECT id_socio, vat, password, usuario, nombre_completo, email, telefono,cargo, departamento, r_alojamiento, puntuacion,institucion, pais, rol, fecha_modificacion, fecha_alta, fecha_baja  FROM socios where id_socio=' . $_SESSION['user']['id'])->fetchAll(PDO::FETCH_ASSOC)[0];
            $socio = new Socios($stmt['id_socio'], $stmt['vat'], $stmt['password'], $stmt['usuario'], $stmt['nombre_completo'], $stmt['email'], $stmt['telefono'], $stmt['cargo'], $stmt['departamento'], $stmt['r_alojamiento'], $stmt['puntuacion'], $stmt['institucion'], $stmt['pais'], $stmt['rol'], $stmt['fecha_modificacion'], $stmt['fecha_alta']);

            $param = array("nombre_completo" => $_POST['name_socio'], "telefono" => $_POST['telephone_socio'], "cargo" => $_POST['cargo_socio'], "departamento" => $_POST['departamento_socio'], "fecha_modificacion" => $date->format("Y-m-d H:i:s"));

            if ($socio->actualizar($bd, $param) === true) {
                echo "true";
            } else {
                echo "false";
            }
        }
    } catch (PDOException $pdoex) {
        echo $pdoex->getMessage();
        echo "false";
    } catch (Exception $ex) {
        echo $ex->getMessage();
        echo "false";
    } finally {
        unset($bd);
    }
}

/* Peticones */

/**
 * Sign up a request
 *
 * This method dont have parameter, because it is called by AJAX
 * 
 * @throws PDOException If a PDO object failed
 */
function insertRequest() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
            $flag = true;
            if ($bd->getError() === false) {
                $bd->startTransaction();
                $date = new DateTime();
                $param = array("asunto" => $_POST['asunto'], "descripcion" => $_POST['cuerpo'], "fecha" => $date->format("Y-m-d H:i:s"), "estado" => 1, "socio_emisor" => $_SESSION['user']['id'], "socio_receptor" => 1);
                if ($bd->prepareQuery("INSERT INTO `historico_peticiones`(`ASUNTO`, `DESCRIPCION`, `FECHA`, `ESTADO`, `SOCIO_EMISOR`, `SOCIO_RECEPTOR`) VALUES (:asunto,:descripcion,:fecha,:estado,:socio_emisor,:socio_receptor)", $param) !== false) {
                    $stmt = $bd->query("SELECT `EMAIL` FROM `socios` WHERE id_socio=1 ");
                    if ($stmt !== false) {
                        $stmt->execute();
                        $email = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];

                        if (enviar_correo($email['EMAIL'], "User with id: " . $_SESSION['user']['id'] . " " . $_POST['cuerpo'], "New request") !== true) {

                            $flag = false;
                        }
                    } else {
                        $flag = false;
                    }
                } else {
                    $flag = false;
                }

                if (!$flag) {
                    throw new PDOException("Se ha producido un error");
                } else {
                    $bd->getPdo()->commit();
                    echo 112;
                }
            }
        }
    } catch (PDOException $pdoex) {
        $bd->getPdo()->rollBack();
        echo $pdoex->getMessage();
    } catch (Exception $ex) {
        $bd->getPdo()->rollBack();
        echo $ex->getMessage();
    } finally {
        unset($bd);
    }
}

/**
 * Update status request
 *
 * This method dont have parameter, because it is called by AJAX
 */
function updateStatus() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
            $flag = true;
            if ($bd->getError() === false) {
                if ($bd->prepareQuery("UPDATE `historico_peticiones` SET `ESTADO`=:estado WHERE ID_PETICION=" . $_POST['id'], array("estado" => $_POST['estado'])) !== false) {
                    echo "true";
                } else {
                    echo "false";
                }
            }
        }
    } catch (PDOException $pdoex) {
        echo $pdoex->getMessage();
    } catch (Exception $ex) {
        echo $ex->getMessage();
    } finally {
        unset($bd);
    }
}
