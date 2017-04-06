//create a todo model with text and completed attribute => so mongoose knows how to store our data
var mongoose = require('mongoose');
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        minlength: 1,
        trim: true //removes empty space at beiginning and end of string
    }, completed:{
        type: Boolean,
        default: false
    }, completedAt :{
        type: Number,
        default: null
    }
});

//create an instance of Todo which is now a constructor function
// var newTodo = new Todo({
//     text: 'Cook dinner'
// });
// //save newTodo in a database
// //save() returns a promise
// newTodo.save().then((doc)=>{
//     console.log(`Saved Todo: ${doc}`);
// },(e)=>{
//     console.log('Unable to save Todo');
// });
module.exports = {Todo};
