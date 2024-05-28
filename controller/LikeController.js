const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();

const addLike = (req, res) => {
    let { book_id, user_id } = req.body;

    let sql = `INSERT INTO likes (user_id, liked_book_id) VALUES (?,?)`;
    let values = [user_id, book_id];

    connection.query(sql, values, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        res.status(StatusCodes.OK).end();
    });
};

const removeLike = (req, res) => {
    let { book_id, user_id } = req.body;

    let sql = `DELETE FROM likes where user_id = ? and liked_book_id = ?`;
    let values = [user_id, book_id];

    connection.query(sql, values, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(results.attectedRows == 0){
            res.status(StatusCodes.NOT_FOUND).end(); 
        } else {
            res.status(StatusCodes.OK).end(); 
        }
    });
};

module.exports = {
    addLike,
    removeLike
};