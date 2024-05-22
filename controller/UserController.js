const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');

const join = (req, res) => {
    const { email, name, password } = req.body;

    let sql = `INSERT INTO users (email, name, password) VALUES(?,?,?)`;
    let values = [email, name, password];

    connection.query(sql, values, (err, result)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        res.status(StatusCodes.CREATED).json({
            message : `환영합니다. ${name}님`
        });
    });
};

const login = (req, res) => {

};

const reset = (req, res) => {

};

const reset2 = (req, res) => {

};


module.exports = { 
    join 
};