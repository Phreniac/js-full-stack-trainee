/**
 * @file Este es un ejemplo para ver como funciona la documentacion a partir de la utilización de JSDoc
 * @param {string} text1 - primer texto
 * @param {string} text2 - segundo texto
 */

 //Se definen las constantes del array

const text1 = 'Hola';
const text2 = 'Documentación!';
const arrText = [text1, text2]

function textJoin(){
//Se juntan los textos del array
    return arrText.join(' ');
}

console.log(textJoin());