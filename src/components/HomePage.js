import React from 'react';
import { Link } from 'react-router-dom';
import './CSS/home.css'

const HomePage = () => {
    const style = {
      container: { textAlign: 'center', marginTop: '50px' },
      button: { marginRight: '10px', cursor: 'pointer' },
    };
  
    return (
      <div style={style.container}>
        <h1>Welcome to Anti-Facebook</h1>
        <p>This is a great place to start your journey with us.</p>
        <div>
          <Link to="/login">
            <button style={style.button}>Login</button>
          </Link>
          <Link to="/register">
            <button style={style.button}>Register</button>
          </Link>
        </div>
      </div>
    );
  };
  

export default HomePage;
