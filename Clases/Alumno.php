<?php

namespace Clases;

include_once "Interfaces\I_Crud.php";

use Interfaces\I_Crud as I_Crud;

/**
 * Alumno class
 *
 * @package    Clases
 * @uses Interfaces\I_Crud
 * @param String $id
 * @param String $vat The vat student. Vat can be null
 * @param String $nombre The name student.
 * @param String $genero The sex student.
 * @param String $fecha_modificacion The modify date student.
 * @param String $fecha_alta The release date student.
 * @param String $fecha_baja The expiration date student.
 * @param Array $iterator Array with some parameter class.
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */
class Alumno implements I_Crud, \Iterator{
    
    private $id;
    private $vat;
    private $nombre;
    private $genero;
    private $fecha_nacimiento;
    private $fecha_alta;
    private $fecha_baja;
    private $fecha_modificacion;
    private $socio;
    private $iterator;
    
        /**
     * Creates a Alumno instance
     * 
  * @param String $id
 * @param String $vat The vat student. Vat can be null
 * @param String $nombre The name student.
 * @param String $genero The sex student.
 * @param String $fecha_modificacion The modify date student.
 * @param String $fecha_alta The release date student.
 * @param String $fecha_baja The expiration date student.
     * @return Returns a Alumno object on success. 
     */
    function __construct($id, $vat, $nombre, $genero, $fecha_nacimiento, $fecha_modificacion, $socio, $fecha_alta = null, $fecha_baja = null) {
        $this->id = $id;
       
        $this->nombre = $nombre;
        $this->genero = $genero;
        $this->fecha_nacimiento = $fecha_nacimiento;
        $this->fecha_baja = $fecha_baja;
        $this->fecha_modificacion = $fecha_modificacion;
        $this->socio = $socio;
        if($vat == ""){
             $this->vat = NULL;
        }else{
            $this->vat = $vat; 
        }
        if ($fecha_alta == null) {
             $date = new \DateTime();
            $this->fecha_alta = $date->format("Y-m-d H:i:s");
            unset($date);
        } else {
            $this->fecha_alta = $fecha_alta;
        }
        $this->iterator = array(

            'nombre_completo' => $nombre,
            'vat' => $this->vat,
            'genero' => $genero,
            'fecha_nacimiento'=>$fecha_nacimiento,
            'fecha_baja' => $fecha_baja,
            'fecha_modificacion' => $fecha_modificacion,
            'socio' => $socio,
            'fecha_alta' => $this->fecha_alta
            
        );
    }

        /**
     * Magic method get
     * 
     * @param  mixed $atributo
     * @return $atributo.
     */
        function __get($atributo){
        if(property_exists(__CLASS__, $atributo)){
            return $this->$atributo;
        }
    }    
    
   
    /**
     * Update student
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
     * Delete student
     * 
     * @param PDO $bd Object PDO.
     * @return boolean Return true or false.
     */
   public function eliminar($bd) {
        $statement = "DELETE FROM alumnos WHERE id_alumno=$this->id";
        $bd->query($statement);
    }

        /**
     * Sign Up student
     * 
     * @param PDO $bd Object PDO.
     * @return boolean Return true or false.
     */
    public function insertar($bd) {
        $statement = "INSERT INTO alumnos (VAT, NOMBRE_COMPLETO, GENERO, FECHA_NACIMIENTO, FECHA_ALTA, FECHA_BAJA, FECHA_MODIFICACION, SOCIO)"
                . "values (:vat, :nombre_completo, :genero, :fecha_nacimiento,:fecha_alta,:fecha_baja, :fecha_modificacion, :socio)";

        $stmt = $bd->prepareQuery($statement, $this);
        
        if($stmt !== false){
            return true;
        }else{
            return false;
        }
    }

        /**
     * Show student
     * 
     * @param PDO $bd Object PDO.
     * @param array $param Array with new data.
     * @return PDOStatement Return object PDOStatement
     */
    public function mostrar($bd) {
        $statement = "SELECT usuario, nombre_completo, email, telefono, cargo, departamento, (SELECT nombre FROM paises WHERE id_pais=pais) FROM alumnos WHERE id_alumno=$this->id";

        return $bd->query($statement, \PDO::FETCH_ASSOC);
    }

   /*Iterator methods*/
    
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
