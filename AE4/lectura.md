# Definición de Tablas y Manipulación de Datos

## Introducción:
MySQL es un sistema de gestión de bases de datos relacional ampliamente utilizado en aplicaciones web y otros entornos. En esta clase, exploraremos las sentencias y conceptos clave relacionados con la definición de tablas en MySQL, así como la manipulación de datos mediante el lenguaje de definición de datos (DDL) y otras operaciones.

## 1. Sentencias para la definición de tablas:
Las sentencias DDL se utilizan para definir la estructura de una tabla en MySQL. Algunas de las sentencias más comunes son:
- **CREATE TABLE:** Esta sentencia se utiliza para crear una nueva tabla en la base de datos.

Ejemplo:

```sql
CREATE TABLE alumnos (
  id INT PRIMARY KEY,
  nombre VARCHAR(50),
  edad INT,
  carrera VARCHAR(50)
);
```

## 2. El lenguaje de definición de datos DDL:
El lenguaje de definición de datos (DDL) en MySQL se utiliza para crear y modificar la estructura de la base de datos. Las sentencias DDL más comunes son CREATE, ALTER y DROP.

## 3. Creación de una tabla:
Al crear una tabla, debemos definir los campos que contendrá, los tipos de datos de cada campo y cualquier restricción adicional que deseemos aplicar. Algunos elementos importantes a considerar son:

- **Definición de campos:** Especificamos los campos que contendrá la tabla, junto con sus nombres y tipos de datos correspondientes.

- **Tipos de dato:** MySQL proporciona una amplia gama de tipos de datos, como INT, VARCHAR, DATE, etc., para adaptarse a diferentes necesidades de almacenamiento de datos.

- **La restricción de nulidad:** Podemos especificar si un campo permite valores nulos o si debe contener siempre un valor no nulo.

- **Definición de la llave primaria:** La llave primaria es un campo o una combinación de campos que identifican de manera única cada registro en la tabla. Se utiliza para garantizar la integridad de los datos y facilitar las operaciones de búsqueda y actualización.

- **Definición de llaves foráneas:** Las llaves foráneas establecen relaciones entre diferentes tablas en la base de datos. Se utilizan para garantizar la integridad referencial y mantener la coherencia de los datos.

## 4. Creando un modelo de datos con integridad referencial:
La integridad referencial es un concepto clave en la gestión de bases de datos que garantiza que las relaciones entre las tablas sean coherentes y que no se produzcan datos huérfanos. Para crear un modelo de datos con integridad referencial, debemos definir las llaves foráneas y las restricciones de integridad adecuadas.

Ejemplo:

```sql
CREATE TABLE alumnos (
  id INT PRIMARY KEY,
  nombre VARCHAR(50),
  carrera_id INT,
  FOREIGN KEY (carrera_id) REFERENCES carreras(id)
);
```

## 5. Modificación de una tabla:
En ocasiones, es posible que necesitemos realizar modificaciones en la estructura de una tabla existente. Algunas operaciones comunes son:
- Modificar un campo en una tabla: Podemos cambiar el nombre de un campo, el tipo de datos o cualquier otra propiedad asociada a él.

- Modificar una condición de nulidad: Podemos especificar si un campo debe permitir valores nulos o si se debe requerir un valor no nulo.

## 6. Eliminación de una tabla:
La sentencia DROP TABLE se utiliza para eliminar una tabla existente de la base de datos. Ten en cuenta que esta operación es irreversible y eliminará todos los datos asociados con la tabla.
Ejemplo:

```sql
DROP TABLE alumnos;
```

## 7. Truncado de una tabla:
La sentencia TRUNCATE TABLE se utiliza para eliminar todos los registros de una tabla, pero mantiene la estructura de la tabla intacta.

Ejemplo:

```sql
TRUNCATE TABLE alumnos;
```

¡Esto concluye la introduccion a la definición de tablas y manipulación de datos en MySQL! Espero que esta información les sea muy útil para comprender los conceptos básicos y las sentencias relacionadas con la creación y modificación de tablas en MySQL.

## Transaccionalidad en las operaciones:

1.  Qué es una transacción y por qué son importantes:
    Una transacción es una secuencia de operaciones que se ejecutan como una sola unidad lógica de trabajo. Las transacciones son importantes para garantizar la integridad y la consistencia de los datos, ya que permiten que un conjunto de operaciones se ejecute como una entidad atómica.

2.  Propiedades de las transacciones: atomicidad, consistencia, aislamiento, durabilidad:
    Las transacciones tienen cuatro propiedades conocidas como ACID:


    - **Atomicidad:** Una transacción se considera atómica, lo que significa que todas las operaciones dentro de ella se ejecutan en su totalidad o ninguna de ellas se realiza. Si ocurre un error en alguna operación dentro de la transacción, todas las operaciones realizadas hasta ese punto se deshacen y se restaura el estado original de la base de datos.

    - **Consistencia:** Una transacción asegura que la base de datos pasa de un estado válido a otro estado válido. Esto significa que todas las restricciones y reglas de integridad de la base de datos se mantienen antes y después de una transacción.

    - **Aislamiento:** Las transacciones en MySQL se ejecutan en un entorno aislado, lo que significa que los cambios realizados en una transacción no son visibles para otras transacciones hasta que se completen y se confirmen mediante una operación de confirmación (commit). Esto evita que otras transacciones interfieran con el proceso de una transacción en curso.

    - **Durabilidad:** Después de confirmar una transacción mediante la operación de confirmación (commit), los cambios realizados en la base de datos se vuelven permanentes y se mantienen incluso en caso de fallos del sistema o reinicios.

    Es importante tener en cuenta que MySQL tiene el modo de autocommit activado por defecto, lo que significa que cada sentencia individual se trata como una transacción separada que se confirma automáticamente. Para desactivar el autocommit y habilitar el manejo explícito de transacciones, puedes utilizar la sentencia SET autocommit = 0; antes de iniciar una transacción.

    El uso de transacciones es fundamental cuando se requiere mantener la consistencia y la integridad de los datos en aplicaciones y sistemas que realizan múltiples operaciones de base de datos de forma simultánea.

    
    Comandos:

    - **START TRANSACTION o BEGIN:** Inicia una nueva transacción, marcando el comienzo de un bloque de transacción.

    - **COMMIT:** Confirma y realiza la transacción, haciendo que todos los cambios sean permanentes en la base de datos.

    - **ROLLBACK:** Deshace la transacción, deshaciendo todos los cambios realizados dentro de la transacción y restaurando la base de datos a su estado anterior.

    - **SAVEPOINT:** Crea un punto de guardado (savepoint) con nombre dentro de una transacción, permitiéndote deshacer cambios hasta un punto específico en la transacción.

    - **RELEASE SAVEPOINT:** Elimina un punto de guardado previamente definido, permitiendo que la transacción continúe sin deshacerse hasta ese punto específico.

    - **ROLLBACK TO SAVEPOINT:** Deshace la transacción hasta un punto de guardado previamente definido, deshaciendo los cambios realizados después de ese punto.

    - **SET TRANSACTION:** Establece características relacionadas con la transacción, como el nivel de aislamiento o el modo de acceso a la transacción.

    - **AUTOCOMMIT:** Determina si cada sentencia individual se confirma automáticamente como una transacción separada o no. El modo de autocommit está activado de forma predeterminada en MySQL.

    - **LOCK TABLES:** Bloquea una o más tablas explícitamente, restringiendo el acceso a ellas por parte de otras transacciones hasta que se libere el bloqueo.

    - **UNLOCK TABLES:** Libera los bloqueos adquiridos mediante la instrucción LOCK TABLES, permitiendo que otras transacciones accedan a las tablas.

    - **SET TRANSACTION ISOLATION LEVEL:** Establece el nivel de aislamiento para la transacción, que define el nivel de visibilidad de los datos y el control de concurrencia. Los niveles de aislamiento comunes incluyen READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ y SERIALIZABLE.

    - **DECLARE:** Declara variables locales dentro de un bloque de transacción. Estas variables se pueden utilizar para almacenar valores temporales o resultados intermedios durante la transacción.

    - **DECLARE CURSOR:** Declara un cursor, que se utiliza para recuperar y procesar filas de un conjunto de resultados en una transacción.

    - **OPEN:** Abre un cursor, preparándolo para recuperar filas del conjunto de resultados.

    - **FETCH:** Recupera la siguiente fila de un cursor y la hace disponible para su procesamiento.

    - **CLOSE:** Cierra un cursor, liberando los recursos asociados.
---

3.  Confirmación de una transacción:
    La confirmación (commit) de una transacción se utiliza para finalizar y aplicar los cambios realizados en una transacción.
    **Ejemplo:**
    ```sql
    START TRANSACTION;
       -- Operaciones dentro de la transacción
    COMMIT;
     ```

4.  Vuelta atrás de una transacción:
    El rollback se utiliza para deshacer todos los cambios realizados en una transacción y volver al estado anterior a su inicio.
    **Ejemplo:**

    ```sql
    START TRANSACTION;
       -- Operaciones dentro de la transacción
    ROLLBACK;
    ```

5.  Modo autocommit:
    En MySQL, el modo autocommit está habilitado de forma predeterminada. Esto significa que cada sentencia individual se trata como una transacción independiente y se confirma automáticamente. Sin embargo, también es posible deshabilitar el modo autocommit y manejar explícitamente las transacciones utilizando las sentencias **COMMIT** y **ROLLBACK**.
    **Ejemplo:**

    ```sql
    SET autocommit = 0;
    START TRANSACTION;
        -- Operaciones dentro de la transacción
    COMMIT;
    ```



