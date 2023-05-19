const fs = require('fs');
const csv = require('csv-parser');

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function readQuestionsFromCSV(filePath) {
  return new Promise((resolve, reject) => {
    const questions = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        const options = row.options.split('__');
        const question = {
          id: row.id,
          category: row.category,
          question: row.question,
          ans: row.answer,
          options: options,
        };
        questions.push(question);
      })
      .on('end', () => {
        resolve(questions);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

function getRandomQuestions(questions, count) {
  const randomQuestions = shuffleArray(questions).slice(0, count);
  return randomQuestions;
}

function groupQuestionsByCategory(questions) {
    return questions.reduce((acc, question) => {
      const category = question.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(question);
      return acc;
    }, {});
  }

function generateRandomQuestionsByCategory(groupedQuestions, numQuestionsPerCategory) {
    const randomQuestions = [];
    for (const category in groupedQuestions) {
      const categoryQuestions = groupedQuestions[category];
      const randomCategoryQuestions = getRandomQuestions(
        categoryQuestions,
        numQuestionsPerCategory
      );
      randomQuestions.push(...randomCategoryQuestions);
    }
    return randomQuestions;
  }

// async function testCsv() {
//   try {
//     const filePath = '../data/questions.csv';
//     const questions = await readQuestionsFromCSV(filePath);
//     const groupedQuestions = groupQuestionsByCategory(questions);
//     // Generate random questions from each category
//     const numQuestionsPerCategory = 5;
//     const randomQuestions = generateRandomQuestionsByCategory(groupedQuestions, numQuestionsPerCategory);
//     return randomQuestions;
//   } catch (error) {
//     throw new Error('Error reading questions from CSV file');
//   }
// }

// Usage:
// testCsv()
//   .then((randomQuestions) => {
//     console.log(randomQuestions);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

module.exports = {
  readQuestionsFromCSV,
  getRandomQuestions,
  groupQuestionsByCategory,
  generateRandomQuestionsByCategory,
  shuffleArray
};
