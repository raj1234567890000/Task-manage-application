import '../App.css';
import React, {  useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



function Login({ switchView }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[UserType,setUserType]=useState('');
  const[secertkey,setSecretKey]=useState('')

 const navigate =useNavigate();



  const handleLogin =async (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login with:', {email, password });
    if(UserType==="Admin" && secertkey!=="Rohit"){
      e.preventDefault();
          alert("Invalid Secret Key");
       
         
          }else{
            try{
              const res=await axios.post("http://localhost:8080/login",{
                email:email,
                password:password,
                UserType:UserType,
              })
              if(res.data){
                localStorage.setItem('user',JSON.stringify(res.data))
                localStorage.setItem('token',JSON.stringify(res.data))
                toast.success(res.data.message);
              }else{
                toast.error(res.message);
              }
              console.log(res.data);
              if (UserType === 'user') {
                navigate('/user');

              } else {
                navigate('/admin');
                
              }
            
            }catch(error){
              console.error(error);
              toast.error("Wrong Email or Password")
            
            }
        
          };
          setEmail('');
          setPassword('');
          }


  return (
    <div className="form-container">
      <h2>Login</h2>
      <div style={{marginBottom:"20px"}}>
      Login As :
        <input type='radio' name="userType" value="user" onChange={(e)=>setUserType(e.target.value)}/>user
        <input type='radio' name="userType" value="Admin" onChange={(e)=>setUserType(e.target.value)}/>Admin
      </div>
   {UserType === "Admin"?(
       <div className="form-group">
       <label>Secret_key:</label>
       <input
         type="password"
         onChange={(e) => setSecretKey(e.target.value)}
         required
            placeholder='Secret_key'
       />
     </div>
   ):null}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
             placeholder='Email'
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='Password'
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{' '}
        <span className="link" onClick={() => switchView('register')}>
          Register here
        </span>
      </p>
    </div>
  );
}

export default Login;
