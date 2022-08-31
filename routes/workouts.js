const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware')

const Workout = require('../models/workout')

router.get('/', async (req, res) => {
    const workouts = await Workout.find({});
    res.render('workouts/index', { workouts })
})

router.get('/new', isLoggedIn, (req, res) => {   
    res.render('workouts/new')
})

router.post('/', isLoggedIn, async (req, res) => { 
        const workout = new Workout(req.body.workout)
        await workout.save()
        res.redirect(`/workouts/${workout._id}`)  
})

router.get('/:id', async (req, res) => {
    const workout = await Workout.findById(req.params.id).populate('comments')
    res.render('workouts/show', { workout })
})

router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    res.render('workouts/edit', { workout })
})

router.put('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    const workout = await Workout.findByIdAndUpdate(id, {...req.body.workout})
    res.redirect(`/workouts/${workout._id}`)
})

router.delete('/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params
    await Workout.findByIdAndDelete(id)
    res.redirect('/workouts')
})

module.exports = router;