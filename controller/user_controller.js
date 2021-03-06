const User = require('../models/usertable');
const user_service = require('../services/user_services');
const responseFile = require('../response');
const client = require('../utils/redis');

exports.create = async (req, res) => {
    try {
        const response = await user_service.user_create(req, res);
        if (response) {
            responseFile.successResponse(res, response, 'Created a new user!');
        }
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'Invalid username or password !', 400);
    }
};

exports.login = async (req, res) => {
    try {
        const response = await user_service.user_login(req, res);
        if (response) {
            responseFile.successResponse(res, response, 'Sucessfull login!');
            return;
        }
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'invalid credentinals !!!', 400);
    }
};

// user email verify page
exports.user_emailVerify = async (req, res) => {
    const { email, onetp } = req.body;

    try {
        client.get(email, async (err, data) => {
            if (err) {
                console.log('error', err);
            }

            if (data === onetp) {
                const emailupdateResult = await User.update({ isEmailVerified: true }, { where: { email } });
                if (emailupdateResult) { return responseFile.successResponse(res, 'email verified !!!'); }
            } else {
                return responseFile.errorResponse(res, 'Invalid otp !!!', 401);
            }
        });
    } catch (error) {
        return responseFile.errorResponse(res, 'server Error!!!', 500);
    }
};

// user Phone number  verify page
exports.user_mobileVerify = async (req, res) => {
    const { email, number, onetp } = req.body;

    try {
        client.get(number, async (err, data) => {
            if (err) {
                console.log('error', err);
                return responseFile.errorResponse(res, 'Cannot connect, try after sometime!!!', 400);
            }

            if (data === onetp) {
                const mobileupdateResult = await User.update({ isMobileVerified: true }, { where: { email } });
                if (mobileupdateResult) { return responseFile.successResponse(res, 'Mobile verified !!!'); }
            } else {
                return responseFile.errorResponse(res, 'Invalid otp!!!', 401);
            }
        });
    } catch (error) {
        return responseFile.errorResponse(res, 'server Error !!!', 500);
    }
};

exports.task = async (req, res) => {
    try {
        const response = await user_service.create_task(req, res);
        if (response) {
            responseFile.successResponse(res, response, 'Created a new task');
            return;
        }
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'Server error!!!', 500);
    }
};

exports.subtask = async (req, res) => {
    try {
        const response = await user_service.create_subtask(req, res);
        if (response) {
            responseFile.successResponse(res, response, 'Created a new Subtask');
            return;
        }
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'Server error!!!', 500);
    }
};

exports.taskUpdate = async (req, res) => {
    try {
        const response = await user_service.user_taskUpdate(req, res);
        if (response) {
            responseFile.successResponse(res, response, 'task status updated sucessfully !');
            return;
        }
        console.log('invalid/no response from function user_taskUpdate!!!');
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'server error !!!', 500);
    }
};

exports.subtaskUpdate = async (req, res) => {
    try {
        const response = await user_service.user_subtaskUpdate(req, res);
        if (response) {
            responseFile.successResponse(res, response, 'subtask status updated sucessfully !');
            return;
        }
        console.log('invalid/no response from function user_subtaskUpdate!!!');
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'server error !!!', 500);
    }
};

exports.taskDelete = async (req, res) => {
    try {
        const response = await user_service.task_delete(req.params, res);
        if (response) {
            responseFile.successResponse(res, response, 'task deleted !');
            return;
        }

        return responseFile.errorResponse(res, 'Cannot delete as some subtasks are still pending !!!', 400);
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'Invalid credentials !!!', 400);
    }
};

// delete subtasks
exports.subtaskDelete = async (req, res) => {
    try {
        const response = await user_service.subtask_delete(req.params);
        if (response) {
            responseFile.successResponse(res, response, 'task deleted sucessfully !');
            return;
        }

        return responseFile.errorResponse(res, 'No task found with given id !!!', 400);
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'Invalid credentials !!!', 400);
    }
};

// read all tasks or task with specific task id

exports.getAllTasks = async (req, res) => {
    try {
        const response = await user_service.userGetAllTasks(req.querry);
        if (response.length === 0) {
            return responseFile.errorResponse(res, 'no tasks found!!!', 404);
        }

        responseFile.successResponse(res, response, 'list of tasks !!!');
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'Something went wrong', 400);
    }
};

// user logout

exports.logout = async (req, res) => {
    try {
        const response = await user_service.user_logout(req, res);
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'Server error!!!', 500);
    }
};
