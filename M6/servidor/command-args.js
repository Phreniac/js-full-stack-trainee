console.log(process.argv);
const fs = require('fs');
const args = process.argv.slice(2);
const fileName = args[0]+'.'+args[2];
const fileContent = args[1];
fs.writeFile(fileName, fileContent, (error) => {
    if (error) {
      console.error(error);
      return;
    }
    console.log('El archivo se ha escrito correctamente.');
});

console.log('args', args);

