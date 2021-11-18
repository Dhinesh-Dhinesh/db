const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('./employee');
//!<----------------------------------->

app.use(bodyParser.json());


const mongoUri = 'mongodb+srv://dhi:44FR83yNbBkuHdZc@cluster0.kkndm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const Employee = mongoose.model('employee');

//--------------- FOR CONNECTION

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

//FOR SEND

app.post('/send', (req, res) => {
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        position:req.body.position
    });

    employee.save().then(data => {                                 //then catch
        console.log(data);
        res.send('Data received');
    }).catch(err => {
        console.log(err);
    })
})

//FOR DELETE

app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id).then(data=>{           //then catch
        console.log(data);
        console.log('Data deleted');
        res.send('Data deleted');
    }).catch(err=>{
        console.log(err);
    })
})

//FOR UPDATE

app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        salary:req.body.salary,
        position:req.body.position
    }).then(data=>{                                                 //then catch
        console.log(data);
        res.send('Data updated');
        console.log('Data updated');    
    }).catch(err=>{
        console.log(err);
    })
})

app.listen(3000,()=>{
    console.log('Server started at port 3000');
})

// 61952fd0bf47c366507b29be

//    "name":"dhinesh",
//    "email":"randy@gmail.com",
//    "phone":"99942030722",
//    "salary":"40000",
//    "position":"RN"