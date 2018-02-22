# FrameWork HXP v0

## Framework - Node.JS / Express.JS / Socket.io / MongoDB

This project is created for easy starting a new project oriented MVC on ES6 with posibility to use action on real time.

* Front
    * Motor of templates with EJS
    * Include
        * Pages: home, authentification
        * Components: navbar, slider, chatbox *customize by JSON files*
        * Socket.io
        * SASS system

* Back
    * Structure MVC with Node.JS / Express.JS
    * Routing system
    * Modules JSON for **customize Front Components**
    * Middlewares for externalize the recurents functions
    * Socket.io routing

## Technology used on this project

Node.JS
Express.JS
Socket.io
EJS
SASS

## Plugin used on this project

jQuery
Socket.io
FontAwsome
Materialize CSS

## Start this project

Create your config file in /config/db.js 
*copy this code in the file*
```
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect('mongodb://URL:PORT/DBNAME')

module.exports = mongoose
```

*for next instructions copy this command in the terminal*

Install node package
`npm install`

Install nodemon
`npm install nodemon`

Run MongoDB server
`sudo mongod`

Run SASS compilation
`npm run watch-css`

Run project with Nodemon
`npm run start`

Thining by @himuraxp
