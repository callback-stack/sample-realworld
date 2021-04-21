const mapKeys = (obj, fn) => {
    if (obj == null) {
        return null;
    }

    const ret = {};
    for (const k in obj) {
        ret[fn(k, obj[k])] = obj[k];
    }
    return ret;
};
exports.mapKeys = mapKeys;

const clone = (obj) => {
    return mapKeys(obj, v=>v);
};
exports.clone = clone;

const singleValue = (obj) => {
    if (obj == null) {
        return null;
    }
    for (const k in obj) {
        return obj[k];
    }
};
exports.singleValue = singleValue;

const mapValues = (obj, fn) => {
    if (obj == null) {
        return null;
    }

    const ret = {};
    for (const k in obj) {
        const value = fn(obj[k], k);
        if (value != null) {
            ret[k] = value;
        }
    }
    return ret;
};

exports.mapValues = mapValues;

const omit = (obj, attrs) => {
    if (obj == null) {
        return null;
    }

    const ret = {};
    for (const k in obj) {
        if (!~attrs.indexOf(k)) {
            ret[k] = obj[k];
        }
    }
    return ret;
};
exports.omit = omit;

function filterValues(o, fn) {
    let ret = {};
    for (const k in o) {
        if (fn(o[k], k)) {
            ret[k] = o[k];
        }
    }
    return ret;
}

exports.filterValues = filterValues;

function oMapToArr(o, fn) {
    let ret = [];
    for (const k in o) {
        ret.push(fn(o[k], k));
    }
    return ret;
}

exports.oMapToArr = oMapToArr;

function arrMapToO(arr, getValue, getKey = v=>v) {
    let ret = {};
    for (let i = 0; i < arr.length; i++) {
        const e = arr[i];
        ret[getKey(e, i)] = getValue(e, i);
    }
    return ret;
}

exports.arrMapToO = arrMapToO;

function isEmpty(o) {
    if (o == null) {
        return true;
    }
    for (const k in o) {
        if (o.hasOwnProperty(k)) {
            return false;
         }
    }
    return true;
}

exports.isEmpty = isEmpty;


function equalDeep(o1, o2) {
    if (o1 === o2) {
        return true;
    }

    if (o1 == null && o2 == null) {
        return false;
    }

    if (o1 == null || o2 == null) {
        return false;
    }

    if (typeof o1 === "object" && typeof o2 === "object") {
        for (const k in o1) {
            if (!equalDeep(o1[k], o2[k])) {
                return false;
            }
        }
        for (const k in o2) {
            if (o1[k] === undefined && o2[k] !== undefined) {
                return false;
            }
        }
        return true;
    }

    return false;
}
exports.equalDeep = equalDeep;
exports.equalDeep1 = equalDeep;

const splitKeys = (obj, fn) => {
    const trues = {};
    const falses = {};
    for (const k in obj) {
        if (fn(k)) {
            trues[k] = obj[k];
        } else {
            falses[k] = obj[k];
        }
    }
    return [trues, falses];
};

exports.splitKeys = splitKeys;

const deleteAll = (obj) => {
    for (const k in obj) {
        delete obj[k];
    }
};

exports.deleteAll = deleteAll;

const keepOnly = (o, attrs) => {
    if (o == null) {
        return o;
    }
    const ret = {};
    for (const attr of attrs) {
        if (o.hasOwnProperty(attr)) {
            ret[attr] = o[attr];
        }
    }
    // for (const k in o) {
    //     if (attrs.indexOf(k) > -1) {
    //         ret[k] = o[k];
    //     }
    // }
    return ret;
};

exports.keepOnly = keepOnly;


const override = (o, attrs) => {
    return new Proxy(o, {
        get: (override, attr) => {
            if (attrs.hasOwnProperty(attr)) {
                return attrs[attr];
            }
            return override[attr];
        }
    });
};
exports.override = override;
