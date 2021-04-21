import React, {createElement as h} from "react";
import {routerHistory} from "../../../common/router-history";
import {cs} from "../../../common/react/chain-services";
import {Layout} from "../common/layout";
import {consumeContext} from "../../../common/react/context";
import {UseState} from "../../../common/react/use-state";
import {equalDeep, keepOnly} from "../../../common/utils/objects";
import {bindInput} from "../../../common/react/bind-input";
import {scope} from "../../../common/react/scope";
import {renderErrorsMessage} from "../common/render-errors-message";
import {cx} from "emotion";

export const SettingsRoute = () => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ["oriUser", ({auth}, next) => next(keepOnly(auth.user, ["email", "username", "image", "bio"]))],
    ["user", ({oriUser}, next) => UseState({
        initValue: oriUser,
        next
    })],
    ["submitting", (_, next) => UseState({
        initValue: false,
        next
    })],
    ["updateErrors", (_, next) => UseState({next})],
    (_, next) => <Layout active="settings" windowTitle="Settings">{next()}</Layout>,
    ({auth, oriUser, user, updateErrors, submitting, apis}) => (
        <div className="settings-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>
                        {renderErrorsMessage(updateErrors.value)}
                        <form>
                            <fieldset>
                                {(() => {
                                    const fields = [
                                        {
                                            attr: "image",
                                            type: "text",
                                            placeholder: "URL of profile picture",
                                        },
                                        {
                                            attr: "username",
                                            type: "text",
                                            placeholder: "Your Name",
                                        },
                                        {
                                            attr: "bio",
                                            type: "text",
                                            placeholder: "Short bio about you",
                                            comp: "textarea",
                                            rows: 8,
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

                                    return fields.map((f, i) => (
                                        <fieldset className="form-group" key={i}>
                                            {h(f.comp || "input", {
                                                className: cx("form-control", {"form-control-lg": f.attr !== "image"}),
                                                rows: f.rows,
                                                type: f.type,
                                                placeholder: f.placeholder,
                                                disabled: submitting.value,
                                                ...bindInput(scope(user, [f.attr]))
                                            })}
                                        </fieldset>
                                    ))
                                })()}

                                <button
                                    className="btn btn-lg btn-primary pull-xs-right"
                                    disabled={equalDeep(oriUser, user.value)}
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        submitting.onChange(true);
                                        const {errors, user: updatedUser} = await apis.user.updateUser(user.value);

                                        if (errors) {
                                            updateErrors.onChange(errors);
                                            submitting.onChange(false);
                                            return;
                                        }

                                        auth.login(updatedUser);
                                        routerHistory.push(`/@${updatedUser.username}`);
                                    }}
                                >
                                    Update Settings
                                </button>
                            </fieldset>
                        </form>

                        <hr/>
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => auth.logout()}
                        >
                            Or click here to logout.
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
);