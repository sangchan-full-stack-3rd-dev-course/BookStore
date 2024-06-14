const pool = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const {
    MainController
} = require('./MainController');
const { ServerError } = require('../utils/response');
let {addUser, findUsers} = require('../db/context/userContext');
dotenv.config();

class UserController extends MainController {
    constructor() {
        super();
        this.join = this.join.bind(this);
    }

    async join(req,res,next){
        try{
            const { email, name, password } = req.body;

            if(!email || !name || !password){
                throw ServerError.badRequest("입력 값이 유효하지 않습니다.");
            }

            // 64 바이트의 랜덤 문자열 생성
            const salt = crypto.randomBytes(10).toString('base64');
            // sha512 알고리즘으로 password + salt 문자열을 10000번 암호화함
            const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');
        
            let values = [email, name, hashPassword, salt];
            
            let results = await addUser(values);
            
            if(results.affectedRows == 0){
                throw ServerError.badRequest("회원가입에 실패하였습니다.");
            }

            let data = { msg : `환영합니다. ${name}님` };
    
            this.setResponse(200, data);
            this.send(res);
        }
        catch(err){
            next(err);
        }
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;

    let users = await findUsers(email);

    const loginUser = users[0];
    const inputPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');

    if(loginUser && inputPassword == loginUser.password){
        const token = jwt.sign({ user_id : loginUser.id, email : loginUser.email },
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
};

const passwordResetRequest = (req, res) => {
    const { email } = req.body;

    let sql = `SELECT * FROM users WHERE email= ?`;

    connection.query(sql, email, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        const user = results[0];
        if(user){
            res.status(StatusCodes.OK).json({
                msg : "바꾸샘"
            });
        } else {
            res.status(StatusCodes.UNAUTHORIZED).end(); 
        }
    });
};

const passwordReset = (req, res) => {
    const { email, password } = req.body;

    // 64 바이트의 랜덤 문자열 생성
    const salt = crypto.randomBytes(10).toString('base64');
    // sha512 알고리즘으로 password + salt 문자열을 10000번 암호화함
    const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let sql = `UPDATE users SET password = ?, salt = ? WHERE email= ?`;
    let values = [hashPassword, salt, email];

    connection.query(sql, values, (err, results)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }
        
        if(results.attectedRows == 0){
            res.status(StatusCodes.UNAUTHORIZED).end(); 
        } else {
            res.status(StatusCodes.OK).end(); 
        }
    });
};

module.exports = { 
    join,
    login,
    passwordResetRequest,
    passwordReset,
    UserController
};