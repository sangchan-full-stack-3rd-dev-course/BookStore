const express = require('express');
const router = express.Router();
const {
    join,
    login,
    passwordResetRequest,
    passwordReset,
} = require('../controller/UserController');

router.use(express.json());


router.post("/join", join);
router.post("/login", login);

// 비밀번호 변경 요청
router.post("/reset", passwordResetRequest);
// 비밀번호 변경
router.put("/reset", passwordReset);

module.exports = router;