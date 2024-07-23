const express = require('express');
const router = express.Router();
const {
    getBookInfo,
    getBooks,
    BookController
} = require('../controller/BookController');

router.use(express.json());

const controller = new BookController();

// 도서 조회
router.get("/", controller.getBooks);

// 도서 상세 정보 조회
router.get("/:book_id", getBookInfo);


module.exports = router;