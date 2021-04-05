//requiring mongoose
const mongoose = require('mongoose');
const port = '127.0.0.1:27017'; 
const database = 'blogdb';

//making connections
function connect()
{
  mongoose.connect(`mongodb://${port}/${database}`, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
     console.log('connection successful');
    })
   .catch(err=>{
      console.log("connection unsuccessful");
   })
}

module.exports = connect;
