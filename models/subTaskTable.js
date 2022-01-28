const Sequelize = require('sequelize');
const db = require('../config/database');
const taskTable = require('./taskTable');
const User = require('./usertable');

const subTaskTable = db.define('subtask', {
    subTaskID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    taskID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'tasks', key: 'taskID' }

    },
    id: {
        type: Sequelize.UUID,
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
        allowNull: false,
    },
    completedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    triggeredAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM('Active', 'Completed', 'Deleted'),
        defaultValue: 'Active'
    }
})

taskTable.hasMany(subTaskTable);
User.hasMany(subTaskTable)


module.exports = subTaskTable;
