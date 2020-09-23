# react-ajax-client

> Consume rest endpoints using react components. Inspired by [ApolloClient](https://github.com/apollographql/react-apollo)

[![NPM](https://img.shields.io/npm/v/react-ajax-client.svg)](https://www.npmjs.com/package/react-ajax-client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-ajax-client
```

```bash
yarn add react-ajax-client
```

## Usage

```tsx
import React from "react";

import { Provider, Fetch, Send, Client } from "react-ajax-client";

const client = new Client({
    baseURL: "http://mywebsite.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

const ListUsers = () => (
    <Fetch path="/users">
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
);

const CreateUser = () => (
    <Send
        path="/users"
        onProgress={() => console.log("Processing")}
        onComplete={response =>
            console.log("Completed", JSON.stringify(response))
        }
        onError={response => console.error("Error", JSON.stringify(response))}
    >
        {trigger => (
            <button
                onClick={e => trigger({ firstName: "Billy", lastName: "Jean" })}
            >
                Create a User
            </button>
        )}
    </Send>
);

const MyApp = () => (
    <Provider client={client}>
        <div>
            <h1>My App</h1>
            <CreateUser />
            <ListUsers />
        </div>
    </Provider>
);
```

### Client

| Option     | Type     | Default | Description                                                                                                                              |
| ---------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| baseURL    | string   | ""      | The api endpoint of the backend                                                                                                          |
| headers    | object   | {}      | A key value pair of http headers                                                                                                         |
| onRequest  | function |         | a middleware function called before each request passed the [request](https://developer.mozilla.org/en-US/docs/Web/API/Request) instance |
| onResponse | function |         | a afterware function called after each request passed the [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) instance |

MIT © [aiosifelis](https://github.com/aiosifelis)

```

```
