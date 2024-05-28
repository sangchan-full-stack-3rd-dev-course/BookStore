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
    const { cartIds } = req.body;
    
    // connection.query(sql, category_id, (err, results)=>{
    //     if(err) {
    //         console.error(err);
    //         return res.status(StatusCodes.BAD_REQUEST).end();
    //     }

    //     if(results.length) {
    //         res.status(StatusCodes.OK).json({
    //             categorys : results
    //         });
    //     } else {
    //         res.status(StatusCodes.NOT_FOUND).end();
    //     }
    // });
}

// 장바구니 삭제
const deleteCartItem = (req, res) => {
    const { cart_id } = req.params;
    
    // connection.query(sql, category_id, (err, results)=>{
    //     if(err) {
    //         console.error(err);
    //         return res.status(StatusCodes.BAD_REQUEST).end();
    //     }

    //     if(results.length) {
    //         res.status(StatusCodes.OK).json({
    //             categorys : results
    //         });
    //     } else {
    //         res.status(StatusCodes.NOT_FOUND).end();
    //     }
    // });
}

module.exports = {
    addToCart,
    getCartItems,
    deleteCartItem
};