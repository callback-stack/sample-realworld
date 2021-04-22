import React from "react";
import {cs} from "cs-react";
import {rLsStore} from "../common/react/ls-store";

export const Auth = ({next}) => cs(
    ["userInfo", rLsStore("user-info")],
    ({userInfo}) => next({
        user: (userInfo.value && userInfo.value.token) ? userInfo.value : null,
        login: (user) => userInfo.onChange(user),
        logout: () => userInfo.onChange(null),
    }),
);
