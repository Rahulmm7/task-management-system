const admin_services = require('../services/admin_services');
const responseFile = require('../response');

exports.login = async (req, res) => {
    try {
        const response = await admin_services.admin_login(req, res);
        if (response) {
            responseFile.successResponse(res, response);
        } else {
            console.log('invalid/no response from Function admin_login!!!');
        }
    } catch (error) {
        console.log('error', error);
        return responseFile.errorResponse(res, 'invalid credentinals !!!', 400);
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const response = await admin_services.adminGetAllTasks(req, res);
        if (response.length === 0) {
            responseFile.errorResponse(res, 'no users in the list', 404);
        } else {
            responseFile.successResponse(res, response, 'List of users');
        }
    } catch (error) {
        return responseFile.errorResponse(res, 'currently no data available !!!', 400);
    }
};

// admin logout

exports.logout = async (req, res) => {
    try {
        const response = await admin_services.admin_logout(req, res);
    } catch (error) {
        return responseFile.errorResponse(res, 'Something went wrong!!!', 400);
    }
};
