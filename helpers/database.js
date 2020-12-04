require('dotenv').config();
const mongoose = require('mongoose');


mongoose.connect(process.env.NODE_ENV==='test' ?  process.env.DBTEST : process.env.DB, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex:true })
.then(function(){
    console.log('db connected');
}).catch((err)=>{
    console.log(err.message);
});

mongoose.Promise = global.Promise;