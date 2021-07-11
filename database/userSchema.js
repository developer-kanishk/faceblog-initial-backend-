const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:String,
    password:String
});

//collection named users
//mongo db    | Sql
//database    | database
//collections | tables
//document    | rows
//fields      | columns

const user = new mongoose.model('user',userSchema);
module.exports = user;