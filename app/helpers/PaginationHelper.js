const DateTimeHelper = require("./DateTimeHelper");

const response = {
    offset: 0, limit: 10, total: 0,
    data: [],
};

let PaginationHelper = {};


/**
 * Set simple pagination to a set of data
 *
 * @param data <Array>
 * @param offset <Integer>
 * @param limit <Integer>
 *
 * @returns data <Array>
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
PaginationHelper.restructurePagination = (data) => {
    data.data = data.docs;

    data.data = DateTimeHelper.setDisplayTime(data.data, 'createdAt');
    delete data.docs;
    return data;
}

module.exports = PaginationHelper;