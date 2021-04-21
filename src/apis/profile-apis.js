const {apiAuthen} = require("./api-authen");

const createProfileApis = (fetcher) => ({
    getProfile: (username) => {
        return fetcher.get(`/profiles/${username}`).then(({profile}) => profile);
    },
    follow: apiAuthen((username) => {
        return fetcher.post(`/profiles/${username}/follow`).then(({profile}) => profile);
    }),
    unfollow: apiAuthen((username) => {
        return fetcher.delete(`/profiles/${username}/follow`).then(({profile}) => profile);
    }),
});
exports.createProfileApis = createProfileApis;