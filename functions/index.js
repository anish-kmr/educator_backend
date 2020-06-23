const functions = require('firebase-functions');
const express = require('express')
const studentRoutes = require('./src/api/student')
const facultyRoutes = require('./src/api/faculty')


// admin.initializeApp()
// const db = admin.firestore()

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use("/student",studentRoutes)
app.use("/faculty",facultyRoutes)

exports.app = functions.https.onRequest(app)
