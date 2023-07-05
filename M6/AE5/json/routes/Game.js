const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const fs = require('fs');

let gameList = [];

router.get('/test', (req, res)=>{
    res.send('ruta test de game');
});
router.post('/create', (req, res)=>{
    let platform_list = [];
    if(req.body.platform.length > 0){
        req.body.platform.forEach(id_pl => {
            platform_ = getPlatformById(id_pl);
            console.log('plataformas', platform_	);
            platform_list.push(platform_); 
        });
    }
    if(req.body.title && req.body.genre && req.body.developer_company && req.body.release_date){
        const game = {
            id: gameList.length + 1,
            title: req.body.title,
            platform: platform_list,
            genre: req.body.genre,
            developer_company: req.body.developer_company,
            release_date: req.body.release_date
        }
        gameList.push(game);
        console.log(gameList);
        writeGame(gameList);
        res.send('The game was created successfully')
    }else{
        res.send('Missing required information.');
    }
});
router.get('/get-all', (req, res)=>{
    res.send(gameList)
});

const writeGame = (games)=>{
    fs.writeFile('./db/games.json',JSON.stringify(games, null , 2), (err)=>{
        if(err) console.log('error al escribir archivo')
        console.log('Archivo creado');
        return true;
    });
};
const getAllGame = ()=>{
    fs.readFile('./db/games.json', 'utf-8', (err, data)=>{
        if(err) console.log(err);
        if(data) gameList = JSON.parse(data);
    });
}
const getPlatformById = (id_platform_) =>{
    let platform_list = [];

    try {
       const data = fs.readFileSync('./db/platforms.json', 'utf-8');
        console.log('lista plataforma', data);
        if(data) platform_list = JSON.parse(data);
        else platformList = [];
    } catch (error) {
        console.log('Error reading the file');
    }
    console.log('id plataforma', id_platform_);
    const finded_platform =  platform_list.find(platform => platform.id == id_platform_);
    console.log('finded', finded_platform);
    if(finded_platform) return finded_platform
    else return null;
};
getAllGame();
module.exports = router;