const pool = require('../connect');

const findCategorys = async (category_id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        
        let sql = `SELECT * FROM category `

        if (category_id) {
            sql += `WHERE id =?;`;
        }

        const [results] = await conn.query(sql, [category_id]);
        return results;
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release();
    }
};

module.exports = {
    findCategorys
}