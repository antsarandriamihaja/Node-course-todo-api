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
//find returns a mongodb cursor: a pointer to the documents, that has methods.
//toArray returns a promise. so you can do .then after
//inside find() you can add a query to specify what you want: query by value
    // db.collection('Todos').find({
    //     _id: new ObjectID('58d3defcc7bbf9ad44220f87')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err =>{
    //     console.log('Unable to fetch Todos', err);
    // }));

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log('Todos');
    //     console.log(`Todos count: ${count}`);
    // }, (err =>{
    //     console.log('Unable to fetch Todos', err);
    // }));
    db.collection('Users').find({
        name: 'Antsa'
    }).count().then((count)=>{
        console.log(`Documents found for Antsa: ${count}`);
    }, (err)=>{
        console.log('Unable to find user info.');
    });
    //db.close();
}); //takes 2 args: 1 url where the database lives; 2: callback function with connection occured or failed.
