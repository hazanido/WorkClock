import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export const loginRequest = async (userName: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    userName,
    password,
  });
  return response.data; 
};

export const registerRequest = async (userName: string, password: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    userName,
    password,
  });
  return response.data;
};
