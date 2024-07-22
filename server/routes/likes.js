const express = require('express');
const router = express.Router();
const {
    addLike,
    removeLike
} = require('../controller/LikeController');
const { verifyToken } = require('../utils/token');
router.use(express.json());

// 좋아요 추가
router.post("/", verifyToken, addLike);

// 좋아요 삭제
router.delete("/", verifyToken, removeLike);


module.exports = router;