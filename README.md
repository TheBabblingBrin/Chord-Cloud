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
# Splash page
![chordCloud](https://i.imgur.com/6u4YFwH.png)

***
