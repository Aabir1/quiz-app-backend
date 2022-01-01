const config = require('../config/env');
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

mongoose.connect(config.DATABASE.url, { useNewUrlParser: true, useUnifiedTopology: true });

const Answers = new mongoose.Schema({
  answer: {
    type: String,
    minlength: 1,
    maxlength: 256
  },
  selectedOption: {
    type: Number,
    required: true,
    min: [1, 'selectedOption should not be less than 1'],
    max: [3, 'selectedOption should not be greater than 3']
  },
  question:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions',
    required: true
  }
}, {
  timestamps: true
});

Answers.plugin(mongoosePaginate);
const AnswersModel = mongoose.model("Answers", Answers);

module.exports = AnswersModel;