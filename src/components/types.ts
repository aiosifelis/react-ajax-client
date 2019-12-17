import Client from "./Client";

export const enum Method {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}

export interface RequestHeaders {
    [key: string]: string;
}

export interface ClientOptions {
    baseURL: string;
    headers: RequestHeaders;
}

export interface RequestOptions {
    method: Method;
    path: string;
    variables: any;
    headers?: RequestHeaders;
}

export interface ProviderProps {
    client: Client;
    children: JSX.Element;
}

export interface FetchProps {
    path: string;
    variables?: any;
    headers?: RequestHeaders;
    pollInterval?: number;
    children: (state: FetchState) => JSX.Element;
}

export interface FetchState {
    loading: boolean;
    error: Error | null;
    data: any;
    client?: Client | null;
}

export interface SendProps {
    method?: Method;
    path: string;
    headers?: RequestHeaders;
    children: (trigger: (variables: any) => Promise<any>) => JSX.Element;
    onProgress?: () => void;
    onComplete?: (response: any) => void;
    onError?: (response: any) => void;
}
