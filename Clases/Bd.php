<?php

namespace Clases;

/**
 * Bd class
 *
 * Represents a connection between PDO with Data Base.
 *
 * @package    Clases
 * @param PDO $pdo The name  person responsible for business.
 * @param int $rol Role with PDO will connect Data Base.
 * @param boolean $error.
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */
class Bd {

    private const filename = "config/bd_config.xml";
    private const schema = "config/bd_config.xml";

    private $pdo;
    private $rol;
    private $error = false;

    /**
     *  Creates a PDO instance representing a connection to a database
     * 
     * @param int $rol Role with PDO will connect Data Base.
     * @return Returns a Bd object on success. 
     */
    public function __construct($rol) {
        $this->rol = $rol;
        $pdo = $this->connect($this->rol);
        if ($pdo === false) {
            $error = true;
        } else {
            $this->pdo = $pdo;
        }
    }

    function getError() {
        return $this->error;
    }

    function getPdo() {
        return $this->pdo;
    }

    /**
     *  Load data base config 
     * 
     * @param int $rol 
     * @return array Returns an array with username and password. 
     */
    private function leerConfiguracion($rol) {
        $dom = new \DOMDocument;
        /* if ($dom->load($filename)) {
          $validado = $dom->schemaValidate(Bd:schema);
          unset($dom);
          if ($validado === true) { */
        $xml = simplexml_load_file(Bd::filename);
        $ip = $xml->xpath("//ip")[0];
        $name = $xml->xpath("/bd_config/name")[0];
        $user = $xml->xpath("//users/user[$rol]/name")[0];
        $password = $xml->xpath("//users/user[$rol]/password")[0];
        $config = [];
        array_push($config, "mysql:dbname=$name; ip=$ip", $user, $password);
        return $config;
        /* } else {
          return false;
          }
          } else {
          return false;
          } */
    }

    /**
     *  Connect Bd 
     * 
     * @param int $rol 
     * @return PDO|boolean Returns false if failure, else return a object PDO. 
     */
    private function connect($rol) {
        try {
            $config = $this->leerConfiguracion($rol);
            if ($config === false) {
                return false;
            } else {
                $pdo = new \PDO($config[0], $config[1], $config[2]);
                return $pdo;
            }
        } catch (\PDOException $pdoex) {
            $this->error = true;
            $pdoex->getMessage();
        }
    }

    /**
     *  Prepares a statement for execution and returns a PDOStatement object 
     * 
     * @param String $query SQL statement.
     *  @param array $param Array with parameter
     * @return PDOStatement|boolean Returns false if failure, else return a object PDOStatement. 
     */
    function prepareQuery($query, $param) {
        try {
            $stmt = $this->pdo->prepare($query);
            foreach ($param as $key => $value) {
                $stmt->bindValue(":" . $key, $value);
            }
            if ($stmt->execute()) {
                return $stmt;
            } else {
                echo $stmt->errorInfo()[2];
                return false;
            }
            unset($stmt);
        } catch (\Exception $ex) {
            echo $ex->getMessage();
        }
    }

    /**
     *  Executes an SQL statement, returning a result set as a PDOStatement object  
     * 
     * @param String $query SQL statement.
     * @return mixed Returns false if failure, else return a object PDOStatement. 
     */
    function query($statement) {
        $stmt = $this->pdo->query($statement);
        return $stmt;
    }

    /**
     *  Initiates a transaction 
     * 
     * @return Returns TRUE on success or FALSE on failure. 
     */
    function startTransaction() {
        $this->pdo->beginTransaction();
    }

        /**
     * Commits a transaction 
     * 
     * @return Returns TRUE on success or FALSE on failure. 
     */
    function endTransaction() {
        $this->pdo->commit();
    }

}
