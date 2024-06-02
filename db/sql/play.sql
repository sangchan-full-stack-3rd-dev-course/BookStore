TRUNCATE cartItems;
TRUNCATE orders;
TRUNCATE orderedBook;
INSERT INTO cartItems (book_id, count, user_id) VALUES (1, 5, 1);
INSERT INTO cartItems (book_id, count, user_id) VALUES (1, 5, 1);
INSERT INTO cartItems (book_id, count, user_id) VALUES (3, 1, 1);

select * from cartItems;