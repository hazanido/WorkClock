const express = require ('express');
const router = express.Router();


const user = require ('../controllers/user.js');


router.get('/', user.getUser)

router.post('/entry', user.entryReport)


module.exports = router;
