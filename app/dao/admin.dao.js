const db = require('../config/dbConfig');
const { getUserDetails } = require('../utils/hashpassword');
const { Op } = require('sequelize');
const { shuffleArray, getRandomQuestions, groupQuestionsByCategory, generateRandomQuestionsByCategory } = require('../utils/questionUtils');

const getFieldOfficers = async (done) => {
  try {
    const operators = await db.operator.findAll({
      include: [
        {
          model: db.field_officer,
          attributes: ['id', 'firstName', 'lastName'],
          raw: true,
        },
      ],
    });

    const response = {};
    operators.forEach((operator) => {
      response[operator.operatorId] = operator.field_officers.map(
        (fieldOfficer) => {
          {
            fieldOfficer.firstName,
              fieldOfficer.lastName,
              fieldOfficer.id,
              fieldOfficer.fieldOfficerId;
          }
        }
      );
    });
    done(undefined, operators);
  } catch (err) {
    console.log(err);
    done('Error getting operator');
  }
};

const getFieldOfficerById = async (operatorId, done) => {
  try {
    const operators = await db.operator.findOne({
      where: { id: operatorId },
      include: [
        {
          model: db.field_officer,
          attributes: ['fieldOfficerId', 'firstName', 'lastName'],
          raw: true,
        },
      ],
      attributes: ['operatorId'],
    });

    done(undefined, operators);
  } catch (err) {
    console.log(err);
    done('Error getting operator');
  }
};

async function getQuestionsFromDatabase() {
  try {
    const questions = await db.question.findAll();
    return questions;
  } catch (error) {
    throw new Error('Error retrieving questions from the database');
  }
}

async function generateRandomQuestions() {
  try {
    const questions = await getQuestionsFromDatabase();
    const groupedQuestions = groupQuestionsByCategory(questions);
    // Generate random questions from each category
    const numQuestionsPerCategory = 5;
    const randomQuestions = generateRandomQuestionsByCategory(
      groupedQuestions,
      numQuestionsPerCategory
    );
    return randomQuestions;
  } catch (error) {
    throw new Error('Error processing questions');
  }
}
const startTestSession = async (userId, done) => {
  try {
    // 1. Generate random questions for the operator using testCsv
    const randomQuestions = await generateRandomQuestions();

    // 2. Get the IDs of the generated questions
    const questionIds = randomQuestions.map((question) => question.question_id);
    const user = await db.user.findByPk(userId)
    if (!user){
      return done("User you want to generate question for does not exist")
    }
    // 3. Store the questionIds in the UserAnswer table for the operator
    const session = await db.user_answer.create({
      userId: userId,
      questionId: questionIds,
    });
    

    randomQuestions.push({"session_id": session.userAnswer_id})

    done(null, randomQuestions);
  } catch (error) {
    console.log(error);
    done('Error generating questions');
  }
};

const submitAnswer = async (sessionId,answerData, done) => {
  try {
    const session = await db.user_answer.findOne({where: {userAnswer_Id: sessionId}});
    if (session.score){
      return done("This session as already been graded")
    }
    if (!session){
      return done("Session Id Not Found")
    }
    
    const questionIds = session.questionId;
    
    const userAnswers = answerData.answers;
    if (!userAnswers){
      return done("Ensure you have an answers object in your request")
    }
    
    let score = 0;
    const userAnswerList = [];

    // Loop through each question and check the user's answer
    for (let i = 0; i < questionIds.length; i++) {
      const questionId = questionIds[i];
      const userAnswer = userAnswers[questionId];

      // Retrieve the correct answer from the Question table
      const question = await db.question.findByPk(questionId);
      const correctAnswer = question.answer;

      // Compare the user's answer with the correct answer
      if (userAnswer === correctAnswer) {
        score++;
      }
      userAnswerList.push(userAnswer)
    }

    // Update the score in the UserAnswer table
    session.score = score;
    session.answer = userAnswerList
    await session.save();
    const response = {
      "sessionId" : session.userAnswer_id,
      "userId" : session.userId,
      "score" : session.score

    }
    done(null, response);
  } catch (error) {
    console.log(error);
    done('Error submitting questions');
  }
};



const gradeTestSession = async (operatorId, done) => {
  try {
    // 1. Generate random questions for the operator using testCsv
    const randomQuestions = await testCsv();

    // 2. Get the IDs of the generated questions
    const questionIds = randomQuestions.map((question) => question.question_id);

    // 3. Store the questionIds in the UserAnswer table for the operator
    await UserAnswer.create({
      operatorId: operatorId,
      questionIds: questionIds,
    });

    done(null, randomQuestions);
  } catch (error) {
    console.log(error);
    done('Error generating questions');
  }
};

module.exports = {
  getFieldOfficers,
  getFieldOfficerById,
  startTestSession,
  submitAnswer
};
