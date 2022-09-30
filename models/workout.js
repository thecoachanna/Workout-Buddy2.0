const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = require('./comment')

const WorkoutSchema = new Schema({
  workout: {
    type: String,
  },
  gym: {
    type: String,
    // required: true,
  },
  geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
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
  author: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ]
});

module.exports = mongoose.model("Workout", WorkoutSchema);
