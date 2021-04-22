import * as React from "react";
import {cx} from "emotion";
import {cs, State, consumeContext} from "cs-react";
import {PagingArticlePreviewList} from "../common/paging-article-preview-list/paging-article-preview-list";

export const FeedsPanel = ({chosenTag}) => cs(
    consumeContext("auth"),
    consumeContext("apis"),
    ({auth, apis}) => Tabs({
        tabs: [
            auth.user && {
                label: "Your Feed",
                render: () => PagingArticlePreviewList({
                    key: "your-feed",
                    api: (page) => apis.article.getMyFeedList(page),
                })
            },
            {
                label: "Global Feed",
                render: () => PagingArticlePreviewList({
                    key: "global-feed",
                    api: (page) => apis.article.getArticleList(page),
                })
            },
            chosenTag.value && {
                label: <>
                    <i className="ion-pound"/>&nbsp;{chosenTag.value}
                </>,
                render: () => PagingArticlePreviewList({
                    key: "tag!" + chosenTag.value,
                    api: (page) => apis.article.getArticleListByTag(page, chosenTag.value),
                }),
                forced: true,
            }
        ].filter(v=>v),
        onChangeTab: () => chosenTag.onChange(null)
    }),
);

const Tabs = ({tabs, onChangeTab}) => cs(
    ["forced", (_, next) => {
        const forcedIndex = tabs.findIndex((t) => t.forced);
        return next(forcedIndex > -1 ? forcedIndex : 0);
    }],
    ["selected", ({forced}, next) => (
        State({
            initValue: forced,
            next
        })
    )],
    ({selected, forced}) => (
        <div className="col-md-9">
            {(() => {
                const headerTabs = tabs.map((tab) => ({
                    label: tab.label,
                    isActive: (i) => ((forced || selected.value) === i),
                    onClick: (i) => {
                        if (tab.forced && i === forced) {
                            return;
                        }
                        selected.onChange(i);
                        onChangeTab && onChangeTab();
                    },
                }));
                return TabsHeader(headerTabs);
            })()}

            {tabs[forced || selected.value].render()}
        </div>
    )
);

const TabsHeader = (tabs) => (
    <div className="feed-toggle">
        <div className="nav nav-pills outline-active">
            {tabs.map((tab, i) => (
                <div className="nav-item" key={i}>
                    <div
                        className={cx("nav-link", {active: tab.isActive(i)})}
                        onClick={() => tab.onClick(i)}
                    >{tab.label}</div>
                </div>
            ))}
        </div>
    </div>
);
