const yargs = require('yargs');

const argv = yargs.command('suma', 'Suma dos numeros enteros', (yargs)=>{
    yargs.option('num1',{
        alias: 'n1',
        description: 'Numero 1 entero a sumar',
        type: 'number',
        demandOption: true,
    }).option('num2',{
        alias: 'n2',
        description: 'Numero 2 entero a sumar',
        type: 'number',
        demandOption: true,
    });
}).command( 'resta', 'Resta dos numeros enteros', (yargs)=>{
    yargs.option('num1',{
        alias: 'n1',
        description: 'Numero 1 entero a restar',
        type: 'number',
        demandOption: true,
    }).option('num2',{
        alias: 'n2',
        description: 'Numero 2 entero a restar',
        type: 'number',
        demandOption: true,
    });
}).help().argv;

const command = argv._[0];
console.log(argv);
if(command === 'suma'){
    const number1 = argv.num1;
    const number2 = argv.num2;
    console.log('suma: ', number1 + number2);
}else if(command === 'resta'){
    const number1 = argv.num1;
    const number2 = argv.num2;
    console.log('resta: ', number1 - number2);
}else{
    console.log('El comando ingresado no existe');
}