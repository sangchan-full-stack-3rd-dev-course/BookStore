const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCartItems,
    deleteCartItem
} = require('../controller/CartController');
const { 
    verifyToken
 } = require('../utils/token');
 const {
    CartController
 } = require('../controller/CartController');
router.use(express.json());

const controller = new CartController();

// 장바구니 담기
router.post("/", verifyToken, controller.addToCart);

// 장바구니 조회 + 선택 상품 목록 조회
router.get("/", verifyToken, controller.getCartItems);

// 장바구니 삭제
router.delete("/:cart_id", controller.removeCartItem);

module.exports = router;