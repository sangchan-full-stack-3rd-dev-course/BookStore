const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const dotenv = require('dotenv');
const { findCategorys } = require('../db/context/categoryContext');
const { ServerError } = require('../utils/errors');
const { MainController } = require('./MainController');
dotenv.config();

class CategoryController extends MainController {
    constructor() {
        super();
        this.getCategorys = this.getCategorys.bind(this);
    };

    async getCategorys (req, res, next) {
        try {
            let { category_id } = req.body;

            if(category_id){
                category_id = parseInt(category_id);
            }

            let results = await findCategorys(category_id);

            if(!results.length) {
                throw ServerError.notFound("카테고리가 존재하지 않습니다.");
            }

            this.success(200, results).send(res);
        }
        catch(err){
            next(err);
        }
    }

};

module.exports = {
    CategoryController
};