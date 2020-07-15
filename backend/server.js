const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useCreateIndex:true, useNewUrlParser:true});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB connection established successfully");
})

const employeesRouter = require('./routes/employees');
const tasksRouter = require('./routes/tasks');

app.use('/employees',employeesRouter);
app.use('/tasks',tasksRouter);

app.listen(port, ()=>{
    console.log(`The Server is running on the port ${port}`);
});