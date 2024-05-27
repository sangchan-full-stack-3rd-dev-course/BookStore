const express = require('express');
const router = express.Router();
const {
    addLike,
    removeLike
} = require('../controller/LikeController');

router.use(express.json());

// 좋아요 추가
router.post("/", addLike);

// 좋아요 삭제
router.delete("/", removeLike);


module.exports = router;