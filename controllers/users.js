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

// GET Logout
module.exports.logout = function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
  }

// GET Profile
module.exports.profile = (req, res) => {
    User.findById(req.params.id).populate('upcomingWorkouts')
    .then(user => {
        res.render("users/profile", { user, currentUser: req.user });
    })
    .catch(res.status(400).json)
    
  };

  module.exports.addWorkoutToProfile = (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {$push:{upcomingWorkouts:req.body.workoutId}}, { new: true },
        (err, user) => {
          if (err) {
            res.status(400).json(err);
            return;
          }
          res.redirect(`/profile/${ req.user._id}`)
        }
      );
  }