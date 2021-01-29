const express = require('express');
const { reset } = require('nodemon');
const blog = require('../database/blogschema');
const router = express.Router();
router.get('/',(req,res)=>{
    blog.find(function(err,blog){
        if(err) {
            console.log(err);
            res.send('404');
        }
        else{
            res.render('index',{blogs:blog});
        }
    });
});
module.exports = router;
