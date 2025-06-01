create table colors(
    id serial primary key,
    name varchar(50) not null unique
);

create table models(
    id serial primary key,
    name varchar(50) not null unique
);

create table brands(
    id serial primary key,
    name varchar(50) not null unique
);

create table currencies(
    id serial primary key,
    name varchar(50) not null unique
);

create table cities(
    id serial primary key,
    name varchar(50) not null,
    country varchar(50) not null default 'Uruguay'
);

create table conditions(
    id serial primary key,
    name varchar(50) not null unique
);

create table storages(
    id serial primary key,
    number int not null,
    unit varchar(20) not null
);

create table cellphones(
    id serial primary key,
    id_model int not null references models(id),
    stock int not null check ( stock >= 0 ) default 1,
    description text null,
    id_storage int not null references storages(id),
    id_color int not null references colors(id),
    id_brand int not null references brands(id),
    id_condition int not null references conditions(id),
    price float(8) not null check ( price > 0 ),
    battery_condition int not null check ( battery_condition between 1 and 100),
    shown boolean not null default false,
    sold boolean not null default false
);  -- faltaria imagen

create extension if not exists pgcrypto;
create table users(
    id serial primary key,
    name varchar(100) not null,
    email varchar(100) not null unique check ( email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' ) ,
    password text not null,
    role varchar(20) not null default 'client' check ( role in ('admin', 'client') )
);

create table carts(
    id serial primary key,
    id_client int not null unique references users(id)
);

create table cart_cellphones(
    id_cart int not null references carts(id),
    id_cellphone int not null references cellphones(id),
    primary key (id_cart, id_cellphone)
);

create table sales(
    id serial primary key,
    date_hour timestamp not null default current_timestamp,
    id_client int not null references users(id),
    id_cellphone int not null references cellphones(id),
    id_currency int not null references currencies(id) default 1,
    address text null,
    id_city int not null references cities(id) default 1
);

create or replace function check_availability()
returns trigger as $$
begin
    if (select stock from cellphones where id = new.id_cellphone) <= 0 and (select sold from cellphones where id=new.id_cellphone) = true then
        raise exception 'no hay stock disponible para este celular o no esta disponible para la venta.';
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trg_check_availability
before insert on sales
for each row
execute function check_availability();

create or replace function make_sale()
returns trigger as $$
begin
    update cellphones
    set stock = stock - 1
    where id = new.id_cellphone;
    update cellphones
    set shown = false
    where id = new.id_cellphone;
    update cellphones
    set sold = true
    where id = new.id_cellphone;
    return new;
end;
$$ language plpgsql;

create trigger trg_make_sale
after insert on sales
for each row
execute function make_sale();

create or replace function create_cart()
returns trigger as $$
begin
    insert into carts(id_client)
    values (NEW.id);
    return new;
end;
$$ language plpgsql;

create trigger trg_create_cart
after insert on users
for each row
execute function create_cart();

create table users_audit(
    id serial primary key,
    action varchar(10) not null,
    date_hour timestamp default current_timestamp,
    id_user int null references users(id),
    details text
);

create or replace function audit_users_update()
returns trigger as $$
begin
    insert into users_audit (action, id_user, details)
    values (
        tg_op,
        old.id,
        case
            when tg_op = 'UPDATE' then 'se actualizaron los datos del usuario.'
            when tg_op = 'DELETE' then 'se borró el usuario.'
            when tg_op = 'INSERT' then 'se creó el usuario.'
        end
    );
    return null;  -- para DELETE
end;
$$ language plpgsql;

create trigger trg_audit_update_user
after update on users
for each row
execute function audit_users_update();

create trigger trg_audit_delete_user
after delete on users
for each row
execute function audit_users_update();

create trigger trg_audit_insert_user
after insert on users
for each row
execute function audit_users_update();