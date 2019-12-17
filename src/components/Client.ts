import { ClientOptions, RequestOptions, Method } from "./types";

class Client {
    private options: ClientOptions;
    constructor(_options: ClientOptions) {
        this.options = Object.assign(
            {
                baseURL: "",
                headers: {}
            },
            _options
        );
    }

    public request = async (requestOptions: RequestOptions): Promise<any> => {
        const { method, path, variables } = requestOptions;
        try {
            let fetchURL = `${this.options.baseURL}${path}`;

            const fetchOptions = {
                method,
                headers: {
                    ...requestOptions.headers,
                    ...this.options.headers
                }
            };

            if (method === Method.GET && variables) {
                fetchURL = `${fetchURL}?${Object.keys(variables)
                    .map(key => `${key}=${variables[key]}`)
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

            return await result.json();
        } catch (e) {
            throw new Error(e);
        }
    };
}

export default Client;
