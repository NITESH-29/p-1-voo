'use strict';

var validate = require('../config/validate.js');

module.exports = {
    queryToQueryAttr: queryToQueryAttr   
};

/**
 * To convert query string into array.
 * @param {string} query
 * @returns {undefined}
 */

function queryToQueryAttr(query) {
    var query_attr = [];
    if (validate.isValid(query) && query.indexOf('(') !== -1 && query.indexOf(')') !== -1) {
        var init = query.indexOf('(');
        var fin = query.indexOf(')');
        var queries = query.substr(init + 1, fin - init - 1);
        queries = queries.split(",");
        queries.forEach(function(item) {
            var temp = item.split("=");
            query_attr[temp[0]] = temp[1];
        });
    }
    return query_attr;
}


