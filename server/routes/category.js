const express = require('express');
const router = express.Router();
const {
    getCategorys
} = require('../controller/CategoryController');

router.use(express.json());

// 카테고리 조회
router.get("/", getCategorys);

module.exports = router;