import React from "react";
import {Link} from "react-router-dom";
import {getDateString} from "./get-date-string";

export const ArticleMeta = ({article, renderAction}) => (
    <div className="article-meta">
        <Link to={`/@${article.author.username}`}><img src={article.author.image} alt=""/></Link>
        <div className="info">
            <Link to={`/@${article.author.username}`} className="author">{article.author.username}</Link>
            <span className="date">{getDateString(article.createdAt)}</span>
        </div>
        {renderAction()}
    </div>
);