const fs = require('fs').promises;
const path = require('path');
const {getGermanTime} = require('../services/timeGermanyService');

const dataPath = path.resolve(__dirname, process.env.PATH_DATA);


const getUser = async (req, res)=> {

   try {
    const data = await fs.readFile(dataPath, 'utf8');
    const user = JSON.parse(data);
    res.status(200).json({
        success: true,
        data: user
    });

   } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error - failed to load user data',
     });
   }
}



module.exports = {
    getUser,
    
}