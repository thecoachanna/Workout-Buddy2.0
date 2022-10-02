if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user')
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/workout-buddy2'

const userRoutes = require('./routes/user')
const workoutRoutes = require('./routes/workouts')
const commentRoutes = require('./routes/comments')


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
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
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

const secret = process.env.SECRET || 'supersecret'

const sessionConfig = {
    store: MongoStore.create({ mongoUrl: dbUrl }),
    name: 'session',
    secret,
    collection: 'WorkoutBuddy2',
    touchAfter: 24 * 60 * 60,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
       next();
})

app.use('/', userRoutes)
app.use('/workouts', workoutRoutes)
app.use('/workouts/:id/comments', commentRoutes)

// Attaching routes
app.get('/', (req, res) => {
    res.render('home')
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Serving on port:${port}`)
})