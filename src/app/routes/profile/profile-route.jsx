import * as React from "react";
import {Layout} from "../common/layout";
import {cArticleTabs, renderArticleTabs} from "./article-tabs";
import {ProfileBanner} from "./profile-banner";
import {consumeContext, cs} from "cs-react";

export const ProfileRoute = (props) => {
    const username = props.match.params.username;

    return cs(
        consumeContext("apis"),
        (_, next) => <Layout active={`profile-${username}`} windowTitle={`@${username}`}>{next()}</Layout>,
        ({apis}) => (
            <div className="profile-page">
                <div className="user-info">
                    <div className="container">
                        <div className="row">
                            <div className="col-xs-12 col-md-10 offset-md-1">
                                {ProfileBanner(username)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-md-10 offset-md-1">
                            {renderArticleTabs({
                                tabs: cArticleTabs(username, apis.article),
                                userPath: `/@${username}`,
                                currentPath: props.location.pathname,
                            })}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};