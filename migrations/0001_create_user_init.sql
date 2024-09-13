-- Migration number: 0001 	 2024-09-12T13:57:45.108Z

CREATE TABLE users (
    id SERIAL,
    slug VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_of_joining DATE,
    permission_level INT DEFAULT 0
);
