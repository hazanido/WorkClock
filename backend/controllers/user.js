const fs = require('fs').promises;
const path = require('path');


const dataPath = path.resolve(__dirname, process.env.PATH_DATA);


const getUser = async (req, res)=> {

   try {
    const data = await fs.readFile(dataPath, 'utf8');
   } catch (err) {
    res.status(500).json({ error: 'Failed to load user data' });
   }
}

module.exports = {
    getUser,
    
}