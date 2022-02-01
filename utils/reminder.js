const schedule = require('node-schedule');
const Task = require('../models/taskTable');
const User = require('../models/usertable');
const mailer = require('./email');
const sms = require('./twillio');

const reminder = async () => {
    try {
        const job = schedule.scheduleJob('*/5 * * * *', async () => {
            const date = new Date();
            const tasks = await Task.findAll({ where: { status: 'Active' } });
            if (tasks.length > 0) {
                for (const index in tasks) {
                    const diff = Math.abs(date - (tasks[index].scheduledAt));
                    if (diff <= 300000) {
                        const userdetails = await User.findOne({ where: { id: tasks[index].id } });
                        const { email } = userdetails;
                        const number = userdetails.mobile;
                        const { title } = tasks[index];
                        const message = `Reminder, ${title} will begin shortly `;
                        // sending reminder to email and sms
                        mailer(email, message);
                        sms(number, message);
                    }
                }
            }
        });
        return;
    } catch (error) {
        console.log(error);
    }
};

module.exports = reminder();
