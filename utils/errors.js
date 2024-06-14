class ServerError extends Error{
    constructor(code, message) {
        super(message);
        this.code = code;
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

const errorHandler = (err, req, res, next) => {
    if(err instanceof ServerError){
        let data = {};
        data.message = err.message;
        res.status(err.code).send(data);
    }
    else{
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {
    ServerError,
    errorHandler
}