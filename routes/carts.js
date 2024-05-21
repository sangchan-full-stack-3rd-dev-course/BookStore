const express = require('express');
const router = express.Router();

router.use(express.json());

// 장바구니 담기
router.post("/", (req, res)=>{
    const { bookId, count } = req.body;
});

// 장바구니 조회 + 선택 상품 목록 조회
router.get("/", (req, res)=>{
    // cartIds 가 있으면 선택 상품, 없으면 전체 조회
    const { cartIds } = req.body;
});

// 장바구니 삭제
router.delete("/:cartId", (req, res)=>{
    const { cartId } = req.params;
});


module.exports = router;