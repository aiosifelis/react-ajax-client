# react-ajax-client

> Insired by [ApolloClient](https://github.com/apollographql/react-apollo), `React-Ajax-Client`. Consume rest endpoints using react components

[![NPM](https://img.shields.io/npm/v/react-ajax-client.svg)](https://www.npmjs.com/package/react-ajax-client) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-ajax-client
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

const FetchComponent = () => (
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

const SendComponent = () => (
    <Send
        path="/users"
        onProgress={() => setStatus("Processing...")}
        onComplete={response =>
            setStatus("Completed: " + JSON.stringify(response))
        }
        onError={response => setStatus("Error:" + JSON.stringify(response))}
    >
        {trigger => (
            <button
                onClick={e => trigger({ firstName: "Billy", lastName: "Jean" })}
            >
                Create Item
            </button>
        )}
    </Send>
);

const MyApp = () => (
    <Provider client={client}>
        <div>
            <h1>My App</h1>
            <SendComponent />
            <FetchComponent />
        </div>
    </Provider>
);
```

## License

MIT © [aiosifelis](https://github.com/aiosifelis)
