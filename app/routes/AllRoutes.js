const express = require('express');
const AllRoutes = express.Router();

const QuizRoutes = require('./QuizRoutes');

AllRoutes.use('/quiz', QuizRoutes);

module.exports = AllRoutes;