import React, { Component } from "react";
import Context from "./Context";
import Client from "./Client";
import { SendProps, SendOptions } from "./types";

class Send extends Component<SendProps> {
    public state: any;
    private client: Client;

    private trigger = async (body: any): Promise<any> => {
        const {
            method,
            path,
            onProgress,
            onComplete,
            onError,
            headers
        } = this.props;
        const sendOptions: SendOptions = {
            method,
            path,
            body,
            headers
        };
        try {
            onProgress && onProgress();
            const response = await this.client.send({ ...sendOptions });
            onComplete && onComplete(response);
        } catch (e) {
            onError && onError(e);
        }
    };

    public render() {
        const { children } = this.props;
        return (
            <Context.Consumer>
                {(client: Client) => {
                    this.client = this.client || client;
                    return children(this.trigger);
                }}
            </Context.Consumer>
        );
    }
}

export default Send;
