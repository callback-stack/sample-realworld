
const createTagApis = (fetcher) => ({
    getTags: () => {
        return fetcher.get("/tags").then((resp) => resp.tags);
    },
});
exports.createTagApis = createTagApis;