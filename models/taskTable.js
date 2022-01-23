const Sequelize = require("sequelize");
const db = require('../config/database');
const user = require('./usertable');

const taskTable = db.define('task', {
    taskID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
    },
    scheduledAt: {
        type: Sequelize.DATE,
        // allowNull: false,
    },
    triggeredAt: {
        type: Sequelize.DATE,
    },
    taskStatus: {
        type: Sequelize.ENUM,
        values: ["Active", "Completed", "Deleted"],
        defaultValue: 'Active'
    }
})

user.hasMany(taskTable)

module.exports = taskTable;