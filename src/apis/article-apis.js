
const ArticleApis = ({fetcher, wrapAuthApi}) => ({
    getArticle: (slug) => {
        return fetcher.get(`/articles/${slug}`).then(({article}) => article);
    },
    getArticleList: (page) => {
        return fetcher.get(`/articles?limit=10&offset=${page * 10}`);
    },
    getArticleListByTag: (page, tag) => {
        return fetcher.get(`/articles?limit=10&offset=${page * 10}&tag=${tag}`);
    },
    getMyFeedList: (page) => {
        return fetcher.get(`/articles/feed?limit=10&offset=${page * 10}`);
    },
    getArticleListByAuthor: (page, author) => {
        return fetcher.get(`/articles?author=${author}&limit=5&offset=${page * 5}`);
    },
    getFavoritedArticleList: (page, by) => {
        return fetcher.get(`/articles?favorited=${by}&limit=5&offset=${page * 5}`);
    },
    createArticle: (article) => {
        return fetcher.post(`/articles`, {article});
    },
    updateArticle: (article) => {
        return fetcher.put(`/articles/${article.slug}`, {article});
    },
    deleteArticle: (articleSlug) => {
        return fetcher.delete(`/articles/${articleSlug}`);
    },
    getComments: (articleSlug) => {
        return fetcher.get(`/articles/${articleSlug}/comments`).then(({comments}) => comments);
    },
    postComment: (body, articleSlug) => {
        return fetcher.post(`/articles/${articleSlug}/comments`, {comment: {body}}).then(({comment}) => comment);
    },
    deleteComment: (id, articleSlug) => {
        return fetcher.delete(`/articles/${articleSlug}/comments/${id}`);
    },
    changeFavorite: wrapAuthApi((favorite, articleSlug) => {
        return fetcher[favorite? "post":"delete"](`/articles/${articleSlug}/favorite`).then(({article}) => article);
    }),
});
exports.ArticleApis = ArticleApis;
