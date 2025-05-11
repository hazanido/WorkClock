import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerRequest } from '../services/authService';


const RegisterPage: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerRequest(userName, password)

      alert('Registration successful');
      navigate('/'); 
    } catch (err) {
      console.error('Registration failed:', err);
      alert('Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>User Name:</label>
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

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
