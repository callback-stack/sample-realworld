import React from "react";

export const LoadingPanel = ({text}) => (
    <div className="">
        {text || "Loading..."}
    </div>
);