insert into cities(name, country) values('Salto', 'Uruguay');

insert into conditions(name) values ('semi-nuevo');
insert into conditions(name) values ('reparado');
insert into conditions(name) values ('usado');

insert into colors(name) values ('amarillo');

insert into storages(number, unit) VALUES (128, 'gb');
insert into storages(number, unit) VALUES (256, 'gb');

insert into models(name) values ('XR');

insert into brands(name) values ('Apple');

insert into currencies(name) values ('Pesos Uruguayos');

insert into users(name, email, password, role) VALUES ('juana', 'juanaxlopez1@gmail.com', crypt('pepe',gen_salt('bf')), 'admin');
insert into users(name, email, password) VALUES ('pablo', 'pablo@gmail.com', crypt('pepe123',gen_salt('bf')));
insert into cellphones(id_model, id_storage, id_color, id_brand, id_condition, price, battery_condition) VALUES
(1, 1, 1, 1, 1, 8800,88);
insert into carts(id_client, id_cellphone) VALUES (2,2);
insert into sales(id_client, id_cellphone, amount) values (2,1,8000);
