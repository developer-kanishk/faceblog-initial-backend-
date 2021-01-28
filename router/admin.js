const express = require('express');
const { reset } = require('nodemon');
const blog = require('../database/blogschema');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('adminpage');
});

router.get('/admineditor',(req,res)=>{
    res.render('admineditor');
});

router.post('/admineditor',(req,res)=>{
    let dates = req.body.date;
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
        res.send('<h2>successful</h2>');
      })
      .catch(err => {
        res.send('<h2>unsuccessful</h2>');
        console.error(err)
      }); 
})

module.exports = router;
