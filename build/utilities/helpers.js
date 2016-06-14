var _ = require('underscore');

module.exports = {
    topN: function(array, n, comparator) {
        return _.clone(array).sort(comparator).slice(0, n);
    }
}