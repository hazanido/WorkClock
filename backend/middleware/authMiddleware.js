const jwt = require('jsonwebtoken');



const authMiddleware = (req,res,next)=> {

    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token)
        return res.status(401).json({ message: "Token missing" });

    jwt.verify(token,process.env.TOKEN_SECRET, (err,user)=>{
        if(err)
            return res.status(403).json({message: err.message});

        req.user = user;
        next();
    })
};

    const isAdmin = (req, res, next) => {
        if (req.user.role !== 'admin')
            return res.status(403).json({ message: 'Access denied' });

        next();
};

module.exports = {
  authMiddleware,
  isAdmin
};