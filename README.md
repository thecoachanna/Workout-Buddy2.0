# Workout-Buddy2.0
A web app using Mongoose, Express and EJS created to help gym enthusiasts find a workout buddy!

# Your project idea
Build a web app to connect people who are looking for a workout buddy, where users can select activities they are interested in and attend activity with other users. User can create and edit profile. Select + delete workouts and see their upcoming schedule.

# MVP
- Make "create new" user form and submit to database
- Create a "show" page displaying each workout and details
- Link each activity to their show details page
- Allow user to select activity and add to schedule on show page
- Create a schedule on the index page to show users upcoming schedule/sign-ups
- Allow for user to create activity
- Add an "edit" button for user to update activity details page

# Stretch Goals
- Require OAuth login
- Add a "delete" button to each activity on user's schedule
- Allow for in app messaging/chat with other users (Socket.io)
- Calendar display on Index page
- Cloudinary image upload for profile avatar

# Models and their properties
User:
- username/email: String
- password: String

Comment:
- body: String

Workout: 
- workout: String
- gym: String
- location: String
- date: String
- time: String
- description: String

# User Stories
- As a user I want to be able to create a user profile
- As a user I want to be able to edit my profile
- As a user I want to see a selection of meet-ups so that I can choose to attend the ones I want
- As a user I want to be able to select a meet-up and see specific details
- As a user I want to see an event schedule of the meet-ups I've chosen
- As a user I want to be able to delete an event or cancel if I can't attend

Stretch Stories
- As a user I want to be able to chat inside the app with other users
- As a user I want to be able to upload my own photo so that other users can recognize me

# Wireframes
https://docs.google.com/presentation/d/1Hjh6BKxFQ_-RXyMLIXUdgVvFPzcF33TI6KAxQZWqE10/edit?usp=sharing
