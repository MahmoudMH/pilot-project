import { observable, computed, action, reaction , toJS} from "mobx";

import ListModel from "../models/ListModel";

export default class ListStore {
  /*
  observables that are being read while the function is executing are tracked
  observable applies itself recursively by default
  */
  @observable lists = [];
  // this function to test length of list!
  @computed
  get listsCount() {
    return this.lists.length;
  }
  // this function as a logger, i run it when i need to handle some error or maybe to dubggeing the code
  @computed get report() {
    if (this.lists.length === 0)
    return "<none>";
    return `New lists: "${this.lists[0].name}". `
  }
  // this function i used it to test adding list on the array
  @action
  addList(name, disc) {
    this.lists.push(
      {
        id:Math.floor(Math.random() * 10),
        name: name,
        description: disc
      });
  }
  // this action for getting all data
  // toJS is mobx function to convert proxy array which observable lists return to an normal array lin in js
  @action
  getAllList(){
    return toJS(this.lists);
  }
  // this action to create a list and send it to the server
  @action
  sendDataToServer(data) {
    fetch('/api/v1/lists', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      response.json();
    })
    .catch(err => {
      console.error(err);
    })
  }
}
