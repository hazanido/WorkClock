import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

export const loginRequest = async (userName: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    userName,
    password,
  });
  return response.data; 
};
