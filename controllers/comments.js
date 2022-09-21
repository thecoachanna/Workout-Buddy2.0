const Workout = require('../models/workout')
const Comment = require('../models/comment')

// CREATE Comment
module.exports.createComment = async (req, res) => {
    const workout = await Workout.findById(req.params.id)
    const comment = new Comment(req.body.comment)
    workout.comments.push(comment)
    await comment.save()
    await workout.save()
    res.redirect(`/workouts/${workout._id}`)
}

// DELETE Comment
module.exports.deleteComment = async (req, res) => {
    // mongo operator pull
    const {id, commentId} = req.params
    await Workout.findByIdAndUpdate(id, { $pull: {comments: commentId} })
    await Comment.findByIdAndDelete(commentId)
    res.redirect(`/workouts/${id}`)
}