### ¿Qué es un Middleware?
En Express.js, un middleware es básicamente una función que tiene acceso a los objetos de solicitud (request), respuesta (response), y al siguiente middleware en el ciclo de solicitud-respuesta de la aplicación, comúnmente denotado como next. Los middlewares pueden realizar tareas como:

- Modificar la solicitud o la respuesta.
- Finalizar el ciclo de solicitud-respuesta.
- Llamar al siguiente middleware en la pila.

### ¿Cómo funciona?
Cuando una solicitud se envía a un servidor Express, recorre una serie de middlewares (también conocidos como "capas") hasta que se envía una respuesta al cliente o hasta que la solicitud es terminada.

Por ejemplo, el popular middleware body-parser analiza el cuerpo de las solicitudes entrantes en un formato que es más fácil de trabajar en tu aplicación.

### ¿Cómo se utiliza un Middleware?

**Middleware de aplicación:** Este tipo de middleware se enlaza a la instancia de la aplicación.

```js
const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('Tiempo:', Date.now());
    next();
});
```

**Middleware de enrutador:** Este tipo de middleware se enlaza a una instancia de express.Router().

```js
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    console.log('Middleware de enrutador');
    next();
});

app.use('/my-router', router);
```

**Middleware incorporado:** Express tiene middlewares incorporados como express.static, que sirve para servir archivos estáticos.

`app.use(express.static('public'));`

**Middleware de terceros:** Puedes instalar middleware de terceros desde npm, como body-parser o morgan.

```js
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());
app.use(morgan('dev'));
```

**Middleware de manejo de errores:** Es específico para manejar errores, y generalmente se define con 4 argumentos.

```js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});
```

**Creación de un Middleware:**
Vamos a crear un simple middleware que registra la ruta accedida y la fecha en la consola:

```js
const express = require('express');
const app = express();

// Middleware
app.use((req, res, next) => {
    console.log(`Ruta accedida: ${req.path} - Fecha: ${new Date().toISOString()}`);
    next();
});

app.get('/', (req, res) => {
    res.send('¡Hola mundo!');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
```

En este ejemplo, cada vez que accedas a cualquier ruta de la aplicación, el middleware imprimirá en consola la ruta y la fecha antes de procesar la respuesta.