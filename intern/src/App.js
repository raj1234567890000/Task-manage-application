
import './App.css';
import Home from './Components/Home';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import User from './Components/User';
import Admin from './Components/Admin';
import Update from './Components/Update';
import AllTask from './Components/AllTask';
import Updateuser from './Components/Updateuser';
import Nav from './Components/Nav';







function App() {

  return (
    <> 
    <Nav/>
   
      <BrowserRouter>
    
   
 <Routes>
 <Route path="/" element={<Home/>}/>
  <Route path='/user' element={<User/>}></Route>
  <Route path='/admin' element={<Admin/>}></Route>

 <Route path='/admin' element={<Admin/>}></Route>
 <Route path='/update/:id' element={<Update/>}></Route>
 <Route path='/alltask' element={<AllTask/>}></Route>
<Route path='/user/:id' element={<Updateuser/>}></Route>

 </Routes>
  </BrowserRouter>






    </>
  
  );
}

export default App;
