const express = require('express');
const router = express.Router();


const { create, login, user_emailVerify, user_mobileVerify, task, subtask, taskUpdate, subtaskUpdate, taskDelete, subtaskDelete, getAllTasks, logout } = require('../controller/user_controller')
const { validateCreateTask, validateCreatesubTask, validateTaskUpdate, validateUserCreate, validateUserLogin, validatesubtaskUpdate } = require('../middleware/validator');
const auth = require('../middleware/authenication');

router.post('/signup', validateUserCreate, create);
router.post('/login', validateUserLogin, login);
router.post('/emailVerify', user_emailVerify);
router.post('/mobileVerify', user_mobileVerify);
router.post('/task', auth, validateCreateTask, task);
router.post('/subtask', auth, validateCreatesubTask, subtask);
router.put('/taskUpdate', auth, validateTaskUpdate, taskUpdate);
router.put('/subtaskUpdate', auth, validatesubtaskUpdate, subtaskUpdate);
router.delete('/taskdelete/:id', auth, taskDelete);
router.delete('/subtaskdelete/:id&:taskID', auth, subtaskDelete);
router.get('/getAll', auth, getAllTasks);
router.get('/logout', logout);

module.exports = router;
