const express = require('express');

/**
 * this file contains all routes of the application
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
const AllRoutes = express.Router();


const QuizRoutes = require('./QuizRoutes');

AllRoutes.use('/quiz', QuizRoutes);



module.exports = AllRoutes;