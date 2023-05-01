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
      role: {
        type: Sequelize.ENUM("admin", "operator", "field_officer"),
        allowNull: false,
        defaultValue: "operator"
      }
    });
    
    return User;
  };