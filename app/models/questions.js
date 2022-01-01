const config = require('../config/env');
const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

mongoose.connect(config.DATABASE.url, { useNewUrlParser: true, useUnifiedTopology: true });

const Questions = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        maxlength: 256
    },
    optionOne: {
        type: String,
        required: true,
        maxlength: 256
    },
    optionTwo: {
        type: String,
        required: true,
        maxlength: 256
    },
    optionThree: {
        type: String,
        required: true,
        maxlength: 256,
    },
    quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    }
}, {
    timestamps: true
});

Questions.plugin(mongoosePaginate);
const QuestionsModel = mongoose.model("Questions", Questions);

module.exports = QuestionsModel;