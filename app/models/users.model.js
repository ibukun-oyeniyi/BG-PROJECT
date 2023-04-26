module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
      },
      password: {
          type: Sequelize.STRING,
          allowNull: false
      },
    });
    User.associate = function(model) {
      User.belongsTo(model.roles, { foreignKey: 'roleId',onDelete: "cascade" });
    };
    return User;
  };