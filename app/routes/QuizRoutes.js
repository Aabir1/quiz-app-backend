const express = require('express');

/**
 * contains all quiz related routes
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
const QuizRoutes = express.Router();

const QuizController = require('../controllers/QuizController');
const QuestionsController = require('../controllers/QuestionsController');
const AnwersController = require('../controllers/AnwersController');

QuizRoutes.post('/save', QuizController.save);
QuizRoutes.get('/get-all', QuizController.getAll);

QuizRoutes.post('/questions/save', QuestionsController.save);
QuizRoutes.get('/questions/get-all', QuestionsController.getAll);
QuizRoutes.get('/questions/get-by-quiz', QuestionsController.getByQuiz);

QuizRoutes.get('/questions/get-result', QuestionsController.getResults);

QuizRoutes.post('/answers/save', AnwersController.save);
QuizRoutes.get('/answers/get-all', AnwersController.getAll);
QuizRoutes.get('/answers/get-by-question', AnwersController.getByQuestion);

module.exports = QuizRoutes;