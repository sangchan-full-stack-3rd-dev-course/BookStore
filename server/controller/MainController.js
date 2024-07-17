class Response{
    constructor(code, data) {
        this.code = code;
        this.data = data;
    }
}

class MainController {
    constructor() {
        this.response;
    }

    success(code, data){
        this.response = new Response(code, data);
        return this;
    }

    send(res){
        res.status(this.response.code).json(this.response.data);
        return this;
    }
}

module.exports = {
    MainController
};