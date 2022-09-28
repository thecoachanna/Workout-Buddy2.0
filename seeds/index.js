// const mongoose = require('mongoose')
// const Workout = require('../models/workout')
// const workouts = require('./workouts')

// mongoose.connect('mongodb://localhost:27017/workout-buddy2', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"))
// db.once("open", () => {
//     console.log("Database connected.")
// })

// const sample = array => array[Math.floor(Math.random() * array.length)]

// const seedDB = async () => {
//     await Workout.deleteMany({});
//     for (let i = 0; i < 20; i++){
//         const random1000 = Math.floor(Math.random() * 1000)
//         const w = new Workout({
//             author: '630f8f70ba63099704385da8',
//             gym: `${sample(gyms)}`,
//             address: `${cities[random1000].city}, ${cities[random1000].state}`,
//             image: 'https://source.unsplash.com/collection/10759412',
//             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse tempore neque laboriosam expedita impedit ab odit sed optio ullam quidem saepe natus maxime recusandae similique repellendus cum, dignissimos explicabo.',
            

//         })
//         await w.save();
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close();
// });