import * as React from "react";
import {ArticlePreviewList} from "./article-preview-list";
import {Pagination} from "./pagination";
import {Load2, cs, State, Invoke} from "cs-react";
import {scope} from "cs-react/utils";

export const PagingArticlePreviewList = ({api}) => cs(
    ["page", (_, next) => State({
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
    ["buffer", (_, next) => State({next})],
    ({buffer}) => <>
        {next(value == null ? buffer.value : value)}

        {value != null && value !== buffer.value && (
            Invoke({
                action: () => {
                    buffer.onChange(value);
                },
            })
        )}
    </>,
);