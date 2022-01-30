const express = require('express');
const router = express.Router();


const controller = require('../controller/user_controller')
const validate = require('../middleware/validator');
const auth = require('../middleware/authenication');

router.post('/signup', validate.validateUserCreate, controller.create);
router.post('/login', validate.validateUserLogin, controller.login);
router.post('/emailVerify', controller.user_emailVerify);
router.post('/mobileVerify', controller.user_mobileVerify);
router.post('/task', auth, validate.validateCreateTask, controller.task);
router.post('/subtask', auth, validate.validateCreatesubTask, controller.subtask);
router.put('/taskUpdate', auth, validate.validateTaskUpdate, controller.taskUpdate);
router.put('/subtaskUpdate', auth, validate.validatesubtaskUpdate, controller.subtaskUpdate);
router.delete('/taskdelete/:id', auth, controller.taskDelete);
router.delete('/subtaskdelete/:id&:taskID', auth, controller.subtaskDelete);
router.get('/getAll', auth, controller.getAllTasks);
router.post('/reminder', controller.reminder);
router.get('/logout', controller.logout);

module.exports = router;
