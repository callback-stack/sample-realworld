import React from "react";
import {Link} from "react-router-dom";
import {cs} from "../../../../common/react/chain-services";
import {UseState} from "../../../../common/react/use-state";
import {consumeContext} from "../../../../common/react/context";
import {bindInput} from "../../../../common/react/bind-input";

export const CommentForm = ({articleSlug, onPost}) => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ["posting", (_, next) => UseState({
        initValue: false,
        next
    })],
    ["body", (_, next) => UseState({next})],
    ({auth, posting, body, apis}) => {
        if (!auth.user) {
            return (
                <p style={{display: "inherit"}}>
                    <Link to="/login">Sign in</Link> or <Link to="/register">sign up</Link> to add comments on this article.
                </p>
            );
        }

        return (
            <form className="card comment-form">
                <div className="card-block">
                    <textarea
                        className="form-control" placeholder="Write a comment..." rows="3"
                        {...bindInput(body)}
                    />
                </div>
                <div className="card-footer">
                    <img className="comment-author-img" src={auth.user.image} alt=""/>
                    <button
                        className="btn btn-sm btn-primary"
                        disabled={!body.value || posting.value}
                        onClick={async () => {
                            posting.onChange(true);
                            const comment = await apis.article.postComment(body.value, articleSlug);
                            onPost(comment);
                            posting.onChange(false);
                            body.onChange();
                        }}
                    >
                        Post Comment
                    </button>
                </div>
            </form>
        );
    }
);