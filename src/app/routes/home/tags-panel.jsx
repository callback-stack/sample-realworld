import React from "react";
import {cs} from "../../../common/react/chain-services";
import {consumeContext} from "../../../common/react/context";
import {Load} from "cs-react";

export const TagsPanel = ({onAddTag}) => cs(
    consumeContext("apis"),
    ["tags", ({apis}, next) => Load({
        fetch: () => apis.tag.getTags(),
        next
    })],
    ({tags}) => (
        <div className="col-md-3">
            <div className="sidebar">
                <p>Popular Tags</p>

                <div className="tag-list">
                    {tags?.map((t, i) => (
                        <div
                            className="tag-pill tag-default" key={i}
                            onClick={() => onAddTag(t)}
                        >
                            {t}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

);