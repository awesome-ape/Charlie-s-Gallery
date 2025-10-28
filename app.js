const express=require('express');
const bodyParser = require('body-parser')
const jwt=require('jsonwebtoken');
const cors=require('cors');
const mongoose=require('mongoose');
const users=require('./routes/userRoutes');
require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING,
{ useNewUrlParser: true,
useUnifiedTopology: true });
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());
app.use('/users', users);
app.listen(process.env.PORT, ()=> console.log('server is running on port 3000'));