import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {Layout} from "../common/layout";
import {ArticleMeta} from "../common/article-meta";
import {FollowButton} from "../common/follow-button";
import {setPath} from "cs-react/utils";
import {FavoriteButton} from "../common/favorite-button";
import {Markdown} from "./markdown";
import {CommentBox} from "./comment-box/comment-box";
import {LoadingPanel} from "../common/loading-panel";
import {consumeContext, cs, Load} from "cs-react";
import {routerHistory} from "../../../common/router-history";

export const ArticleRoute = ({match: {params: {slug}}}) => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ["article", ({apis}, next) => Load({
        fetch: () => apis.article.getArticle(slug),
        next: (value, onChange) => next({value, onChange})
    })],
    (_, next) => <Layout windowTitle={slug}>{next()}</Layout>,
    ({article, auth}) => (
        <div className="article-page">
            <div className="banner">
                <div className="container">
                    {!article.value ? (
                        <LoadingPanel/>
                    ) : (
                        <Fragment>
                            <h1>{article.value.title}</h1>
                            {renderArticleMeta({article, username: auth.user?.username})}
                        </Fragment>
                    )}
                </div>
            </div>

            <div className="container page">
                <div className="row article-content">
                    <div className="col-md-12">
                        {!article.value ? (
                            <LoadingPanel/>
                        ) : (
                            <Fragment>
                                <Markdown value={article.value.body}/>
                                <ul className="tag-list">
                                    {article.value.tagList?.map((tag, i) => (
                                        <li className="tag-default tag-pill tag-outline" key={i}>
                                            {tag}
                                        </li>
                                    ))}
                                </ul>
                            </Fragment>
                        )}
                    </div>
                </div>

                <hr/>

                {!article.value ? (
                    <LoadingPanel/>
                ) : (
                    <Fragment>
                        <div className="article-actions">
                            {renderArticleMeta({article, username: auth.user?.username})}
                        </div>

                        <div className="row">
                            <div className="col-xs-12 col-md-8 offset-md-2">
                                <CommentBox articleSlug={article.value.slug}/>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    )
);

const renderArticleMeta = ({article, username}) => cs(
    consumeContext("apis"),
    ({apis}) => (
        ArticleMeta({
            article: article.value,
            renderAction: () => username === article.value.author.username ? (
                <>
                    <Link className="btn btn-outline-secondary btn-sm" to={`/editor/${article.value.slug}`}>
                        <i className="ion-edit"/> Edit Article
                    </Link>
                    {" "}
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={async () => {
                            await apis.article.deleteArticle(article.value.slug);
                            routerHistory.push("/");
                        }}
                    >
                        <i className="ion-trash-a"/> Delete Article
                    </button>
                </>
            ) : (
                <>
                    {FollowButton({
                        username: article.value.author.username,
                        following: article.value.author.following,
                        onChange: (following) => article.onChange(setPath(article.value, ["author", "following"], following))
                    })}
                    &nbsp;&nbsp;
                    {FavoriteButton({
                        favorited:      article.value.favorited,
                        favoritesCount: article.value.favoritesCount,
                        articleSlug:    article.value.slug,
                        onChange: ({favorited, favoritesCount}) => article.onChange({...article.value, favorited, favoritesCount}),
                        long: true,
                    })}
                </>
            )
        })
    )
);