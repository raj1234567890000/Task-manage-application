
import React, { useEffect, useState } from 'react';
import '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';






function Update() {
 
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const[assignedTo,setAssignedTo]=useState('');
  const[status,setStatus]=useState('');
const[createdAt,setCreatedAt]=useState('')


const navigate=useNavigate();
  const params=useParams()

useEffect(() => {
  getTaskDetails();
  //eslint-disable-next-line
  },[]);
 

  const getTaskDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getalltask/${params.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result, "result");
  
      // Update component state
      setTitle(result.title);
      setDescription(result.description);
      setAssignedTo(result.assignedTo);
      setStatus(result.status); 
      setCreatedAt(result.createdAt);
    } catch (error) {
      console.error("Error fetching task details:", error);
    }
    //
    
  }
//update

const handleUpdate = async () => {
  console.group({ title,description,assignedTo,status,createdAt });
  let result = await fetch(`http://localhost:8080/tasks/${params.id}`, {
    method: "Put",
    body: JSON.stringify({ title,description,assignedTo,status,createdAt }),
    headers: {
      "content-Type": "application/json",
    },
  });

  result = await result.json();
  console.log(result);
  toast.success("Task Update Successfully")
  navigate("/alltask");
};
  


  return (
    <div className='task-manage'>
    
      <div div className='task'>
       
        <input className='text-input'
          type="text"
          placeholder="Task Name"
         name={title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
      <button onClick={handleUpdate} className='create-task'>Update Task</button>
  
    </div>
 
  
    
  );
}



export default Update
