const express = require("express");
const app = express();
const dotenv = require("dotenv")
const mongoose = require('mongoose')
// Import Route
const authRoute = require('./routes/auth')
const homeRoute = require("./routes/home")
const addPollRoute = require("./routes/addPoll")
const voterRoute = require("./routes/voterRoute")
var cors = require('cors')
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
dotenv.config();
mongoose.connect(process.env.DB_Connect,{ useNewUrlParser: true, useUnifiedTopology: true  },()=>{
    console.log("Connected ")
})
// Middleware
app.use(cors(corsOptions))
app.use(express.json());






// Route Middleware
app.use('/api/user',authRoute)
app.use("/api/posts",homeRoute)
app.use("/api/add_poll",addPollRoute)
app.use("/api/voter",voterRoute)


const PORT = process.env.PORT || 8080
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})