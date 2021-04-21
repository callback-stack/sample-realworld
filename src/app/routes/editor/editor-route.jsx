import React, {Fragment} from "react";
import {cs} from "../../../common/react/chain-services";
import {Load} from "../../../common/react/load";
import {Layout} from "../common/layout";
import {bindInput} from "../../../common/react/bind-input";
import {scope} from "../../../common/react/scope";
import {UseState} from "../../../common/react/use-state";
import {renderErrorsMessage} from "../common/render-errors-message";
import {routerHistory} from "../../../common/router-history";
import {consumeContext} from "../../../common/react/context";

export const EditorRoute = ({match: {params: {slug}}}) => cs(
    consumeContext("apis"),
    ["article", ({apis}, next) => Load({
        fetch: () => slug ? apis.article.getArticle(slug) : {},
        next: (value, onChange) => next({value, onChange}),
    })],
    ["editingErrors", (_, next) => UseState({next})],
    (_, next) => <Layout active="editor" windowTitle={slug || "Editor"}>{next()}</Layout>,
    ({article, editingErrors, apis}) => (
        <div className="editor-page">
            <div className="container page">
                <div className="row">

                    <div className="col-md-10 offset-md-1 col-xs-12">
                        {renderErrorsMessage(editingErrors.value)}

                        <form>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text" className="form-control form-control-lg" placeholder="Article Title"
                                        {...bindInput(scope(article, ["title"]))}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="text" className="form-control" placeholder="What's this article about?"
                                        {...bindInput(scope(article, ["description"]))}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea
                                        className="form-control" rows={8} placeholder="Write your article (in markdown)"
                                        {...bindInput(scope(article, ["body"]))}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <TagListInput {...scope(article, ["tagList"])}/>
                                </fieldset>
                                <button
                                    className="btn btn-lg pull-xs-right btn-primary" type="button"
                                    disabled={!article.value?.title}
                                    onClick={async (e) => {
                                        // e.preventDefault();
                                        const {article: newArticle, errors} = await apis.article[!slug ? "createArticle" : "updateArticle"](article.value);

                                        if (errors) {
                                            editingErrors.onChange(errors);
                                            return;
                                        }

                                        routerHistory.push(`/article/${newArticle.slug}`);
                                    }}
                                >
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
);

const TagListInput = (tagList) => (
    <Fragment>
        <input
            type="text" className="form-control" placeholder="Enter tags"
            onKeyDown={(e) => {
                if (e.keyCode === 13 && e.target.value?.length > 0) {
                    const newTag = e.target.value;
                    tagList.onChange([...tagList.value||[], newTag]);
                    e.target.value = "";
                }
            }}
        />
        {tagList.value && (
            <div className="tag-list">
                {tagList.value.map((tag, i) => (
                    <span className="tag-default tag-pill" key={i}>
                        <i
                            className="ion-close-round"
                            onClick={() => tagList.onChange(tagList.value.filter((t) => t !== tag))}
                        />
                        {tag}
                    </span>
                ))}
            </div>
        )}
    </Fragment>
);

