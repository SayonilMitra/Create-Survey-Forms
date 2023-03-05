const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()

// to suppress console warning
mongoose.set('strictQuery', true);

// importing all routers
let loginRouter = require('./routers/login_register')
const surveyRouter = require('./routers/survey.js')
const questionRouter = require('./routers/question')

app.use(loginRouter)
app.use(surveyRouter)
app.use(questionRouter)
app.use(cors())

app.get('/test', cors(), (req, res) => {
    res.end('working')
})


// connect database
const dotenv = require('dotenv')
dotenv.config()
const dbLink = process.env.mongo_url


mongoose.connect(dbLink, () => {
    console.log('Connected to database')
})

// running app
app.listen(8000, () => {
    console.log('Back End running...')
})

