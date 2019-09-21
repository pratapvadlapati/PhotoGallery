const mongoose = require('mongoose');

let Schema = mongoose.Schema;

gallerySchema = new Schema({
    'caption': String,
    'imagePath': String
});


module.exports = mongoose.model('Gallery', gallerySchema);