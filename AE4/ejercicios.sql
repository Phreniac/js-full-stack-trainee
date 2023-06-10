CREATE SCHEMA TLVCOINS;
use TLVCOINS;

CREATE TABLE USUARIO(
id_usuario INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nombre varchar(50) NOT NULL
);
CREATE TABLE CUENTA (
id_cuenta INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_usuario INT NOT NULL,
saldo INT
);
CREATE TABLE MOVIMIENTO(
id_movimiento INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
fecha_movimiento timestamp DEFAULT CURRENT_TIMESTAMP,
id_cuenta INT NOT NULL
);

CREATE TABLE ALTA_PARTICIPACION(
id_alta_participacion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
fecha timestamp DEFAULT CURRENT_TIMESTAMP,
id_usuario INT NOT NULL,
FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

CREATE TABLE BAJA_PARTICIPACION(
id_baja_participacion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
fecha timestamp DEFAULT CURRENT_TIMESTAMP,
id_usuario INT NOT NULL,
FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario)
);

INSERT INTO USUARIO(nombre) VALUES
('Juanito'),
('Pedrito'),
('Pablito'),
('Florencia');

INSERT INTO BAJA_PARTICIPACION (id_usuario) VALUES
(1),
(2),
(3),
(4);

INSERT INTO CUENTA(id_usuario, saldo) VALUES 
(1, 200),
(2, 200),
(3, 200),
(4, 200);

select * from usuario, CUENTA;

ALTER TABLE CUENTA
ADD CONSTRAINT fk_id_usuario
FOREIGN KEY (id_usuario)
REFERENCES USUARIO (id_usuario);

SET autocommit = 0;
START TRANSACTION;
SET @id_usuario := (SELECT id_usuario FROM USUARIO WHERE nombre = 'Juanito');
SET @id_cuenta = (SELECT id_cuenta FROM cuenta WHERE id_usuario = @id_usuario);

UPDATE cuenta SET saldo =  + 300 WHERE id_cuenta = @id_cuenta ;
UPDATE cuenta SET saldo = (SELECT saldo FROM CUENTA WHERE id_cuenta = @id_cuenta) WHERE id_cuenta = 1 ;

SET autocommit = 0;
START TRANSACTION;
SET @id_usuario1 := (SELECT id_usuario FROM USUARIO WHERE nombre = 'Juanito');
SET @id_usuario2 := (SELECT id_usuario FROM USUARIO WHERE nombre = 'Pedrito');
SET @id_cuenta1 = (SELECT id_cuenta FROM cuenta WHERE id_usuario = @id_usuario1);
SET @id_cuenta2 = (SELECT id_cuenta FROM cuenta WHERE id_usuario = @id_usuario2);
SET @saldo_cuenta1 = (SELECT saldo FROM CUENTA WHERE id_cuenta = @id_cuenta1);
SET @saldo_cuenta2 = (SELECT saldo FROM CUENTA WHERE id_cuenta = @id_cuenta2);
SET @tlv_transfer = 200;

UPDATE cuenta SET saldo = IF(@saldo_cuenta1 >= @tlv_transfer, @saldo_cuenta1 - @tlv_transfer, 0)   WHERE id_cuenta = @id_cuenta1;
UPDATE cuenta SET saldo = @saldo_cuenta2 + @tlv_transfer WHERE id_cuenta = @id_cuenta2;

ROLLBACK;
commit;
select * from cuenta;

SET autocommit = 0;

START TRANSACTION;

SET @transfer_user = 1;
INSERT INTO ALTA_PARTICIPACION (id_usuario) VALUES (@transfer_user);
DELETE from BAJA_PARTICIPACION WHERE id_usuario = @transfer_user;

COMMIT;

select * from ALTA_PARTICIPACION;
select * from BAJA_PARTICIPACION;