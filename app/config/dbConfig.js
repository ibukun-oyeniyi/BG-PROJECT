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
const Operator = require("../models/operators.model.js")(sequelize, Sequelize)
const State = require("../models/states.model.js")(sequelize, Sequelize)
const Lga = require("../models/Lga.model.js")(sequelize, Sequelize)


db.user = User;
db.operator = Operator;
db.state =State
db.lga = Lga


Operator.associate(db)
State.associate(db)
Lga.associate(db)

module.exports = db