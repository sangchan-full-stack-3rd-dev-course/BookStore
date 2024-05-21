const express = require('express');
const router = express.Router();

router.use(express.json());

// 좋아요 추가
router.post("/:id", (req, res)=>{

});

// 좋아요 삭제
router.delete("/:id", (req, res)=>{});


module.exports = router;