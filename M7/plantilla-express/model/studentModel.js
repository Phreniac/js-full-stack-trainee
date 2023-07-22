import {createPool} from '../utils/db.js';

class Student {
    constructor(id, name, idnumber, course, level, created){
        this.id = id;
        this.name = name;
        this.idnumber = idnumber;
        this.course = course;
        this.level = level;
        this._created = created
    }
}
Student.createStudent = async (student) =>{ 
    let result = null;
    try {
        const pool = await createPool();
        const connection = await pool.getConnection();
        const query = `INSERT INTO student(name,idnumber,course,level) VALUES(?,?,?,?);`;
        const [rows] = await connection.execute(query, [student.name,student.idnumber,student.course, student.level]);
        console.log('rows  insert student: ', rows);
        if(rows.insertId > 0){
            student.id = rows.insertId;
            result = student;
        }
    } catch (error) {
        console.log('insert estudent error: ',error);
    }
    return new Promise((resolve, reject) =>{
        resolve(result);
    });
}
Student.getAllStudents = async () => {
    let result = null;
    try {
        const pool = await createPool();
        const connection = await pool.getConnection();
        const query = `SELECT * FROM student;`;
        const [rows] = await connection.execute(query);
        console.log('rows get all student: ', rows);
        if(rows.length > 0){
            result = rows;
        }
    } catch (error) {
        console.log('get all estudents error: ',error);
    }
    return new Promise((resolve, reject) =>{
        resolve(result);
    });
}

export {Student};