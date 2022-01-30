const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const client = require('../utils/redis');
const responseFile = require('../response');

const User = require('../models/usertable');
const Task = require('../models/taskTable');

const jwthashstring = process.env.JWTSTRING;


//db querry to admin login

exports.admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ where: { email: email } });

        if (!user)
            return responseFile.errorResponse(res, "no user found...", 404);

        if (!user.isAdmin) {
            return responseFile.errorResponse(res, "You are not admin !", 403);
        }

        if (!user.isEmailVerified)
            return responseFile.errorResponse(res, "email not verified...", 403)

        if (!user.isMobileVerified)
            return responseFile.errorResponse(res, "Mobile not verified...", 403);

        if (user.userStatus === "Blocked") {
            return responseFile.errorResponse(res, "Your account is blocked", 403);
        }
        if (user.userStatus === "Deleted") {
            return responseFile.errorResponse(res, "User unavailable. Your account may be deleted", 403);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return responseFile.errorResponse(res, "Invalid password...", 403)

        //creating payload 
        const payload = {
            user: { id: user.userID }
        };

        //creating token using payload
        let token = await jwt.sign(payload, jwthashstring, { expiresIn: 3600 }, { algorithm: 'RS256' })

        //storing email in redis using token as keyword
        let redisData = await client.set(token, email, 'EX', 3600);

        return token
    } catch (error) {
        console.log("error", err)
        return responseFile.errorResponse(res, "Something went wrong...", 400)

    }
}


//db querry of admin page to view all tasks

exports.adminGetAllTasks = async (param) => {

    try {
        let tasklist = await Task.findAll({});
        return tasklist;

    } catch (error) {
        responseFile.errorResponse(res, "Server issue", 500)
        return
    }
}

//db querry to admin logout

exports.admin_logout = async (req, res) => {
    const loginToken = req.header("token");
    try {
        client.del(loginToken, function (err, response) {
            if (response == 1) {
                return responseFile.successResponse(res, "user logout...");
            } else {
                return responseFile.errorResponse(res, "something went wrong !!!", 400)
            }
        })

    } catch (error) {
        return responseFile.errorResponse(res, "server Error!!!", 500);
    }
}
