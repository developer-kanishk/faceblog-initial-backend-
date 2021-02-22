// page highlights
// home route - www.faceblog.com/
// contact route - www.faceblog.com/contact
// about route - www.faceblog.com/about
//admin log in page - www.faceblog.com/admin
// admin editor page - www.faceblog.com/admin/admineditor

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const methodOverride = require('method-override');
const app = express();
//modules
const index=require('./router/index');
const about=require('./router/about');
const contact=require('./router/contact');
const admin=require('./router/admin');
const connect=require('./database/connect');
const blog=require('./database/blogschema');
//making connections to blog database
connect();
//middlewares
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded());
app.set('view engine','ejs');
// app.use(methodOverride('_method'))
//routing middleware
app.use('/',index);
app.use('/contact',contact);
app.use('/about',about);
app.use('/admin',admin);
//listening
app.listen(80,()=>{
    console.log('server is up');
});
