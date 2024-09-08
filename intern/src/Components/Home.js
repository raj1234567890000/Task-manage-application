import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import Header from './Header';

const Home = () => {
    const [currentView, setCurrentView] = useState('login');

    const switchView = (view) => {
      setCurrentView(view);
    };
  return (
    <>
    <Header/>
         {currentView === 'login' ? (
        <Login switchView={switchView} />
      ) : (
        <Register switchView={switchView} />
      )}
      
     <Footer/>
    </>
  )
}

export default Home
