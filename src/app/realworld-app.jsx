import React from 'react';
import {HomeRoute} from "./routes/home/home-route";
import {Router, Route, Switch} from "react-router-dom";
import {routerHistory} from "../common/router-history";
import {Auth} from "./auth";
import {consumeContext, provideContext} from "../common/react/context";
import {cs} from "../common/react/chain-services";
import {redirect} from "../common/react/redirect";
import {LoginRoute} from "./routes/login/login-route";
import {RegisterRoute} from "./routes/register/register-route";
import {EditorRoute} from "./routes/editor/editor-route";
import {SettingsRoute} from "./routes/settings/settings-route";
import {ProfileRoute} from "./routes/profile/profile-route";
import {ArticleRoute} from "./routes/article/article-route";
import {createApis} from "../apis/create-apis";

export const RealWorldApp = () => cs(
    ["auth", (_, next) => Auth({next})],
    ({auth}, next) => provideContext({apis: createApis(auth.user && auth.user.token)}, next),
    ({auth}, next) => provideContext({auth}, next),
    ({}) => (
        <div className="realworld-app">
            {Routes()}
        </div>
    )
);

const Routes = () => cs(
    consumeContext("auth"),
    ({auth: {user}}) => {
        const requireAuthen = (comp) => user == null ? redirect("/") : comp;
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