
function getPath(obj, path) {
    if (path == null) {
        return obj;
    }
    for (const attr1 of path) {
        if (obj == null) {
            return obj;
        }
        const [attr, type] = typeof attr1 !== "string" ? [attr1] : attr1.indexOf("!") > 0 ? attr1.split("!") : [attr1];
        obj = obj[attr];
    }
    return obj;
}
exports.getPath = getPath;

function setPath(object, path, value) {
    if (path.length === 0) {
        return value;
    }

    let [attr1, ...lastAttrs] = path;

    const [attr, type] = typeof attr1 !== "string" ? [attr1] : attr1.indexOf("!") > 0 ? attr1.split("!") : [attr1];

    const createChild = () => type === "arr" ? [] : {};
    if (Array.isArray(object)) {
        let clone = object ? object.slice(0) : [];
        clone[attr] = setPath(object && object[attr] || createChild(), lastAttrs, value);
        return clone;
    } else {
        return Object.assign({}, object, {[attr]: setPath(object && object[attr] || createChild(), lastAttrs, value)});
    }

}
exports.setPath = setPath;

function setPathO(object, path, value) {
    if (path.length === 0) {
        return value;
    }

    let [attr, ...lastAttrs] = path;

    return Object.assign({}, object, {[attr]: setPathO(object && object[attr] || {}, lastAttrs, value)});
}
exports.setPathO = setPathO;

function changePath(object, path, fn) {
    let oldValue = getPath(object, path);
    let updatedValue = fn(oldValue);
    return updatedValue !== oldValue ? setPath(object, path, updatedValue) : object;
}
exports.changePath = changePath;


const locate = (obj, path) => {
    if (obj == null) {
        return null;
    }
    const [first, ...last] = path;

    const ret = ((cond) => {
        if (typeof cond === "object") {
            return obj.find((item) => !Object.keys(cond).find((k) => cond[k] !== item[k]));
        } else {
            return obj[cond];
        }
    })(first);

    if (last.length) {
        return locate(ret, last);
    } else {
        return ret;
    }
};
exports.locate = locate;