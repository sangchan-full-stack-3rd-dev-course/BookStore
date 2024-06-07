//const conn = require('../db/connect');
const mariadb = require('mysql2/promise');
const {
    StatusCodes
} = require('http-status-codes');
const {
    verifyToken
} = require('../utils/token');
const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// 주문하기
const addOrder = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PSWORD,
    });

    const { items, delivery, totalCount, totalPrice, firstBookTitle } = req.body;

    let userInfo = verifyToken(req);

    if (userInfo instanceof TokenExpiredError) {
        console.error("1:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    } else if (userInfo instanceof JsonWebTokenError) {
        console.error("2:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    // select items data
    let sql_s = `SELECT book_id, count FROM cartItems WHERE id in (?)`;
    let [orderItems, fields] = await conn.query(sql_s, [items]);
    console.log(orderItems);
    // delete cartItem
    await deleteCartItems(conn, orderItems);

    // insert delivery
    let sql1 = `INSERT INTO delivery (address, receiver, contact) VALUES (?, ?, ?)`;
    let values = [delivery.address, delivery.receiver, delivery.contact];
    let [results] = await conn.execute(sql1, values);
    let delivery_id = results.insertId;
    
    // insert order
    let sql2 = `INSERT INTO orders (book_title, total_amount, total_price, user_id, delivery_id) VALUES(?,?,?,?,?)`;
    values = [firstBookTitle, totalCount, totalPrice, userInfo.user_id, delivery_id];
    [results] = await conn.execute(sql2, values);
    let order_id = results.insertId;
    
    // insert orderBook
    values = [];
    let sql3 = `INSERT INTO orderedBook (order_id, book_id, count) VALUES ?`;
    orderItems.forEach((item)=>{
        values.push([order_id, item.book_id, item.count]);
    });
    console.log(values);
    [results, fields] = await conn.query(sql3, [values]);

    return res.status(StatusCodes.OK).json(results);
};

const deleteCartItems = async (conn, values) => {
    let sql = `DELETE FROM cartItems WHERE id in (?)`;

    let results = await conn.query(sql, values);

    return results;
}

// 주문 목록 조회
const getOrders = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PSWORD,
    });

    let userInfo = verifyToken(req);

    if (userInfo instanceof TokenExpiredError) {
        console.error("1:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    } else if (userInfo instanceof JsonWebTokenError) {
        console.error("2:",userInfo.message);
        return res.status(StatusCodes.BAD_REQUEST).end();
    }
    
    const sql = `SELECT orders.id, book_title, total_amount, total_price, created_at, address, receiver, contact
                    FROM orders LEFT JOIN delivery
                    ON orders.delivery_id = delivery.id
                    WHERE user_id = 1;`
    const [results, fields] = await conn.query(sql, userInfo.user_id);

    return res.status(StatusCodes.OK).json(results);
};

// 주문 상세 상품 조회
const getOrderDetail = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PSWORD,
    });

    let { order_id } = req.params;
    order_id = parseInt(order_id);

    let sql = `SELECT orderedBook.book_id, title, author, price, count
                FROM orderedBook
                LEFT JOIN books
                ON books.id = orderedBook.book_id
                WHERE order_id =?`;
    let [results, fields] = await conn.query(sql, order_id);

    return res.status(StatusCodes.OK).json(results);
};

module.exports = {
    addOrder,
    getOrders,
    getOrderDetail
};