import React, { useState } from 'react';
import API from './API';
import Logo from './Logo';

function RegisterForm({ onRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    avatar: '',
    bio: '',
    location: '',
    fullName: '',
  });

  const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // send a POST request to create a new user
      const newUser = await API.createUser(formData);
      // registration success
      setIsRegistrationSuccessful(true);
      // reset the form fields
      setFormData({
        username: '',
        password: '',
        avatar: '',
        bio: '',
        location: '',
        fullName: '',
      });
      
      onRegister(newUser);


    } catch (error) {
      console.error('Error registering user', error);
    }
  };


  return (
    <div className='register-container'>
      <div className='register-header'>
      <div className='register-logo'>
        <Logo />
      </div>
      </div>
      <div className='register-form'>
      <h2>Join STYLED.</h2>
      {isRegistrationSuccessful ? (
        <div>
          <p>Welcome to STYLED! Start sharing your looks now!</p>
        </div>
      ) : (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Choose a Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Create a Password"
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="avatar"
          placeholder="Avatar URL: show us YOU!"
          value={formData.avatar}
          onChange={handleChange}
        />
        <input
          type="text"
          name="bio"
          placeholder="Bio: Tell us about your fashion sense!"
          value={formData.bio}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location: City and State."
          value={formData.location}
          onChange={handleChange}
        />
        <input
          type="text"
          name="fullName"
          placeholder="Who are you? First and Last name."
          value={formData.fullName}
          onChange={handleChange}
        />
        <button type="submit">Create Account</button>
      </form>
      )}
    </div>
    </div>
  );
}

export default RegisterForm;
