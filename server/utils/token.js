const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { ServerError } = require('../utils/errors');

const verifyToken = (req, res, next) => {
    try{
        let token = req.cookies.token;

        if(!token){
            throw ServerError.reference("jwt must be provided");
        }

        let userInfo = jwt.verify(token, process.env.SECRET_KEY);
        
        req.userInfo = userInfo;
        next();
    } catch(err){
        next(err);
        return;
    }
}

module.exports = {
    verifyToken
};