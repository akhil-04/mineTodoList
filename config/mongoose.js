//mongoose required here
const mongoose = require('mongoose');
//connecting to database
mongoose.connect('mongodb://localhost:27017/todo_list_db');
//to check the connection with DB(if any error or not)
const db = mongoose.connection;

//checking error functions
db.on('error',console.error.bind(console, 'error in connecting to the DB'));
//if connected succesfully
db.once('open', function(){
    console.log('successfully connected to the DB :: MongoDB');
});

module.exports = db;

