const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const userSchema = new mongoose.Schema({
    email:String,
    password:String
});
//passport.js
userSchema.plugin(passportLocalMongoose);
//collection named users
const user=new mongoose.model('user',userSchema);
module.exports = user;