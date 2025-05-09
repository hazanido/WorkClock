const fs = require('fs').promises;
const path = require('path');
const {getGermanTime} = require('../services/timeGermanyService');

const dataPath = path.resolve(__dirname, process.env.PATH_DATA);


const getUser = async (req, res)=> {

   try {
    const dataUser = await fs.readFile(dataPath, 'utf8');
    const user = JSON.parse(dataUser);
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

const entryReport = async (req,res)=> {
    
    try {
        const dataUser = await fs.readFile(dataPath, 'utf8');
        const users = JSON.parse(dataUser)
        const userChange = users.find(user=> user.userName === req.body.userName);
        if(!userChange)
            return res.status(404).json({ success: false, message: "User not found" });
        console.log(userChange);
        
        const nowDate = await getGermanTime();

        userChange.attendance.push({
            date: nowDate.date,
            checkIn: nowDate.dateTime,
        })

        const updatedData = JSON.stringify(users,null,2);
        await fs.writeFile(dataPath, updatedData);

        res.status(200).json({
            success: true,
            message: "Check-in recorded",
            data: userChange
        })
        
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Internal server error" 
            });
        
    }
}


module.exports = {
    getUser,
    entryReport,
    
}