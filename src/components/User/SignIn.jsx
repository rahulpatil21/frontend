// SignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import  {Link,useNavigate}  from 'react-router-dom';

const BASE_URL = 'http://127.0.0.1:8000/';

const api = axios.create({
  baseURL: BASE_URL,
});

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('user/signin/', { username, password });
      const token = response.data.token;

      

      // Store the token in localStorage
      localStorage.setItem('token', token);
      // Redirect the user to another page
      navigate('/');
      
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <>
        <form onSubmit={handleSignIn}>
            <label>Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <br />
            <label>Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <br />
            <button type="submit">Sign In</button>
        </form>
        <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
    </>
  );
};

export default SignIn;
