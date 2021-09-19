#PROJECT DEPLOYMENT
1.clone
2.npm i
3.create config directory with config.json file in project root
config.json file example

{
  "development": {
    "username": "root",
    "password": "Pinkfloyd1.",
    "database": "oop",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "seederStorage": "sequelize"
  },
  "test": {
    "username": "root",
    "password": "Pinkfloyd1.",
    "database": "oop",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "seederStorage": "sequelize"
  },
  "production": {
    "username": "root",
    "password": "Pinkfloyd1.",
    "database": "oop",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "seederStorage": "sequelize"
  }
}

replace with your db credentials 


4.run 
npx sequelize-cli db:migrate
for db tables migration

5.run
npx sequelize-cli db:seed:all
for db tables seed data

6.you are done

7.also use grade creation api ( you can find it in postman json cllection after export) for grade table data creation, ther is no seed/hardcoded data for grades ( and students ) table.
