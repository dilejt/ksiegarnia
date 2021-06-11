const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const multer  = require('multer')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, '../public/images/')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname.split('.')[0]}-${Date.now()}.jpg`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fieldNameSize: 256,
        fileSize: 52428800,
        files: 1
      }
})

const pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'ksiegarnia'
})

app.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('select connected as id ' + connection.threadId)
        connection.query('SELECT * FROM ksiazka', (err, rows) => {
            connection.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            console.log('The data from table: \n', rows)
        })
    })
})

app.post('/add', upload.single('file'), (req, res, next) => {
    let book = req.body
    let file = req.file;
    if(file) res.send(file) //save file on disk
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('insert connected as id ' + connection.threadId)
        if(file){
            connection.query('INSERT INTO ksiazka(tytul,autor,img) VALUES(?,?,?)', [book.title, book.author, "/images/" + file.filename], (err, result) => {
                connection.release()
            })
        }else{
            connection.query('INSERT INTO ksiazka(tytul,autor) VALUES(?,?)', [book.title, book.author], (err, result) => {
                connection.release()
            })
        }
        res.end('Inserted')
    })
})

app.delete('/delete', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        let path = null
        console.log('delete connected as id ' + connection.threadId)
        connection.query('SELECT img FROM ksiazka WHERE id=(?)', req.body.id, (err, rows) => {
            if(rows) path = "../public" + rows[0].img
            connection.query('DELETE FROM ksiazka WHERE id=(?)', req.body.id, (err, rows) => {
                connection.release()
            })
            if(path){
                fs.unlink(path, (err) => {
                    if (err) {
                      console.error(err)
                      return
                    }
                    //file removed from disk
                })
            }
            res.end('Deleted')
        })


    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))