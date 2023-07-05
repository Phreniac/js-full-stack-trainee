const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const fs = require('fs');

let platformList = [];

router.get('/test', (req, res)=>{
    res.send('ruta test de platform');
});

router.post('/create', (req, res)=>{
    if(req.body.name && req.body.company && req.body.release_date){
        const platform = {
            id: platformList.length + 1,
            name: req.body.name,
            company: req.body.company,
            release_date: req.body.release_date,
        }
        platformList.push(platform);
        writePlatform(platformList);
        res.send('The platform was created successfully')
    }else{
        res.send('Missing required information.');
    }
    
});

router.get('/get-all', (req, res)=>{
    res.send(platformList)
});

const writePlatform = (platform)=>{
    fs.writeFile('./db/platforms.json',JSON.stringify(platform, null , 2), (err)=>{
        if(err) console.log('error al escribir archivo')
        console.log('Archivo creado');
        return true;
    });
};

const getAllPlatform = ()=>{
    fs.readFile('./db/platforms.json', 'utf-8', (err, data)=>{
        if(err) console.log(err);
        if(data) platformList = JSON.parse(data);
        else platformList = [];
    });
}

getAllPlatform();
module.exports = router;