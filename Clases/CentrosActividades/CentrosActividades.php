<?php

namespace Clases\CentrosActividades;

include_once "Interfaces\I_Crud.php";

use Interfaces\I_Crud as I_Crud;

/**
 * CentrosActividades class
 *
 * @package    Clases
 * @subpackage CentrosActividades
 * @uses Interfaces\I_Crud
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
 * @param Array $iterator Array with some parameter class.
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */
class CentrosActividades implements I_Crud, \Iterator {

    private $id;
    private $vat;
    private $nombre;
    private $email;
    private $telefono;
    private $direccion;
    private $codigo_postal;
    private $web;
    private $fecha_alta;
    private $fecha_baja;
    private $fecha_modificacion;
    private $pais;
    private $socio;
    private $tipo;
    private $descripcion;
    protected $iterator;

        /**
     * Creates a CentrosActividades instance
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
     * @return Returns a CentrosActividades object on success. 
     */
    function __construct($id, $vat, $nombre, $email, $telefono, $direccion, $codigo_postal, $web, $pais, $socio, $tipo, $descripcion, $fecha_modificacion, $fecha_alta = null, $fecha_baja = null) {
        $date = new \DateTime();
        $this->id = $id;
        $this->nombre = $nombre;
        $this->email = $email;
        $this->telefono = $telefono;
        $this->direccion = $direccion;
        $this->codigo_postal = $codigo_postal;
        $this->web = $web;
        $this->fecha_baja = $fecha_baja;
        $this->pais = $pais;
        $this->socio = $socio;
        $this->tipo = $tipo;
        $this->descripcion = $descripcion;
        $this->fecha_modificacion = $fecha_modificacion;
        var_dump($vat);
        if ($vat == "") {
            $this->vat = NULL;
        } else {
            $this->vat = $vat;
        }
        if ($fecha_alta == null) {
            $this->fecha_alta = $date->format("Y-m-d H:i:s");
        } else {
            $this->fecha_alta = $fecha_alta;
        }
        unset($date);
        $this->iterator = array(
            'vat' => $this->vat,
            'nombre' => $nombre,
            'email' => $email,
            'telefono' => $telefono,
            'fecha_alta' => $this->fecha_alta,
            'fecha_baja' => $fecha_baja,
            'fecha_modificacion' => $fecha_modificacion,
            'direccion' => $direccion,
            'codigo_postal' => $codigo_postal,
            'web' => $web,
            'socio' => $socio,
            'tipo' => $tipo,
            'descripcion' => $descripcion,
            'pais' => $pais,
        );
    }

        /**
     * Magic method get
     * 
     * @param  mixed $atributo
     * @return $atributo.
     */
    function __get($atributo) {
        if (property_exists(__CLASS__, $atributo)) {
            return $this->$atributo;
        }
    }

    function setEmail($email) {
        $this->email = $email;
    }

    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    function setCodigo_postal($codigo_postal) {
        $this->codigo_postal = $codigo_postal;
    }

    function setPais($pais) {
        $this->pais = $pais;
    }

    function setIterator($iterator) {
        $this->iterator = $iterator;
    }

    function getIterator() {
        return $this->iterator;
    }

    function __toString() {
        return "Nombre: $this->$id, Email: $this->$nombre, Telefono: $this->telefono, Direccion: $this->direccion,"
                . " Codigo Postal: $this->codigo_postal, Fecha alta: $this->fecha_alta, Pais: $this->pais";
    }

    public function actualizar($bd, $param) {
        
    }

    public function eliminar($bd) {
        
    }

    public function insertar($bd) {
        prepareQuery("Insert into get_class(__CLASS__) values (?)", $this, $rol);
    }

    public function mostrar($bd) {
        
    }

    /* Iterator methods */

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
