const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = (req) => {
    try{
        let token = req.headers['authorization'];
        let userInfo = jwt.verify(token, process.env.SECRET_KEY);
        return userInfo;
    } catch(err){
        console.error(err.name);
        console.error(err.message);
        return err;
    }
}

module.exports = {
    verifyToken
};