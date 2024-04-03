
-- drop tables

drop table posts;
drop table users;

-- create users table

create table users (
	id BIGSERIAL PRIMARY KEY NOT NULL,
	username VARCHAR(200) NOT NULL,
	email VARCHAR(200) NOT NULL,
	password VARCHAR(200) NOT NULL,
	UNIQUE (email),
	UNIQUE (username)
);
select * from users

-- create posts table

CREATE TABLE posts (
  id BIGSERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  interest VARCHAR(200) NOT NULL,
  url VARCHAR(255) NOT NULL
);

-- select all posts

select * from posts

