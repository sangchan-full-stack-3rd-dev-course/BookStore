const pool = require('../connect');

const addUser = async (values) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const sql = `INSERT INTO users (email, name, password, salt) VALUES (?, ?, ?, ?)`;
        const [results] = await conn.query(sql, values);
        return results;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

const findUsers = async (values) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let sql = `SELECT * FROM users WHERE email = ?`;
        const [results] = await conn.query(sql, values);
        return results;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

module.exports = {
    addUser,
    findUsers
}