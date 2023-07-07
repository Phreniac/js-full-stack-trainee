>Tema: Sistema de Gestión de Películas

## Contexto:
La Universidad Alfa Beta ha decidido organizar un festival de cine y necesita un sistema de gestión de películas para mantener un registro de las películas, los actores, los directores y las proyecciones. Te han asignado la tarea de diseñar la base de datos y desarrollar el esquema de base de datos utilizando MySQL.

## Requerimientos:
### Paso 1: Diagrama EER
Diseña un diagrama de entidad-relación extendido (EER) que represente las entidades y las relaciones necesarias para el sistema de gestión de películas. Asegúrate de incluir las siguientes entidades: Película, Actor, Director, Género y Proyección. Las relaciones entre estas entidades pueden incluir 1:1, 1:N y N:M, según corresponda.

### Paso 2: Diseño de Tablas
Crea las tablas en MySQL según el esquema EER que has diseñado en el paso anterior. Asegúrate de incluir las claves primarias y las claves foráneas necesarias para mantener la integridad referencial. Además, define los atributos adecuados para cada tabla y especifica las restricciones necesarias para garantizar la normalización de los datos en 1NF, 2NF y 3NF.

### Paso 3: Pregunta y Modificación de Datos
Se te ha proporcionado una base de datos inicial con algunas películas registradas, actores, directores y proyecciones. Se te plantea el siguiente problema y se te solicita que realices la modificación adecuada en la base de datos para solucionarlo:

### Problema:
La película "El Secreto de Sus Ojos" ha sido mal registrada en la base de datos. En lugar de tener la clasificación correcta de "Drama", ha sido clasificada erróneamente como "Comedia". Además, uno de los actores, Ricardo Darín, no ha sido asociado correctamente a la película.

### Tarea:
Modifica la base de datos existente para corregir el problema mencionado. Asegúrate de actualizar la clasificación de la película "El Secreto de Sus Ojos" a "Drama" y de asociar correctamente a Ricardo Darín como actor de dicha película.

### Paso 4: Consultas SQL
Una vez que hayas realizado la modificación en la base de datos, es hora de poner a prueba tus habilidades de SQL. Escribe y ejecuta las siguientes consultas SQL para obtener la siguiente información:

- Inserta al menos 10 peliculas con las información necesaria, deben haber 2 generos iguales por cada pelicula.
- Obtén el título, el género y el director de todas las películas de drama.
- Encuentra todos los actores que hayan trabajado en al menos dos películas diferentes.
- Muestra el título y la fecha de proyección de todas las películas que se proyectarán en los próximos 7 días.
- Recuerda utilizar sentencias SQL adecuadas para realizar estas consultas y asegurarte de que devuelvan los resultados esperados.

>Tabla: película_completa

id	| título |	género |director |	actor | fecha_proyección |
|---|---|---|---|---|---|---|---|---|
1	| El Secreto de Sus Ojos |	Comedia	| Juan José Campanella | Leonardo DiCaprio |2023-06-10|
2	| Inception | Acción |	Christopher Nolan | Ricardo Darín | 2023-06-12 |
3	| La La Land | Romance	| Damien Chazelle | Emma Stone | 2023-06-15 |
