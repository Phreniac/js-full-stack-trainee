USE prueba1;
SELECT * FROM ingreso_usuario;
SELECT * FROM usuario;
SELECT * FROM contactos;
SELECT * FROM telefono;

INSERT INTO contactos(id_usuario, id_telefono, email) VALUES (1,1, 'EMAIL1@GMAIL.COM');
INSERT INTO contactos(id_usuario, id_telefono, email) VALUES (1,2, 'EMAIL2@GMAIL.COM');

CREATE TABLE contactos (
id_contacto INT PRIMARY KEY NOT NULL auto_increment,
id_usuario INT NOT NULL,
id_telefono INT NOT NULL,
email VARCHAR(50),
CONSTRAINT fk_id_telefono FOREIGN KEY (id_telefono) REFERENCES telefono(id_telefono)
);

CREATE TABLE telefono (
	id_telefono INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    numero_telefono varchar(20)
);
INSERT INTO telefono(numero_telefono) VALUES ('123412345');
INSERT INTO telefono(numero_telefono) VALUES ('543214321');

ALTER TABLE contactos
change column numero_telefono id_telefono INT NOT NULL;
ALTER TABLE contactos
ADD FOREIGN KEY (id_telefono) REFERENCES telefono (id_telefono);

DROP TABLE contactos;

SELECT * FROM usuario where id_usuario = 1;

SELECT * FROM usuario 
JOIN contactos ON contactos.id_usuario = usuario.id_usuario
JOIN telefono ON telefono.id_telefono = contactos.id_telefono
where usuario.id_usuario = 1;