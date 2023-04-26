module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
      },
      permissions: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      }
    });
  
    Role.associate = function(models) {
      Role.hasMany(models.User, { foreignKey: 'roleId', onDelete: "cascade" });
    };
  
    return Role;
  };
  