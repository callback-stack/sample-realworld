import React from "react";
import {cs} from "../../../common/react/chain-services";
import {Layout} from "../common/layout";
import {TagsPanel} from "./tags-panel";
import {consumeContext} from "../../../common/react/context";
import {UseState} from "../../../common/react/use-state";
import {FeedsPanel} from "./feeds-panel";

export const HomeRoute = () => cs(
    consumeContext("auth"),
    ["chosenTag", (_, next) => UseState({next})],
    (_, next) => <Layout active="home" windowTitle="Home">{next()}</Layout>,
    ({auth, chosenTag}) => (
        <div className="home-page">
            {auth.user === null && (
                <div className="banner">
                    <div className="container">
                        <h1 className="logo-font">conduit</h1>
                        <p>A place to share your knowledge.</p>
                    </div>
                </div>
            )}

            <div className="container page">
                <div className="row">
                    {FeedsPanel({
                        chosenTag,
                    })}

                    {TagsPanel({
                        onAddTag: chosenTag.onChange,
                    })}
                </div>
            </div>

        </div>
    )
);