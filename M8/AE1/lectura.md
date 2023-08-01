
### API RESTful

RESTful es un término que se refiere a los servicios web que implementan el estilo de arquitectura Representational State Transfer (REST). Las APIs RESTful están diseñadas para aprovechar los protocolos HTTP existentes de manera eficiente y segura, usando principalmente los verbos HTTP (GET, POST, PUT, DELETE, etc.) para operar sobre los recursos, que son representados en varios formatos como JSON, XML, etc.

principios que rigen una API RESTful:

- **Interfaz uniforme:** Para mantener la consistencia en todo el servicio web, las APIs RESTful suelen tener una interfaz uniforme que ayuda a decouplear al cliente del servidor. Esta uniformidad se logra utilizando recursos identificados por URIs (Uniform Resource Identifier) y usando los verbos HTTP estándar para todas las operaciones.

- **Cliente-Servidor:** Esta es una arquitectura que separa las responsabilidades del cliente y del servidor. El cliente se encarga de la interfaz de usuario y la manipulación de los datos del usuario, mientras que el servidor se encarga de almacenar y recuperar los datos. Este principio asegura que el cliente y el servidor puedan desarrollarse y evolucionar de manera independiente.

- **Stateless (Sin estado):** En las APIs RESTful, todas las solicitudes del cliente al servidor deben contener toda la información necesaria para entender y procesar la solicitud. El servidor no debe retener ninguna información sobre el estado del cliente entre las solicitudes.

- **Cacheable (Almacenamiento en caché):** Las respuestas del servidor pueden ser marcadas como cacheables o no cacheables. Si una respuesta es cacheable, el cliente puede reutilizarla para solicitudes idénticas en el futuro, lo que reduce la interacción entre el cliente y el servidor y mejora la velocidad y eficiencia de la aplicación.

- **Sistema en capas:** Un cliente que interactúa con un servidor RESTful no necesita saber si se comunica directamente con el servidor final o con un servidor intermedio. Esto permite a los desarrolladores diseñar la infraestructura de la API para mejorar la seguridad, el rendimiento o la escalabilidad, agregando capas como balanceadores de carga, firewalls, etc.

- **Código bajo demanda (opcional):** En algunos casos, las APIs RESTful pueden optar por permitir que los servidores envíen código ejecutable (como JavaScript) a los clientes para extender su funcionalidad. Sin embargo, esta característica es menos común y no se considera un requisito para las APIs RESTful.


Además de estas características fundamentales, hay varias buenas prácticas que deben seguirse al diseñar e implementar una API REST:

- **Uso correcto de los métodos HTTP:** Es importante utilizar los métodos HTTP de la manera en que fueron diseñados para ser utilizados. Por ejemplo, GET para obtener un recurso, POST para crear un recurso, PUT para actualizar un recurso y DELETE para eliminar un recurso.

- **Manejo adecuado de errores:** Al manejar errores, es útil utilizar los códigos de estado HTTP para indicar el éxito o el fracaso de una solicitud.

- **Hipermedia / HATEOAS:** La Arquitectura de Aplicación de Hypermedia As The Engine Of Application State (HATEOAS) es una práctica avanzada en la que los recursos devuelven enlaces a otros recursos, lo que permite al cliente navegar por la API más fácilmente.

- **Versionamiento:** Es buena práctica proporcionar una versión de la API para evitar la rotura de las aplicaciones clientes cuando se hacen cambios en la API.

- **Seguridad:** Asegúrese de que las comunicaciones con la API estén seguras, generalmente utilizando SSL/TLS. Además, es posible que deba implementar algún tipo de autenticación y autorización.

- **Paginación y filtrado:** Para conjuntos de datos grandes, es útil proporcionar métodos para que los clientes puedan paginar los resultados y filtrar los datos.

- **Documentación clara y completa:** La documentación detallada es esencial para que los desarrolladores comprendan cómo interactuar con la API.

#### API RESTful con NODE/EXPRESS

- Instala los paquetenes necesarios:
`npm install express`

- Crea un archivo llamado "server.js" (o cualquier otro nombre que prefieras). en este archivo

- Configurar el servidor Express
Abre el archivo server.js y agrega el siguiente código:

```js
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('¡Hola Mundo!');
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
```

Este código crea un servidor Express que escucha en el puerto 3000 y responde con "¡Hola Mundo!" cuando visitas la ruta raíz (http://localhost:3000/).

- Ejecutar el servidor:
Finalmente, puedes ejecutar el servidor usando Node.js con el siguiente comando en la línea de comandos:

`node server.js`

Ahora, si vas a http://localhost:3000 en tu navegador, deberías ver el mensaje "¡Hola Mundo!".