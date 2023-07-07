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
    //se valida el parametro id
    if(req.params.id_book){
        //si es valido se busca el libro con el id
       const finded_book = bookList.find(book => book.id_book == req.params.id_book);
        if(finded_book){
            //si se encuentra se envia al cliente
            res.send(finded_book);
        }else{
            //si no se encuentra se envia la respuesta que no se encontro
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
            writeFileContent(stringified_content);
            res.send(book);
    }else{
        res.send('Missing required information.');
    }
   
});
router.post('/update', (req, res)=>{
    if(req.body.id_book && req.body.book_name && req.body.book_author 
        && req.body.release_date && req.body.category
        && req.body.editorial){
            const book_index = getBookById(req.body.id_book);
            if(book_index != -1){
                bookList[book_index].name = req.body.book_name;
                bookList[book_index].author = req.body.book_author;
                bookList[book_index].release_date = req.body.release_date;
                bookList[book_index].category = req.body.category;
                bookList[book_index].editorial = req.body.editorial;
            }
            const stringified_content = JSON.stringify(bookList);
            writeFileContent(stringified_content);
            res.send('The book was updated successfuly');
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
const getBookById = (id_book) =>{
    return bookList.findIndex(book => book.id_book == id_book);
}
const writeFileContent = (stringified_content)=>{
    fs.writeFile('../AE5/db/books.txt',stringified_content , (err)=>{
        if(err) console.log('error al escribir archivo')
        console.log('Archivo creado');
        return true;
    })
}
getAllBook();

module.exports = router;