import React from "react";
import {cx} from "emotion";
import {consumeContext, cs, State} from "cs-react";

export const FavoriteButton = ({className, favorited, favoritesCount, articleSlug, onChange, long}) => cs(
    ["loading", (_, next) => State({
        initValue: false,
        next
    })],
    consumeContext("apis"),
    ({loading, apis}) => (
        <button
            className={cx(
                "btn btn-sm", className,
                favorited ? "btn-primary" : "btn-outline-primary"
            )}
            disabled={loading.value}
            onClick={async () => {
                loading.onChange(true);
                const article = await apis.article.changeFavorite(!favorited, articleSlug);
                onChange({favorited: article.favorited, favoritesCount: article.favoritesCount});
                loading.onChange(false);
            }}
        >
            <i className="ion-heart"/> {long ? (`${favorited ? "Unfavorite" : "Favorite"} Article (${favoritesCount})`) : `${favoritesCount}`}
        </button>
    )
);