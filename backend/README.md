
User:
    id
    name
    email
    role: ["ADMIN", "CLIENT"]
    phone
    city
    state

Company:
    id
    name
    founded
    address: 100

Review:
    id
    userId
    companyId
    description
    rating: [1-5]

User hasMany Reviews
Company hasMany Reviews
Review belongsTo Company and User


npx sequelize-cli model:generate --name User --attributes name:string,email:string,role:string,phone:string,city:string,state:string

npx sequelize-cli model:generate --name Company --attributes name:string,founded:date,address:string

npx sequelize-cli model:generate --name Review --attributes userId:integer,companyId:integer,description:string,rating:integer


1. Creating docker container for Postgres 13
    $ docker run -p 5432:5432 --name postgres-db -e POSTGRES_PASSWORD=root -d postgres:13.1-alpine
2. Getting inside docker container
    $ docker run -it postgres-db bash
## From inside container
3. Getting inside postgres command line
    $ psql -U postgres
## Inside postgres command line
    $ CREATE DATABASE test;
    $ CREATE USER sample WITH ENCRYPTED PASSWORD 'admin123';
    $ GRANT ALL PRIVILEGES ON DATABASE test TO sample;

To exit postgres command line: \q
To exit postgres docker container: exit

4. Get inside db folder to run migrations and seeds
    $ cd db
5. From inside db folder, run migrations to create tables in database
    $ npx sequelize-cli db:migrate
6. From inside db folder, run seeds to create admin user in Users table
    $ npx sequelize-cli db:seed:all
7. Come to root of project and start application
    $ node index.js
