var _ = require('underscore');
// var data = require('../server/data.js');

module.exports = {
    topN: function(array, n, comparator) {
        return _.clone(array).sort(comparator).slice(0, n);
    }
}
