
const ProfileApis = ({fetcher, wrapAuthApi}) => ({
    getProfile: (username) => {
        return fetcher.get(`/profiles/${username}`).then(({profile}) => profile);
    },
    follow: wrapAuthApi((username) => {
        return fetcher.post(`/profiles/${username}/follow`).then(({profile}) => profile);
    }),
    unfollow: wrapAuthApi((username) => {
        return fetcher.delete(`/profiles/${username}/follow`).then(({profile}) => profile);
    }),
});
exports.ProfileApis = ProfileApis;
