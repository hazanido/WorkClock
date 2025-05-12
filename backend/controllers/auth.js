const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dataPath = path.resolve(__dirname, process.env.PATH_DATA);


const register = async (req,res)=> {

    try {

        const {userName,password} = req.body;

        if(userName == null || password == null)
            return sendError(res,'User name or password missing');

        const dataUser = await fs.readFile(dataPath, 'utf8');
        const users = JSON.parse(dataUser);

        const user = users.find(user=> user.userName === userName);
        if(user)
            return res.status(400).json("User name Exists");

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        users.push({
            userName: userName,
            password: hashPassword,
            role: "user",
            attendance: []
        })

        const updatedData = JSON.stringify(users,null,2);
        await fs.writeFile(dataPath, updatedData);

        res.status(200).json({message:"User created successfully"})

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}

const loginUser = async (req,res)=>{
    
    try {
        
        const {userName,password} = req.body;

        if(userName == null || password == null)
            return res.status(400).json("Bad name or password");
        const datauser = await fs.readFile(dataPath, 'utf8');
        const users = JSON.parse(datauser);

        const user = users.find(user=> user.userName === userName);
        if(!user)
            return res.status(400).json("Bad name or password");

        const matchPassword = await bcrypt.compare(password,user.password);
        if(!matchPassword)
            return res.status(400).json("Bad name or password");

        const token = await jwt.sign(
            {userName: user.userName,
             role: user.role   
            },
            process.env.TOKEN_SECRET,
            {expiresIn: process.env.TOKEN_EXPIRATION}
        )

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            role: user.role
        });
        


    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

module.exports = {
    register,
    loginUser,
    logout
}