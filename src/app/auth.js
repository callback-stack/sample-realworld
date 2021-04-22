import React from "react";
import {cs} from "cs-react";
import {apiAuthenConfig} from "../apis/api-authen";
import {rLsStore} from "../common/react/ls-store";

export const Auth = ({next}) => cs(
    ["userInfo", rLsStore("user-info")],
    ({userInfo}) => {
        apiAuthenConfig.setAuthen(() => {
            if (userInfo.value && userInfo.value.token) {
                return true;
            }
            window.location.pathname = "/register";
        });

        return next({
            user: (userInfo.value && userInfo.value.token) ? userInfo.value : null,
            login: (user) => userInfo.onChange(user),
            logout: () => userInfo.onChange(null),
        })
    }
);