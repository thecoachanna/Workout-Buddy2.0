const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');

const workouts = require('./routes/workouts')
const comments = require('./routes/comments')

mongoose.connect('mongodb://localhost:27017/workout-buddy2', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected.")
})

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use('/workouts', workouts)
app.use('/workouts/:id/comments', comments)

// Attaching routes
app.get('/', (req, res) => {
    res.render('Home')
})

// Error handling
app.use((err, req, res, next) => {
    res.send('Something went wrong.')
})

app.listen(3000, () => {
    console.log('Serving on Port 3000.')
})