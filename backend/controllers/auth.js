const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt')
const dataPath = path.resolve(__dirname, process.env.PATH_DATA);


const register = async (req,res)=> {

    try {

        const {userName,password} = req.body;

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
        res.status(400).json({ message: "There is a problem."})
    }

}

const loginUser = async (req,res)=>{
    
    try {
        
        const {userName,password} = req.body
        
        const datauser = await fs.readFile(dataPath, 'utf8');
        const users = JSON.parse(datauser);

        const user = users.find(user=> user.userName === userName && user.password === password);
        if(!user) 
            return res.status(404)

        const token = createToken(user.userName)



    } catch (error) {
        
    }
}

const logout = async (req,res)=> {

    try {
        
    } catch (error) {
        
    }

}

module.exports = {
    register,
    loginUser,
    logout
}