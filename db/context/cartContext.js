const pool = require('../connect');

const addCartItem = async (book_id, user_id, count) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const values = [book_id, user_id, count]
        let sql = `INSERT INTO cartItems (book_id, user_id, count) VALUES (?,?,?) ON DUPLICATE KEY UPDATE count = count + VALUES(count);`;
        const [results] = await conn.query(sql, values);
        return results;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

const findCartItems = async (userId, cartIds) => {
    let conn;
    try {
        conn = await pool.getConnection();

        let sql = `SELECT cartItems.id, book_id, title, summary, count, price 
                FROM cartItems LEFT JOIN books ON cartItems.book_id = books.id
                WHERE user_id = ?`;

        let values = [userId];

        if (cartIds.length) {
            values.push(cartIds);
            sql += ` AND cartItems.id IN (?)`;
        }

        const [results] = await conn.query(sql, values);
        return results;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

const deleteCartItem = async (values) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const sql = `DELETE FROM cartItems WHERE id =?`;
        const [results] = await conn.query(sql, values);
        return results;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

module.exports = {
    addCartItem,
    findCartItems,
    deleteCartItem
}