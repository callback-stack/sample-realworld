import React from 'react';
import {HomeRoute} from "./routes/home/home-route";
import {Router, Route, Switch} from "react-router-dom";
import {routerHistory} from "../common/router-history";
import {Auth} from "./auth";
import {redirect} from "../common/react/redirect";
import {LoginRoute} from "./routes/login/login-route";
import {RegisterRoute} from "./routes/register/register-route";
import {EditorRoute} from "./routes/editor/editor-route";
import {SettingsRoute} from "./routes/settings/settings-route";
import {ProfileRoute} from "./routes/profile/profile-route";
import {ArticleRoute} from "./routes/article/article-route";
import {createApis} from "../apis/create-apis";
import {provideContext, cs, consumeContext} from "cs-react";

export const RealWorldApp = () => cs(
    ["auth", (_, next) => Auth({next})],
    ["apis", ({auth}, next) => Apis({auth, next})],
    ({apis}, next) => provideContext("apis", apis, next),
    ({auth}, next) => provideContext("auth", auth, next),
    ({}, next) => (
        <div className="realworld-app">
            {next()}
        </div>
    ),
    ({}) => Routes(),
);

const Apis = ({next, auth}) => next(createApis({
    token: auth.user?.token,
    onUnauthen: () => window.location.pathname = "/register",
}));


const Routes = () => cs(
    consumeContext("auth"),
    ({auth: {user}}) => {
        const requireAuthen = (comp) => user == null ? redirect("/login") : comp;
        const requireUnauthen = (comp) => user != null ? redirect("/") : comp;

        return (
            <Router history={routerHistory}>
                <Switch>
                    <Route exact path="/"                       component={HomeRoute}/>
                    <Route exact path="/@:username"             component={ProfileRoute}/>
                    <Route exact path="/@:username/favorites"   component={ProfileRoute}/>
                    <Route exact path="/article/:slug"          component={ArticleRoute}/>

                    <Route exact path="/login"                  component={requireUnauthen(LoginRoute)}/>
                    <Route exact path="/register"               component={requireUnauthen(RegisterRoute)}/>

                    <Route exact path="/editor"                 component={requireAuthen(EditorRoute)}/>
                    <Route exact path="/editor/:slug"           component={requireAuthen(EditorRoute)}/>
                    <Route exact path="/settings"               component={requireAuthen(SettingsRoute)}/>

                </Switch>
            </Router>
        )
    },
);
