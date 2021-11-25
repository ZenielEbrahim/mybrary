if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


const path = require('path')
const express = require('express')
const hbs = require('hbs')

const mongoose = require('mongoose')

const viewsPath = path.join(__dirname, "../templates/views")
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, "../templates/_partials")
 
const app = express()
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

console.log(process.env.DATABASE_URL)

db.on('error', (err) => console.error(error))
db.once('open', ()=> console.log('connection established'))

const indexRouter = require('./routes/index')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicPath))
app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)