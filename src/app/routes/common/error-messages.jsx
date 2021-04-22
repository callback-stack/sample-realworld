import React from "react";

export const ErrorMessages = (errors) => errors && (
    <ul className="error-messages">
        {Object.entries(errors).map(([attr, msgArr], i) => (
            <li key={i}>{attr} {msgArr.join(" ")}</li>
        ))}
    </ul>
);
