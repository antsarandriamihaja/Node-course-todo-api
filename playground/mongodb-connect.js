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
    // db.collection('Todos').insertOne({
    //     text: 'something to do',
    //     completed: false
    // }, (err, result)=>{
    //     if (err){
    //         return console.log('Unable to nsert Todos.');
    //     }
    //     console.log(JSON.stringify(result.ops)); //stores all attributes inserted
    // });
    // //no need to create datbase or collection first.
    //insertOne takes 2 arguments: inserts a new document into collection. 1st: object, 2: callback function fired when things go well or failed.

    // db.collection('Users').insertOne({
    //     name: 'Antsa',
    //     age: 25,
    //     location: 'Montreal'
    // }, (err, result)=>{
    //     if (err) {
    //         return console.log('Unable to insert data into Users collection.');
    //     }
    //     console.log((result.ops[0]._id.getTimestamp()));
    // });

    db.close();
}); //takes 2 args: 1 url where the database lives; 2: callback function with connection occured or failed.
