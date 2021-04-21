
const cLsJson = !(typeof window !== "undefined") ? (
    () => ({
        get: () => {
        }, set: () => {
        }
    })
) : (
    (key) => ({
        get: () => {
            const cacheStr = localStorage.getItem(key);

            if (cacheStr == null) {
                return undefined;
            }

            return JSON.parse(cacheStr);
        },
        set: (value) => {
            if (value == null) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, JSON.stringify(value));
            }
        },
    })
);
exports.cLsJson = cLsJson;