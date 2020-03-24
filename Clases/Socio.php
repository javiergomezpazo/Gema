<?php

namespace Clases;

include "Interfaces\I_Crud.php";

use Interfaces\I_Crud as I_Crud;

/**
 * Socios class
 *
 * The class .
 *
 * @package    Clases
 * @uses Interfaces\I_Crud
 * @param String $id
 * @param String $vat The vat partner. Vat can be null
 * @param String $password The password partner.
 * @param String $usuario The user name.
 * @param String $nombre_completo The name partner.
 * @param String $email The email partner.
 * @param String $telefono The telephone partner.
 * @param String $cargo The post partner.
 * @param String $departamento The departament partner.
 * @param String $r_alojamiento The  partner.
 * @param int $puntuacion The score partner.
 * @param int $institucion The id institution partner.
 * @param int $pais The id country partner.
 * @param int $rol The role partner in BD.
 * @param String $fecha_modificacion The modify date partner.
 * @param String $fecha_alta The release date partner.
 * @param String $fecha_baja The expiration date partner.
 * @param Array $iterator Array with some parameter class.
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */
class Socios implements I_Crud, \Iterator {

    private $id_socio;
    private $vat;
    private $password;
    private $usuario;
    private $nombre_completo;
    private $email;
    private $telefono;
    private $fecha_alta;
    private $fecha_baja;
    private $fecha_modificacion;
    private $cargo;
    private $departamento;
    private $r_alojamiento;
    private $puntuacion;
    private $rol;
    private $institucion; //Por defecto será null;
    private $pais;
    private $iterator;

    /**
     * Creates a Socio instance
     * 
     * @param String $id
     * @param String $vat The vat partner. Vat can be null
     * @param String $password The password partner.
     * @param String $usuario The user name.
     * @param String $nombre_completo The name partner.
     * @param String $email The email partner.
     * @param String $telefono The telephone partner.
     * @param String $cargo The post partner.
     * @param String $departamento The departament partner.
     * @param String $r_alojamiento The  partner.
     * @param int $puntuacion The score partner.
     * @param int $institucion The id institution partner.
     * @param int $pais The id country partner.
     * @param int $rol The role partner in BD.
     * @param String $fecha_modificacion The modify date partner.
     * @param String $fecha_alta The release date partner.
     * @param String $fecha_baja The expiration date partner.
     * @return Returns a Socio object on success. 
     */
    function __construct($id, $vat, $password, $usuario, $nombre_completo, $email, $telefono, $cargo, $departamento, $r_alojamiento, $puntuacion, $institucion, $pais, $rol, $fecha_modificacion, $fecha_alta = null, $fecha_baja = null) {
        $this->id_socio = $id;
        $this->password = $password;
        $this->usuario = $usuario;
        $this->nombre_completo = $nombre_completo;
        $this->email = $email;
        $this->telefono = $telefono;
        $this->fecha_baja = $fecha_baja;
        $this->cargo = $cargo;
        $this->departamento = $departamento;
        $this->r_alojamiento = $r_alojamiento;
        $this->puntuacion = $puntuacion;
        $this->rol = $rol;
        $this->institucion = $institucion;
        $this->pais = $pais;
        $this->fecha_modificacion = $fecha_modificacion;
        if ($vat == "") {
            $this->vat = NULL;
        } else {
            $this->vat = $vat;
        }
        if ($fecha_alta == null) {
            $date = new \DateTime();
            $this->fecha_alta = $date->format("Y-m-d H:i:s");
            unset($date);
        } else {
            $this->fecha_alta = $fecha_alta;
        }
        unset($date);
        $this->iterator = array(
            'vat' => $this->vat,
            'password' => $password,
            'usuario' => $usuario,
            'nombre_completo' => $nombre_completo,
            'email' => $email,
            'telefono' => $telefono,
            'fecha_alta' => $this->fecha_alta,
            'fecha_modificacion' => $fecha_modificacion,
            'fecha_baja' => $fecha_baja,
            'cargo' => $cargo,
            'departamento' => $departamento,
            'r_alojamiento' => $r_alojamiento,
            'puntuacion' => $puntuacion,
            'rol' => $rol,
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

    /**
     * Set parameter $contraseña
     * 
     * @param  string $contraseña
     */
    function setContraseña($contraseña) {
        $this->contraseña = $contraseña;
    }

    /**
     * Set parameter $telefono
     * 
     * @param  string $telefono
     */
    function setTelefono($telefono) {
        $this->telefono = $telefono;
    }

    /**
     * Set parameter $direccion
     * 
     * @param  string $direccion
     */
    function setDireccion($direccion) {
        $this->direccion = $direccion;
    }

    /**
     * Set parameter $codigo_postal
     * 
     * @param  string $codigo_postal
     */
    function setCodigo_postal($codigo_postal) {
        $this->codigo_postal = $codigo_postal;
    }

    /**
     * Set parameter $pais
     * 
     * @param  string $pais
     */
    function setPais($pais) {
        $this->pais = $pais;
    }

    /**
     * Update partener
     * 
     * This method update name, telephone, dates, post anddepartament.
     * 
     * @param PDO $bd Object PDO.
     * @param array $param Array with new data.
     * @return boolean Return true or false.
     */
    public function actualizar($bd, $param) {
        $statement = "UPDATE `socios` SET `NOMBRE_COMPLETO`=:nombre_completo,`TELEFONO`=:telefono,`FECHA_MODIFICACION`=:fecha_modificacion,`CARGO`=:cargo,`DEPARTAMENTO`=:departamento WHERE id_socio=$this->id_socio";
        $stmt = $bd->prepareQuery($statement, $param);
        if ($stmt !== false) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Delete partener
     * 
     * @param PDO $bd Object PDO.
     * @return boolean Return true or false.
     */
    public function eliminar($bd) {
        $statement = "DELETE FROM socios WHERE usuario=$this->usuario";
        $bd->query($statement);
    }

    /**
     * Sign Up partener
     * 
     * @param PDO $bd Object PDO.
     * @return boolean Return true or false.
     */
    public function insertar($bd) {
        /*  $statement = "INSERT INTO instituciones (ID_INSTITUCION, VAT, NOMBRE, EMAIL, TELEFONO, CODIGO_POSTAL, DIRECCION, WEB, FECHA_ALTA, FECHA_BAJA, PAIS, SOCIO, TIPO, DESCRIPCION)"
          . "values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; */

        $statement = "INSERT INTO socios (VAT, PASSWORD, USUARIO, NOMBRE_COMPLETO, EMAIL, TELEFONO, FECHA_ALTA, FECHA_BAJA, FECHA_MODIFICACION, CARGO,DEPARTAMENTO, R_ALOJAMIENTO, PUNTUACION, ROL, PAIS)"
                . "values (:vat,:password,:usuario,:nombre_completo,:email,:telefono,:fecha_alta,:fecha_baja, :fecha_modificacion, :cargo,:departamento,:r_alojamiento,:puntuacion,:rol,:pais)";

        $stmt = $bd->prepareQuery($statement, $this);

        if ($stmt !== false) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Show partener
     * 
     * @param PDO $bd Object PDO.
     * @param array $param Array with new data.
     * @return PDOStatement Return object PDOStatement
     */
    public function mostrar($bd) {
        $statement = "SELECT usuario, nombre_completo, email, telefono, cargo, departamento, (SELECT nombre FROM paises WHERE id_pais=pais) FROM socios WHERE usuario=" . $_SESSION['user']['userName'];

        return $bd->query($statement, \PDO::FETCH_ASSOC);
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
