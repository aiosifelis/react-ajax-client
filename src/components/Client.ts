import { Method, ClientOptions, FetchOptions, SendOptions } from "./types";

class Client {
    public options: ClientOptions;
    constructor(_options: ClientOptions) {
        this.options = _options;
    }

    public fetch = async (fetchOptions: FetchOptions): Promise<Response> => {
        const { baseURL, onRequest, onResponse } = this.options;

        try {
            const { path, query } = fetchOptions;

            const headers: Headers = new Headers({
                ...this.options.headers,
                ...fetchOptions.headers
            });

            const url = `${baseURL}${path}${
                query
                    ? `?${Object.keys(query)
                          .map(
                              key =>
                                  `${encodeURIComponent(
                                      key
                                  )}=${encodeURIComponent(query[key])}`
                          )
                          .join("&")}`
                    : ""
            }`;

            const request: Request = new Request(url, {
                method: Method.GET,
                headers
            });

            onRequest && onRequest(request);

            const response: Response = await fetch(request);

            onResponse && onResponse(response);

            return await response.json();
        } catch (e) {
            throw new Error(e);
        }
    };

    public send = async (sendOptions: SendOptions): Promise<Response> => {
        const { onRequest, onResponse, baseURL } = this.options;

        try {
            const { path, body, method } = sendOptions;

            const headers: Headers = new Headers({
                ...this.options.headers,
                ...sendOptions.headers
            });

            const request: Request = new Request(`${baseURL}${path}`, {
                method: method || Method.POST,
                headers,
                body: JSON.stringify(body)
            });

            onRequest && onRequest(request);

            const response: Response = await fetch(request);

            onResponse && onResponse(response);

            return await response.json();
        } catch (e) {
            throw new Error(e);
        }
    };
}

export default Client;
