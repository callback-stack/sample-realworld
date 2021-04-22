import React from "react";
import {cx} from "emotion";
import {consumeContext, cs, State} from "cs-react";

export const FollowButton = ({className, username, following, onChange}) => cs(
    ["loading", (_, next) => State({
        initValue: false,
        next
    })],
    consumeContext("apis"),
    ({loading, apis}) => (
        <button
            className={cx("btn btn-sm", className, following ? "btn-secondary" : "btn-outline-secondary")}
            disabled={loading.value}
            onClick={async () => {
                loading.onChange(true);
                await apis.profile[following ? "unfollow" : "follow"](username);
                onChange(!following);
                loading.onChange(false);
            }}
        >
            <i className="ion-plus-round"/>
            &nbsp;
            {following ? "Unfollow" : "Follow"} {username}
        </button>
    )

);