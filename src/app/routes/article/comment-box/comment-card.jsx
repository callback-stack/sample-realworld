import React from "react";
import {consumeContext, cs} from "cs-react";
import {getDateString} from "../../common/get-date-string";
import {Link} from "react-router-dom";

export const CommentCard = ({comment, articleSlug, onDelete}) => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ({auth: {user}, apis}) => (
        <div className="card">
            <div className="card-block">
                <p className="card-text">{comment.body}</p>
            </div>
            <div className="card-footer">
                <Link to={`/@${comment.author.username}`} className="comment-author">
                    <img src={comment.author.image} className="comment-author-img" alt=""/>
                </Link>
                &nbsp;
                <Link to={`/@${comment.author.username}`} className="author">{comment.author.username}</Link>
                <span className="date-posted">{getDateString(comment.createdAt)}</span>

                {user && user.username === comment.author.username && (
                    <span className="mod-options">
                        <i
                            className="ion-trash-a"
                            onClick={async () => {
                                await apis.article.deleteComment(comment.id, articleSlug);
                                onDelete(comment.id);
                            }}
                        />
                    </span>
                )}
            </div>
        </div>
    )
);