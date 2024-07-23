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
const { ServerError } = require('../utils/errors');
let {addUser, findUsers, updatePassword} = require('../db/context/userContext');
dotenv.config();

class UserController extends MainController {
    constructor() {
        super();
        this.join = this.join.bind(this);
        this.login = this.login.bind(this);
        this.passwordResetRequest = this.passwordResetRequest.bind(this);
        this.passwordReset = this.passwordReset.bind(this);
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
    
            this.success(200, data).send(res);
        }
        catch(err){
            next(err);
        }
    }
    async login(req,res,next){
        try{
            const { email, password } = req.body;

            if(!email || !password){
                throw ServerError.badRequest("입력 값이 유효하지 않습니다.");
            }

            let users = await findUsers(email);

            if(users.length == 0){
                throw ServerError.unauthorized("존재하지 않는 회원입니다.");
            }

            let data = {};

            const loginUser = users[0];
            const inputPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');

            if(inputPassword != loginUser.password){
                throw ServerError.unauthorized("비밀번호가 일치하지 않습니다.");
            }

            const token = jwt.sign({ user_id : loginUser.id, email : loginUser.email },
                process.env.SECRET_KEY,
                { expiresIn : '30m', issuer : 'HK' }
            );
    
            res.cookie("token", token, { httpOnly : true });
            
            data.message = `로그인 성공`;
            data.token = token;

            this.success(200, data).send(res);
        }
        catch(err){
            next(err);
        }
    }
    async passwordResetRequest(req,res,next){
        try{
            const { email } = req.body;

            if(!email){
                throw ServerError.badRequest("입력 값이 유효하지 않습니다.");
            }

            let users = await findUsers(email);

            if(users.length === 0){
                throw ServerError.unauthorized("존재하지 않는 회원입니다.");
            }

            let data = {};
            data.message = `${users[0].name} 님의 비밀번호 초기화 요청을 승인합니다.`;
            data.permit = true;

            this.success(200, data).send(res);
        }
        catch(err){
            next(err);
        }
    }
    async passwordReset(req,res,next){
        try{
            const { email, password } = req.body;

            if(!email || !password){
                throw ServerError.badRequest("입력 값이 유효하지 않습니다.");
            }
            // 64 바이트의 랜덤 문자열 생성
            const salt = crypto.randomBytes(10).toString('base64');
            // sha512 알고리즘으로 password + salt 문자열을 10000번 암호화함
            const hashPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

            const results = await updatePassword(hashPassword, salt, email);

            if(results.affectedRows == 0){
                throw ServerError.badRequest("비밀번호 초기화에 실패하였습니다.");
            }

            let data = {};
            data.message = `${email} 님의 비밀번호가 초기화 되었습니다.`;

            this.success(200, data).send(res);
        }
        catch(err){
            next(err);
        }
    }
}

module.exports = {
    UserController
};