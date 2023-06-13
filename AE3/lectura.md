## DDL

DDL significa "Data Definition Language" (Lenguaje de Definición de Datos) y es un conjunto de comandos utilizados para definir y gestionar la estructura y características de una base de datos. DDL se utiliza para crear, modificar y eliminar objetos de base de datos como tablas, índices, vistas, restricciones, entre otros. Algunos ejemplos de comandos DDL en MySQL son:

- CREATE: Se utiliza para crear objetos de base de datos, como tablas o vistas.
- ALTER: Permite modificar la estructura de un objeto existente, como agregar o eliminar columnas de una tabla.
- DROP: Se utiliza para eliminar objetos de base de datos, como tablas o vistas.
- TRUNCATE: Elimina todos los datos de una tabla, pero mantiene su estructura.
- CREATE INDEX: Crea un índice en una o varias columnas de una tabla para mejorar la eficiencia de las consultas.
- CREATE VIEW: Crea una vista, que es una representación virtual de una o varias tablas.

## DML

DML "Lenguaje de Manipulación de Datos" en MySQL se utiliza para manipular y consultar datos dentro de objetos de base de datos, como tablas. Te permite recuperar, insertar, actualizar y eliminar datos.

SELECT: La instrucción SELECT se utiliza para recuperar datos de una o más tablas. Te permite especificar las columnas a recuperar, aplicar filtros y realizar diversas operaciones en los datos.
Ejemplo:

```sql
SELECT columna1, columna2
FROM nombre_tabla
WHERE condición;
```
INSERT: La instrucción INSERT se utiliza para insertar nuevas filas de datos en una tabla.
Ejemplo:

```sql
INSERT INTO nombre_tabla (columna1, columna2)
VALUES (valor1, valor2);
```

UPDATE: La instrucción UPDATE se utiliza para modificar datos existentes en una tabla. Te permite actualizar una o más columnas en función de condiciones especificadas.

```sql
UPDATE nombre_tabla
SET columna1 = valor1, columna2 = valor2
WHERE condición;
```
DELETE: La instrucción DELETE se utiliza para eliminar filas de una tabla en función de condiciones especificadas.
Ejemplo:

```sql
DELETE FROM nombre_tabla
WHERE condición;
```
MERGE: La instrucción MERGE (también conocida como UPSERT) se utiliza para realizar una operación de inserción o actualización en función de si una fila ya existe en una tabla.
Ejemplo:

```sql
MERGE INTO nombre_tabla
USING (SELECT valor1, valor2) AS origen (columna1, columna2)
ON (nombre_tabla.columna1 = origen.columna1)
WHEN MATCHED THEN
  UPDATE SET columna2 = origen.columna2
WHEN NOT MATCHED THEN
  INSERT (columna1, columna2)
  VALUES (origen.columna1, origen.columna2);
```
Es importante escribir las instrucciones DML con cuidado y considerar el impacto que pueden tener en tus datos.

## Restricciones

- NOT NULL: Indica que un campo no puede contener valores nulos (NULL). Debe proporcionarse un valor válido para el campo en cada inserción o actualización.

- PRIMARY KEY: Define una restricción única y no nula en una o varias columnas para identificar de forma única cada fila en una tabla.

- UNIQUE: Garantiza que los valores en una columna (o en un conjunto de columnas) sean únicos en toda la tabla. No se pueden insertar valores duplicados en la columna.

- FOREIGN KEY: Establece una relación entre dos tablas, donde una columna (o un conjunto de columnas) en una tabla hace referencia a la clave primaria de otra tabla. Garantiza la integridad referencial entre las tablas.

- CHECK: Define una condición de validación que debe cumplirse para los valores en una columna. La restricción CHECK asegura que los datos ingresados cumplan con la condición especificada.

- DEFAULT: Establece un valor predeterminado para una columna cuando no se proporciona un valor explícito en una inserción de datos.

- INDEX: Crea un índice en una o varias columnas de una tabla para mejorar la eficiencia de las consultas. Los índices permiten una búsqueda rápida y optimizada de datos.

- UNIQUE INDEX: Similar a la restricción UNIQUE, crea un índice único en una o varias columnas para garantizar que los valores sean únicos. Sin embargo, también mejora el rendimiento de las consultas que involucran dichas columnas.

## JOINS
Las consultas joins en SQL se utilizan para combinar datos de dos o más tablas basándose en una columna relacionada entre ellas. Te permiten recuperar datos que se encuentran en múltiples tablas y crear un conjunto de resultados que combine la información relevante. Aquí tienes un resumen de los diferentes tipos de joins con ejemplos:

- INNER JOIN: Devuelve únicamente las filas que tienen valores coincidentes en ambas tablas.
Ejemplo:

```sql
SELECT customers.customer_id, orders.order_id
FROM customers
INNER JOIN orders ON customers.customer_id = orders.customer_id;
```

- LEFT JOIN: Devuelve todas las filas de la tabla izquierda (primera) y las filas coincidentes de la tabla derecha (segunda). Si no hay coincidencia, devuelve valores NULL para las columnas de la tabla derecha.
Ejemplo:

```sql
SELECT customers.customer_id, orders.order_id
FROM customers
LEFT JOIN orders ON customers.customer_id = orders.customer_id;
```

- RIGHT JOIN: Devuelve todas las filas de la tabla derecha (segunda) y las filas coincidentes de la tabla izquierda (primera). Si no hay coincidencia, devuelve valores NULL para las columnas de la tabla izquierda.
Ejemplo:

```sql
SELECT customers.customer_id, orders.order_id
FROM customers
RIGHT JOIN orders ON customers.customer_id = orders.customer_id;
``` 

FULL JOIN: Devuelve todas las filas de ambas tablas, combinándolas cuando sea posible. Si no hay coincidencia, devuelve valores NULL para las columnas de la tabla no coincidente.
Ejemplo:

```sql

SELECT customers.customer_id, orders.order_id
FROM customers
FULL JOIN orders ON customers.customer_id = orders.customer_id;
```

Estos son los tipos básicos de joins en SQL. Es importante definir la condición de join de manera adecuada para obtener resultados precisos y significativos. Además, puedes combinar múltiples joins o utilizar alias para los nombres de las tablas para realizar operaciones de join más complejas.

