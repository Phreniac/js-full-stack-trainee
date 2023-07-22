## Patrón de diseño MVC
El patrón de diseño Modelo-Vista-Controlador (MVC) es un enfoque arquitectónico que divide una aplicación en tres componentes principales: el Modelo, la Vista y el Controlador. Cada componente tiene responsabilidades específicas y trabaja en conjunto para lograr una separación de preocupaciones y una estructura organizada.

- Modelo (Model): El modelo representa la capa de datos de la aplicación. Contiene la lógica de negocio, la gestión de datos y la interacción con la base de datos u otros servicios externos. En el contexto del ejercicio, el modelo se encargaría de manejar la lógica relacionada con los usuarios registrados, las puntuaciones y cualquier otra operación relacionada con los datos.

- Vista (View): La vista es la capa de presentación de la aplicación. Es responsable de mostrar la información al usuario y recibir las interacciones del usuario. En el ejercicio, las vistas serían las páginas HTML generadas con la plantilla Handlebars, como la página de registro, la página de inicio de sesión, la página del quiz y la página de la clasificación. Las vistas se encargan de mostrar los datos al usuario y enviar cualquier interacción o entrada del usuario al controlador.

- Controlador (Controller): El controlador actúa como intermediario entre el modelo y la vista. Recibe las interacciones del usuario desde la vista, realiza las operaciones necesarias en el modelo y actualiza la vista en consecuencia. En el ejercicio, los controladores serían las funciones que manejan las rutas y las solicitudes HTTP. Por ejemplo, el controlador se encargaría de registrar un nuevo usuario, autenticar al usuario durante el inicio de sesión, guardar las puntuaciones del usuario y proporcionar los datos necesarios a las vistas para mostrar la clasificación.

El patrón de diseño MVC promueve la separación de responsabilidades y permite una estructura modular y mantenible para la aplicación. Cada componente tiene una tarea claramente definida, lo que facilita el desarrollo y la colaboración en equipo.

En tu implementación, puedes crear una estructura de directorios donde tengas carpetas separadas para modelos, vistas y controladores. Dentro de cada carpeta, puedes organizar tus archivos de acuerdo con las funcionalidades y componentes relacionados. De esta manera, puedes seguir el flujo de datos y la interacción entre los componentes de manera más clara y eficiente.

##### Estructura de carpetas y archivos:

>- server.js
>- controllers/
>   - userController.js
>- models/
>   - userModel.js
>- router(views)/
>   - index.js
>   - userRoutes.js
>- public/
>   - index.html
>   - css/
>       - styles.css

##### Ejemplo:

- Archivo `server.js`
```js
//creación de servidor con express
const express = require('express');
const app = express();
const routes = require('./routes/index.js');

// Se utilizan las rutas en la raiz
app.use('/', routes);

const port = 3000;

//se levanta el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
```
- Archivo `routes/index.js`
```js
const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');

router.use('/user', userRoutes);

module.exports = router;
```

- Archivo `routes/userRoutes.js`
```js
const express = require('express');
const router = express.Router();
//se importa el controlador
const userController = require('../userController');

//Ruta para crear un usuario
router.post('/register', async (req, res) => {

    // validación de data que se necesita para registrar un usuario
    // las respuestas al cliente pueden ser mas elaboradas
    const user = req.body;
    await userController.registerUser(user).then(res_ =>{
        if (res_) {
            response.data = res_;  
            res.status(200).send(true);
        } 
        else {
            res.status(500).send(false);
        } 
    });
  });
module.exports = router;
```

- Archivo `controller/userController.js`

```js
const User = require('../models/userModel');

const registerUser = async (user_data) =>{
    const user = new User();
    await user.register(user).then(res=>{
        if(res.err == null) return true;
        else return false;
    });
}

const loginUser = async (credentials) =>{
    const user = new User();
    await user.login(credentials).then(res=>{
        if(res.err == null) return true;
        else return false;
    });
}

module.exports = {registerUser, loginUser}

```

- Archivo `model/userModel.js`

```js
//importaciones requeridas como mysql2
const bcrypt = require('bcrypt');

const User = class {
    constructor(){
        //atributos de usuario
    }
    //registrar un usuario
    async register(user_data) {
        let result = false;
        try{
             //logica de registro de un usuario
            result = true;
        } catch (error) {
            console.log(error);
        } 
        return new Promise(async (resolve) => {
            resolve(result);
        })
    },
    async login(credentials) {
        let result = false;
        try{
            //logica de encriptación de contraseña con bcrypt
            //logica de registro de un usuario  
            result = true;
        } catch (error) {
            console.log(error);
        } 
        return new Promise(async (resolve) => {
            resolve(result);
        })
    },
}

module.exports {User};
```