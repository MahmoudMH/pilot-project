const knex = require('knex');
const service = require('feathers-knex');

const db = knex({
  client: 'mysql',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'pilotdb'
  }
});

export default db;
