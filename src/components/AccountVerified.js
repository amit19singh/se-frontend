import React from 'react';
import { Link } from 'react-router-dom';

const AccountVerified = () => {
    const style = {
      container: { textAlign: 'center', marginTop: '50px' },
      button: { marginRight: '10px', cursor: 'pointer' },
    };
  
    return (
      <div style={style.container}>
        <h1>Account Successfully Verified.</h1>
        <p>Please close this tab and Log In to your account.</p>
      </div>
    );
  };
  

export default AccountVerified;
