const express = require('express');
const router = express.Router();
const {
    getCategorys,
    CategoryController
} = require('../controller/CategoryController');

router.use(express.json());

const controller = new CategoryController();

// 카테고리 조회
router.get("/", controller.getCategorys);

module.exports = router;