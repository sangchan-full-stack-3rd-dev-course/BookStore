const express = require('express');
const router = express.Router();
const {
    join
} = require('../controller/UserController');

router.use(express.json());

// 회원 가입
router.post("/join", join);

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