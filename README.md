![chordCloud](https://i.postimg.cc/1tcyt4wx/chord-Cloud-Full-removebg-preview.png)


***

## A SoundCloud Clone
Welcome to the Chord-Cloud wiki!
chordCloud is a full stack application replicating the style and functionality of SoundCloud. Create or browse new songs, mixes and more! Visit the [live site](https://chord-cloud.herokuapp.com/) here!


***
## Getting Started

Create .env file formatted like .env.example located in backend folder
Starting in root folder 'Chord-Cloud'
```js
npm install
cd backend/
npx dotenv sequelize db:migrate
npx dotenv sequelize-cli db:seed:all
npm start
cd ../frontend/
npm start
```
The site should now launch in your default browser. If not check http://localhost:3000/ replacing 3000 with any port changes you made prior.
***

[API-DOCUMENTATION](https://github.com/TheBabblingBrin/Chord-Cloud/wiki/API-DOCUMENTATION)

Documentation of the API routes used to make requests to the database.


***


[DATABASE-SCHEMA](https://github.com/TheBabblingBrin/Chord-Cloud/wiki/DATABASE-SCHEMA)
SQLite3 database schema

***
[FEATURE-LIST](https://github.com/TheBabblingBrin/Chord-Cloud/wiki/FEATURE-LIST)List of functional and planned features for chordCloud

***
[REDUX-STORE-SHAPE](https://github.com/TheBabblingBrin/Chord-Cloud/wiki/REDUX-STORE-SHAPE)Pseudo code illustrating the state of the chordCloud Redux store for current features.

***
## Built With

Frameworks, Platforms and Libraries

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)

Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

HOSTING:

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

***
## Example Features
### Splash page
* ![chordCloud](https://i.imgur.com/D6aeVFE.png)
* On load the site defaults to this landing page. From this page you can login, create, an account, upload songs, and listen to recently uploaded tracks.
* Clicking the 'Create Account', 'Log In', or 'Upload your own' buttons will launch the relevant modal depending on if you are logged in.
* Example modal and error handling upon submission can be seen below
* ![errorModal](https://i.imgur.com/yCEF0VA.png)
* Sucessful log ins render a profile button with clickable dropdown menu containing user information and the log out button
* ![dropdown](https://i.imgur.com/Rzr0o4U.png)

### Trending tracks
* ![trendingTracks](https://i.imgur.com/aDSlq7f.png)
* Hovering over any song image brings up a play button which will launch the sourced audio in the audio player. This playstate is consisten across other site pages
* Clicking the image or song title below will bring you to the relevant song details page

### Song Details Page
* ![songDetails](https://i.imgur.com/0Cpc6pV.png)
* From this page you can view relevant track details including a dynamic updated/createdAt timestamp
* Playstate is consisten with splash page and can be changed with the play button
* Below the comment bar artist can delete or update their owned tracks. These buttons do not render for unowned content
* Updates are rendered on form submission. Deletions take your back to the splash page.

### Song Comments
* ![songComments](https://i.imgur.com/SlLy1ls.png)
* Song comments can be left via the comments form on the song details page
* Error handling can be seen in the provided screen shot
* Successful comments will be posted below the form with dynamic timestamps
* Owned comments can be deleted via button that appears on hover
* ![songCommentList](https://i.imgur.com/uJOzhlM.png)


***
