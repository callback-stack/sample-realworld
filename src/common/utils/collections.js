const {chain} = require("./fs");

const findMinE = (col, getValue, quickStop) => {
    let minVal = undefined;
    let minEle = undefined;

    for (const e of col) {
        const value = getValue(e);
        if (value == null) {
            continue;
        }

        if (quickStop !== undefined && quickStop===value) {
            return e;
        }
        if (minVal === undefined || minVal > value) {
            const v = value;
            if (v != null) {
                minVal = v;
                minEle = e;
            }
        }
    }
    return minEle;
};

exports.findMinE = findMinE;

const findMaxE = (col, getValue = v=>v, quickStop) => {
    let maxVal = undefined;
    let maxEle = undefined;

    for (const e of col) {
        const value = getValue(e);
        if (quickStop !== undefined && quickStop===value) {
            return e;
        }

        if (maxVal === undefined || maxVal < value) {
            const v = value;
            if (v != null) {
                maxVal = v;
                maxEle = e;
            }
        }
    }
    return maxEle;
};
exports.findMaxE = findMaxE;

const findMinECompare = (col, compare) => {
    let maxEle = undefined;

    for (const e of col) {
        if (maxEle === undefined || compare(maxEle, e) > 0) {
            maxEle = e;
        }
    }
    return maxEle;
};
exports.findMinECompare = findMinECompare;

const last = (col) => {
    return col[col.length - 1];
};
exports.last = last;

const findLastIndex = (col, find) => {
    for (let i = col.length - 1; i > -1; i--) {
        if (find(col[i])) {
            return i;
        }
    }
    return -1;
};
exports.findLastIndex = findLastIndex;

const findMinValue = (col, getValue = v=>v, {gt = compares.gt}={}) => {
    if (col==null) {
        return null;
    }

    let minVal = undefined;

    for (const e of col) {
        if (e == null) {
            continue;
        }
        const v = getValue(e);
        if (minVal === undefined || gt(minVal, v)) {
            if (v != null) {
                minVal = v;
            }
        }
    }
    return minVal === undefined ? null : minVal;
};

exports.findMinValue = findMinValue;

const compares = {
    le: (v1, v2) => v1 <= v2,
    lt: (v1, v2) => v1 <  v2,
    ge: (v1, v2) => v1 >= v2,
    gt: (v1, v2) => v1 >  v2,
};

const findMaxValue = (col, getValue = (v=>v), {lt = compares.lt}={}) => {
    if (col==null) {
        return null;
    }
    let maxVal = undefined;

    for (const e of col) {
        if (e == null) {
            continue;
        }
        const value = getValue(e);
        if (maxVal === undefined || lt(maxVal, value)) {
            if (value != null) {
                maxVal = value;
            }
        }
    }
    return maxVal === undefined ? null : maxVal;
};

exports.findMaxValue = findMaxValue;

const findMinIndex = (col, getValue) => {
    let minVal = undefined;
    let minIndex = undefined;

    for (let i = 0; i < col.length; i++) {
        const e = col[i];

        if (minVal === undefined || minVal > getValue(e)) {
            const v = getValue(e);
            if (v != null) {
                minVal = v;
                minIndex = i;
            }
        }
    }
    return minIndex;
};
exports.findMinIndex = findMinIndex;


function insertAt(col, e, i) {
    return [
        ...col.slice(0, i),
        e,
        ...col.slice(i),
    ];
}
exports.insertAt = insertAt;

function addRemove(col) {
    return (element) => {
        col.push(element);

        return () => remove1Mutate(col, element);
    }
}
exports.addRemove = addRemove;

function withoutAll(col, targets) {
    return col.filter((e) => !~targets.indexOf(e));
}
exports.withoutAll = withoutAll;

// @deprecated
exports.removeAll = withoutAll;

function remove1Mutate(col, targetElem) {
    if (col == null) {
        return;
    }

    let i = col.indexOf(targetElem);
    if (i === -1) {
        return;
    }
    col.splice(i, 1);
}
exports.remove1Mutate = remove1Mutate;

function without(targetElem, col) {
    if (col == null) {
        return;
    }
    return col.filter((e) => e!==targetElem);
}
exports.without = without;

function unique(col, by = v=>v) {
    if (!col) {
        return col;
    }
    const ret = [];
    const keys = [];
    for (const e of col) {
        const key = by(e);
        if (!~keys.indexOf(key)) {
            ret.push(e);
            keys.push(key);
        }
    }
    return ret;
}
exports.unique = unique;

function indexAttr(col, keyAttr, valueAttr) {
    if (col == null) {
        return {};
    }
    let map = {};
    for (let i = 0; i < col.length; i++) {
        const e = col[i];
        if (map.hasOwnProperty(e[keyAttr])) {
            throw `Property existed [${e[keyAttr]}]`;
        }
        map[e[keyAttr]] = valueAttr ? e[valueAttr] : e;
    }
    return map;
}
exports.indexAttr = indexAttr;

function index(col, getKey, getValue) {
    if (col == null) {
        return {};
    }
    let map = {};
    for (let i = 0; i < col.length; i++) {
        const e = col[i];
        if (map.hasOwnProperty(getKey(e))) {
            throw `Property existed [${getKey(e)}]`;
        }
        map[getKey(e)] = getValue ? getValue(e) : e;
    }
    return map;
}
exports.index = index;

function indexAttrMulti(col, keyAttr, valueAttr) {
    if (col == null) {
        return {};
    }
    let map = {};
    for (let i = 0; i < col.length; i++) {
        const e = col[i];
        let list = map[e[keyAttr]];
        if (list == null) {
            list = [];
            map[e[keyAttr]] = list;
        }
        list.push(valueAttr ? e[valueAttr] : e);
    }
    return map;
}
exports.indexAttrMulti = indexAttrMulti;

function sort(col, byFn = v=>v, compare = (v1,v2) => v1 > v2 ? 1 : -1) {
    if (col == null) {
        return null;
    }
    let clone = col.slice(0);
    clone.sort((e1, e2) => {
        const v1 = byFn(e1);
        const v2 = byFn(e2);
        if (v1 === v2) {
            return 0;
        }
        if (v1 == null) {
            return -1;
        }
        if (v2 == null) {
            return 1;
        }
        return compare(v1, v2);
    });
    return clone;
}
exports.sort = sort;

function sortMulti(col, byFns) {
    if (col == null) {
        return null;
    }
    let clone = col.slice(0);
    clone.sort((e1, e2) => {
        for (const byFn of byFns) {
            const b1 = byFn(e1);
            const b2 = byFn(e2);
            if (b1 > b2) {
                return 1;
            }
            if (b1 < b2) {
                return -1;
            }
        }
        return 0;
    });
    return clone;
}
exports.sortMulti = sortMulti;

function reverse(col) {
    if (col == null) return null;

    let clone = col.slice(0);
    clone.reverse();
    return clone;
}
exports.reverse = reverse;

function createArray(length) {
    if (isNaN(length)) {
        throw "[createArray] Length is not a number: " + length;
    }
    return new Array(length).fill(0).map((_, i) => i);
}
exports.createArray = createArray;

function createArray2(from, to) {
    let ret = [];
    for (let i = from; i < to; i++) {
        ret.push(i);
    }
    return ret;
}
exports.createArray2 = createArray2;

function addListToSet(list, set) {
    set = set.slice(0);
    for (const item of list) {
        if (!~set.indexOf(item)) {
            set.push(item);
        }
    }
    return set;
}
exports.addListToSet = addListToSet;

function addToSetMutate(e, set) {
    if (!~set.indexOf(e)) {
        set.push(e);
    }
    return set;
}
exports.addToSetMutate = addToSetMutate;

function addToListMap(listMap, key, item) {
    let list = listMap[key];
    if (list == null) {
        list = [];
        listMap[key] = list;
    }
    list.push(item);
}
exports.addToListMap = addToListMap;

function concatToListMap(listMap, key, items) {
    listMap[key] = [...listMap[key]||[], ...items];
}
exports.concatToListMap = concatToListMap;

const merge = (col, getKey, merge) => {
    col = col.slice(0);

    let ret = [];
    for (let i = 0; i < col.length; i++) {
        let e = col[i];
        const key = getKey(e);

        for (let j = i+1; j < col.length; j++) {
            const e2 = col[j];
            if (getKey(e2) === key) {
                e = merge(e, e2);
                col.splice(j, 1);
                j--;
            }
        }
        ret.push(e);
    }
    return ret;
};
exports.merge = merge;

function mergeListMap(...lms) {
    const ret = {};
    for (const lm of lms) {
        for (const key in lm) {
            if (!ret.hasOwnProperty(key)) {
                ret[key] = lm[key];
            } else {
                ret[key] = [...ret[key], ...lm[key]];
            }
        }
    }
    return ret;
}
exports.mergeListMap = mergeListMap;

function replace(col, targets, withs) {
    return col.map((e) => {
        const indexOf = targets.indexOf(e);
        if (indexOf > -1) {
            return withs[indexOf];
        } else {
            return e;
        }
    });
}
exports.replace = replace;

function replaceFind(col, newE, find) {
    if (col == null) {
        return null;
    }
    const index = col.findIndex(find);
    if (index === -1) {
        return col;
    }
    return replaceIndex(index, col, newE);
}
exports.replaceFind = replaceFind;

function replaceFind_f(col, getNewE, find) {
    if (col == null) {
        return null;
    }
    const index = col.findIndex(find);
    if (index === -1) {
        return col;
    }
    return replaceIndex(index, col, getNewE(col[index]));
}
exports.replaceFind_f = replaceFind_f;

function changeFind(col, find, by) {
    if (col == null) {
        return null;
    }
    const index = col.findIndex(find);
    if (index === -1) {
        return col;
    }
    return changeIndex(index, col, by);
}
exports.changeFind = changeFind;

const findValue = (col, getValue) => {
    for (let i = 0; i < col.length; i++) {
        const e = col[i];

        const value = getValue(e, i);
        if (value != null) {
            return value;
        }
    }
    return null;
};
exports.findValue = findValue;


function replaceBy(col, find, byF) {
    if (col == null) {
        return null;
    }
    return col.map((e) => find(e) ? byF(e) : e);
}
exports.replaceBy = replaceBy;

function replace1(col, target, with1) {
    return col.map((e) => e === target ? with1 : e);
}
exports.replace1 = replace1;

function split(col, by) {
    if (col == null) {
        return [];
    }
    let trues = [];
    let falses = [];
    for (const e of col) {
        (by(e) ? trues : falses).push(e);
    }
    return [trues, falses];
}
exports.split = split;

function flatten1(col) {
    if (col == null) {
        return [];
    }
    let ret = [];
    for (const arr of col) {
        if (arr) {
            ret = ret.concat(arr);
        }
    }
    return ret;
}
exports.flatten1 = flatten1;

const removeIndex = (index, col) => {
    return col.filter((e, i) => i !== index);
};
exports.removeIndex = removeIndex;

const replaceIndex = (index, col, newE) => {
    return col.map((e, i) => i !== index ? e : newE);
};
exports.replaceIndex = replaceIndex;

// const replaceLast = (index, col, newE) => {
//     return col.map((e, i) => i !== index ? e : newE);
// };
// exports.replaceLast = replaceLast;

const replaceIndex2 = (index, col, newEs) => {
    return [
        ...col.slice(0, index),
        ...newEs,
        ...col.slice(index+1),
    ];
};
exports.replaceIndex2 = replaceIndex2;

const changeIndex = (index, col, by) => {
    return col.map((e, i) => i !== index ? e : by(e));
};
exports.changeIndex = changeIndex;

function toMap(arr, indexToKey) {
    const ret = {};
    for (let i = 0; i < arr.length; i++) {
        ret[indexToKey(i)] = arr[i];
    }
    return ret;
}
exports.toMap = toMap;

function sum(arr, getValue = v=>v) {
    if (arr==null) {
        return 0;
    }
    return arr.reduce((t, e, i) => t+(getValue(e, i)||0), 0);
}
exports.sum = sum;
exports.sum1 = sum;

const switchAmong = (arr) => {
    const getArr = typeof arr === "function" ? arr : () => arr;

    let index = 0;

    return () => {
        index++;
        const a = getArr();
        if (index >= a.length) {
            index = 0;
        }
        return a[index];
    };
};

exports.switchAmong = switchAmong;


const divide = (col, weights) => {

    let ret = [];
    let extracted = 0;
    weights.forEach((weight, di) => {
        const end = di === weights.length - 1 ? col.length :
            extracted + Math.floor(weight*col.length)
        ;
        ret.push(col.slice(extracted, end));
        extracted = end;
    });

    return ret;
};
exports.divide = divide;


const swap = ({get, set}, newKey, oldKey) => {
    const oldValue = get(oldKey);
    const newValue = get(newKey);

    set(oldValue, newKey);
    set(newValue, oldKey);
};
exports.swap = swap;


const crossMap = (cols, fn) => {
    if (cols == null || cols.length === 0) {
        return [];
    }
    if (cols.length === 1) {
        return cols[0].map((e) => fn([e]));
    }
    const [firstCol, ...lastCols] = cols;

    let ret = [];
    for (const e of firstCol) {
        ret = [...ret, ...crossMap(lastCols, (path) => fn([e, ...path]))];
    }
    return ret;
};

exports.crossMap = crossMap;

const findDuplicateds = (col) => {
    const ret = [];
    for (let i = 0; i < col.length; i++) {
        const e = col[i];
        if (ret.indexOf(e) > -1) {
            continue;
        }
        for (let j = i+1; j < col.length; j++) {
            const e2 = col[j];
            if (e2 === e) {
                ret.push(e);
                break;
            }
        }
    }
    return ret;
};
exports.findDuplicateds = findDuplicateds;


const jsonUnique = (col) => chain(
    col.map((e) => JSON.stringify(e)),
    unique,
    (col) => col.map((s) => JSON.parse(s)),
);
exports.jsonUnique = jsonUnique;

const joinArr = (arr, delimiter) => {
    let ret = [];
    for (let i = 0; i < arr.length; i++) {
        const e = arr[i];
        if (i > 0) {
            ret.push(delimiter);
        }
        ret.push(e);
    }
    return ret;
};
exports.joinArr = joinArr;

const compareCol = (newCol, oriCol, compare = (v1,v2) => v1===v2) => {
    if (oriCol == null) {
        oriCol = [];
    }
    if (newCol == null) {
        newCol = [];
    }

    let added   = [];
    let removed = [];
    for (const oe of oriCol) {
        if (newCol.find((ne) => compare(ne, oe)) == null) {
            removed.push(oe);
        }
    }
    for (const ne of newCol) {
        if (oriCol.find((oe) => compare(ne, oe)) == null) {
            added.push(ne);
        }
    }

    return {added, removed};
};

exports.compareCol = compareCol;


const shuffle = array => {
    array = array.slice(0);

    let currentIndex = array.length;

    const swap = (i1, i2) => {
        const temporaryValue = array[i1];
        array[i1] = array[i2];
        array[i2] = temporaryValue;
    };
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex --;

        swap(currentIndex, randomIndex);
    }

    return array;
};
exports.shuffle = shuffle;

const isEmpty = (col) => {
    return col == null || col.length === 0;
};
exports.isEmpty = isEmpty;

const isNotEmpty = (col) => {
    return !isEmpty(col);
};
exports.isNotEmpty = isNotEmpty;

const setEqual = (col1, col2) => {
    if (col1.length !== col2.length) {
        return false;
    }

    for (const x of col1) {
        if (col2.indexOf(x) === -1) {
            return false;
        }
    }

    return true;
};
exports.setEqual = setEqual;

const isAllNull = (col) => {
    if (col === null) {
        return null;
    }

    for (const v of col) {
        if (v !== null) {
            return false;
        }
    }

    return true;
};
exports.isAllNull = isAllNull;


const arrStartsWith = (startsWith, arr) => {
    if (arr == null) {
        return startsWith == null;
    }
    if (startsWith == null) {
        return true;
    }
    if (startsWith.length > arr.length) {
        return true;
    }

    return arrEquals(arr.slice(0, startsWith.length), startsWith);
};
exports.arrStartsWith = arrStartsWith;

const arrEquals = (a1, a2) => {

    if (a1 == null) {
        return a2 == null;
    }
    if (a2 == null) {
        return false;
    }
    if (a1.length !== a2.length) {
        return false;
    }

    for (let i = 0; i < a1.length; i++) {
        if (a1[i] !== a2[i]) {
            return false;
        }
    }

    return true;
};
exports.arrEquals = arrEquals;

function flip(i1, i2, col) {
    return col.map((e, i) => i === i1 ? col[i2] : i === i2 ? col[i1] : e);
}
exports.flip = flip;
