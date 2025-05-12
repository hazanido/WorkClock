const express = require ('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const user = require ('../controllers/user.js');


router.get('/',authMiddleware ,user.getUser);

router.post('/entry',authMiddleware, user.entryReport);
router.post('/exit',authMiddleware, user.exitReport);
router.put('/update',authMiddleware,isAdmin,user.updateReport);

module.exports = router;
