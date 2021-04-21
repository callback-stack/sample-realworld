const {getPath, setPath} = require("../utils/arr-path");

const scope = (pair, path) => ({
    value: getPath(pair.value, path),
    onChange: (v) => pair.onChange(setPath(pair.value, path, v)),
});
exports.scope = scope;