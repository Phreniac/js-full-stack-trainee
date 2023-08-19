const base_url = 'http://localhost:3200/';
const registro = ()=>{
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const rut = document.getElementById('rut').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const contrasena = document.getElementById('contrasena').value;
    const url = `${base_url}usuario/crear`
    const payload = {
        nombre: nombre,
        apellido: apellido,
        rut: rut,
        correo: correo,
        telefono: telefono,
        contrasena: contrasena,
        id_rol: 1
    }
    axios.post(url, payload).then(res =>{
        console.log('respuesta server creación');
        resetInputRegistro();
    }).catch(error =>{
        console.log('error',error);
    })
}

const resetInputRegistro = ()=>{
    const nombre = document.getElementById('nombre');
    const apellido = document.getElementById('apellido');
    const rut = document.getElementById('rut');
    const correo = document.getElementById('correo');
    const telefono = document.getElementById('telefono');
    const contrasena = document.getElementById('contrasena');

    nombre.value = '';
    apellido.value = '';
    rut.value = '';
    correo.value = '';
    telefono.value = '';
    contrasena.value = '';
}