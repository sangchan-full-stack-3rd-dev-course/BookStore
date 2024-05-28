const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCartItems,
    deleteCartItem
} = require('../controller/CartController');

router.use(express.json());

// 장바구니 담기
router.post("/", addToCart);

// 장바구니 조회 + 선택 상품 목록 조회
router.get("/", getCartItems);

// 장바구니 삭제
router.delete("/:cartId", deleteCartItem);

module.exports = router;