import path from 'path';
import logger from './middleware/logger';
import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import knex from 'knex'
import service from 'feathers-knex'
// list service to coustomize any service
import listServises from './listServises';
// database information, client for type of db like mysql, sqlite and so on
// connection depends on your db Server ip
// set your user name and password for the db user.
// database is field for the name of the database you may need to create with the same name "pilotdb"
// or you can change the db name if you have one.
const db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'pilotdb'
  }
});

// the comment line if i need to deploy on some Server have diffrent server port.
// const PORT = process.env.PORT | 3000;
const PORT = 3000;

const app = express(feathers());
// turn the bodybarser
app.use(express.json());
// turn urlencoded
app.use(express.urlencoded({ extended: true }));
// enable REST API
app.configure(express.rest());

// this service to handle any request start from /api/v1/lists
app.use('/api/v1/lists', service({
  Model: db,
  name: 'lists'
}))


app.use(express.errorHandler());
app.use(logger);
app.use(express.static(path.join(__dirname, '../../public')));
app.use('/*', express.static(path.join(__dirname,'..','..','public','index.html')));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



// db.schema.dropTableIfExists('lists')
//   .then(() => {
//     console.log('Dropped exsit list table');
//     return db.schema.createTable('lists', table =>{
//       console.log('Creating "lists" table success');
//       table.increments('id');
//       table.string('name');
//       table.string('description');
//     });
//   }).then(() => {
//     app.service('api/v1/lists').create({
//       name:"task1",
//       description:"this task should done by this morning"
//     })
//     .then(list => console.log("Insert List success", list))
//   }).then(() =>{
//     app.service('api/v1/lists/').create({
//       name:"task2",
//       description:"this task should done by tomorrow"
//     })
//     .then(list => console.log("Insert List success", list))
//   })
