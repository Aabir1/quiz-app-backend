const config = require('../config/env');
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
const ArrayHelper = require('../helpers/ArrayHelper');
const ErrorHelper = require('../helpers/ErrorHelper');

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
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Questions',
    required: true
  }
}, {
  timestamps: true
});

Answers.plugin(mongoosePaginate);
const AnswersModel = mongoose.model("Answers", Answers);

/**
 * Attach answer to a list of question
 *
 * @param {Array} data
 *
 * @returns {Array} result
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
AnswersModel.attachAnswers = async (data) => {
  if (data) {
    try {
      const ids = ArrayHelper.getColumn(data, 'id');
      let dataAnswers = await AnswersModel.find({ question: ids });

      dataAnswers = ArrayHelper.index(dataAnswers, 'question');

      data.map((single, key) => {
        if (dataAnswers && dataAnswers[single.id]) {
          data[key].set('answer', dataAnswers[single.id], { strict: false });

        } else {
          data[key].set('answer', false, { strict: false });
        }
      });
    } catch (error) {
      ErrorHelper.console(error);
    }
  }
}

module.exports = AnswersModel;