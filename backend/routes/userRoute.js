const express = require ('express');
const router = express.Router();
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const user = require ('../controllers/user.js');


router.get('/',authMiddleware ,user.getUser);

router.post('/entry', user.entryReport);
router.post('/exit', user.exitReport);

module.exports = router;
