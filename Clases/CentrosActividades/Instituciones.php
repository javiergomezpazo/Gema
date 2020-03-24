<?php

namespace Clases\CentrosActividades;

include "Clases\CentrosActividades\CentrosActividades.php";

use Clases\CentrosActividades\CentrosActividades as Centros;

/**
 * CentrosActividades class
 *
 * @package    Clases
 * @subpackage CentrosActividades
 * @uses Interfaces\I_Crud
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */
class Instituciones extends Centros implements \Iterator {

            /**
     * Creates a Instituciones instance
     * 
 * @param String $id
 * @param String $vat The vat institutions. Vat can be null
 * @param String $nombre The name institutions.
 * @param String $email The email institutions.
 * @param String $telefono The telephone institutions.
 * @param String $direccion The direction institutions.
 * @param String $codigo_postal The postal code institutions.
 * @param String $web The  institutions web site.
 *  @param String $descripcion The  institutions description.
 * @param int $socio The id partner institutions.
 * @param int $tipo The type of institutions.
 * @param int $pais The id country institutions.
 * @param String $fecha_modificacion The modify date institutions.
 * @param String $fecha_alta The release date institutions.
 * @param String $fecha_baja The expiration date institutions.
     * @return Returns a Instituciones object on success. 
     */
    function __construct($id, $vat, $nombre, $email, $telefono, $direccion, $codigo_postal, $web, $pais, $socio, $tipo, $descripcion, $fecha_modificacion, $fecha_alta = null, $fecha_baja = null) {

        parent::__construct($id, $vat, $nombre, $email, $telefono, $direccion, $codigo_postal, $web, $pais, $socio, $tipo, $descripcion, $fecha_modificacion);
    }

            /**
     * Sign Up institution
     * 
     * @param PDO $bd Object PDO.
     * @return boolean Return true or false.
     */
    public function insertar($bd) {
        $statement = "INSERT INTO instituciones ( VAT, NOMBRE, EMAIL, TELEFONO, CODIGO_POSTAL, DIRECCION, WEB, FECHA_ALTA, FECHA_BAJA, FECHA_MODIFICACION, PAIS, SOCIO, TIPO, DESCRIPCION)"
                . "values (:vat,:nombre,:email,:telefono,:codigo_postal, :direccion, :web, :fecha_alta,:fecha_baja, :fecha_modificacion,:pais,:socio,:tipo,:descripcion)";

        $stmt = $bd->prepareQuery($statement, $this);
        if ($stmt !== false) {
            return true;
        } else {
            echo 1;
            return false;
        }
    }

    function __toString() {
        return "Institucion: parent::__toString(), Tipo: $this->tipo.";
    }

    public function current() {
        return current($this->iterator);
    }

    public function next() {
        return next($this->iterator);
    }

    public function key() {
        return key($this->iterator);
    }

    public function valid() {
        $key = key($this->iterator);
        return ($key !== null && $key !== false);
    }

    public function rewind() {
        return reset($this->iterator);
    }

}
