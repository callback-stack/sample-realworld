const {cs} = require("./chain-services");
const {createContext, createElement: h} = require("react");

const ctxPairs = {};

const provideContext = (values, next) => cs(
    ...Object.keys(values).map((key) => {
        let r = ctxPairs[key];
        if (r == null) {
            r = createContext();
            ctxPairs[key] = r;
        }

        return (_, next) => h(r.Provider, {value: values[key]}, next());
    }),
    next,
);
exports.provideContext = provideContext;

const consumeContext = (name) => {
    let r = ctxPairs[name];
    if (r == null) {
        r = createContext();
        ctxPairs[name] = r;
    }
    return [name, (_, next) => h(r.Consumer, {}, next)];
};
exports.consumeContext = consumeContext;