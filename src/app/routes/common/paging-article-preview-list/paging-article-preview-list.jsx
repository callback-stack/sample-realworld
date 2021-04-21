import React, {Fragment, createElement as h} from "react";
import {cs} from "../../../../common/react/chain-services";
import {UseState} from "../../../../common/react/use-state";
import {ArticlePreviewList} from "./article-preview-list";
import {Pagination} from "./pagination";
import {scope} from "../../../../common/react/scope";
import {Invoke} from "../../../../common/react/invoke";
import {Load2} from "cs-react";


export const PagingArticlePreviewList = ({api}) => cs(
    ["page", (_, next) => UseState({
        initValue: 0,
        next,
    })],
    ["articles", ({page}, next) => Load2({
        _key: page.value,
        fetch: () => api(page.value),
        next,
    })],
    ({page, articles}) => (
        <>
            {ArticlePreviewList({
                key: page.value,
                articles: scope(articles, ["articles"]),
            })}

            {cs(
                ["count", (_, next) => NotNull({
                    value: articles.value && articles.value.articlesCount,
                    next,
                })],
                ({count}) => !!count && Math.ceil(count / 10) > 1 && (
                    Pagination({
                        total: Math.ceil(count / 10),
                        current: page.value,
                        onChange: (p) => page.onChange(p),
                    })
                )
            )}
        </>
    )
);

const NotNull = ({value, next}) => cs(
    ["buffer", (_, next) => h(UseState, {next})],
    ({buffer}) => <Fragment>
        {next(value == null ? buffer.value : value)}

        {value != null && value !== buffer.value && (
            <Invoke fn={() => {
                buffer.onChange(value);
            }}/>
        )}
    </Fragment>,
);