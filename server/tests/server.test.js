const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo')
//make sure the database is empty before test case (move on to test case once we call done)
//for GET /todos route, there needs to be data in the Todo database
//create seed data
const {ObjectID} = require('mongodb');
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done)=>{
    Todo.remove({})
    .then(()=> {
        Todo.insertMany(todos);
    }).then(() => {
        done();
    })
    
})
// beforeEach((done)=> {
//     Todo.remove({})  //wipe all of our todos in the database
//     .then(() => {
//         done();
//     });
// })
describe('POST /todos', () => {
    it('Should create a new todo', (done) => {
        var text = 'test todo task';

        request(app)
        .post('/todos')
        .send({
            text
        })
        .expect(200)
        .expect((res)=> {
            expect(res.body.text).toBe(text)
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => {
                done(e);
            })
        })
    });
    //sending bad data 

    it('Should not create todo with invalid data', (done) => {
        request(app)
        .post('/todos')
        .send({}) //sending in empty todo
        .expect(400) 

        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
        })
    });
});

describe('GET /todos', ()=>{
    it('Should get all todos', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
        })
    });

describe('GET /todos/:id', () => {
    it('Should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('Should return a 404 if todo not found', (done) =>{
        var id = new ObjectID();
        request(app)
        .get(`/todos/${id.toHexString()}`)
        .expect(404)
        .expect((res) => {
            expect(res.body.todo).toBe();
        })
        .end(done);
    });

    it('Should return a 404 for invalid _id', (done) => {
        request(app)
        .get('/todos/1234')
        .expect(404)
        .end(done);
    })
});