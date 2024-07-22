const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const dotenv = require('dotenv');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
dotenv.config();

const addLike = (req, res) => {
    let { book_id } = req.body;

    let userInfo = req.userInfo;

    if (userInfo instanceof TokenExpiredError) {
        console.error("1:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    } else if (userInfo instanceof JsonWebTokenError) {
        console.error("2:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    let sql = `INSERT IGNORE INTO likes (user_id, liked_book_id) VALUES (?,?)`;
    let values = [userInfo.user_id, book_id];

    connection.query(sql, values, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        res.status(StatusCodes.OK).end();
    });
};

const removeLike = (req, res) => {
    let { book_id } = req.body;

    let userInfo = req.userInfo;

    if (userInfo instanceof TokenExpiredError) {
        console.error("1:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    } else if (userInfo instanceof JsonWebTokenError) {
        console.error("2:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    let sql = `DELETE FROM likes where user_id = ? and liked_book_id = ?`;
    let values = [userInfo.user_id, book_id];

    connection.query(sql, values, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        console.log(results);

        if(results.affectedRows === 0){
            res.status(StatusCodes.NOT_FOUND).end();
        } else {
            res.status(StatusCodes.OK).json({
                msg : "성공"
            }); 
        }
    });
};

module.exports = {
    addLike,
    removeLike
};