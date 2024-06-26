const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const {
    verifyToken
} = require('../utils/token');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const {
    MainController
} = require('./MainController');
const dotenv = require('dotenv');
dotenv.config();

class BookController extends MainController {
    constructor() {
        super();
        this.getBooks = this.getBooks.bind(this);
        this.getBoofInfo = this.getBookInfo.bind(this);
    }

    async getBooks(req,res,next) {
        try{

        }
        catch(err){
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

// 도서 조회 with category
const getBooks = (req, res)=>{
    // 강의에서는 query string 사용해서 받음.
    // React 에서는 request 전달 시, body로 받는게 편할 수 있음.
    // 따라서 복습 때는 body에 담는 방법을 사용
    let allBooksRes = {};

    let { isNew, currentPage, booksPerPage, keyword, category_id } = req.body;

    let sql = `SELECT *, (select count(*) from likes where liked_book_id = books.id) as likes,
                (select exists (select * from likes where user_id = 1 and liked_book_id = books.id)) as isLike
                FROM books`;
    let wheres = [];
    let values = [];

    if (category_id != undefined){
        wheres.push(` category_id = ?`);
        values.push(category_id);
    }

    if (isNew) {
        // TODO : 나중에 현 날짜 기준으로 신간 데이터 넣어서 확인하기 -> INTERVAL 1 MONTH로 바꾸기
        wheres.push(` pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 6 MONTH) AND NOW()`);
    }

    if(wheres.length){
        sql += ` WHERE` + wheres.join(` AND`);
    }

    if (currentPage && booksPerPage){
        sql += ` LIMIT ? OFFSET ?`;
        values.push(booksPerPage);
        values.push((currentPage-1) * booksPerPage);
        
        // sql += ` LIMIT ?, ?`;
        // values.push((page-1) * booksPerPage);
        // values.push(booksPerPage);
    }

    connection.query(sql, values, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(results.length) {
            allBooksRes.books = results;
        } else {
            res.status(StatusCodes.NOT_FOUND).end();
        }

        sql = `SELECT found_rows()`;

        connection.query(sql, (err, results)=>{
            if(err) {
                console.log(err);
                return res.status(StatusCodes.BAD_REQUEST).end();
            }

            let pagenation = {};
            pagenation.currentPage = currentPage;
            pagenation.totalCount = results[0]["found_rows()"];

            allBooksRes.pagenation = pagenation;

            res.status(StatusCodes.OK).json(allBooksRes);
        });
    });
};

// 해당 책의 정보만 가져옴
const getBookInfo = (req, res) => {
    let { book_id } = req.params;
    book_id = parseInt(book_id);

    let userInfo = verifyToken(req);

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
    getBooks,
    getBookInfo
}