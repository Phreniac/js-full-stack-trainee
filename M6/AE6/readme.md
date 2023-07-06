## Control de Errores Nodejs

El control de errores es un aspecto esencial en la construcción de aplicaciones Node.js robustas y confiables. Un control adecuado de errores te ayuda a identificar y manejar los errores que pueden ocurrir durante la ejecución de tu código, asegurando que tu aplicación se comporte de manera adecuada y proporcione comentarios significativos a los usuarios. Aquí tienes un resumen de los conceptos y técnicas de control de errores en Node.js:

- Tipos de errores: Node.js proporciona un objeto integrado llamado Error que sirve como clase base para todos los errores. Puedes extender esta clase para crear tipos de errores personalizados para escenarios específicos en tu aplicación. Los tipos de errores personalizados pueden contener propiedades o métodos adicionales para proporcionar más contexto o información sobre el error.

- Ejemplo: Crear un tipo de error personalizado en Node.js:

```js
class MiErrorPersonalizado extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = 'MiErrorPersonalizado';
  }
}

throw new MiErrorPersonalizado('Algo salió mal.');
```
- Bloques try-catch: Utiliza bloques try-catch para capturar y manejar errores en código síncrono. Envuelve el código que puede generar un error dentro de un bloque try y captura el error en el bloque catch. Esto evita que el error colapse la aplicación y te permite tomar la acción apropiada.

- Ejemplo: Utilizar bloques try-catch en Node.js:

```js
try {
  // Código que puede generar un error
  throw new Error('Algo salió mal.');
} catch (error) {
  // Manejar el error
  console.error('Error:', error.message);
}
```

- Callbacks con primer parámetro de error: En Node.js, las funciones asíncronas a menudo siguen un patrón de callback con el primer parámetro como error. Este patrón implica pasar una función de callback como último argumento a una función asíncrona, donde el primer argumento del callback representa un error (si lo hay) y los argumentos subsiguientes contienen el resultado o datos adicionales.

- Ejemplo: Manejar errores con callbacks que devuelven el error como primer parámetro:

```js
function operacionAsincrona(callback) {
  // Simulando una operación asíncrona
  setTimeout(() => {
    const error = new Error('Algo salió mal.');
    callback(error, null); // Pasar el error como primer argumento
  }, 1000);
}

operacionAsincrona((error, resultado) => {
  if (error) {
    // Manejar el error
    console.error('Error:', error.message);
  } else {
    // Manejar el resultado
    console.log('Resultado:', resultado);
  }
});
```
- Promesas y Async/Await:  Las promesas proporcionan una forma estructurada y legible de manejar operaciones asíncronas y errores en comparación con los callbacks que devuelven el error como primer parámetro. Puedes utilizar la clase Promise y sus métodos (then, catch, finally) para manejar tanto los resultados exitosos como los errores. Async/Await es una sintaxis introducida en versiones más recientes de JavaScript que te permite escribir código asíncrono que parece síncrono, lo que facilita el manejo de errores.

- Ejemplo: Manejo de errores con Promesas y Async/Await:

```js
function operacionAsincrona() {
  return new Promise((resolve, reject) => {
    // Simulando una operación asíncrona
    setTimeout(() => {
      const error = new Error('Algo salió mal.');
      reject(error); // Rechazar la Promesa con el error
    }, 1000);
  });
}

operacionAsincrona()
  .then((resultado) => {
    // Manejar el resultado
    console.log('Resultado:', resultado);
  })
  .catch((error) => {
    // Manejar el error
    console.error('Error:', error.message);
  });

// Utilizando async/await
async function realizarOperacionAsincrona() {
  try {
    const resultado = await operacionAsincrona();
    // Manejar el resultado
    console.log('Resultado:', resultado);
  } catch (error) {
    // Manejar el error
    console.error('Error:', error.message);
  }
}
```