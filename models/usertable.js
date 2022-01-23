const Sequelize = require("sequelize");
const db = require("../config/database");

const user = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isEmailVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isMobileVerified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    userStatus: {
        type: Sequelize.ENUM('Active', 'Deleted'),
        defaultValue: 'Active'
    }
}
);



module.exports = user;