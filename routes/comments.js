const express = require('express');
const router = express.Router({ mergeParams: true });

const Workout = require('../models/workout')
const Comment = require('../models/comment')

// creating comments
router.post('/', async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    workout.comments.push(comment)
    await comment.save()
    await workout.save()
    res.redirect(`/workouts/${workout._id}`)
})

router.delete('/:commentId', async (req, res) => {
    // mongo operator pull
    const {id, commentId} = req.params
    await Workout.findByIdAndUpdate(id, { $pull: {comments: commentId} })
    await Comment.findByIdAndDelete(commentId)
    res.redirect(`/workouts/${id}`)
})



module.exports = router;