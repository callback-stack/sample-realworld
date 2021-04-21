import React from "react";
import marked from "marked";

export const Markdown = ({value}) => (
    <div dangerouslySetInnerHTML={{__html: marked(value)}}/>
);