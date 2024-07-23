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

const findUsers = async (email) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let sql = `SELECT * FROM users WHERE email =?`;
        const [results] = await conn.query(sql, [email]);
        return results;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

const updatePassword = async (password, salt, email) => {
    let conn;
    try {
        conn = await pool.getConnection();
        let sql = `UPDATE users SET password = ?, salt = ? WHERE email= ?`;
        let [results] = await conn.query(sql, [password, salt, email]);
        return results;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

module.exports = {
    addUser,
    findUsers,
    updatePassword,
}