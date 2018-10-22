import { observable } from "mobx";

export default class ListModel {
  id = Math.floor(Math.random() * 30);
  @observable name;
  @observable discription;

  constructor(name, discription) {
    this.name = name;
    this.discription = discription;
  }
}
