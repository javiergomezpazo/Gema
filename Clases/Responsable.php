<?php

namespace Clases;

include_once "Interfaces\I_Crud.php";

use Interfaces\I_Crud as I_Crud;

/**
 * Responsable class
 *
 * The class .
 *
 * @package    Clases
 * @uses Interfaces\I_Crud
 * @param String $id
 * @param String $nombre The name  person responsible for business.
 * @param String $email The email person responsible for business.
 * @param String $telefono The telephone person responsible for business.
 * @param Array $iterator Array with some parameter class.
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */
class Responsable implements I_Crud, \Iterator {

    private $id;
    private $nombre;
    private $email;
    private $telephone;
    private $iterator;

    /**
     * Creates a Responsable instance
     * 
     * @param String $id
    * @param String $nombre The name  person responsible for business.
 * @param String $email The email person responsible for business.
 * @param String $telefono The telephone person responsible for business.
     * @return Returns a Responsable object on success. 
     */
    function __construct($id, $nombre, $email, $telephone) {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->email = $email;
        $this->telephone = $telephone;
        $this->iterator = array(
            'nombre' => $nombre,
            'email' => $email,
            'telephone' => $telephone
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
     * Update person responsible for a business
     * 
     * This method update name, telephone, dates, post anddepartament.
     * 
     * @param PDO $bd Object PDO.
     * @param array $param Array with new data.
     * @return boolean Return true or false.
     */
    public function actualizar($bd, $param) {
        
    }

    /**
     * Delete responsible for a business
     * 
     * @param PDO $bd Object PDO.
     * @return boolean Return true or false.
     */
    public function eliminar($bd) {
        $statement = "DELETE FROM responsable WHERE id_responsable=$this->id";
        $bd->query($statement);
    }

        /**
     * Sign Up responsible for a business
     * 
     * @param PDO $bd Object PDO.
     * @return boolean Return true or false.
     */
    public function insertar($bd) {
        $statement = "INSERT INTO responsables (EMAIL, NOMBRE_COMPLETO, TELEFONO)"
                . "values (:email,:nombre,:telephone)";

        $stmt = $bd->prepareQuery($statement, $this);

        if ($stmt !== false) {
            $this->id=$bd->getPdo()->lastInsertId();
            return true;
        } else {
            return false;
        }
    }

    /**
     * Show responsible for a business
     * 
     * @param PDO $bd Object PDO.
     * @param array $param Array with new data.
     * @return PDOStatement Return object PDOStatement
     */
    public function mostrar($bd) {
        $statement = "SELECT nombre, (SELECT nombre FROM paises WHERE id_pais=pais) FROM responsables WHERE id_responsable=$this->id";

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
