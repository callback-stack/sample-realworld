import React, {Fragment} from "react";
import {Link, Route} from "react-router-dom";
import {cx} from "emotion";
import {PagingArticlePreviewList} from "../common/paging-article-preview-list/paging-article-preview-list";


export const cArticleTabs = (username, articleApi) => [
    {
        label: "My Articles",
        path: "",
        api: (page) => articleApi.getArticleListByAuthor(page, username)
    },
    {
        label: "Favorited Articles",
        path: "/favorites",
        api: (page) => articleApi.getFavoritedArticleList(page, username)
    },
];

export const renderArticleTabs = ({tabs, userPath, currentPath}) => (
    <Fragment>
        <div className="articles-toggle">
            <ul className="nav nav-pills outline-active">
                {tabs.map((t, i) => (
                    <li className="nav-item" key={i}>
                        <Link
                            className={cx("nav-link", {"active": currentPath === `${userPath}${t.path}`})}
                            to={`${userPath}${t.path}`}
                        >
                            {t.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        {tabs.map((t, i) => (
            <Route
                key={i}
                exact
                path={`${userPath}${t.path}`}
                render={() => (
                    <PagingArticlePreviewList api={t.api}/>
                )}
            />
        ))}
    </Fragment>
);