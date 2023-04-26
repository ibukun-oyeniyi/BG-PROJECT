module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      permissions: {
        type: Sequelize.JSON,
        allowNull: true
      }
    });
  
    Role.associate = function(models) {
      Role.hasMany(models.user, { foreignKey: 'roleId', onDelete: "cascade" });
      Role.belongsTo(models.operator, { foreignKey: 'operatorId', onDelete: "cascade" });
    };
  
    return Role;
  };
  