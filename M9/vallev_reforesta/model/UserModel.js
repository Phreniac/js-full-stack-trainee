import {createPool} from '../db/db.js';
import {generateJWT, validateJWT} from '../utils/JWT.js';
import bcrypt from 'bcrypt';
class Usuario {
    _contrasena = null
    _id = null
    constructor(nombre, apellido, rut, correo, telefono, id_rol, fecha_actualizacion, fecha_creacion, ){
        this.nombre = nombre;
        this.apellido = apellido;
        this.rut = rut;
        this._correo = correo;
        this.id_rol = id_rol;
        this.fecha_actualizacion = fecha_actualizacion;
        this.fecha_creacion = fecha_creacion;
        this.telefono = telefono;
    }
    get contrasena(){
        return this._contrasena
    }
    set contrasena(contrasena){
        this._contrasena = contrasena
    }
    get id(){
        return this._id
    }
    set id(id){
        this._id = id
    }
    get correo (){
        return this._correo;
    }
    set correo (correo){
        this._correo = correo;
    }

    async crear(){
        let result = null;
        const hashed_password = await bcrypt.hash(this._contrasena, 10);
        console.log('hashed_pass', hashed_password);
        const pool = await createPool();
        const connection = await pool.getConnection();
        connection.beginTransaction();
        try {
            const query = `INSERT INTO usuario(nombre, apellido, rut, correo, telefono, contrasena, fecha_creacion, fecha_actualizacion, id_rol) 
                VALUES(?,?,?,?,?,?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?);`;
            const [rows] = await connection.query(query, [this.nombre, this.apellido, this.rut, this.telefono, this.correo, hashed_password, this.id_rol]);
            console.log('rows  insert usuario: ', rows);
            if(rows.insertId > 0){
                const [rows2] = await connection.query(`SELECT id_usuario, nombre, apellido, rut, correo, id_rol,fecha_creacion, fecha_actualizacion FROM usuario WHERE id_usuario = ?`, [rows.insertId]);
                result = rows2[0];
            }
            connection.commit();
            connection.release();
        } catch (error) {
            connection.rollback();
            console.log('insert usuario error: ',error);
        }
       return result;
    }
    async actualizar(){
        let result = false;
        const pool = await createPool();
        const connection = await pool.getConnection();
        try {
            const query = `UPDATE usuario SET nombre = ?, apellido = ?, rut = ?, correo = ?, fecha_actualizacion = CURRENT_TIMESTAMP WHERE id_usuario = ?`;
            const [rows] = await connection.query(query, [this.nombre, this.apellido, this.rut, this.correo, this._id]);
            console.log('rows  insert usuario: ', rows);
            if(rows.changedRows > 0){
                result = true;
            }
            connection.release();
        } catch (error) {
            console.log('insert usuario error: ',error);
        }
       return result;
    }
    delete(){

    }
    getall(){

    }
    async login(){
        let result = false;
        const pool = await createPool();
        const connection = await pool.getConnection();
        try {
            const query = `SELECT * FROM usuario WHERE correo = ?`;
            const [rows] = await connection.query(query, [this.correo]);
            console.log('rows  LOGIN usuario: ', rows);
            if(rows.length > 0){
                const usuario = rows[0];
                const bcrypt_result = await bcrypt.compare(this._contrasena, usuario.contrasena);
                if(bcrypt_result){
                    const {contrasena, ...nuevo_usuario} = usuario;
                    result = {token_acceso:generateJWT(nuevo_usuario)}
                }else{
                    result = false;
                }
            }
            connection.release();
        } catch (error) {
            console.log('insert usuario error: ',error);
        }
        return result;
    }
}
// Student.createStudent = async (student) =>{ 
//     let result = null;
//     try {
//         const pool = await createPool();
//         const connection = await pool.getConnection();
//         const query = `INSERT INTO student(name,idnumber,course,level) VALUES(?,?,?,?);`;
//         const [rows] = await connection.execute(query, [student.name,student.idnumber,student.course, student.level]);
//         console.log('rows  insert student: ', rows);
//         if(rows.insertId > 0){
//             student.id = rows.insertId;
//             result = student;
//         }
//     } catch (error) {
//         console.log('insert estudent error: ',error);
//     }
//     return new Promise((resolve, reject) =>{
//         resolve(result);
//     });
// }


export {Usuario};
