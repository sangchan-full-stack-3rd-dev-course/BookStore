const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

router.use(express.json());

router.get("/", (req, res)=>{
    let token = req.headers['authorization'];
    let decode = jwt.verify(token, process.env.SECRET_KEY);

    res.json(decode);
});

module.exports = router;