### Ejercicio preparación sprint final modulo 6

#### Contexto:

El objetivo del ejercicio es construir una aplicación web que permita a los usuarios registrarse, iniciar sesión, seleccionar temas y dificultades para un quiz, responder preguntas, obtener puntuaciones y ver una lista de las mejores puntuaciones según el tema y la dificultad.

##### Requerimientos:

- La aplicación debe permitir a los usuarios registrarse proporcionando su nombre, contraseña, rut(opcional) y email o si ya esta registrado iniciar sesión.
- Después de registrarse, los usuarios deben poder acceder a una página de inicio de sesión que solicite su email y contraseña
- Una vez que los usuarios hayan iniciado sesión, deberán poder seleccionar un tema de entre tres opciones(a elección) y una dificultad (facil, intermedio y dificil).
- Dependiendo del tema y la dificultad seleccionada, los usuarios deberán responder un quiz que consta de 10 preguntas, estas deben ser ordenadas aleatoreamente por cada vez que se participa.
- Cada pregunta debe registrar el tiempo que el usuario tarda en responder.
- La puntuación del usuario se calculará en función de las respuestas correctas y el tiempo empleado.
- Al finalizar el quiz, los usuarios deberán poder ver una lista con las 10 mejores puntuaciones para el tema y la dificultad seleccionados.
- La lista de puntuaciones debe mostrar el nombre de usuario, el tiempo empleado, el puntaje obtenido y la posición en la clasificación.

#### Consideraciones adicionales

- Utilizar Express como framework para el desarrollo de la aplicación.
- Implementar encriptación de contraseñas utilizando la biblioteca bcrypt para almacenar las contraseñas de forma segura.
- Utilizar plantillas handlebars para generar las páginas HTML dinámicamente.
- Almacenar la información de los usuarios registrados y las puntuaciones en un archivo json utilizando FS.
- Realizar validaciones de datos para asegurarse de que los usuarios ingresen información válida y evitar problemas de seguridad.
- Implementar control de errores en las rutas del servidor.
