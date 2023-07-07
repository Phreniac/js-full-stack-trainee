### NPM

NPM (Node Package Manager) es el sistema de gestión de paquetes predeterminado para Node.js. Permite a los desarrolladores de Node.js instalar, compartir y administrar fácilmente las dependencias y módulos de sus proyectos.

NPM se instala automáticamente junto con Node.js, por lo que está disponible de inmediato después de instalar Node.js en tu sistema. Proporciona una interfaz de línea de comandos (CLI) que permite a los desarrolladores ejecutar varios comandos para administrar los paquetes.

#### Comandos

- npm init: Inicia la creación de un nuevo archivo "package.json" interactivo. Este archivo almacena la información del proyecto y sus dependencias.
- npm install: Instala las dependencias definidas en el archivo "package.json" en el directorio actual.
- npm install < paquete >: Instala un paquete específico y lo agrega como dependencia en el archivo "package.json".
- npm install --global < paquete >: Instala un paquete de manera global en tu sistema. Puedes acceder a él desde cualquier ubicación en tu línea de comandos.
- npm uninstall < paquete >: Desinstala un paquete y lo elimina de las dependencias en el archivo "package.json".
- npm update: Actualiza todas las dependencias del proyecto a las versiones más recientes compatibles.
- npm search < paquete >: Busca un paquete en el registro público de NPM.
- npm run < script >: Ejecuta un script definido en el archivo "package.json". Los scripts pueden ser comandos personalizados para construir, probar o ejecutar tu proyecto.
- npm publish: Publica tu paquete en el registro público de NPM para que otros desarrolladores puedan instalarlo.

### EXPRESS

Express es un framework de aplicación web rápido, minimalista y flexible para Node.js. Proporciona una serie de características y utilidades para facilitar la creación de aplicaciones web y API de manera más sencilla y eficiente.

Express se basa en Node.js y aprovecha su capacidad para manejar solicitudes y respuestas de manera asíncrona y no bloqueante. Proporciona una capa de abstracción sobre la API http de Node.js, lo que facilita la creación de rutas, el manejo de solicitudes y respuestas, el procesamiento de middleware y muchas otras tareas comunes en el desarrollo web.

#### Caracteristicas

- Enrutamiento: Permite definir rutas y manejar las solicitudes HTTP (GET, POST, PUT, DELETE, etc.) en esas rutas.
- Manejo de middleware: Permite agregar funciones de middleware para realizar operaciones antes o después de que se maneje una solicitud, como autenticación, compresión, registro, etc.
- Plantillas de vistas: Soporte para el uso de motores de plantillas para generar vistas dinámicas y enviarlas al cliente.
- Gestión de errores: Proporciona mecanismos para manejar errores de manera centralizada y personalizada.
- Integración de bases de datos: Es compatible con la integración de diferentes bases de datos a través de módulos y bibliotecas externas.
- Extensibilidad: Permite la creación y uso de middleware personalizado y la extensión de la funcionalidad de Express mediante el uso de complementos y módulos externos.
