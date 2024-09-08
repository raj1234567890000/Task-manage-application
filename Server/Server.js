import express from 'express';
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './Config/db.js';
import userModel from './models/userModel.js'
import { comparePassword, hashPassword } from './helper/authHelper.js';
import JWT from 'jsonwebtoken';
import cors from 'cors'
import Task from './models/Task.js';




//config env
dotenv.config();
//rest object
const app= express();

//database connect
connectDB()

//middleare
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//api routing start here

//register api here

app.post('/register',async(req,res)=>{
try{
const{name,email,password,UserType}=req.body
if(!name){
    return res.status(400).json({message:'name is required'})
}
if(!email){
    return res.status(400).json({message:'email is required'})
    }
    if(!password){
        return res.status(400).json({message:'password is required'})
        }
        if(!UserType){
            return res.status(400).json({message:'usertype is required'})
            }

       
//existing user
const existingUser=await userModel.findOne({email})
if(existingUser){
    return res.status(200).send({success:false,message:'user already exist'})

}
//register user
const hashedPassword=await hashPassword(password)
const user= await new userModel({
    name,email,password:hashedPassword,UserType
}).save()
res.status(201).send({
    success:true,
    message:'user Register successfully',
    user
})

}catch(error){
    console.log(`error${error}`)
}
})

//login api here

app.post('/login',async(req,res)=>{
    try{
const{email,password,UserType }=req.body
if(!email || !password){
    return res.status(404).send({
        success:false,
        message:'invalid email or password'

    })
}
//existing user
const user=await userModel.findOne({email})
if(!user){
    return res.status(404).send({
        success:false,
        message:"email is not register"
    })
}
if(!UserType ){
    return res.status(404).send({
        success:false,
        message:"wrong user type"
    })
}
const match = await comparePassword(password, user.password);

if (!match) {
  return res.status(401).send({
    success: false,
    message: 'Invalid password'
  });
}
//token
const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
    expiresIn:"5d",
})
res.status(200).send({
    success:true,
    message:'login successfully',
    user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        UserType:UserType ,
        token
    }
})
    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:' error in Login',
            err
        })
    }
})

// Create a new task
app.post('/create', async (req, res) => {
    try {
      const { title, description,assignedTo,status,createdAt,userId} = req.body;         
      const newTask = new Task({ title, description,assignedTo,status,createdAt,userId});
      await newTask.save();
      res.status(201).json(newTask)
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  //get all task

  app.get('/alltask', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server Error' });
    }
  });

  //upadte task
  app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!task) return res.status(404).send('Task not found');
        res.json(task);
    } catch (error) {
        res.status(500).send(error.message);
    }  
});

    //get task by id
    app.get('/getalltask/:id', async (req, res) => {
      try {
          const task = await Task.findById( req.params.id)
          if (!task) return res.status(404).send('Task not found');
          res.json(task);
          console.log(task)
      } catch (error) {
          res.status(500).send(error.message);
      }
  });
  
//delte task 

app.delete("/deletetask/:id", async (req, resp) => {
    const result = await Task.deleteOne({ _id: req.params.id });
    resp.send(result);
  });
//search task
app.get("/search/:key",async(req,resp)=>{
    let result= await Task.find(
      {
        "$or":[
          {title:{$regex:req.params.key}},
          {description:{$regex:req.params.key}},
          {assignedTo:{$regex:req.params.key}},
          
        ]
      }
    )
  resp.send(result)
  })

//rest api

app.get('/',(req,res)=>{
    res.send('<h1>welcome to home page</h1>')
    console.log("hello world");
})



//port
const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});