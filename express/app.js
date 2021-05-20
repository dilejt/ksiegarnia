const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

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
            connection.release() // return the connection to pool
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

app.post('/', (req, res) => {
    let book = req.body;
    console.log(book)
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('INSERT INTO ksiazka(tytul,autor) VALUES(?,?)', [book.title, book.author], (err, result) => {

        })
        res.end('Success')
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))