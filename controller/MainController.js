let { 
    Response
} = require('../utils/response');

class MainController {
    constructor() {
        this.response;
    }

    setResponse(code, data){
        this.response = new Response(code, data);
    }

    send(res){
        res.status(this.response.code).json(this.response.data);
    }
}

module.exports = {
    MainController
};