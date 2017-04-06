var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
//Configure middleware

app.use(bodyParser.json());//returns a function which is the middleware we need to give to express
//creating new todos => routes
//Configure routes: POST route to crete new todos
//basic API: operations CRUD: Create, Read, Update, Delete
//To create a resource, you use the POST http method, send resource as the body.
//Set up a route:
app.post('/todos', (req, res)=>{
     //body is stored by bodyParser.url we want to send our data to: localhost:3000/todos
     var todo = new Todo({
         text: req.body.text
     });
     todo.save().then((doc)=>{
         res.send(doc);
     }, (e)=>{
         res.status(400).send(e);
     });
});

//show a user the lit of all their todos
app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    }, (e)=>{
        res.status(400).send(e);
    });
});
//url for rest API is really important. For resource cretion: url: '/todos'
app.listen(3000, ()=>{
    console.log('Started on port 3000');
});

module.exports = {app};