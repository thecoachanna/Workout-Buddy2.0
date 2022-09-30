const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    upcomingWorkouts: [{ref: "Workout", type: mongoose.SchemaTypes.ObjectId}]
})

// includes username, hash and salt fields
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema)