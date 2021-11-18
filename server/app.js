const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./employee');
//!<----------------------------------->

app.use(bodyParser.json());


const mongoUri = 'mongodb+srv://dhi:44FR83yNbBkuHdZc@cluster0.kkndm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const Employee = mongoose.model('employee');

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//--------------- FOR CONNECTION
mongoose.connection.on('connected', () => {
    console.log('Connected to database');
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})

//---------------//
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/send', (req, res) => {
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        position:req.body.position
    });

    employee.save().then(data => {
        console.log(data);
        res.send('Data received');
    }).catch(err => {
        console.log(err);
    })
})

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id).then(data=>{
        console.log(data);
        console.log('Data deleted');
        res.send('Data deleted');
    }).catch(err=>{
        console.log(err);
    })
})

app.listen(3000,()=>{
    console.log('Server started at port 3000');
})


//    "name":"randy",
//    "email":"dhinesh@gmail.com",
//    "phone":"9994203075",
//    "salary":"20000",
//    "position":"RN"