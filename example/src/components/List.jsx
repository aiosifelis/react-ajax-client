import React, { Fragment } from "react";
import { Fetch } from "react-ajax-client";

const List = () => {
    return (
        <Fragment>
            <h3>List Component</h3>
            <Fetch path="/unkknown">
                {({ loading, error, data }) => {
                    if (loading) {
                        return <div>Loading...</div>;
                    }

                    if (error) {
                        return <div>{error.message}</div>;
                    }
                    return <pre>{JSON.stringify(data, null, 4)}</pre>;
                }}
            </Fetch>
        </Fragment>
    );
};

export default List;
