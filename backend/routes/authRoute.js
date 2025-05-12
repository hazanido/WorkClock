const express = require ('express');
const router = express.Router();

const {authMiddleware} = require("../middleware/authMiddleware")
const auth = require("../controllers/auth");


router.post('/register', auth.register);

router.post('/login', auth.loginUser);
router.post('/logout', authMiddleware, auth.logout);


module.exports = router;