import React, { Component } from "react";
import List from "./components/List";
import Button from "./components/Button";
import { Provider, Client } from "react-ajax-client";

const client = new Client({
    baseURL: "https://reqres.in/api",
    headers: {
        "Content-Type": "application/json"
    },
    onRequest: request => {
        console.log(request);
        request.headers.append("x-auth-token", Date.now());
    },
    onResponse: response => {
        console.log(response);
    }
});

export default class App extends Component {
    render() {
        return (
            <Provider client={client}>
                <div>Welcome to React Ajax Client</div>
                <Button />
                <List />
            </Provider>
        );
    }
}
