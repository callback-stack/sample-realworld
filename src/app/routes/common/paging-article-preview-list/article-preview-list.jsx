import React, {Fragment} from "react";
import {Link} from "react-router-dom";
import {FavoriteButton} from "../favorite-button";
import {replace1} from "../../../../common/utils/collections";
import {ArticleMeta} from "../article-meta";

export const ArticlePreviewList = ({articles}) => (
    <Fragment>
        {articles.value == null ? (
            <div className="article-preview">
                Loading articles...
            </div>
        ) : articles.value.length === 0 ? (
            <div className="article-preview">
                No articles are here... yet.
            </div>
        ) : (
            articles.value.map((article) => (
                <div className="article-preview" key={article.slug}>
                    {ArticleMeta({
                        article,
                        renderAction: () => (
                            FavoriteButton({
                                className: "pull-xs-right",
                                favorited: article.favorited,
                                favoritesCount: article.favoritesCount,
                                articleSlug: article.slug,
                                onChange: ({favorited, favoritesCount}) => articles.onChange(replace1(articles.value, article, {...article, favorited, favoritesCount}))
                            })
                        )
                    })}
                    <Link to={`/article/${article.slug}`} className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Read more...</span>

                        <ul className="tag-list">
                            {article.tagList?.map((tag, i) => (
                                <li
                                    className="tag-default tag-pill tag-outline"
                                    key={i}
                                >
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </Link>
                </div>
            ))
        )}
    </Fragment>
);