const config = require('../config/env');

let Authenticate = {};

/**
 * Right now it is very simple static token authentication
 * we can make login check here. all security related checks.
 *
 * @param {Object} req
 *
 * @returns {Boolean} result
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
Authenticate.isAuthorized = async (req) => {
    let result = false;

    try {
        if (req.get('application-token') === config.APPLICATION_TOKEN) {
            result = true;
        }

    } catch (error) {
        result = false;
    }

    return result;
}


module.exports = Authenticate;