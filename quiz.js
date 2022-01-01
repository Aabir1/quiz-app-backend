let express = require('express');
let app = express();
const config = require('./app/config/env');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
const cors = require("cors");
const resParam = require('./app/config/params');


const Authenticator = require('./app/middlewares/Authenticate');

const AllRoutes = require('./app/routes/AllRoutes');

var compression = require('compression');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());
app.use(compression());


/**
 * basic authentication with static token and
 * all urls with complete business logics.
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
app.use(config.APP.BASE_PATH, async (req, res, next) => {
    const params = { ...resParam };
    const result = await Authenticator.isAuthorized(req);
    if (result) {
        next();
    } else {
        params.status = false;
        params.message = 'invalid application-token';
        res.send(params);
    }
}, AllRoutes);

console.log('Quiz - Micro Services : ' + config.APP.PORT);

app.listen(config.APP.PORT);