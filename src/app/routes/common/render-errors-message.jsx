import React from "react";

export const renderErrorsMessage = (errors) => errors && (
    <ul className="error-messages">
        {Object.entries(errors).map(([attr, msgArr], i) => (
            <li key={i}>{attr} {msgArr.join(" ")}</li>
        ))}
    </ul>
);