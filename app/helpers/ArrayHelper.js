
let ArrayHelper = {};

/**
 * Get Only one col from set of data.
 *
 * @param data <Array of objects>
 * @param fieldName <String>
 *
 * @returns result <Array of fielName>
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
ArrayHelper.getColumn = (data, fieldName) => {
    let result = [];
    data.forEach((single) => {
        if (single[fieldName] && typeof single[fieldName] == 'object') {
            result.push(single[fieldName]);
        } else if (single[fieldName]) {
            result.push(single[fieldName].toString());
        }
    });

    return result;
}

/**
 * Set index of an array
 *
 * @param data <Array of objects>
 * @param fieldName <String>
 *
 * @returns result <Array of fielName>
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
ArrayHelper.index = (data, fieldName) => {
    let result = [];

    if (data) {
        data.forEach((single) => {
            result[single[fieldName].toString()] = single;
        });
    }

    return result;
}

/**
 * Return unique value between two arrays
 *
 * @param newData <Array of values[string or int etc]>
 * @param dbData <Array of values or Array of dbObjects>
 * @param fieldName <String>
 *
 * @returns result <Array of values>
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
ArrayHelper.getDistinct = (newData, dbData, fieldName = false) => {
    let result = [];
    let cols = dbData;
    if (fieldName) {
        cols = ArrayHelper.getColumn(dbData, fieldName);
    }

    newData.forEach((single) => {
        if (!cols.includes(single.toString())) {
            result.push(single);
        }
    });

    return result;
}

/**
 * Convert a string with separator into array
 *
 * @param query <Get Query String>
 * @param fieldName <String>
 * @param separator <String>
 *
 * @returns result <Array of values>
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
ArrayHelper.explodeParam = (query, fieldName, separator = ',') => {
    let result = [];

    if (query[fieldName] && query[fieldName].trim()) {
        result = query[fieldName].split(separator);
    }

    return result;
}

/**
 * Convert a string inside array with separator into array
 *
 * @param query <Array>
 * @param fieldName <String>
 * @param isSequalizeArray <boolean if query is SequalizeArray means its true>
 * @param separator <String>
 *
 * @returns result <Array of values>
 *
 * @author Prasanth S <prasanth.s@navabrindit.com>
 */
ArrayHelper.explodeParamInArray = (query, fieldName, isSequalizeArray = false, separator = ',') => {
    let result = [];

    if (query.length) {
        query.map((data) => {
            let childData = (isSequalizeArray) ? { ...data.dataValues } : { ...data };

            if (childData[fieldName] && childData[fieldName].trim()) {
                childData[fieldName] = childData[fieldName].split(separator);
                childData[fieldName] = childData[fieldName].map(s => s.trim());
                result.push(childData);
            } else {
                result.push(childData);
            }
        });
    }

    return result;
}

/**
 * Convert a incompleted array into completed array And Add membersText Formate 
 *
 * @param query <Array>
 * @param firstField <String completed array>
 * @param secoundfield <String incompleted array>
 *
 * @returns result <Array of values>
 *
 * @author Prasanth S <prasanth.s@navabrindit.com>
 */
ArrayHelper.addElementsInArray = (query, firstField, secoundfield, thirdfield = false, fourthfield = false) => {
    let result = [];

    query.forEach((single) => {
        if (single[firstField] && single[secoundfield]) {
            if (single[firstField].length > single[secoundfield].length) {
                let arraySize = single[firstField].length - single[secoundfield].length;
                let i = 0;
                while (i < arraySize) {
                    single[secoundfield].push('');
                    i++;
                }
                result.push(single);
            } else {
                result.push(single);
            }
        } else {
            result.push(single);
        }
    });

    if (thirdfield) {
        let data = [];
        result.forEach((single) => {
            let balance_count = single[fourthfield] - 3;
            if (single[fourthfield] > 3) {
                single[thirdfield] = single[thirdfield] + ' & ' + balance_count + ' other are members';
            } else if (single[fourthfield] > 1) {
                single[thirdfield] = single[thirdfield] + ' are members';
            } else if (single[fourthfield] == 1) {
                single[thirdfield] = single[thirdfield] + ' is a member';
            } else {
                single[thirdfield] = '';
            }
            data.push(single);
        });
        return data;
    } else {
        return result;
    }
}
/**
 * Replace keys of an object inside an array
 *
 * @usage ArrayHelper.restructureArray([{ "idCourse": 4, "name": "JEE" }], {
 *       idCourse: 'id', name: 'title'
 *  });
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
ArrayHelper.restructureArray = (data, cols, onlyNewEntries = true, isSequalizeArray = true) => {
    let result = [];

    if (data.length) {
        data.map((single) => {
            let childData = { ...single };
            if (single.dataValues && isSequalizeArray) {
                childData = { ...single.dataValues };
            }
            let singleChild = (onlyNewEntries) ? {} : childData;

            Object.keys(cols).map((childIndex) => {
                singleChild[cols[childIndex]] = childData[childIndex];
            });

            result.push(singleChild);
        });
    }

    return result;
}

ArrayHelper.implod = (data, separator = ',') => {
    return data.join(separator);
}

ArrayHelper.explod = (data, separator = ',') => {
    let result = [];

    if (data) {
        result = data.split(separator);
    }

    return result;
}

/**
 * Remove single item from an array
 *
 * @param {Array} data
 * @param {String} itemValue
 *
 * @returns {Array} result
 *
 * @author Aabir Hussain <aabir.hussain1@gmail.com>
 */
ArrayHelper.removeItem = (data, itemValue) => {
    const index = data.indexOf(itemValue);
    data.splice(index, 1);
}

ArrayHelper.isEmpty = (idUsersString) => {
    let result = false;

    if (typeof idUsersString == 'string' && !idUsersString.length) {
        result = true;
    } else if (typeof idUsersString == 'array' && !idUsersString.length) {
        result = true;
    } else if (typeof idUsersString == 'object' && !Object.keys(idUsersString).length) {
        result = true;
    }

    return result;
}


ArrayHelper.objectToArray = (dataObject, indexField = 'id', valueField = 'title') => {
    let result = [];

    if (dataObject) {
        Object.keys(dataObject).map((index) => {
            result.push({
                [indexField]: index,
                [valueField]: dataObject[index]
            });
        });
    }

    return result;
}


ArrayHelper.changeIndexToValue = (dataObject) => {
    let result = {};

    if (dataObject) {
        Object.keys(dataObject).map((index) => {
            result[dataObject[index]] = index;
        });
    }

    return result;
}

ArrayHelper.toSmall = (data) => {
    let result = [];

    if (data) {
        result = data.map(function (v) {
            return v.toLowerCase();
        });
    }

    return result;
}


module.exports = ArrayHelper;
