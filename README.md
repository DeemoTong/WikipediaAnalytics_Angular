# Wikipedia Analytics Web Application using Angular MEAN Stack and mongoDB

## Prerequisites
You will need NPM, Node, and Angular CLI installed in your system, and MongoDB community edition [https://docs.mongodb.com/manual/administration/install-community/](https://docs.mongodb.com/manual/administration/install-community/).

## Start Angular MEAN Stack App
Start Angular app & install required dependencies

- Run `npm install` from the root of the project
- run `ng serve --open` to start angular 

## Start Backend
```
cd backend
npm install
```
After you start the MongoDB, run `nodemon`

## Start MongoDB Database
```
mongod --config /usr/local/etc/mongod.conf
brew services start mongodb-community@4.2
mongo
```

#### Load data into your local MongoDB

```
cd backend/scripts
chmod +x *.sh
./load.sh
node updateAuthorType.js
```

#### Use MongoDB shell
```
mongo --shell
use wikipedia-db
```