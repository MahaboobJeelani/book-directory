const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require('body-parser')
const bookRoutes = require('./Routes/Bookroutes')

const app = express()
app.use(bodyparser.json())

mongoose.connect('mongodb://0.0.0.0:27017/bookdirectory')
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => { console.log("connected to node js application"); })


app.use('/books', bookRoutes)

const port = 8081
app.listen(port, () => console.log(`server is running on the port ${port}`))
