import { observable, computed, action, reaction , toJS} from "mobx";

import ListModel from "../models/ListModel";

export default class ListStore {
  @observable lists = [];

  @computed
  get listsCount() {
    return this.lists.length;
  }

  @computed get report() {
    if (this.lists.length === 0)
    return "<none>";
    return `New lists: "${this.lists[0].name}". `
  }
  @action
  addList(name, disc) {
    this.lists.push(
      {
        id:Math.floor(Math.random() * 10),
        name: name,
        description: disc
      });
  }

  @action
  getAllList(){
    return toJS(this.lists);
  }

  @action
  sendDataToServer(data) {
    let isCreated = false;
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
      return isCreated = false
      console.error(err);
    })
  }
}
