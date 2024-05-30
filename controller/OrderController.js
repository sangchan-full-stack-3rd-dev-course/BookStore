const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();

// 주문하기
const addOrder = (req, res) => {
    const { items, delivery, totalCount, totalPrice, user_id, firstBookTitle } = req.body;

    let sql1 = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;

    let delivery_id;
    let order_id;

    let values = [delivery.address, delivery.receiver, delivery.contact];

    connection.query(sql1, values, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        delivery_id = results.insertId;

        res.status(StatusCodes.OK).end();
    });

    // let sql2 = `INSERT INTO orders (book_title, total_amount, total_price, user_id, delivery_id) VALUES(?,?,?,?,?)`;
    // values = [firstBookTitle, totalCount, totalPrice, user_id, delivery_id];

    // let sql3 = `INSERT INTO orderedBook (order_id, book_id, count) VALUES (?)`;
    // let values = []
    // items.forEach((item)=>{
    //     values.push([order_id, item.book_id, item.count])
    // });
};

// 주문 목록 조회
const getOrders = (req, res) => {

};

// 주문 상세 상품 조회
const getOrderDetail = (req, res) => {
    const { book_id } = req.params;
};

module.exports = {
    addOrder,
    getOrders,
    getOrderDetail
};