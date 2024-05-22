const express = require('express');
const router = express.Router();
const connection = require('../db/connect');
const {
    StatusCodes
} = require('http-status-codes');

router.use(express.json());

// 회원 가입
router.post("/join", (req, res)=>{
    const { email, name, password } = req.body;

    let sql = `INSERT INTO users (email, name, password) VALUES(?,?,?)`;
    let values = [email, name, password];

    connection.query(sql, values, (err, result)=>{
        if(err) {
            console.error(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        res.status(StatusCodes.CREATED).json();
    });
});

// 로그인
router.post("/login", (req, res)=>{
    const { email, password} = req.body;
});

// 비밀번호 변경 요청
router.post("/reset", (req, res)=>{
    const { password} = req.body;
});

// 비밀번호 변경
router.put("/reset", (req, res)=>{
    const { password} = req.body;
});


module.exports = router;