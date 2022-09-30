const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const users = require('../controllers/users')

// GET Register
router.get('/register', users.renderRegister)

// POST Register
router.post('/register', users.register)

// GET Login
router.get('/login', users.renderLogin)

// POST Login
router.post('/login', passport.authenticate('local'), users.login)

// GET Profile
// router.get('/:username', users.profile)

// GET Logout
router.get('/logout', users.logout)

module.exports = router