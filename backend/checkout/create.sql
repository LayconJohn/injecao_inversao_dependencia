drop table solid.product;

create table solid.product (
	product_id integer,
	description text,
	amount numeric
);

insert into solid.product values (1, 'A', 20);
insert into solid.product values (2, 'B', 54.50);
insert into solid.product values (3, 'C', 900);
insert into solid.product values (4, 'D', 500);
insert into solid.product values (5, 'E', 300);
insert into solid.product values (6, 'F', 129);