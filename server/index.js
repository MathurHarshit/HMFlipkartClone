import express from 'express';
import Connection from './database/db.js';
import DefaultData from './default.js';
import router from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import 'dotenv/config.js';

const app=express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',router);
const port=process.env.PORT;

Connection();

app.listen(port,()=>{
    console.log(`Sever is running on port ${port}`);
});

DefaultData();