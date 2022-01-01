const params = require('../config/params');

/**
 * Handle all type of exceptions and error at the root level.
 *
 * @augments Aabir Hussain <aabir.hussain1@gmail.com>
 */
exports.init = (app) => {
    //handle 404
//    handle404(app);

    // app.use((error, req, res, next) => {
    //     params.message = 'Something went wrong';
    //     params.dev_message = error.message || 'No further info available';
    //     params.status = false;

    //     console.log('||||||||||||||||||||||||||||||||');
    //     console.log('ERROR OCCUR');
    //     console.log('||||||||||||||||||||||||||||||||');

    //     res.status(error.status || 500).send(params);
    // });

    // process.on('uncaughtException', (error) => {
    //     params.message = 'Something went wrong';
    //     params.dev_message = error.message || 'No further info available';
    //     params.status = false;

    //     res.status(error.status || 500).send(params);
    // });
}

/**
 * 404 handling.
 */
handle404 = (app) => {
    app.use((req, res, next) => {
        params.message = '404';
        params.status = false;
        params.dev_message = 'Route does not exists on the server';

        res.status(404).send(params)
    });
};
