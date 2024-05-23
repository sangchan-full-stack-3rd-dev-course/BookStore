const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

// 도서 조회 with category
const getBooks = (req, res)=>{
    const { isNew, page, booksPerPage, keyword, category_id } = req.body;

    let sql = `SELECT * FROM books `

    if (category_id != undefined){
        sql += `WHERE category_id =?;`;
    }

    connection.query(sql, category_id, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(results.length) {
            res.status(StatusCodes.OK).json({
                books : results
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).end();
        }
    });
};

// 해당 책의 정보만 가져옴
const getBookInfo = (req, res) => {
    let { id } = req.params;
    id = parseInt(id)

    let sql = `SELECT * FROM books WHERE id = ?`;

    connection.query(sql, id, (err, results)=>{
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