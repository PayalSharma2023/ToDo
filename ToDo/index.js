const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const placeRoutes = require('./routes/placeRoutes');
const TaskModel = require('./model/task')

const path = require('path');
const { error } = require('console');
const app = express();

app.use(express.json());

// CONNECT SERVER WITH DATABASE
const mongoDBString = 'mongodb+srv://peacko:peackopeacko1312@peacko.bl5glnj.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoDBString)
    .then(c => {
        app.listen(3002, () => {  //run server on port 3002
            console.log('Connected to database')
            console.log('Server running on port 3002')
        })
    })
    .catch(err => console.log('Error connecting to database: ' + err))
/* 
   // ToDo
       1. create signup API
       2. create login API
 */
app.get('/search',async (req, res) => {
    console.log(req.query)
    try{
        //const {time , date} = aqp(req.query.getAllTask)
        if (req.query.time){
            //res.send()  
            res.render('/getAllTask',TaskModel.find().sort({time : 1}))
        };
        
            
        if (req.query.date) {
            const search = await TaskModel.find(req.query).sort({date : 1});
            res.status(200).json({ search})
        }

    } catch (err) {
        console.log(error)

    }
    res.send("http://localhost:3002/tasks/")
})
app.use('/users', userRoutes);
/*
        // ToDo
            1. Create Task API
            2. Update Task API
            3. Delete Task API
            4. Get All Tasks API
            5. Get Single Task API
            6. Get All Task Of a user.

        {
            name : "DO Coding",
            "time" : "12:10 PM",
            "date" : "2014-33-12",
            "isCompleted" : true,
            "createdBy" : "sushant@gmail.com"
        }
*/

app.use('/tasks', taskRoutes);

/*
   to add the information about places that you have visited and you want to visit
         1. create place API
         2. update place API
         3. Delete place API
         4. Get all places visited API
         5. Get all places to explore API
         6. Get all places API
         7. get single place API
    
 */

app.use('/places', placeRoutes);

