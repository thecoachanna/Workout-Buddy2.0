const express = require('express');
const router = express.Router({ mergeParams: true });
const comments = require('../controllers/comments')

// CREATE
router.post('/', comments.createComment)

// DELETE
router.delete('/:commentId', comments.deleteComment)



module.exports = router;