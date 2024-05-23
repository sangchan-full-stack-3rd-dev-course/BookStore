CREATE TABLE IF NOT EXISTS books (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL UNIQUE,
    img INT,
    category_id INT NOT NULL,
    form VARCHAR(50) NOT NULL,
    isbn VARCHAR(50) NOT NULL,
    summary TEXT,
    detail TEXT,
    author VARCHAR(50) NOT NULL,
    pages INT NOT NULL,
    contents TEXT NOT NULL,
    price INT NOT NULL,
    pub_date TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS category (
    /* 강의에선 AT 제거, 하지만 나는 빼지 않겠음 */
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);