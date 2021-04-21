import React from "react";
import {cs} from "../../../common/react/chain-services";
import {scope} from "../../../common/react/scope";
import {UseState} from "../../../common/react/use-state";
import {Layout} from "../common/layout";
import {bindInput} from "../../../common/react/bind-input";
import {consumeContext} from "../../../common/react/context";
import {renderErrorsMessage} from "../common/render-errors-message";
import {Link} from "react-router-dom";

export const RegisterRoute = () => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ["data", (_, next) => UseState({next})],
    ["signupErrors", (_, next) => UseState({next})],
    (_, next) => <Layout active="register" windowTitle="Sign Up">{next()}</Layout>,
    ({data, signupErrors, auth, apis}) => {
        return (
            <div className="auth-page sign-up">
                <div className="container page">
                    <div className="row">

                        <div className="col-md-6 offset-md-3 col-xs-12">
                            <h1 className="text-xs-center">Sign up</h1>
                            <p className="text-xs-center">
                                <Link to={"/login"}>Have an account?</Link>
                            </p>

                            {renderErrorsMessage(signupErrors.value)}

                            <form>
                                {(() => {
                                    const fields = [
                                        {
                                            attr: "username",
                                            type: "text",
                                            placeholder: "Your Name",
                                        },
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
                                            }} />
                                        </fieldset>
                                    ))
                                })()}

                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    disabled={!data.value}
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        const {errors, user} = await apis.user.register(data.value);

                                        if (errors) {
                                            signupErrors.onChange(errors);
                                            return;
                                        }

                                        await auth.login(user);
                                    }}
                                >
                                    Sign up
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
);