const User = require('../models/user')

// NEW
module.exports.renderRegister = (req, res) => {
    res.render('users/register')
}

// CREATE
module.exports.register = async (req, res, next) => {
    const { email, username, password } = req.body
    const user = new User({ email, username })
    console.log(user)
    const registeredUser = await User.register(user, password)    
    req.login(registeredUser, err => {
        if (err) return next(err)
        res.redirect('/workouts')
    })
}

// NEW
module.exports.renderLogin = (req, res) => {
    res.render('users/login')
}

// CREATE
module.exports.login = (req, res) => {
    res.redirect('/workouts')
}

// GET
module.exports.logout = function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  }