const express = require('express');
const { reset } = require('nodemon');
const mongoose = require('mongoose');
const blog = require('../database/blogschema');
const { resolveInclude } = require('ejs');
const router = express.Router();
router.get('/',(req,res)=>{
    blog.find(function(err,blog){
        if(err) {
            console.log(err);
            res.send('<h1>404</h1>');
        }
        else{
            res.render('index',{blogs:blog});
        }
    });
});
router.get('/getOne/:uid',(req,res)=>{
    //parsing the string to mongoose object
    let id = mongoose.Types.ObjectId(req.params.uid);
    //find function
    blog.findOne({_id:id}).then(function(result){
        res.render('single',{
            name:result.name,
            title:result.title,
            body:result.body,
            imgurl:result.imgurl,
            dates:result.dates
        })
    })
})
router.delete('/:id', (req, res) => {
     blog.findByIdAndDelete(req.params.id)
    res.redirect('/')
  })
module.exports = router;



