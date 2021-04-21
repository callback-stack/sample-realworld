

const createUserApis = (fetcher) => ({
     register: ({email, password, username}) => {
         return fetcher.post("/users", {user: {email, password, username}});
     },
     login: ({email, password}) => {
         return fetcher.post("/users/login", {user: {email, password}});
     },
     updateUser: (user) => {
         return fetcher.put("/user", {user});
     },
 });
exports.createUserApis = createUserApis;