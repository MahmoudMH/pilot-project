const feathers = require('@feathersjs/feathers');
import service from 'feathers-knex'

class listServise {

  constructor() {
   this.lists = [];
   this.currentId = 0;
 }

  async find(params) {
    return this.lists;
  }
  async get(id, params) {
    const list = this.lists.find(list => list.id === parseInt(id, 10));

    if(!list) {
      throw new Error(`List with id ${id} not found`);
    }
    return list;
  }
  async create(data, params) {
    // Create a new object with the original data and an id
    // taken from the incrementing `currentId` counter
    const list = Object.assign({
      id: ++this.currentId
    },data);

    this.lists.push(list);

    return list;
  }
}

export default listServise;
