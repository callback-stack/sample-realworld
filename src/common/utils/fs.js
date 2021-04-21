const chain = (value, ...fList) => {
    for (const fn of fList) {
        if (fn) {
            value = fn(value);
        }
    }
    return value;
};

exports.chain = chain;
exports.chain1 = chain;

const and = (...fList) => {
    return (...args) => {
        for (const fn of fList) {
            if (!fn(...args)) {
                return false;
            }
        }
        return true;
    };
};

exports.and = and;