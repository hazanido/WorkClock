import axios from 'axios';

const API_URL = 'https://timeapi.io/api/time/current/zone?timeZone=Europe%2FBerlin';



export const getTimeGermany = async () => {
  
try {

    const response = await axios.get(API_URL);

    return response.data;
    
} catch (error) {
    
    throw new Error("API failed");
}
};