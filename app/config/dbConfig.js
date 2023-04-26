const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const configDetails = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: process.env.PASSWORD,
    DATABASE: "bgproject",
    DIALECT: 'mysql',
    POOL: {
        MAX: 5,
        MIN: 0,
        ACQUIRE: 30000,
        IDLE: 10000
    }
}


const sequelize = new Sequelize(
    configDetails.DATABASE,
    configDetails.USER,
    configDetails.PASSWORD, {
        host: configDetails.HOST,
        dialect: configDetails.DIALECT,
        pool: {
            max: configDetails.POOL.MAX,
            min: configDetails.POOL.MIN,
            acquire: configDetails.POOL.ACQUIRE,
            idle: configDetails.POOL.IDLE
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const User = require("../models/users.model.js")(sequelize, Sequelize)
const Role = require("../models/roles.model.js")(sequelize, Sequelize)
const Operator = require("../models/operators.model.js")(sequelize, Sequelize)


db.user = User;
db.role = Role;
db.operator = Operator;

module.exports = db