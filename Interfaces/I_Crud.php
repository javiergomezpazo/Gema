<?php

namespace Interfaces;

/**
 * Interface I_Crud
 *
 * Interface with method: Create, read, ipdate and delete.
 *
 * @package    Interfaces
 * @author     Javier Gomez <gomez.javiergomez11@gmail.com>
 */
interface I_Crud {

    /**
     * Sign up a type object in BD
     * 
     * @param PDO $bd Object PDO.
     * @return Can return any type.. 
     */
    function insertar($bd);

    /**
     * Delete a type object in BD
     * 
     * @param PDO $bd Object PDO.
     * @return Can return any type.. 
     */
    function eliminar($bd);

    /**
     * Update a type object in BD
     * 
     * @param PDO $bd Object PDO.
     *  @param array $param Array with new data.
     * @return Can return any type.. 
     */
    function actualizar($bd, $param);

        /**
     * Show attributes the a type object
     * 
     * @param PDO $bd Object PDO.
     * @return Can return any type.. 
     */
    function mostrar($bd);
}
