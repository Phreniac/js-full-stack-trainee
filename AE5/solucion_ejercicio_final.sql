CREATE SCHEMA ejercicioeer;
use ejercicioeer;

CREATE TABLE pelicula(
id_pelicula INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
titulo varchar(50),
duracion varchar(50),
formato varchar(50)
);

CREATE TABLE genero(
id_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(50)
);

CREATE TABLE genero_pelicula(
id_genero_pelicula INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_pelicula_fk INT NOT NULL,
id_genero_fk INT NOT NULL,
FOREIGN KEY (id_pelicula_fk) REFERENCES pelicula(id_pelicula),
FOREIGN KEY (id_genero_fk) REFERENCES genero(id_genero)
);

CREATE TABLE director(
id_director INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(50),
experiencia varchar(20)
);

CREATE TABLE director_pelicula(
id_director_pelicula INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_pelicula_fk INT NOT NULL,
id_director_fk INT NOT NULL,
FOREIGN KEY (id_pelicula_fk) REFERENCES pelicula(id_pelicula),
FOREIGN KEY (id_director_fk) REFERENCES director(id_director)
);

CREATE TABLE actor(
id_actor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(50),
fecha_nacimiento DATE,
email varchar(50)
);

CREATE TABLE actor_pelicula(
id_actor_pelicula INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_pelicula_fk INT NOT NULL,
id_actor_fk INT NOT NULL,
FOREIGN KEY (id_pelicula_fk) REFERENCES pelicula(id_pelicula),
FOREIGN KEY (id_actor_fk) REFERENCES actor(id_actor)
);

CREATE TABLE proyeccion(
id_proyeccion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
fecha_proyeccion DATE,
lugar_proyeccion varchar(50),
id_pelicula_fk INT NOT NULL,
FOREIGN KEY (id_pelicula_fk) REFERENCES pelicula(id_pelicula)
);

INSERT INTO genero SET nombre = 'Comedia';
INSERT INTO genero SET nombre = 'Acción';
INSERT INTO genero(nombre) Values('Drama');

INSERT INTO actor(nombre,fecha_nacimiento,email) 
values 
('Leonardo DiCaprio', str_to_date('06-04-1970', '%d-%m-%Y'), 'leo@gmail.com'),
('Ricardo Darín',str_to_date('06-04-1977', '%d-%m-%Y'), 'rd@gmail.com'),
('Emma Stone', str_to_date('06-04-1982', '%d-%m-%Y') , 'emmas@gmail.com');

select * from actor;

INSERT INTO director(nombre,experiencia) VALUES
('Juan José Campanella', '3 años'),
('Christopher Nolan', '20 años'),
('Damien Chazelle', '1 año');


INSERT INTO pelicula(titulo,duracion,formato) 
values 
('El Secreto de Sus Ojos', '02:00:00', 'VHS'),
('Inception','01:48:00', 'MP4'),
('La La Land', '02:20:00', 'blueray');

INSERT INTO genero_pelicula(id_pelicula_fk,id_genero_fk) values
(1,1),
(2,2),
(3,3);

INSERT INTO actor_pelicula(id_pelicula_fk,id_actor_fk) values
(1,1),
(2,2),
(3,3);

INSERT INTO actor_pelicula(id_pelicula_fk,id_actor_fk) values
(1,2),
(2,3),
(3,1);

INSERT INTO director_pelicula(id_pelicula_fk,id_director_fk) values
(1,1),
(2,2),
(3,3);

INSERT INTO proyeccion(fecha_proyeccion, lugar_proyeccion, id_pelicula_fk) values
(str_to_date('17-06-2023', '%d-%m-%Y'), 'Sala proyeccion 1', 1),
(str_to_date('18-06-2023', '%d-%m-%Y'), 'Sala proyeccion 1', 2),
(str_to_date('19-06-2023', '%d-%m-%Y'), 'Sala proyeccion 1', 3),
(str_to_date('19-06-2023', '%d-%m-%Y'), 'Sala proyeccion 2', 2),
(str_to_date('26-06-2023', '%d-%m-%Y'), 'Sala proyeccion 1', 1);

UPDATE genero_pelicula SET id_genero_fk = 3 WHERE id_pelicula_fk = 1;
UPDATE actor_pelicula SET id_actor_fk = 2 WHERE id_pelicula_fk = 1;

SELECT * FROM pelicula
JOIN genero_pelicula on genero_pelicula.id_pelicula_fk = pelicula.id_pelicula
JOIN genero on genero.id_genero = genero_pelicula.id_genero_fk
JOIN actor_pelicula on actor_pelicula.id_pelicula_fk = pelicula.id_pelicula
JOIN actor on actor.id_actor = actor_pelicula.id_actor_fk
WHERE genero.id_genero = 3;

SELECT * FROM pelicula
JOIN genero_pelicula on genero_pelicula.id_pelicula_fk = pelicula.id_pelicula
JOIN genero on genero.id_genero = genero_pelicula.id_genero_fk
JOIN actor_pelicula on actor_pelicula.id_pelicula_fk = pelicula.id_pelicula
JOIN actor on actor.id_actor = actor_pelicula.id_actor_fk
JOIN proyeccion on proyeccion.id_pelicula_fk = pelicula.id_pelicula
WHERE proyeccion.fecha_proyeccion > now() AND proyeccion.fecha_proyeccion < now() + interval '13' day;