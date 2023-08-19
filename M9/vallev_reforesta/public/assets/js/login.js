
const base_url = 'http://localhost:3200/';
const inicioSesion = () =>{
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const url = `${base_url}usuario/login`;
    const payload = {
        correo: correo,
        contrasena: contrasena
    }
    axios.post(url,payload).then(res=>{
        console.log('respuesta login server', res);
        const data = res.data;
        if(data.error === null){
            localStorage.setItem('token_accesso', JSON.stringify(data.data.token_acceso))
        }
    }).catch(error =>{
        console.log('error: ', error);
    })

}