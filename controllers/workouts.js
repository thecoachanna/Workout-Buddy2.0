const Workout = require('../models/workout')
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

// INDEX Workouts
module.exports.index = async (req, res) => {
    const workouts = await Workout.find({});
    res.render('workouts/index', { workouts })
}

// NEW Workout
module.exports.renderNewForm = (req, res) => {   
    res.render('workouts/new')
}

// CREATE Workout
module.exports.createWorkout = async (req, res) => { 
    const geoData = await geocoder.forwardGeocode({
        query: req.body.workout.address,
        limit: 1
    }).send()   
    const workout = new Workout(req.body.workout)
    workout.geometry = geoData.body.features[0].geometry;
    workout.author = req.user._id
    await workout.save()
    res.redirect(`/workouts/${workout._id}`)  
}

// SHOW Workout
module.exports.showWorkout = async (req, res) => {
    const workout = await Workout.findById(req.params.id).populate('comments').populate('author')
    res.render('workouts/show', { workout })
}

// EDIT Workout
module.exports.renderEditForm = async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    res.render('workouts/edit', { workout })
}

// UPDATE Workout
module.exports.updateWorkout = async (req, res) => {
    const { id } = req.params
    const workout = await Workout.findById(id)
    if (!workout.author === req.user._id) {
        return res.redirect(`/workouts/${id}`)
    }
    const w = await Workout.findByIdAndUpdate(id, {...req.body.workout})
    res.redirect(`/workouts/${workout._id}`)
}

// DELETE Workout
module.exports.deleteWorkout = async (req, res) => {
    const { id } = req.params
    await Workout.findByIdAndDelete(id)
    res.redirect('/workouts')
}