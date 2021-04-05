const express = require('express');
const mongoose = require('mongoose');
const user = require('../database/userSchema');
const passport = require('passport');
const session = require('express-session');
const passportLocalMongoose = require('passport-local-mongoose');
const router = express.Router();
router.post('/',(req,res)=>{
  let email=req.body.username;
  let newEmail = email.toLowerCase();
  let password=req.body.password;
  user.register({username:newEmail}, 'password', function(err, user) {
    if (err) { 
       console.log(err);
       res.redirect('/');
    }
    else
    {
        passport.authenticate('local')(req,res,function(){
        res.redirect('/admin/menu');
      });
    }
  });
});
module.exports = router;




