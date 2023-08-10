### JSON WEB TOKEN

JSON Web Token (JWT) es un estándar abierto (RFC 7519) que define un formato compacto y autónomo para transmitir información entre partes de manera segura como un objeto JSON. Estos tokens son utilizados principalmente para la autenticación y la autorización en aplicaciones web y servicios API. Los JWT son especialmente útiles cuando se trabaja en entornos distribuidos, donde la autenticación debe realizarse entre diferentes dominios o servicios.

##### Un JWT consta de tres partes separadas por puntos (.):

- **Encabezado (Header):** Contiene información sobre el algoritmo de firma utilizado y el tipo de token. El encabezado generalmente consta de dos partes: el tipo de token (que es JWT) y el algoritmo de firma que se utiliza, como HMAC SHA256 o RSA.

- **Carga (Payload):** Es donde se almacenan los datos que queremos transmitir. La carga contiene una serie de declaraciones llamadas "claims". Hay tres tipos de claims: declaraciones registradas, declaraciones públicas y declaraciones privadas. Algunos ejemplos de claims registrados son "iss" (emisor), "sub" (sujeto), "exp" (tiempo de expiración) y "iat" (tiempo de emisión).

- **Firma (Signature):** Para verificar que el remitente del token es quien dice ser y para garantizar que la carga no ha sido alterada en el camino, se utiliza una firma digital. La firma se crea utilizando la codificación Base64 del encabezado y la carga, junto con una clave secreta (en el caso de HMAC) o un par de claves pública/privada (en el caso de RSA).

##### Un JWT típico se vería de la siguiente manera: xxxxx.yyyyy.zzzzz.

#### Los pasos básicos para trabajar con JWT son los siguientes:

- **Autenticación:** Cuando un usuario inicia sesión, el servidor genera un JWT y lo devuelve al cliente. El cliente almacena este token, generalmente en las cookies o en el almacenamiento local.

- **Solicitud de recursos:** El cliente envía el JWT con cada solicitud al servidor para demostrar su autenticidad.

- **Validación:** El servidor verifica la firma y los claims del JWT para asegurarse de que el token sea válido. Si es válido, el servidor puede permitir el acceso a los recursos protegidos.