## YARGS

Yargs es una biblioteca de Node.js utilizada para analizar y procesar argumentos de línea de comandos de manera sencilla. Proporciona una interfaz intuitiva y flexible para definir opciones y argumentos de línea de comandos, así como manejar su validación, transformación y generación de ayuda.

Algunas de las características y funcionalidades clave de Yargs son:

1. Definición de opciones y argumentos: Yargs permite definir opciones y argumentos de línea de comandos con su respectiva configuración, como alias, descripción, tipo de dato esperado, entre otros.

2. Parsado automático: Yargs analiza automáticamente los argumentos de línea de comandos proporcionados por el usuario y los convierte en un objeto fácilmente accesible.

3. Tipos de datos flexibles: Yargs admite varios tipos de datos predefinidos, como cadenas, números, booleanos, arreglos, entre otros. Además, permite definir tipos de datos personalizados según tus necesidades.

4. Validación de argumentos: Yargs facilita la validación de los argumentos de línea de comandos según las reglas que hayas definido. Puede verificar si se han proporcionado todos los argumentos requeridos y si cumplen ciertas condiciones.

5. Generación de ayuda automatizada: Yargs puede generar automáticamente una ayuda clara y completa para tu aplicación de línea de comandos, incluyendo descripciones de opciones, argumentos y cómo utilizarlos.

##### Ejemplo:
```js
const yargs = require('yargs');

// Definir comandos y opciones
const argv = yargs
  .command('greet', 'Greet a person', (yargs) => {
    yargs
      .option('name', {
        alias: 'n',
        description: 'Person to greet',
        type: 'string',
        demandOption: true,
      });
  })
  .command('calculate', 'Perform a calculation', (yargs) => {
    yargs
      .option('number1', {
        alias: 'n1',
        description: 'First number',
        type: 'number',
        demandOption: true,
      })
      .option('number2', {
        alias: 'n2',
        description: 'Second number',
        type: 'number',
        demandOption: true,
      });
  })
  .help()
  .argv;

// Manejar los comandos y opciones
const command = argv._[0];

if (command === 'greet') {
  const name = argv.name;
  console.log(`Hello, ${name}!`);
} else if (command === 'calculate') {
  const number1 = argv.number1;
  const number2 = argv.number2;
  const result = number1 + number2;
  console.log(`Result: ${result}`);
} else {
  console.log('Unknown command');
}
```
#### Metodos más comunes de Yargs

- option(key, config): Define una opción de línea de comandos con su configuración, como alias, descripción, tipo de dato esperado, entre otros.

- positional(key, config): Define un argumento posicional de línea de comandos con su configuración, similar a option() pero sin la necesidad de utilizar una bandera.

- command(command, description, [builder], [handler]): Define un comando en tu aplicación con su nombre, descripción y, opcionalmente, una función para configurar las opciones y argumentos específicos del comando, así como una función para manejar la lógica del comando.

- help(): Agrega automáticamente una opción --help que muestra la ayuda generada automáticamente.

- alias(key, alias): Establece un alias para una opción específica.

- demandOption(key, [msg || boolean]): Indica que una opción es obligatoria.

- default(key, value, [msg || boolean]): Establece un valor predeterminado para una opción.

- describe(key, description): Proporciona una descripción para una opción o comando.

- boolean(key): Especifica que una opción debe interpretarse como un valor booleano.

- number(key): Especifica que una opción debe interpretarse como un valor numérico.

- string(key): Especifica que una opción debe interpretarse como una cadena de texto.

- array(key): Especifica que una opción debe interpretarse como un arreglo.

- choices(key, choices): Define una lista de valores válidos para una opción.

- nargs(key, count): Especifica el número de argumentos esperados para una opción.
