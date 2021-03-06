let AnswersController = {};

const resParams = require('../config/params');
const PaginationHelper = require('../helpers/PaginationHelper');
const AnswerModel = require('../models/answers');

//default limit of sending back response
const DEFAULT_LIMIT = 12;

/**
 * save a answer with validation
 *
 * @method POST
 *
 * @param {String} answer
 * @param {Number} selectedOption
 * @param {Number} question
 *
 * @returns {Object} resParams
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
AnswersController.save = async (req, res) => {
    const params = { ...resParams };

    try {
        await AnswerModel.create(req.body);

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

/**
 * Get answer by question id.
 *
 * @method POST
 *
 * @param {String} question
 *
 * @returns {Object} resParams
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
AnswersController.getByQuestion = async(req, res) => {
    const params = { ...resParams };

    try {
        params.data = await AnswerModel.findOne({question: req.query.question});

        params.status = true;
        res.send(params);

    } catch (message) {
        params.status = false;
        params.message = 'Error';
        params.dev_message = message.errors;
        res.send(params);
    }
}

/**
 * Get all answers list with pagination
 *
 * @method POST
 *
 * @param {Number} offset
 * @param {Number} limit
 *
 * @returns {Object} resParams
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
AnswersController.getAll = (req, res) => {
    const params = { ...resParams };

    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || DEFAULT_LIMIT;

    AnswerModel.paginate({}, {
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

module.exports = AnswersController;