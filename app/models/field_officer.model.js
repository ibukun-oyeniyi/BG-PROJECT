

module.exports = (sequelize, Sequelize) => {
    const FieldOfficer = sequelize.define("field_officer", {
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
        unique: true,
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
      bvn: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      hub: {
        type: Sequelize.ENUM('Lagos', 'Other'),
        allowNull: false,
      },
      governmentId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      governmentIdType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      governmentIdImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fieldOfficerId:{
        type: Sequelize.STRING,
      },
      
    });

    FieldOfficer.beforeCreate(async (fieldOfficer) => {
      const lastFieldOfficer = await FieldOfficer.findOne({
        order: [['id', 'DESC']],
      });
  
      const id = lastFieldOfficer ? lastFieldOfficer.id + 1 : 1;
      fieldOfficer.fieldOfficerId = `FO-${id.toString().padStart(6, '0')}`;
    });
  
    FieldOfficer.associate = function(models) {
      FieldOfficer.belongsTo(models.user,{ foreignKey: 'userId', onDelete: "cascade" });
      FieldOfficer.belongsTo(models.operator,{ foreignKey: 'operatorId', onDelete: "cascade" });
      FieldOfficer.belongsTo(models.state,{ foreignKey: 'stateId', onDelete: "cascade" });
      FieldOfficer.belongsTo(models.lga,{ foreignKey: 'lgaId', onDelete: "cascade" });
    };
  
    return FieldOfficer;
  };
  