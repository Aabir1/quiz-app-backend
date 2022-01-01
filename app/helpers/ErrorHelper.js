let ErrorHelper = {};

/**
 * It will only summaries sequalize errors
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
ErrorHelper.summaries = (data, modelName) => {
    let result = [];


    try {
        if (typeof data == 'string') {
            result.push(data);
        } else if (data.errors) {
            data.errors.forEach((single) => {
                if (modelName) {
                    single.message = single.message.replace(modelName + '.', '');
                }
                result.push(single.message);
            });
        } else if (typeof data == 'object') {
            result.push(data);
        }
    } catch (errors) {
        result.push(errors);
    }

    return result;
}

ErrorHelper.console = (...arguments) => {
    console.log('||||||||||||||||||||||||||||||||||||||||||');
    console.log('||||||||||||||||||||||||||||||||||||||||||');
    if (arguments.length) {
        arguments.map((single, index) => {
            console.log('NUMBER => ' + index, single, '|||');
        })
    }
    console.log('||||||||||||||||||||||||||||||||||||||||||');
    console.log('||||||||||||||||||||||||||||||||||||||||||');
}

module.exports = ErrorHelper;