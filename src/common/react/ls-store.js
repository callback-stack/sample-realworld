const {cLsJson} = require("./ls-json");
const {cs, State} = require("cs-react");

const rLsStore = (key, defaultValue) => {
    const lsJson = cLsJson(key);
    return (_, next) => cs(
        ["v", (_, next) => State({
            getInitValue: () => lsJson.get() || defaultValue,
            next,
        })],
        ({v}) => next({
            value: v.value,
            onChange: (v1) => {
                lsJson.set(v1);
                v.onChange(v1);
            },
        })
    );
};
exports.rLsStore = rLsStore;


