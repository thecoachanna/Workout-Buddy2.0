const express = require('express')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override');
const Workout = require('./models/workout')
const Comment = require('./models/comment')

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

// Attaching routes
app.get('/', (req, res) => {
    res.render('Home')
})

app.get('/workouts', async (req, res) => {
    const workouts = await Workout.find({});
    res.render('workouts/index', { workouts })
})

app.get('/workouts/new', (req, res) => {    
    res.render('workouts/new')
})

app.post('/workouts', async (req, res) => {   
   
        const workout = new Workout(req.body.workout)
        await workout.save()
        res.redirect(`/workouts/${workout._id}`)
  
})

app.get('/workouts/:id', async (req, res) => {
    const workout = await Workout.findById(req.params.id).populate('comments')
    res.render('workouts/show', { workout })
})

app.get('/workouts/:id/edit', async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    res.render('workouts/edit', { workout })
})

app.put('/workouts/:id', async (req, res) => {
    const { id } = req.params
    const workout = await Workout.findByIdAndUpdate(id, {...req.body.workout})
    res.redirect(`/workouts/${workout._id}`)
})

app.delete('/workouts/:id', async (req, res) => {
    const { id } = req.params
    await Workout.findByIdAndDelete(id)
    res.redirect('/workouts')
})

app.delete('/workouts/:id/comments/:commentId', async (req, res) => {
    // mongo operator pull
    const {id, commentId} = req.params
    await Workout.findByIdAndUpdate(id, { $pull: {comments: commentId} })
    await Comment.findByIdAndDelete(commentId)
    res.redirect(`/workouts/${id}`)
})

// creating comments
app.post('/workouts/:id/comments', async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    workout.comments.push(comment)
    await comment.save()
    await workout.save()
    res.redirect(`/workouts/${workout._id}`)
})

// Error handling
app.use((err, req, res, next) => {
    res.send('Something went wrong.')
})

app.listen(3000, () => {
    console.log('Serving on Port 3000.')
})