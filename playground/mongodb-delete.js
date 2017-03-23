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
//to remove data: many mthods: deleteMany, deleteOne, findOneAndDelete
//deleteMany: delete all that has a particular property
// db.collection('Todos').deleteMany({
//     text: 'eat dinner'
// }).then((res)=>{
//     console.log(res);
// });
db.collection('Users').deleteMany({
    name: 'Antsa'
}).then((res)=>{
    console.log(res);
});
//deleteOne: deletes first property it encounters that match the property set.
// db.collection('Todos').deleteOne({
//     text: 'eat dinner'
// }).then((res)=>{
//     console.log(res);
// });

//findOneAndDelete, targets first one it sees; gets document back => able to do .tehn call
// db.collection('Todos').findOneAndDelete({
//     completed: false
// }).then((res)=>{
//     console.log(res);
// });
db.collection('Users').findOneAndDelete({
    _id: new ObjectID('58d1732e1a77781cb374b0b5')
}).then((res)=>{
    console.log(JSON.stringify(res, undefined, 2));
});

//db.close();
}); //takes 2 args: 1 url where the database lives; 2: callback function with connection occured or failed.
