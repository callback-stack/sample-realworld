
const TagApis = (fetcher) => ({
    getTags: () => {
        return fetcher.get("/tags").then((resp) => resp.tags);
    },
});
exports.TagApis = TagApis;