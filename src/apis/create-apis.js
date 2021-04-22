const {UserApis} = require("./user-apis");
const {TagApis} = require("./tag-apis");
const {ProfileApis} = require("./profile-apis");
const {ArticleApis} = require("./article-apis");

const createApis = (token) => {
    const fetcher = createFetcher(token);
    return ({
        article: ArticleApis(fetcher),
        profile: ProfileApis(fetcher),
        tag: TagApis(fetcher),
        user: UserApis(fetcher),
    });
};
exports.createApis = createApis;


const createFetcher = (token) => {

    const urlModifier = (url) => `https://conduit.productionready.io/api${url}`;

    let createHeaders = () => {
        let headers = new Headers();
        if (token) {
            headers.append("authorization", `Token ${token}`);
        }
        return headers;
    };

    const withPayload = (method) => (url, data) => {
        let headers = createHeaders();
        headers.append("Content-Type", "application/json");
        return fetch(urlModifier(url), {
            method,
            body: data == null ? undefined : JSON.stringify(data),
            headers,
        }).then((response) => response.json());
    };

    const withoutPayload = (method) => (url) => {
        let headers = createHeaders();
        return fetch(urlModifier(url), {
            method,
            headers
        }).then((response) => response.json());
    };

    return {
        get: withoutPayload("GET"),
        delete: withoutPayload("DELETE"),
        post: withPayload("POST"),
        put: withPayload("PUT"),
    };
};
exports.createFetcher = createFetcher;