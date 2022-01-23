
const admin_services = require('../services/admin_services');
const responseFile = require('../response');



exports.login = async (req, res) => {
    try {
        let response = await admin_services.admin_login(req, res);
        if (response) {
            responseFile.successResponse(res, response)
            return
        }
        else {
            console.log("invalid/no response from Function admin_login!!!")
        }
    } catch (error) {
        console.log("error", error);
        return responseFile.errorResponse(res, "invalid credentinals !!!")

    }
}

exports.getAllTasks = async (req, res) => {
    try {
        let response = await admin_services.adminGetAllTasks(req, res);
        if (response) {
            return responseFile.successResponse(res, response)
        }
        else {
            console.log("invalid/no response from Function adminGetAllTasks!!!")
        }

    } catch (error) {
        return responseFile.errorResponse(res, "currently no data available !!!")
    }
}

//admin logout

exports.logout = async (req, res) => {
    try {
        let response = await user_service.admin_logout(req, res);

    } catch (error) {
        console.log("error", error)

    }
}



