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

/* Envio de informacion para form movilidades */

/**
 * Get business
 *
 * This method send array businnes like JSON
 * 
 * @throws Exception  If a PDO object failed
 */
function getEmpresas() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
            if ($bd->getError() === false) {
                $stmt = $bd->query("SELECT id_empresa, nombre FROM empresas");
                if ($stmt === false) {
                    throw new Exception("Se ha producido un error.");
                } else {
                    $empresa = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $array_utf8 = utf8Convert($empresa);
                    echo(json_encode($array_utf8));
                }
            } else {
                throw new Exception("Se ha producido un error.");
            }
        }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

/**
 * Get institution
 *
 * This method send array institution like JSON
 * 
 * @throws Exception  If a PDO object failed
 */
function getInstituciones() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
            if ($bd->getError() === false) {
                $stmt = $bd->query("SELECT id_institucion, nombre FROM instituciones");
                if ($stmt === false) {
                    throw new Exception("Se ha producido un error.");
                } else {
                    $institucion = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $array_utf8 = utf8Convert($institucion);
                    echo(json_encode($array_utf8));
                }
            } else {
                throw new Exception("Se ha producido un error.");
            }
        }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

/**
 * Get student
 *
 * This method send array student like JSON
 * 
 * @throws Exception  If a PDO object failed
 */
function getAlumnos() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
            if ($bd->getError() === false) {
                $stmt = $bd->query("SELECT id_alumno, NOMBRE_COMPLETO FROM alumnos WHERE socio=" . $_SESSION['user']['id']);
                if ($stmt === false) {
                    throw new Exception("Se ha producido un error.");
                } else {
                    $alumno = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $array_utf8 = utf8Convert($alumno);
                    echo(json_encode($array_utf8));
                }
            } else {
                throw new Exception("Se ha producido un error.");
            }
        }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

/**
 * Get business
 *
 * This method send array business like JSON
 * 
 * @throws Exception  If a PDO object failed
 */
function utf8Convert($array) {
    if (array_walk_recursive($array, function (&$item, $key) {
                if (!mb_detect_encoding($item)) {
                    $item = utf8_encode($item);
                }
            })) {
        return $array;
    } else {
        return false;
    }
}

/* * **************************************************************** */

/* Paises Tipo_Institucion */

/**
 * Get country
 *
 * This method send array country like JSON
 */
function getPaises() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
        } else {
            $bd = new Bd(3);
        }
        if ($bd->getError() === true) {
            
        } else {
            $stmt = $bd->query("SELECT nombre, id_pais FROM paises");
            if ($stmt === false) {
                
            } else {
                $paises = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $array_utf8 = utf8Convert($paises);
                echo(json_encode($array_utf8));
            }
        }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

/**
 * Get type of institution
 *
 * This method send array type of institution like JSON
 */
function getTipo_Institucion() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
        } else {
            $bd = new Bd(3);
        }
        if ($bd->getError() === true) {
            
        } else {
            $stmt = $bd->query("SELECT tipo, ID_TIPO_INSTITUCION FROM tipos_institucion");
            if ($stmt === false) {
                
            } else {
                $tipos = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $array_utf8 = utf8Convert($tipos);
                echo(json_encode($array_utf8));
            }
        }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

/* * ****************************************************************** */

/* Socio */

/**
 * Get partner
 *
 * This method send array partner like JSON, and used in profile.
 */
function getSocioProfile() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);

            if ($bd->getError() === true) {
                
            } else {
                $stmt = $bd->query("SELECT `ID_SOCIO`, s.VAT as vat_socio, `USUARIO`, `NOMBRE_COMPLETO` as nombre_socio, s.EMAIL as email_socio, s.TELEFONO as telefono_socio, `CARGO`, `DEPARTAMENTO`, `PUNTUACION`, `ROL`, i.ID_INSTITUCION, i.NOMBRE as nombre_institucion, i.EMAIL as email_institucion, i.TELEFONO as telefono_institucion, i.CODIGO_POSTAL, i.DIRECCION, i.WEB, i.PAIS as pais_institucion, i.TIPO, i.DESCRIPCION, s.PAIS as pais_socio FROM `socios` as s INNER JOIN instituciones as i ON i.id_institucion = institucion WHERE id_socio=" . $_SESSION['user']['id']);
                if ($stmt === false) {
                    
                } else {
                    $tipos = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $array_utf8 = utf8Convert($tipos);
                    echo(json_encode($array_utf8));
                }
            }
        }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

/* Mensajes */

/**
 * Get a partner messages
 *
 * This method send array messages like JSON
 * 
 * @throws Exception  If a PDO object failed
 */
function cargarMensajes() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
            if ($bd->getError() === false) {
                if (isset($_POST['id'])) {
                    $statement = "SELECT `ID_PETICION`, `ASUNTO`, h.DESCRIPCION, `FECHA`, (SELECT e.estado FROM estados as e WHERE id_estado=h.estado) as estado FROM `historico_peticiones` as h WHERE socio_emisor=" . $_SESSION['user']['id'] . " and ID_PETICION=" . $_POST['id'];
                } else {
                    $statement = "SELECT `ID_PETICION`, `ASUNTO`, h.DESCRIPCION, `FECHA`, (SELECT e.estado FROM estados as e WHERE id_estado=h.estado) as estado FROM `historico_peticiones` as h WHERE socio_emisor=" . $_SESSION['user']['id'];
                }
                $stmt = $bd->query($statement);
                if ($stmt === false) {
                    throw new Exception("Se ha producido un error.");
                } else {
                    $institucion = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    $array_utf8 = utf8Convert($institucion);
                    echo(json_encode($array_utf8));
                }
            } else {
                throw new Exception("Se ha producido un error.");
            }
        }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

/* buscar_empresa */

/**
 * Get business or institution
 *
 * This method send array businnes or institution like JSON. If the user connect then to send more information.
 * 
 * @throws PDOException  If a PDO object failed
 */
function mostrar_empresas() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
            $sql = "SELECT i.nombre, (SELECT p.nombre from paises as p where id_pais=pais) as pais, i.email, i.telefono, i.direccion, i.codigo_postal, i.web, i.descripcion, i.vat,";
        } else {
            $bd = new Bd(3);
             $sql = "SELECT nombre, (SELECT nombre from paises where id_pais=pais) as pais, ";
        }
       
        if ($_POST['tipo'] == "Empresa") {
            $sql .= "(SELECT ts.tipo from tipos_empresa as ts where ID_TIPO_EMPRESA=i.tipo) as tipo, (SELECT te.tipo from tipos_especialidad as te where te.id_especialidad=(SELECT es.ESPECIALIDAD FROM empresas_especialidades as es where es.empresa=i.id_empresa)) as especialidad FROM empresas as i";
        } else {
            $sql .= "(SELECT ts.tipo from tipos_institucion as ts where ID_TIPO_INSTITUCION=i.tipo) as tipo, (SELECT te.tipo from tipos_especialidad as te where id_especialidad=(SELECT ESPECIALIDAD FROM instituciones_especialidades as es where es.institucion=id_institucion)) as especialidad FROM instituciones as i";
        }
        if (isset($_POST['pais'])) {
            $sql .= " where pais=" . $_POST['pais'];
             if (isset($_POST['especialidad'])) {
                if ($_POST['tipo'] == "Empresa") {
                    $sql .= " and id_empresa in (SELECT empresa from empresas_especialidades where especialidad=" . $_POST['especialidad'] . ")";
                } else {
                    $sql .= " and id_institucion in (SELECT institucion from instituciones_especialidades where especialidad=" . $_POST['especialidad'] . ")";
                }
            }
        } else {
            if (isset($_POST['especialidad'])) {
                if ($_POST['tipo'] == "Empresa") {
                    $sql .= " where id_empresa in (SELECT empresa from empresas_especialidades where especialidad=" . $_POST['especialidad'] . ")";
                } else {
                    $sql .= " where id_institucion in (SELECT institucion from instituciones_especialidades where especialidad=" . $_POST['especialidad'] . ")";
                }
            }
        }
        $json = array();
        if ($_POST['page'] == 1) { //Se é igual a 1, primeira 'interaccion'
            $stmt = $bd->query($sql);

            $total_rows = $stmt->rowCount();
            
            $number_page = ceil($total_rows / 4);

            $json = array('number_page' => $number_page);
        }

        $page = $_POST['page'];

        $sql = $sql . " LIMIT " . (($page - 1) * 4) . ", 4";

        $stmt = $bd->query($sql);
        $array = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($array === false) {
            new PDOException("Error");
        } else {
            $array_utf8 = utf8Convert($array);
            if ($array_utf8 !== false) {
                array_push($json, $array_utf8);
                echo json_encode($json);
            }
        }
    } catch (PDOException $pdoex) {
        echo $pdoex->getMessage();
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}

/**
 * Get speciality
 *
 * This method send array speciality like JSON
 * 
 * @throws Exception  If a PDO object failed
 */
function getEspecialidad() {
    try {
        if (comprobarSession()) {
            $bd = new Bd($_SESSION['user']['rol']);
        } else {
            $bd = new Bd(3);
        }
        if ($bd->getError() === true) {
            
        } else {
            $stmt = $bd->query("SELECT tipo, id_especialidad FROM tipos_especialidad");
            if ($stmt === false) {
                
            } else {
                $paises = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $array_utf8 = utf8Convert($paises);
                echo(json_encode($array_utf8));
            }
        }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }
}
