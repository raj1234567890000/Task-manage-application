
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Footer from './Footer';




function Admin() {
 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const[assignedTo,setAssignedTo]=useState('');
  const[status,setStatus]=useState('');
const[createdAt,setCreatedAt]=useState('')

const navigate=useNavigate();


  const handleLogout = (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      navigate('/')

    } catch (error) {
    
      console.error('Error logging out:', error);
    }
  };

  const handleCreateTask = async() => {
   
  const res=await axios.post(`http://localhost:8080/create`,{
    title:title,
    description:description,
    assignedTo:assignedTo,
   status:status,
   createdAt:createdAt,
  
  })
  console.log("resaa",res)
if(res){
  navigate('/alltask')
  toast.success("Task Added Successfully")
}else{
  toast.error('Failed to create task')
}

  setTitle('');
  setDescription('');
  setAssignedTo('');
 setStatus('')
 setCreatedAt('')

  console.log("create task",res)

       
   
  };
  //upadte task







  return (
    <>

    <button className='logout-btn' onClick={handleLogout}>
Logout
     </button>
     <h1 style={{textAlign:"center"}}>Create Tasks </h1>
    <div className='task-manage'>

      <div div className='task'>
     
        <input className='text-input'
          type="text"
          placeholder="Task Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br/>
        <input  className='text-input'
          type="text"
          placeholder="Descriptions"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br/>
             <input
          type="text" className='text-input'
          placeholder="assigned to"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        /><br/>
   <select  value={status}  className='text-input'
          onChange={(e) => setStatus(e.target.value)}>
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
    

   </select><br/>
   <input  className='text-input'
          type="date"
          placeholder="assigned to"
          value={createdAt}
          onChange={(e) => setCreatedAt(e.target.value)}
        />
     
      
      </div><br/>
      <button onClick={handleCreateTask} className='create-task'>Create Task</button>
  
   
 
    </div>
    <Footer/>
    </>
    
  );
}

export default Admin;
