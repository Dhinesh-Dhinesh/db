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
    console.log(req.body);
    res.send('Data received');
})

app.listen(3000,()=>{
    console.log('Server started at port 3000');
})