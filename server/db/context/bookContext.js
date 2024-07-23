const { ServerError } = require('../../utils/errors');
const pool = require('../connect');

const findBooks = async (isNew, currentPage, booksPerPage, category_id) => {
    let conn;
    try {
        conn = await pool.getConnection();

        // 책 리스트
        let sql = `SELECT *, (select count(*) from likes where liked_book_id = books.id) as likes,
                (select exists (select * from likes where user_id = 1 and liked_book_id = books.id)) as isLike
                FROM books`;
        
        let wheres = [];
        let values = [];

        if (category_id !== undefined){
            category_id = parseInt(category_id);
            wheres.push(` category_id = ?`);
            values.push(category_id);
        }

        if (isNew) {
            wheres.push(` pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`);
        }

        if(wheres.length){
            sql += ` WHERE` + wheres.join(` AND`);
        }

        if (currentPage && booksPerPage){
            currentPage = parseInt(currentPage);
            booksPerPage = parseInt(booksPerPage);
            sql += ` LIMIT ? OFFSET ?`;
            values.push(booksPerPage);
            values.push((currentPage-1) * booksPerPage);
        }

        const [results] = await conn.query(sql, values);

        if(!results.length){
            throw ServerError.notFound('찿는 게시글이 없음');
        }

        // 페이지네이션
        let paginationSql = `SELECT count(*) from books`;

        const [page_results] = await conn.query(paginationSql);

        let pagenation = {
            currentPage : currentPage,
            totalCount : page_results[0]['count(*)']
        };

        return {
            books : results,
            pagenation : pagenation
        };
    } catch (err) {
        if(err instanceof ServerError){
            throw err;
        } else {
            throw ServerError.etcError('DB 에러');
        }
    } finally {
        if (conn) conn.release();
    }
}

module.exports = {
    findBooks
}