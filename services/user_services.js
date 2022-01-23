const User = require('../models/usertable');
const Task = require('../models/taskTable');
const Subtask = require('../models/subTaskTable');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const client = require('../redis');
const otp = require("../otp")
const responseFile = require('../response');

const mailer = require("../email");
const sms = require("../twillio");

const schedule = require('node-schedule');
require('dotenv').config()
const jwthashstring = process.env.JWTSTRING;

//db querry to create/signup new user

exports.user_create = async (req, res) => {

    const email = req.body.email;
    let number = req.body.mobile;
    // let userExit = await User.findOne({ email });
    // if (userExit)
    //     return responseFile.errorResponse(res, "User Already Exit", 403);

    //password hashing
    const salt = await bcrypt.genSalt(10);

    let user = {}
    user.userID = req.body.userID
    user.username = req.body.username;
    user.password = await bcrypt.hash(req.body.password, salt);
    user.mobile = req.body.mobile;
    user.email = email;

    const newUser = new User(user);
    newUser.save();

    //create a payload for token generation
    const payload = {
        user: { id: newUser.userID }
    };

    //token generation using payload
    let token = jwt.sign(payload, jwthashstring, { expiresIn: 10000 }, { algorithm: 'RS256' });

    //storing email id in redis using  jwt token as keyword
    let redisDetails = await client.set(
        token, email, 'EX', 3600
    );

    //sending otp to email and mobile number for verification
    let message = "Your otp for verification is " + otp
    mailer(email, message);
    sms(number, message);

    //storing otp in redis using  email as keyword for email verification
    let redisEmail = await client.set(
        email, otp, 'EX', 86400
    );


    //storing otp in redis using  mobile number as keyword for phone number verification
    let redismobile = await client.set(
        number, otp, 'EX', 86400
    );
    // console.log("token", token)
    return token




};


//db querry to login user


exports.user_login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ where: { email: email } });

        if (!user)
            return responseFile.errorResponse(res, "no user found...", 404);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return responseFile.errorResponse(res, "Invalid password...", 403)

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
        console.log("error", error)
        return responseFile.errorResponse(res, "server error")

    }
}

//db querry to create task 

exports.create_task = async (req, res) => {

    let task = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        scheduledAt: req.body.time,
        triggeredAt: req.body.reminderTime,
    }

    const newTask = new Task(task);

    newTask.save();

    const date = new Date(req.body.reminderTime);
    let message = `Reminder , ${task.title} will begin shortly`;

    let userdetails = await User.findOne({ where: { id: task.id } });
    let email = userdetails.email;
    let number = userdetails.mobile;

    const job = schedule.scheduleJob(date, function () {
        //sending mail and getting otp

        mailer(email, message);
        sms(number, message);

    });
    return newTask

}

//db querry to create subtask 

exports.create_subtask = async (req, res) => {
    let subtask = {
        id: req.body.id,
        taskID: req.body.taskID,
        title: req.body.title,
        description: req.body.description,
        scheduledAt: req.body.time,
        triggeredAt: req.body.reminderTime,


    }
    const newSubtask = new Subtask(subtask);
    newSubtask.save();

    const date = new Date(req.body.reminderTime);
    let message = `Reminder , ${subtask.title} will begin shortly`;

    let userdetails = await User.findOne({ where: { id: subtask.id } });
    let email = userdetails.email;
    let number = userdetails.mobile;

    const job = schedule.scheduleJob(date, function () {
        //sending mail and getting otp

        mailer(email, message);
        sms(number, message);

    });


    return newSubtask



}

//db querry to update task status

exports.user_taskUpdate = async (req, res) => {
    let taskUpdateResult = await Task.update({ taskStatus: req.body.taskStatus }, { where: { taskID: req.body.taskID } });
    if (taskUpdateResult) {
        return true
    } else {
        return false
    }
}

//db querry to update subtask status

exports.user_subtaskUpdate = async (req, res) => {
    let subtaskUpdateResult = await Subtask.update({ taskStatus: req.body.taskStatus }, { where: { subTaskID: req.body.subTaskID } });
    if (subtaskUpdateResult) {
        return true
    } else {
        return false
    }
}

//db querry to delete a task with task id

exports.task_delete = async (param, res) => {
    let subtasks = await Subtask.findAll({ where: { taskID: param.id, taskStatus: "Active" } });
    if (subtasks.length == 0) {
        let subTaskDelete = await Subtask.destroy({ where: { taskID: param.id } })
        let taskDelete = await Task.destroy({ where: { taskID: param.id } });
        return true
    } else {
        return false
    }
}


//db querry to delete a subtask with subtask id

exports.subtask_delete = async (param) => {
    let subTaskDeleteResult = await Subtask.destroy({ where: { taskID: param.taskID, subTaskID: param.id } });
    if (subTaskDeleteResult) {
        return true
    } else {
        return false
    }
}

//db querry to read all tasks

exports.userGetAllTasks = async (param) => {
    let tasklist = await Task.findAll({});
    return tasklist;
}


//db querry to logout

exports.user_logout = async (req, res) => {
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