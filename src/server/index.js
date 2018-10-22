// import express from 'express';
import path from 'path';
import logger from './middleware/logger';
import feathers from '@feathersjs/feathers'
import express from '@feathersjs/express'
import knex from 'knex'
import service from 'feathers-knex'
import listServises from './listServises';
const db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'pilotdb'
  }
});

const PORT = 3000;

const app = express(feathers());
// turn the bodybarser
app.use(express.json());
// turn urlencoded
app.use(express.urlencoded({ extended: true }));
// enable REST API
app.configure(express.rest());

app.use('/api/v1/lists', service({
  Model: db,
  name: 'lists'
}))


app.use(express.errorHandler());

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

app.use(logger);
app.use(express.static(path.join(__dirname, '../../public')));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
