const { validateLGA } = require("../utils/validateLocalGovernment");
const { validateState } = require("../utils/validateState");


module.exports = (sequelize, Sequelize) => {
    const Operator = sequelize.define("operator", {
      firstName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^\+(?:[0-9] ?){6,14}[0-9]$/,
            msg: "Invalid phone number format.",
          },
        },
      },
      nationality: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Nigeria',
        validate: {
          isIn: [['Nigeria']],
        },
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          custom: validateState,
        },
      },
      lga: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          custom: validateLGA,
        },
      },
      sex: {
        type: Sequelize.ENUM('male', 'female'),
        allowNull: false,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      nin: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      userPicture: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      operatorId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        defaultValue: '0',
      },
      
    });
  
    Operator.associate = function(models) {
      Operator.belongsTo(models.role);
    };
  
    return Operator;
  };
  