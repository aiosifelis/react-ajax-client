import {
    ClientOptions,
    RequestOptions,
    Method,
    FetchOptions,
    SendOptions
} from "./types";

class Client {
    private options: ClientOptions;
    constructor(_options: ClientOptions) {
        this.options = Object.assign(
            {
                baseURL: "",
                headers: {},
                onBeforeSend: () => {},
                onAfterSend: () => {}
            },
            _options
        );
    }

    public fetch = async (options: FetchOptions): Promise<any> => {
        return await this.request({ method: Method.GET, ...options });
    };

    public send = async (options: SendOptions): Promise<any> => {
        const { method, path, variables, headers } = options;
        return await this.request({
            method: method || Method.POST,
            path,
            variables,
            headers
        });
    };

    public request = async (requestOptions: RequestOptions): Promise<any> => {
        const { onBeforeSend, onAfterSend } = this.options;
        const { method, path, variables } = requestOptions;
        try {
            let fetchURL = `${this.options.baseURL}${path}`;

            const headers = new Headers({
                ...requestOptions.headers,
                ...this.options.headers
            });

            const fetchOptions = {
                method,
                headers
            };

            onBeforeSend && onBeforeSend({ headers });

            if (method === Method.GET && variables) {
                fetchURL = `${fetchURL}?${Object.keys(variables)
                    .map(
                        key =>
                            `${encodeURIComponent(key)}=${encodeURIComponent(
                                variables[key]
                            )}`
                    )
                    .join("&")}`;
            }

            if (
                [Method.POST, Method.PUT, Method.DELETE, Method.PATCH].indexOf(
                    method
                ) > -1
            ) {
                fetchOptions["body"] = JSON.stringify(variables);
            }

            const result = await fetch(fetchURL, fetchOptions);

            onAfterSend && onAfterSend({ headers });

            return await result.json();
        } catch (e) {
            throw new Error(e);
        }
    };
}

export default Client;
