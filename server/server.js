var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {ObjectID} = require('mongodb');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;
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

app.get('/todos/:id', (req, res) =>{
    var id = req.params.id;
    if (!ObjectID.isValid(id)){
        res.status(404).send();
        return ('%s is not a valid id', id);
    }
    Todo.findById(id).then((todo)=>{
        if (!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
})
//url for rest API is really important. For resource cretion: url: '/todos'
app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

module.exports = {app};