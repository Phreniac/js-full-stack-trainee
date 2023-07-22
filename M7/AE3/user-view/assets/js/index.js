
const loginUser = async ()=>{
    //constante para almacenar el elemento de alerta, en caso de error
    const alert = document.getElementById('alert_container');
    //definicion de url para el consumo de datos (ruta de inicio de sesión)
    const url = 'http://localhost:3200/user/login';
    //elemeto para el input de usuario
    const _user = document.getElementById('user').value;
    //elemento para el input de contraseña
    const _password = document.getElementById('password').value;
    //se validan los valores de los inputs
    if(_user && _password){
        //se crea una constante payload con los datos necesarios para el consumo del servicio de inicio de sesion
        const payload = {
            user: _user,
            password: _password
        }
        //llamado a axios para ejecutar un request con metodo post, en donde se agrega el payload creado
        await axios.post(url, payload).then(res=>{
            //se define una constante para almacenar la data que viene como respuesta del consumo del servicio
            const data = res.data;
            //si no hay error, se almacena la información del usuario que inicio en el localstorage
            if(data.error == null){
               console.log('inicio de sesión correcto', data);
            }else{
                //si ocurrio un error se cambia la propiedad style del elemento alerta para indicar un error
                console.log('STyLE', alert.style.display);
                alert.style.display = 'block';
                //se ejecuta un timeout para ocultar la alerta de error luego de 5 segundos
                setTimeout(()=>{
                    alert.style.display = 'none'
                },5000);
                console.log('error inicio sesion: ', data.error);
            }
        });
    }
}
