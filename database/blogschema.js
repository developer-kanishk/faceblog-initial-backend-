//ram bhakt Hanuman ko pranam 

const mongoose = require('mongoose');

//defining schema for basic blog structure
const blogSchema = new mongoose.Schema({
    title:String,
    body:String,
    dates:String,
    name:String,
    imgurl:String
});
const blog = mongoose.model('blog', blogSchema);
module.exports = blog;

