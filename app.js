const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');
const session = require('express-session')
// const flash = require('connect-flash')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user')

const userRoutes = require('./routes/user')
const workoutRoutes = require('./routes/workouts')
const commentRoutes = require('./routes/comments')

mongoose.connect('mongodb://localhost:27017/workout-buddy2', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
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
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
const sessionConfig = {
    secret: 'secret',
    resave: false,
    saveUnititialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig))
// app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error')
    next();
})


app.use('/', userRoutes)
app.use('/workouts', workoutRoutes)
app.use('/workouts/:id/comments', commentRoutes)

// Attaching routes
app.get('/', (req, res) => {
    res.redirect('/register')
})

// Error handling
// app.use((err, req, res, next) => {
//     res.send('Something went wrong.')
// })

app.listen(3000, () => {
    console.log('Serving on Port 3000.')
})