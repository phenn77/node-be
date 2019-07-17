arrSum = function (arr) {
    return arr.reduce(function (a, b) {
        return a + b
    }, 0);
};

module.exports = {
    arrSum
};