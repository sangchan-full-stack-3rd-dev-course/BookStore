const express = require('express');
const router = express.Router();
const {
    addOrder,
    getOrders,
    getOrderDetail
} = require('../controller/OrderController');

router.use(express.json());

// 주문하기
router.post("/", addOrder);

// 주문 목록 조회
router.get("/", getOrders);

// 주문 상세 상품 조회
router.get("/:book_id", getOrderDetail);

module.exports = router;