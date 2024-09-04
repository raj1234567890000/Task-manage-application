import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

const Home = () => {
    const [currentView, setCurrentView] = useState('login');

    const switchView = (view) => {
      setCurrentView(view);
    };
  return (
    <>
         {currentView === 'login' ? (
        <Login switchView={switchView} />
      ) : (
        <Register switchView={switchView} />
      )}
      
     
    </>
  )
}

export default Home
