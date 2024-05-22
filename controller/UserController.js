const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const join = (req, res) => {
    const { email, name, password } = req.body;

    let sql = `INSERT INTO users (email, name, password) VALUES(?,?,?)`;
    let values = [email, name, password];

    connection.query(sql, values, (err, results)=>{
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
    const { email, password } = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;

    connection.query(sql, email, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        const loginUser = results[0];

        if(loginUser && loginUser.password == password){
            const token = jwt.sign({ email : loginUser.email },
                process.env.SECRET_KEY,
                { expiresIn : '30m', issuer : 'HK' }
            );

            res.cookie("token", token, { httpOnly : true });
            res.status(StatusCodes.OK).json({
                message : `로그인 성공`
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message : `로그인 실패!`
            });
        }
    });
};

const passwordResetRequest = (req, res) => {
    const { password } = req.body;
};

const passwordReset = (req, res) => {
    const { password } = req.body;
};


module.exports = { 
    join,
    login,
    passwordResetRequest,
    passwordReset
};