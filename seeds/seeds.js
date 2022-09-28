const mongoose = require('mongoose')
const Workout = require('../models/workout')

mongoose.connect('mongodb://localhost:27017/workout-buddy2', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected.")
})

const workouts = [
    {   
        workout: 'Kickboxing',
        gym: 'Vesta',
        address: 'Atlanta, Ga',
        date: 'October 5',
        time: '7:30 pm',
        description: 'Kickboxing at Vesta. Beginner class. 20 person max.',
        image: 'https://images.unsplash.com/photo-1649888137201-491856105a1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fGJveGluZyUyMHdvcmtvdXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
        author: 'Sasha',
        comments: "I'll join!",
    },
    {   
        workout: 'Open Gym',
        gym: 'LA Fitness',
        address: 'Orlando, Fl',
        date: 'October 17',
        time: '6:15 pm',
        description: 'Need: LA Membership or day pass $15. Lets hit a leg day. Intermediate experience preferred.',
        image: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fGd5bXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        author: 'Damon',
        comments: "I'm down!",
    },
    {   
        workout: 'HIIT',
        gym: 'Orange Theory',
        address: 'Washington, D.C.',
        date: 'October 12',
        time: '6:30 am',
        description: 'Just getting back into fitness and would love an accountability buddy! First class is free otherwise its a $20 drop in.',
        image: 'https://images.unsplash.com/photo-1519505907962-0a6cb0167c73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjMyfHx3b3Jrb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        author: 'Cara',
        comments: "I'm definitely a newbie, but willing to give it a shot!",
    },
    {   
        workout: 'Hike',
        gym: 'Stone Mountain',
        address: 'Atlanta, Ga',
        date: 'October 8',
        time: '9:00 am',
        description: 'Looking for a hiking buddy to join me at Stone Mountain. Takes about 2 hours round trip and is a steep climb.',
        image: 'https://images.unsplash.com/photo-1580058572462-98e2c0e0e2f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjA1fHx3b3Jrb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        author: 'Zach',
        comments: "Such a great hike. I'll join!",
    },
    {   
        workout: 'Have a Blast! Zumba',
        gym: 'Clarity Fitness',
        address: 'Decatur, Ga',
        date: 'October 13',
        time: '7:00 pm',
        description: 'I found this great body positive gym and would love a buddy for the group classes. First 1 free!',
        image: 'https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fGhpaXQlMjB3b3Jrb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        author: 'Tiffany',
        comments: "This sounds awesome! I'm also down to do a yoga class, too.",
    },
    {   
        workout: 'Kettlebell Basics',
        gym: 'Kollective',
        address: 'Austin, Tx',
        date: 'October 28',
        time: '8:00 am',
        description: 'This is a 2 hour beginner class to kettlebell movement. Cost is $40 and would to have a buddy join!',
        image: 'https://images.unsplash.com/photo-1597075933405-a06cb4d6cecb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTc3fHx3b3Jrb3V0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
        author: 'Shawn',
        comments: "This sounds dope! I've always wanted to learn kettlebells.",
    },
   
]

Workout.deleteMany({})
    .then(() => {
        return Workout.insertMany(workouts)
    })
        .then((workouts) => {
            console.log(workouts)
        })
        .catch(err => {
            console.log("Error in seeding data !!: ")
            console.log(err)
        })
        .finally(() => {
            process.exit()
        })