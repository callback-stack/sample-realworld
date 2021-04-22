import * as React from "react";
import {Link} from "react-router-dom";
import {FollowButton} from "../common/follow-button";
import {consumeContext, cs, Load} from "cs-react";
import {LoadingPanel} from "../common/loading-panel";

export const ProfileBanner = (username) => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ["profile", ({apis}, next) => Load({
        fetch: () => apis.profile.getProfile(username),
        next: (value, onChange) => next({value, onChange}),
    })],
    ({profile, auth}) => {
        return !profile.value ? (
            <LoadingPanel/>
        ) : <>
            <img src={profile.value.image} className="user-img" alt=""/>
            <h4>{profile.value.username}</h4>
            <p>{profile.value.bio}</p>

            {auth.user?.username === username ? (
                <Link to="/settings" className="btn btn-sm btn-outline-secondary action-btn">
                    <i className="ion-gear-a"/> Edit Profile Settings
                </Link>
            ) : (
                FollowButton({
                    className: "action-btn",
                    username: profile.value.username,
                    following: profile.value.following,
                    onChange: (following) => profile.onChange({...profile.value, following})
                })
            )}
        </>;
    }
);