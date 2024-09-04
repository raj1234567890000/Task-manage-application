import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Register({ switchView }) {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[UserType,setUserType]=useState('');
  const[secertkey,setSecretKey]=useState('')
  

  const navigate =useNavigate();

  const handleRegister = async(e,) => {
    if(UserType==="Admin" && secertkey!=="Rohit"){
      e.preventDefault();
          toast.error("Invalid Secret Key");
       
         
          }
    else{
      e.preventDefault();
      try{
        const res= await axios.post("http://localhost:8080/register",{
          name:name,
          email:email,
          password:password,
          UserType:UserType,
        })
        if(res.data){
          toast.success(res.data.message);
        }else{
          toast.error(res.message);
        }
      console.log(res)
      if (UserType ==='Admin') {
        navigate('/admin');
      } else{
        navigate('/user');
      }
      
      }catch(error){
        console.error(error);
        toast.error("something wrong in Registration")
        
      }
    }
    
    setName('');
    setEmail('');
    setPassword('');
    
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <div style={{marginBottom:"20px"}}>
      Register As :
        <input type='radio' name="userType" value="user" onChange={(e)=>setUserType(e.target.value) } />user
        <input type='radio' name="userType" value="Admin" onChange={(e)=>setUserType(e.target.value)} />Admin
      </div>
   {UserType === "Admin"?(
       <div className="form-group">
       <label>Secret_key:</label>
       <input
         type="password"
         onChange={(e) => setSecretKey(e.target.value)}
         required
       />
     </div>
   ):null}
      <form onSubmit={handleRegister}>
      <div className="form-group">
          <label>UserName:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{' '}
        <span className="link" onClick={() => switchView('login')}>
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;
