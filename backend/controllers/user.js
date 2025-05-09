const fs = require('fs').promises;
const path = require('path');
const {getGermanTime} = require('../services/timeGermanyService');
const {calculateWorkHours} = require('../services/calculateWorkHours');
const { checkout } = require('../routes');

const dataPath = path.resolve(__dirname, process.env.PATH_DATA);


const getUser = async (req, res)=> {

   try {
    const dataUser = await fs.readFile(dataPath, 'utf8');
    const user = JSON.parse(dataUser);
    const userNotPassword = user.map(user => ({
        userName: user.userName,
        attendance: user.attendance
    }))
    res.status(200).json({
        success: true,
        data: userNotPassword
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
            return res.status(404).json({ success: false, message: "Not found user" });
        
        
        const nowDate = await getGermanTime();

        userChange.attendance.push({
            date: nowDate.date,
            checkIn: nowDate.time,
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

const exitReport = async (req,res)=> {
    try {
        if (!req.body.attendance?.date)
            return res.status(400).json({ success: false, message: "Missing attendance date" });

        const dataUser = await fs.readFile(dataPath,'utf8');
        const users = JSON.parse(dataUser);
        const userChange = users.find(user=> user.userName === req.body.userName);
        if(!userChange)
            return res.status(404).json({success: false, message: "Not found user" });
    
        const exitDate = userChange.attendance.find(exit=> exit.date === req.body.attendance.date);
        if(!exitDate)
            return res.status(404).json({success: false, message: "Not found date"});
    
        const nowDate = await getGermanTime();
    
        exitDate.checkOut = nowDate.time;
        exitDate.counterHour = calculateWorkHours(req.body.attendance.checkIn, nowDate.time)
        const updatUser = JSON.stringify(users,null,2);
        await fs.writeFile(dataPath,updatUser);
        
        res.status(200).json({
            success:true,
            message: "check-out recorded",
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
    exitReport
    
}