const cs = (...services) => {
    return gather(services.filter(v=>v), {});
};
exports.cs = cs;

const gather = (services, prev) => {
    if (services.length === 0) {
        throw 43525;
    }
    const [first, ...last] = services;
    const [name, fn] = Array.isArray(first) ? first : [null, first];

    return fn(prev, (ret) => gather(last, name!=null ? {...prev, [name]: ret} : prev));
};
