const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const dotenv = require('dotenv');
dotenv.config();

// category 조회
const getCategorys = (req, res)=>{
    let { category_id } = req.body;
    category_id = parseInt(category_id)

    let sql = `SELECT * FROM category `

    if (category_id || category_id === 0) {
        sql += `WHERE id =?;`;
    }

    connection.query(sql, category_id, (err, results)=>{
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
};


module.exports = {
    getCategorys
}