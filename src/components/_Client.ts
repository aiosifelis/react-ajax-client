export interface ClientOptions {
    baseURL: string
    defaultHeaders: {
        [key:string]: string
    }
}


export interface FetchOptions {
    path: string
    body: 
}

class Client {
    public options: ClientOptions
    constructor(_options: ClientOptions) {
        this.options = Object.assign({
            baseURL: "",
            
        }, _options)
    }

    public fetch = async (fetchOptions: FetchOptions) => {

    }

    public send = async (sendOptions: SendOptions) => {
        
    }
}


export default Client