const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  workout: {
    type: String,
  },
  gym: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  date: {
    type: String,
    // required: true,
  },
  time: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  image: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Workout", WorkoutSchema);
