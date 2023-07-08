const bcrypt = require('bcrypt');
const password = 'jsfullstack123';
const hashed_password = '$2b$10$dKmK9jzXX.FfLI72agp9Ju8QCo8yXJ925sKy4uUkPuLcVDGxDRZBG';

// bcrypt.hash(password, 10, (err, hash)=>{
//     if(err){
//         console.log('error bcrypt:', err);
//     }else{
//         console.log('password hasheada', hash);
//     }
// });

bcrypt.compare(password, hashed_password, (err, result)=>{
    if(err){
        console.log('error al comparar: ', err);
    }else if(result){
        console.log('la contraseña es correcta!')
    }else{
        console.log('la contraseña es incorrecta');
    }
});