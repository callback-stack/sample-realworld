import React, {Fragment} from "react";
import {CommentForm} from "./comment-form";
import {CommentCard} from "./comment-card";
import {consumeContext, cs, Load2} from "cs-react";

export const CommentBox = ({articleSlug}) => cs(
    consumeContext("apis"),
    ["comments", ({apis}, next) => Load2({
        fetch: () => apis.article.getComments(articleSlug),
        next,
    })],
    ({comments}) => <>
        {CommentForm({
            articleSlug: articleSlug,
            onPost: (cmt) => comments.onChange([...comments.value, cmt])
        })}

        {comments.value?.map((comment, i) => (
            CommentCard({
                key: i,
                comment, articleSlug,
                onDelete: (cmtId) => comments.onChange(comments.value.filter((c) => c.id !== cmtId))
            })
        ))}
    </>,
);