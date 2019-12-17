import React, { Component } from "react";
import Context from "./Context";
import Client from "./Client";
import { RequestOptions, Method, FetchProps, FetchState } from "./types";

class Fetch extends Component<FetchProps, FetchState> {
    public state: FetchState;
    private client: Client;
    constructor(props: FetchProps) {
        super(props);
        this.state = {
            loading: false,
            error: null,
            data: {}
        };
    }

    public async componentDidMount() {
        await this.fetchData();
        if (this.props.pollInterval && this.props.pollInterval > 0) {
            setInterval(await this.fetchData, this.props.pollInterval);
        }
    }

    public async UNSAFE_componentWillReceiveProps() {
        await this.fetchData();
    }

    private fetchData = async () => {
        try {
            const { path, variables } = this.props;
            const requestOptions: RequestOptions = {
                method: Method.GET,
                variables,
                path
            };
            this.setState({ loading: true });

            const data = await this.client.request(requestOptions);

            this.setState({
                loading: false,
                data
            });
        } catch (e) {
            this.setState({ error: e });
        }
    };

    public render() {
        const { children } = this.props;
        const { loading, error, data } = this.state;
        return (
            <Context.Consumer>
                {(client: Client) => {
                    this.client = this.client || client;
                    return children({ loading, error, data });
                }}
            </Context.Consumer>
        );
    }
}

export default Fetch;
