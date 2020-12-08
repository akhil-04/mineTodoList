//requring express here
const express = require('express');
const app = express();
// we don't need to install path bcoz it is inbuilt module in npm
const path = require('path');
//current port of our web app localhost:8000
const port = 8000;
//start the express
//to tell where to search DB
const db = require('./config/mongoose');
const Todo = require('./models/todo');

//setting ejs and giving path to index file
app.set('view engine', 'ejs');
app.set('views', './views');
//middleware for form
app.use(express.urlencoded());
//middleware for static files it is path for these
app.use(express.static('assets'));

//make a array of objects
var todoList=[
    {
       description:"make a flower",
        category:"personal",
        date: "02-01-2020"
    },
    {
        description:"do project on time",
        category:"college",
        date: "02-01-2020"
    }
]



app.get('/',function(req,res){
    // return res.render('home',{
    //     title: "todo list",
    //     tasks: todoList
    // });

    Todo.find({}, function(err, totasks){
        if(err){
            console.log("error in fetching data from db");
            return;
        }
        return res.render('home',{
            title : "To-Do List",
            tasks: totasks
        }); 

    });
});

app.post('/create-task',function(req,res){
    // console.log(req.body);
    // todoList.push({
        Todo.create({
            description: req.body.description,
            date: req.body.date,
            category: req.body.category
        }, function(err, newtodoTask){
            if(err){
                console.log('error in creating a todo task');
                return;
            }
    
            console.log('*******', newtodoTask);
            return res.redirect('/');
        });
    });

//delete the tasks from list
app.get('/delete-task', function(req, res){
       //get the id from query in url
       let id = req.query.id;
       //find the contact in db using Id and delete
       Todo.findByIdAndDelete(id, function(err){
    if(err){
        console.log('error in deleting an object from db');
        return;
    }

    return res.redirect('/');
    });
});


//for running the express server 
app.listen(port, function(err){
    if(err){
        console.log(`error in running server: ${err}`);
    }

    console.log(`server is running on port:${port}`);
});
