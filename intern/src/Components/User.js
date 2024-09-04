import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import toast from 'react-hot-toast';


const User = () => {
  const[Task,setTask]=useState([]);
  const navigate=useNavigate()

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/')
      toast.success("Logout Your Account")

    } catch (error) {
   
      console.error('Error logging out:', error);
    }
  };
 
  const getTask=async()=>{
    const res =await axios.get(`http://localhost:8080/alltask`)
    setTask(res.data)

  }
  useEffect(()=>{
    getTask();

},[])
const seacrhHandle=async(event)=>{
  let key=event.target.value;
  
if(key){
let key=event.target.value;
let result=await fetch(`http://localhost:8080/search/${key}`);
result=await result.json();
if(result){
  setTask(result);
  console.log("search",result)
}
}else{
getTask();
}
}

 
  return (
    <div>
           <button className='logout-btn' onClick={handleLogout}>
Logout
     </button>
     
      <h1 style={{textAlign:"center"}}>All Tasks</h1>
      <div className='search'>
     
      <input type='text' placeholder='search Task' className='searchinput'
      onChange={seacrhHandle}/></div>
      <div class="table-container">
        <div className='row'>
      <table>
      <thead >
        <tr>
          <th>SR No</th>
          <th>Title</th>
          <th className='col-6'>Description</th>
          <th>AssignedTo</th>
          <th>Status</th>
          <th>CreatedAt</th>
          <th>edit</th>
        
          
        </tr>
      </thead>
      
      {
        
        Task.map((item,index)=>{
          return(
        <tbody>
          <tr key={item._id} style={{textAlign:"center"}}>
            <td>{index+1}</td>
            <td>{item.title}</td>
            <td>{item.description}</td>
            <td >{item.assignedTo}</td>
            <td style={{paddingLeft:"20px"}}>{item.status}</td>
            <td style={{paddingLeft:"40px"}}>{item.createdAt}</td>
            <td><Link to={"/user/"+item._id}>< EditIcon  className='edit'/></Link></td>
         
          </tr>
        </tbody>
        
        )
        })
      }
      </table>
      </div>
    </div>
    </div>
  )
}

export default User

