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
      
    });
  
    Operator.associate = function(models) {
      Operator.belongsTo(models.user,{ foreignKey: 'userId', onDelete: "cascade" });
      Operator.belongsTo(models.state,{ foreignKey: 'stateId', onDelete: "cascade" });
      Operator.belongsTo(models.state,{ foreignKey: 'stateId', onDelete: "cascade" });
    };
  
    return Operator;
  };
  