const { readQuestionsFromCSV } = require("../utils/questionUtils");

module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define("question", {
        question_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        question_text: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        answer: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        options: {
            type: Sequelize.JSON,
            allowNull: false,
        },
    });

    
      Question.beforeSync(async () => {
        try {
          const filePath = './app/data/questions.csv';
          const questions = await readQuestionsFromCSV(filePath);
      
          const existingQuestions = await Question.findAll();
          const existingQuestionIds = existingQuestions.map(question => question.question_id);
          if (existingQuestionIds.length == 18){
            return
          }
      
          const newQuestions = questions.filter(question => !existingQuestionIds.includes(question.question_id));
      
          if (newQuestions.length > 0) {
            await Question.bulkCreate(newQuestions);
            console.log('New questions populated successfully after sync.');
          } else {
            console.log('No new questions to populate after sync.');
          }
        } catch (error) {
          console.error('Error populating questions after sync:', error);
        }
      });
  
    return Question;
  };