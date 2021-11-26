const mongoose = require('mongoose');

const UploaderSchema = new mongoose.Schema({
    uri:String,
 });

mongoose.model('uploader', UploaderSchema);