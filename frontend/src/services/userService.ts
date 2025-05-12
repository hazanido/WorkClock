import axios from "axios";

const API_URL = "http://localhost:3000/user";

export const reportEntry = async (userName: string, token: string) => {
  const response = await axios.post(`${API_URL}/entry`,
    {userName},
    {headers: {Authorization: `Bearer ${token}`,},}
  );
  return response.data;
};

export const reportExit = async (userName: string, date: string ,token: string) => {
  const response = await axios.post(`${API_URL}/exit`, 
    {userName, date},
    {headers: {Authorization: `Bearer ${token}`,},}
  );
  return response.data;
};
