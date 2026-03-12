require('dotenv').config()

// for express
const express = require('express')
const bullMaster = require('bull-master')
const app = express()

//Importing Queues to view
const jobsQueue = require('./services/queue/jobs');


app.use('/admin/queues', bullMaster({
  queues: [jobsQueue.queue],
}))

app.listen(process.env.QUEUE_SERVER_PORT, ()=>{
    console.log("Listening for Queue UI on PORT", process.env.QUEUE_SERVER_PORT);
});