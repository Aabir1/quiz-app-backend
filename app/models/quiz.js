const config = require('../config/env');
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

mongoose.connect(config.DATABASE.url, { useNewUrlParser: true, useUnifiedTopology: true });

const Quiz = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 256
  }
}, {
  timestamps: true
});

Quiz.plugin(mongoosePaginate);
const QuizModel = mongoose.model("Quiz", Quiz);

module.exports = QuizModel;