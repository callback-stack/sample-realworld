import React from "react";
import {createArray} from "../../../../common/utils/collections";
import {cx} from "emotion";

export const Pagination = ({total, current, onChange}) => (
    <nav>
        <ul className="pagination">
            {createArray(total).map((i) => (
                <li
                    className={cx("page-item", {active: i === current})}
                    key={i}
                >
                    <a
                        className="page-link"
                        onClick={() => onChange(i)}
                    >
                        {i+1}
                    </a>
                </li>
            ))}
        </ul>
    </nav>
);