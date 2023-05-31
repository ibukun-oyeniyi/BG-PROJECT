module.exports = (sequelize, Sequelize) => {
    const UserAnswer = sequelize.define('userAnswer', {
      userAnswer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      answer: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      questionId: {
        type: Sequelize.JSON,
        allowNull: true,
      },
    });

    UserAnswer.associate = function(models) {
        UserAnswer.belongsTo(models.user,{ foreignKey: 'userId', onDelete: "cascade" });
      };
  
    return UserAnswer;
  };