const express = require('express');
const router = express.Router();
const workouts = require('../controllers/workouts')
const { isLoggedIn } = require('../middleware')

// INDEX
router.get('/', workouts.index)

// NEW
router.get('/new', isLoggedIn, workouts.renderNewForm)

// CREATE
router.post('/', isLoggedIn, workouts.createWorkout)

// SHOW
router.get('/:id', workouts.showWorkout)

// EDIT
router.get('/:id/edit', isLoggedIn, workouts.renderEditForm)

// UPDATE
router.put('/:id', isLoggedIn, workouts.updateWorkout)

// DELETE
router.delete('/:id', isLoggedIn, workouts.deleteWorkout)

module.exports = router;