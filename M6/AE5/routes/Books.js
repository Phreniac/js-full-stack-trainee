const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const fs = require('fs');

let bookList = [];

router.get('/get-all', (req, res)=>{
    res.send(bookList);
});
router.get('/get-book/:id_book', (req, res)=>{
    if(req.params.id_book){
       const finded_book = bookList.find(book => book.id_book == req.params.id_book);
        if(finded_book){
            res.send(finded_book);
        }else{
            res.send('The book does not exist.');
        }
    }else{
        res.send('Missing required information.');  
    }
});
router.post('/create', (req, res)=>{
   
    if(req.body.book_name && req.body.book_author 
        && req.body.release_date && req.body.category
        && req.body.editorial){
            const book = {
                id_book: bookList.length + 1,
                uuid: uuidv4(),
                name: req.body.book_name,
                author: req.body.book_author,
                release_date: req.body.release_date,
                category: req.body.category,
                editorial: req.body.editorial,
                creation_date:  moment()
            }
            bookList.push(book);
            const stringified_content = JSON.stringify(bookList);
            fs.writeFile('../AE5/db/books.txt', stringified_content, (err)=>{
                if(err) console.log('error al escribir archivo')
                console.log('Archivo creado');
            })
            res.send(book);
    }else{
        res.send('Missing required information.');
    }
   
});

const getAllBook = () =>{
    fs.readFile('./db/books.txt', 'utf-8', (err, data)=>{
        if(err) console.log(err);
        bookList = JSON.parse(data);
    });
}
getAllBook();
module.exports = router;