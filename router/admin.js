const express = require('express');
const { reset } = require('nodemon');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('adminpage');
});

router.get('/admineditor',(req,res)=>{
    res.render('admineditor');
});

module.exports = router;
