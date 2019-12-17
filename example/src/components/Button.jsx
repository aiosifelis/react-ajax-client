import React, { useState, Fragment } from "react";
import { Send } from "react-ajax-client";

const Button = () => {
    const [status, setStatus] = useState("None");

    return (
        <Fragment>
            <h3>Button Component</h3>
            <div>Status: {status}</div>
            <Send
                path="/unknown"
                onProgress={() => setStatus("Processing...")}
                onComplete={response =>
                    setStatus("Completed: " + JSON.stringify(response))
                }
                onError={response =>
                    setStatus("Error:" + JSON.stringify(response))
                }
            >
                {trigger => (
                    <button onClick={e => trigger({ name: "Item1" })}>
                        Create Item
                    </button>
                )}
            </Send>
        </Fragment>
    );
};

export default Button;
