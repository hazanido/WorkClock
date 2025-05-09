const axios = require('axios');

const getGermanTime = async () => {

try {

    const response = await axios.get("https://timeapi.io/api/time/current/zone?timeZone=Europe%2FBerlin");
    console.log(response.data);
    return response.data;
    
    
} catch (error) {
    
    throw new Error("API failed");
}

};

module.exports = {
    getGermanTime
}