const express = require('express');
const QuizRoutes = express.Router();

const QuizController = require('../controllers/QuizController');
const QuestionsController = require('../controllers/QuestionsController');
const AnwersController = require('../controllers/AnwersController');

QuizRoutes.post('/save', QuizController.save);
QuizRoutes.get('/get-all', QuizController.getAll);

QuizRoutes.post('/questions/save', QuestionsController.save);
QuizRoutes.get('/questions/get-all', QuestionsController.getAll);
QuizRoutes.get('/questions/get-by-quiz', QuestionsController.getByQuiz);

QuizRoutes.post('/answers/save', AnwersController.save);
QuizRoutes.get('/answers/get-all', AnwersController.getAll);
QuizRoutes.get('/answers/get-by-question', AnwersController.getByQuestion);

module.exports = QuizRoutes;