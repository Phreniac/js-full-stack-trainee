//llamado al modulo child_process
const child_process = require('child_process');

let num1 = null;
let num2 = null;
//funcion con child_process que ejecuta un archivo externo
function executor(file){
    return new Promise((resolve, reject)=>{
        child_process.exec(`node ${file}`, function(err, result){
            resolve(Number(result));
        });
    });
}
//Ejecuta la funcion que devuelve como promesa el child_process
executor("num1.js").then(num1_ =>{
    num1 = num1_;
    console.log('num1: ', num1_);
    executor("num2.js").then(num2_ =>{
        num2 = num2_;
        console.log('num2: ', num2_);
        console.log(num1 + num2);
    });
});


