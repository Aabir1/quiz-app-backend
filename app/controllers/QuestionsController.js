let QuestionController = {};

const resParams = require('../config/params');
const PaginationHelper = require('../helpers/PaginationHelper');
const ErrorHelper = require('../helpers/ErrorHelper');
const QuestionModel = require('../models/questions');

const DEFAULT_LIMIT = 12;

QuestionController.save = async (req, res) => {
    const params = { ...resParams };

    try {
        await QuestionModel.create(req.body);

        params.status = true;
        params.data = true;
        res.send(params);

    } catch (message) {
        params.status = false;
        params.message = 'Error';
        params.dev_message = message.errors;
        res.send(params);
    }
}

QuestionController.getByQuiz = (req, res) => {
    const params = { ...resParams };

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || DEFAULT_LIMIT;

    QuestionModel.paginate({
        quiz: req.query.quiz
    }, {
        limit: limit,
        offset: offset,
        sort: { createdAt: -1 },
        lean: true
    }, (err, result) => {
        if (err) {
            ErrorHelper.console(err);
            params.status = false;
            params.data = false;
            res.status(200).send(params);
        } else {

            const restructureData = PaginationHelper.restructurePagination(result);

            params.status = true;
            params.data = restructureData;
            res.status(200).send(params);
        }
    });
}



QuestionController.getAll = (req, res) => {
    const params = { ...resParams };

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || DEFAULT_LIMIT;

    QuestionModel.paginate({}, {
        limit: limit,
        offset: offset,
        sort: { createdAt: -1 },
        lean: true
    }, (err, result) => {
        if (err) {
            ErrorHelper.console(err);
            params.status = false;
            params.data = false;
            res.status(200).send(params);
        } else {

            const restructureData = PaginationHelper.restructurePagination(result);

            params.status = true;
            params.data = restructureData;
            res.status(200).send(params);
        }
    });
}

module.exports = QuestionController;