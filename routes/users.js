const express = require('express');
const router = express.Router();
const {
    passwordResetRequest,
    passwordReset,
} = require('../controller/UserController');
const {UserController} = require('../controller/UserController');

router.use(express.json());

const controller = new UserController();

router.post("/join", controller.join);
router.post("/login", controller.login);

// 비밀번호 변경 요청
router.post("/reset", passwordResetRequest);
// 비밀번호 변경
router.put("/reset", passwordReset);

module.exports = router;