import axios from "axios";

const API_URL = "http://localhost:3000/user";

export const reportEntry = async (userName: string, token: string) => {
  const response = await axios.post(`${API_URL}/entry`,
    {userName},
    {headers: {Authorization: `Bearer ${token}`,},}
  );
  return response.data;
};

export const reportExit = async (userName: string ,token: string) => {
  const response = await axios.post(`${API_URL}/exit`, 
    {userName},
    {headers: {Authorization: `Bearer ${token}`,},}
  );
  return response.data;
};

export const getAllUsers = async (token: string) => {
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data.data || []
}

export const updateReport = async (
  userName: string,
  date: string,
  checkIn: string,
  checkOut: string,
  token: string
) => {
  const response = await axios.put(
    `${API_URL}/update`,
    { userName, date, checkIn, checkOut },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}