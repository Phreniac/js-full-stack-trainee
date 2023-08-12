const loginUser = () => {
    console.log('iniciando sesión');
    const user_name = document.getElementById('user_name').value;
    const user_password = document.getElementById('user_password').value;
    try {
        if(user_name && user_password){
            const url = 'http://localhost:3000/user/login'
            const payload = {
                email: user_name,
                password : user_password
            }
            axios.post(url, payload).then(res =>{
                const data = res.data;
                if(data.err == null){
                    localStorage.setItem('access_token', JSON.stringify(data.data));
                    window.location.href = 'home.html'
                }
            }).catch(error =>{
                console.log('error de servidor, login: ', error);
            })
        }
    } catch (error) {
        console.log('error: ', error);
    }
}
const verifySession = () => {
    console.log('verify session');
    const access_token = JSON.parse(localStorage.getItem('access_token'));
    console.log(access_token);
    if(access_token){
        const url = 'http://localhost:3000/user/verify-token';
        const payload = {
            access_token: access_token,
        }
        axios.post(url, payload).then(res =>{
            const data = res.data;
            console.log('data verify', data);
            if(data.err){
                window.location.href = 'index.html';
            }
        }).catch(error =>{
            console.log('error de servidor, login: ', error);
        })
    }else{
        window.location.href = 'index.html';
    }
}
