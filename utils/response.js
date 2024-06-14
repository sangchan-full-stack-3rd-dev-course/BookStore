class Response{
    constructor(code, data) {
        this.code = code;
        this.data = data;
    }
}

class ServerError extends Error{
    constructor(name, message) {
        super(name, message);
    }

    static badRequest(message){
        let errorMsg = `Bad Request: ${message}`;
        return new ServerError(400, errorMsg);
    }
    static unauthorized(message){
        let errorMsg = `Unauthorized: ${message}`;
        return new ServerError(401, errorMsg);
    }
    static forbidden(message){
        let errorMsg = `Forbidden: ${message}`;
        return new ServerError(403, errorMsg);
    }
    static notFound(message){
        let errorMsg = `NotFound: ${message}`;
        return new ServerError(500, errorMsg);
    }

    static etcError(code, message){
        let errorMsg = `Unknown Error: ${message}`;
        return new ServerError(code, errorMsg);
    }
}

module.exports = {
    Response,
    ServerError
}