-- create database

	create database Memehub_project,


-- drop tables

drop table posts;
drop table users;
drop table comment;

--drop tables if exists

  drop table if exists posts;

  drop table if exists users;

  drop table if exists comment;

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
  url VARCHAR(255) NOT NULL,
    user_id int,
    constraint fk_account
      foreign key(user_id)
        references users(id)
);

-- select all posts

select * from posts

-- create comments table

create table comment (
  id BIGSERIAL primary key,
  comment_text text not null,
  saved timestamp default current_timestamp,
  post_id int,
    constraint fk_post
      foreign key (post_id)
        references posts(id),
  user_id int,
    constraint fk_account
      foreign key (user_id)
        references users(id)
)

-- select all comments

select * from comment;

