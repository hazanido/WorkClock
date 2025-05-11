import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginRequest } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
const [userName, setUserName] = useState('');
const [password, setPassword] = useState('');

const auth = useAuth();
const navigate = useNavigate();


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const data = await loginRequest(userName, password);
    auth.login(data.token, data.role);

    
    if (data.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/user');
    }
  } catch (err) {
    console.error('Login failed:', err);
    alert('Invalid credentials');
  }
};

return (
  <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
    <h2>Login</h2>

    <form onSubmit={handleSubmit}>
      <div>
        <label>Login:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit">Login</button>
    </form>
  </div>
);



};

export default LoginPage;
