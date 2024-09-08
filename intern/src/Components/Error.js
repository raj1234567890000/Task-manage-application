
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Error = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h2 style={{marginTop:"50px"}}>404</h2>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="back-home">Go Back Home</Link>
      </div>
      <div className="animation-wrapper">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Error;
