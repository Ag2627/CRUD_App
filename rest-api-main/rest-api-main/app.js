const express = require('express');
const app = express();
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const categorypath = require('./api/routes/category')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');


const uri = 'mongodb+srv://Ananyagupta:databaseananya@ananya.0h48r.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Ananya';

async function connectDB() {
    try {
        await mongoose.connect(uri);
        console.log('Connected successfully to the database');
    } catch (err) {
        console.error('Database connection error:', err);
    }
}

connectDB();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles:true
}))

app.use(cors());

app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/category',categorypath);

app.get('*',(req,res,next)=>{
  res.status(500).json({
    message:'bad request'
  })
})

module.exports = app;
