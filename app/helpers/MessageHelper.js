const MessageHelper = {
    ERROR_INTERNAL_SERVER: 'Unable to process your request, internal server error.'
};

/**
 * It will add params to message, make sure send params in sequence
 * if any param is not send then it will not be effected check usage
 * for more information.
 *
 * @param {String} message 
 * @param {Object} params
 *
 * @usage  MessageHelper.withParams(MessageHelper.PAYOUT_ERROR, {min_payout_amount: '10', current_amount: '9'})
 *
 * @returns {String} message
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
MessageHelper.withParams = (message, params = {}) => {

    let key = 0;
    if (params) {
        Object.keys(params).map((key) => {
            message = message.replace(key, params[key]);
        });
    }

    return message;
}

module.exports = MessageHelper;
