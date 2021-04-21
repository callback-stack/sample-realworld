const {createElement: h} = require("react");
const {UseState} = require("./use-state");
const {cLsJson} = require("./ls-json");
const {cs} = require("./chain-services");

const rLsStore = (key, defaultValue) => {
    const lsJson = cLsJson(key);
    return (_, next) => cs(
        ["v", (_, next) => h(UseState, {
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


