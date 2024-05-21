const express = require('express');
const router = express.Router();

router.use(express.json());

// 도서 조회
router.get("/", (req, res)=>{
    const isNew = req.query.new;
    const { page, booksPerPage, keyword, category } = req.body;
});

// 도서 상세 정보 조회
router.get("/:id", (req, res)=>{
    
});


module.exports = router;