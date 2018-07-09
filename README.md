SocketCluster & Sequelize App
======

## Starting App

npm install

**Setup database**

Change database settings in `config/config.js`

**Running Migrations**

node_modules/.bin/sequelize db:migrate

npm start

## Basic usage

http://YOUR_SERVER:8000/

**Products**

GET /api/products

GET /api/products/:id

POST /api/products

PUT /api/products/:id

DELETE /api/products/:id


**Tasks**

GET /api/tasks

GET /api/tasks/:id

POST /api/tasks

PUT /api/tasks/:id

DELETE /api/tasks/:id