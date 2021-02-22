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
router.get('/del',(req,res)=>{
    blog.find(function(err,blog){
        if(err) {
            console.log(err);
            res.send('<h1>404</h1>');
        }
        else{
            res.render('del',{blogs:blog});
        }
    });
})
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
router.get("/delete/:id", (req, res) => {
    let pid = mongoose.Types.ObjectId(req.params.id);
    blog.deleteOne({ _id: pid })
      .then(() => {
        console.log("Deleted blog successfully!");
        res.redirect("/del");
      })
      .catch((err) => console.log(err));
  })

 router.get("/edit/:id", async (req, res) => {
    const { id } = req.params;

    const getData = await blog.findOne({ _id: id });
    res.render("editblog", { Blog: getData });
  })

  router.post("/edit/:id", (req, res) => {
    const { id } = req.params;
    const { dates , name , title , body , imageurl } = req.body;

    blog.updateOne({ _id: id }, { dates , name , title , body , imageurl })
      .then(() => {
        console.log("successfully! updated the blog!");
        res.redirect("/del");
      })
      .catch((err) => console.log(err));
  });
module.exports = router;



