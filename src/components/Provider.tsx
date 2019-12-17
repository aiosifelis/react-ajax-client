import React from "react";
import Context from "./Context";
import { ProviderProps } from "./types";

const Provider = (props: ProviderProps) => {
    const { client, children } = props;
    return <Context.Provider value={client}>{children}</Context.Provider>;
};

export default Provider;
