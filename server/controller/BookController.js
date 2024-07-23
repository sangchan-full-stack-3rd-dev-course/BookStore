const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const {
    MainController
} = require('./MainController');
const dotenv = require('dotenv');
const { findBooks } = require('../db/context/bookContext');
dotenv.config();

class BookController extends MainController {
    constructor() {
        super();
        this.getBooks = this.getBooks.bind(this);
        this.getBoofInfo = this.getBookInfo.bind(this);
    }

    async getBooks(req,res,next) {
        try{
            let { isNew, currentPage, limit, category_id } = req.query;
            
            const data = await findBooks(isNew, currentPage, limit, category_id);
            this.success(200, data).send(res);
        } catch(err){
            next(err);
        }
    }

    async getBookInfo(req,res,next) {
        try{
            
        }
        catch(err){
            next(err);
        }
    }
}

// 해당 책의 정보만 가져옴
const getBookInfo = (req, res) => {
    let { book_id } = req.params;
    book_id = parseInt(book_id);

    let userInfo = req.userInfo;

    let sql = `SELECT B.id, B.title, C.name, B.form, B.summary, B.detail, B.author, B.pages, B.contents, B.price, B.pub_date,
                (select count(*) from likes where liked_book_id = B.id) as likes`;

    let values = [];

    if (userInfo instanceof TokenExpiredError) {
        console.error("1:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    } else if (userInfo instanceof JsonWebTokenError) {
        console.error("2:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    } else if (userInfo instanceof ReferenceError) {
        values = [book_id];
    } else {
        sql += `, (select exists (select * from likes where user_id = ? and liked_book_id = B.id)) as isLike`;
        values = [userInfo.user_id, book_id];
    }
    
    sql += ` FROM books as B LEFT JOIN category as C ON B.category_id = C.id WHERE B.id = ?`;

    connection.query(sql, values, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(results[0]){
            res.status(StatusCodes.OK).json({
                book : results[0]
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

module.exports = {
    BookController,
    getBookInfo
}