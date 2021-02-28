const https = require('https');
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
  //new api calling 
  router.get('/news/:type',(req,res)=>{
    let choice = req.params.type;
    let url;
    if(choice==='Indian')
    {
      url='https://newsapi.org/v2/top-headlines?country=in&apiKey=93effb41f6634699a07d37b2f04501ea';
    }
    else 
    {
      url = 'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=93effb41f6634699a07d37b2f04501ea';
    }
    https.get(url,(resp)=>{
        let rawData = '';
        resp.on('data', (chunk) => { rawData += chunk; });
        resp.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      res.render('news',{articles:parsedData.articles});
    } catch (e) {
      console.error(e.message);
      res.send('<h1>404</h1>');
    }
  });
    })
    .on("error", (err) => {
        console.log("Error: " + err.message);
        res.send('<h1>404</h1>');
      });
})
//finally exporting
module.exports = router;



