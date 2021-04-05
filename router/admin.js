
const express = require('express');
const { reset } = require('nodemon');
const blog = require('../database/blogschema');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('adminpage',{massage:""});
});

router.post('/',(req,res)=>{
    // let email = req.body.email;
    // let newEmail = email.toLowerCase();
    // const password = req.body.password;
    res.redirect('/admin/menu');
})
//menu page
router.get('/menu',(req,res)=>{
    res.render('optionpage');
});

router.get('/admineditor',(req,res)=>{
    res.render('admineditor');
});

router.post('/admineditor',(req,res)=>{
    let dates = req.body.dates;
    let name = req.body.name;
    let title = req.body.title;
    let body = req.body.body;
    let imgurl = req.body.imageurl;
    let blogPost = new blog({
        title:title ,
        body:body,
        dates:dates,
        imgurl:imgurl,
        name:name
    });
    
    blogPost.save()
    .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.error(err);
        res.send('<h2>unsuccessful</h2>');
      }); 
})
module.exports = router;
