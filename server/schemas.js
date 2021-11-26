const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
   name:String,
   email:String,
   phone:String,
   salary:String,
   position:String,
});

const UploaderSchema = new mongoose.Schema({
   uri:String,
});

mongoose.model('employee', EmployeeSchema);
mongoose.model('uploader', UploaderSchema);