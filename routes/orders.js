const express = require('express');
const router = express.Router();

router.use(express.json());

// 주문하기
router.post("/", (req, res)=>{

});

// 주문 목록 조회
router.get("/", (req, res)=>{
    
});

// 주문 상세 상품 조회
router.get("/:bookId", (req, res)=>{
    const { bookId } = req.params;
});

module.exports = router;