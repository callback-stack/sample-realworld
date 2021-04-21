import React from "react";
import {Link} from "react-router-dom";
import {cs} from "../../../common/react/chain-services";
import {Layout} from "../common/layout";
import {renderErrorsMessage} from "../common/render-errors-message";
import {bindInput} from "../../../common/react/bind-input";
import {scope} from "../../../common/react/scope";
import {UseState} from "../../../common/react/use-state";
import {consumeContext} from "../../../common/react/context";

export const LoginRoute = () => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ["data", (_, next) => UseState({next})],
    ["loginErrors", (_, next) => UseState({next})],
    (_, next) => <Layout active="login" windowTitle="Sign In">{next()}</Layout>,
    ({data, loginErrors, auth, apis}) => (
        <div className="auth-page sign-in">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <Link to={"/register"}>Need an account?</Link>
                        </p>

                        {renderErrorsMessage(loginErrors.value)}

                        <form>
                            {(() => {
                                const fields = [
                                    {
                                        attr: "email",
                                        type: "text",
                                        placeholder: "Email",
                                    },
                                    {
                                        attr: "password",
                                        type: "password",
                                        placeholder: "Password",
                                    },
                                ];

                                return fields.map(({attr, type, placeholder}, i) => (
                                    <fieldset className="form-group" key={i}>
                                        <input {...{
                                            className: "form-control form-control-lg",
                                            type, placeholder,
                                            ...bindInput(scope(data, [attr]))
                                        }}/>
                                    </fieldset>
                                ))
                            })()}

                            <button
                                className="btn btn-lg btn-primary pull-xs-right"
                                disabled={!data.value}
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const {errors, user} = await apis.user.login(data.value);

                                    if (errors) {
                                        loginErrors.onChange(errors);
                                        return;
                                    }

                                    await auth.login(user);
                                }}
                            >
                                Sign in
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
);