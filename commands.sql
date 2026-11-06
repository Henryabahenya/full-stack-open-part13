CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES ('Test Author', 'https://example.com', 'First Test Blog', 10);
INSERT INTO blogs (author, url, title, likes) VALUES ('Henry', 'https://fullstackopen.com', 'Building Part 13 Backend', 5);
