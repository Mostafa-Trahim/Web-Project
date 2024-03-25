

create database Memehub_project;



create table UserInformation (
	PersonID serial Primary Key,
	Email varchar(255) not null,
	Password varchar(255) not null,
	Username varchar(255) not null
);

select * from userinformation;

insert into  userinformation (email, password, username) values ('mustafa@gmail.com' , 'Mustafa1234', 'Mustafa');