// page highlights
// home route - www.faceblog.com/
// contact route - www.faceblog.com/contact
// about route - www.faceblog.com/about
//admin log in page - www.faceblog.com/admin
// admin editor page - www.faceblog.com/admin/admineditor

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');

// const methodOverride = require('method-override');
const app = express();
//modules
const index=require('./router/index');
const about=require('./router/about');
const contact=require('./router/contact');
const admin=require('./router/admin');
const register=require('./router/register');
const connect=require('./database/connect');
const blog=require('./database/blogschema');
const user=require('./database/userSchema');
//middlewares
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded());
app.set('view engine','ejs');
//passport middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
    // cookie: { secure: true }
}));
// app.use(methodOverride('_method'))
//routing middleware
//making connections to blog database
connect();
mongoose.set('useCreateIndex', true);
//passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(user.createStrategy());
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
//routes
app.use('/',index);
app.use('/contact',contact);
app.use('/about',about);
app.use('/admin',admin);
app.use('/register',register);
//listening
app.listen(80,()=>{
    console.log('server is up');
});
