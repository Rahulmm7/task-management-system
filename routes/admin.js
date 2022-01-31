const express = require('express');

const router = express.Router();

const { login, getAllTasks, logout } = require('../controller/admin_controller');
const auth = require('../middleware/authenication');
const { validateUserLogin } = require('../middleware/validator');

router.post('/login', validateUserLogin, login);
router.get('/getAllTask', auth, getAllTasks);
router.get('/logout', logout);

module.exports = router;
