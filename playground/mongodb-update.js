//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var user = {name: 'Antsa', age: 25};
// //object destructuring
// var {name} = user; //pulling off the name property from user object and setting it to a new variable
// console.log(name); logs 'Antsa'
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=>{
    if (err){
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to mongoDB server');
//findOneandUpdate: takes filter (usually _id), update, options and callback (if no callback a promise is returned)
db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('58d407f5c7bbf9ad4422123b')
},{ $set:
    {
    completed: true
    }
}, {
    returnOriginal: false
}).then((res)=>{
    console.log(res);
});

db.collection('Users').findOneAndUpdate({
    name: 'Robson'
}, {$inc:
    {
        age: 1
    }, 
    $set: {
        name: 'Antsa'
    }
}, {
    returnOriginal: false
}).then((res)=>{
    console.log(res);
});
//db.close();
}); //takes 2 args: 1 url where the database lives; 2: callback function with connection occured or failed.
