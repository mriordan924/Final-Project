import React, { useState } from 'react';
import API from './API';
import Logo from './Logo';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // simulated login/data
    // const userData = {
    //   username,
    //   fullName: 'John Doe', 
    //   location: 'New York', 
    //   bio: 'This is a fake profile', 
    // };

    try {
      const userData = await API.authenticateUser (username, password);
      onLogin(userData);
    } catch (error) {
      console.error (error.message);
      setErrorMessage('Incorrect username or password. Please try again.')
    }
  };

  return (
    <div className='login-container'>
      <div className='login-logo'>
        <Logo />
      </div>
      <div className='login-form'>
      <h2>STYLED.</h2>
      <h3>Account Sign-in</h3>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
  );
}

export default Login;

