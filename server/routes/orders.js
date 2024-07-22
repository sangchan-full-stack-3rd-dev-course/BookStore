const express = require('express');
const router = express.Router();
const {
    addOrder,
    getOrders,
    getOrderDetail
} = require('../controller/OrderController');
const { verifyToken } = require('../utils/token');
router.use(express.json());

// 주문하기
router.post("/", verifyToken, addOrder);

// 주문 목록 조회
router.get("/", verifyToken, getOrders);

// 주문 상세 상품 조회
router.get("/:order_id", verifyToken, getOrderDetail);

module.exports = router;