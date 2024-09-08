import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

const Footer = () => {
  return (
    <div className=' Footer'>
        <h4 className='text-center'>All Right Reserved © : Rohit Rajput 2024 !</h4>
        <p className='text-center mt-3'>
          <Link to="/about" className='footer'>about</Link>|<Link to="/contact" className='footer'>Contact</Link>|<Link to="/policy" className='footer'>Privacy Policy</Link>
        </p>
      
    </div>
  )
}

export default Footer