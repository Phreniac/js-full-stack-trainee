import {Student} from '../model/studentModel.js';
export const createStudent = async (req, res) =>{
    let response = {
        msg:'Student creation',
        error: null,
        data: null
    };
    const name = req.body.name;
    const idnumber = req.body.idnumber;
    const course = req.body.course;
    const level = req.body.level;

    if(name && idnumber && course && level){
        const student = new Student(null, name, idnumber, course, level, null);
        const model_result = await Student.createStudent(student);
        if(model_result != null) response.data = model_result;
        else response.error = 'Error trying to create the student'
    }else{
        response.error = "Missing required parameters";
    }
    res.send(response);
};

export const getAllStudents = async (req, res) =>{
    let response = {
        msg:'Student get all',
        error: null,
        data: null
    };
    const model_result = await Student.getAllStudents();
    if(model_result != null) response.data = model_result;
    else response.error = 'Error trying to get all the students'
    res.send(response);
};