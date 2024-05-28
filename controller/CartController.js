const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();

// 장바구니 담기
const addToCart = (req, res) => {
    const { book_id, user_id, count } = req.body;
    
    let sql = `INSERT INTO cartItems (book_id, user_id, count) VALUES (?,?,?)
                ON DUPLICATE KEY
                UPDATE count = count + VALUES(count)`;

    let values = [book_id, user_id, count];

    connection.query(sql, values, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        return res.status(StatusCodes.OK).end();
    });
}

// 장바구니 아이템 목록 조회
const getCartItems = (req, res) => {
    // cartIds 가 있으면 선택 상품, 없으면 전체 조회
    const { cartIds, user_id } = req.body;

    let sql = `SELECT cartItems.id, book_id, title, summary, count, price 
                FROM cartItems LEFT JOIN books ON cartItems.book_id = books.id
                WHERE user_id = ?`;

    connection.query(sql, user_id, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(results.length) {
            res.status(StatusCodes.OK).json({
                categorys : results
            });
        } else {
            res.status(StatusCodes.NOT_FOUND).end();
        }
    });
}

// 장바구니 삭제
const deleteCartItem = (req, res) => {
    let { cart_id } = req.params;
    cart_id = parseInt(cart_id);
    
    let sql = `DELETE FROM cartItems WHERE id =?`;

    connection.query(sql, cart_id, (err, results)=>{
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
}

module.exports = {
    addToCart,
    getCartItems,
    deleteCartItem
};