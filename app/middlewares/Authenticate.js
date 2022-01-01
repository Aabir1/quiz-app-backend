const config = require('../config/env');

let Authenticate = {};

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