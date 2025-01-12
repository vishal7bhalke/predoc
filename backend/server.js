import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminrouter from './routes/adminroute.js';
import doctorrouter from './routes/doctorroute.js';
import userrouter from './routes/userroute.js';

//appconfig
const app = express();
const port=process.env.PORT || 4000
connectDB();
connectCloudinary();

// middlewares
app.use(express.json())
app.use(cors())

//api endpoint
app.use('/api/admin',adminrouter)
app.use('/api/doctor',doctorrouter)
app.use('/api/user',userrouter)


app.get('/',(req,res)=>{
res.send('api is  working');
})
app.listen(port , ()=> console.log("serve is started",port));
