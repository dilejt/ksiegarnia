const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'images')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})
const upload = multer({ dest: './public/images/' })
const app = express()
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'ksiegarnia'
})

app.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from ksiazka', (err, rows) => {
            connection.release()
            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            // if(err) throw err
            console.log('The data from table: \n', rows)
        })
    })
})

app.post('/add', upload.single('file'), (req, res) => {
    let book = req.body
    console.log(JSON.stringify(req.body.img))
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('INSERT INTO ksiazka(tytul,autor) VALUES(?,?)', [book.tytul, book.autor], (err, result) => {
            connection.release()
        })
        res.end('Success')
    })
})

app.delete('/delete', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('DELETE FROM ksiazka WHERE id=(?)', req.body.id, (err, rows) => {
            connection.release()
        })
        res.end('Success')
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))