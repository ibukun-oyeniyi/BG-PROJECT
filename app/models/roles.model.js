module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("role", {
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      }
    });

    Role.associate = function(models) {
      Role.hasMany(models.User, { foreignKey: 'roleId' });
    };
    return Role;
};