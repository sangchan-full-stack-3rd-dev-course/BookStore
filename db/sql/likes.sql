CREATE TABLE IF NOT EXISTS likes (
    /* 강의에선 AT 제거, 하지만 나는 빼지 않겠음 */
    user_id INT,
    liked_book_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    FOREIGN KEY (liked_book_id) REFERENCES books (id) ON DELETE CASCADE
);