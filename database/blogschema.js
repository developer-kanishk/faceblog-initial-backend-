const mongoose = require('mongoose');
//defining schema for basic blog structure
const blogSchema = new mongoose.Schema({
    title:String,
    body:String,
    dates:String,
    name:String,
    imgurl:String
});//object created from mogoose schema class
const blog = new mongoose.model('blog', blogSchema);
module.exports = blog;

