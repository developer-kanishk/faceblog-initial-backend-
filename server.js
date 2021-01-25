// page highlights
// home route - www.faceblog.com/
// contact route - www.faceblog.com/contact
// about route - www.faceblog.com/about
//admin log in page - www.faceblog.com/admin
// admin editor page - www.faceblog.com/admin/admineditor

const express = require('express');
const path = require('path');
const app = express();


const index=require('./router/index');
const about=require('./router/about');
const contact=require('./router/contact');
const admin=require('./router/admin');

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');


app.use('/',index);
app.use('/contact',contact);
app.use('/about',about);
app.use('/admin',admin);


app.listen(80,()=>{
    console.log('server is up');
});