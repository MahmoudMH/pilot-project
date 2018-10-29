import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from "mobx-react";
import { observable, computed, action, reaction} from "mobx";
import ListStore from '../../stores/ListStore'
import List from '../List/List';
import ListDescription from '../ListDescription/ListDescription';

import './Home.css';
// this store is the store come from bigstore to use it in the component
let store = new ListStore();

@observer(['store'])
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          lists:[],
          isListClicked: false,
          idList:"",
          isLoading: false
        }
    }
    // this function handle the form submit and setState component when list added immediate
    onSubmit = event => {
      event.preventDefault();
      const nameList = event.target[0].value.trim();
      const description = event.target[1].value.trim();
      store.addList(nameList, description);
      const newList = store.getAllList();
      this.setState({
        lists: [
          ...this.state.lists,
          {
              "id" : this.state.lists.length + 1,
              "name" : event.target[0].value,
              "description": event.target[1].value
          }
        ],
      });
      store.sendDataToServer({
          "name" : event.target[0].value,
          "description": event.target[1].value
      })
      document.getElementsByTagName('form')[0].reset();
    }
    // thin function run when the list is clicked and take the list id from the parent
    onClickList = listId => {
      this.setState({
        idList: listId
      });

      // fetch api for list by id
      fetch('/api/v1/lists/' + listId , {
        method: "GET",
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
      .then(json => {
        this.setState({
          isListClicked: true,
          discriptionList: json
        })
      })
      .catch(err => console.error(err))
    }
    // first function invoked immediately after a component is mounted
    componentDidMount(){
      //fetch api fore show all the lists from dbs
      fetch('/api/v1/lists', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(body => {
          this.setState({
            lists: body
          })
      })
      .catch(err => {
        console.error(err, 'err happened in fetch data in db');
      })
    }
    render(){
      const { isListClicked, idList, lists, discriptionList} = this.state;
      return (
        <div className='homepage'>
          <form onSubmit={this.onSubmit}>
            <input type='text' placeholder="Enter name of the list" required/>
            <input type='text' placeholder="Enter discription of the list" required/>
            <button type='submit'>Add List</button>
          </form>
          <div className='container'>
            <div className='lists'>
              {
                lists.map(list => {
                  return <List id={list.id} name={list.name} onClickList={this.onClickList}/>;
                })
              }
            </div>
            <div className='detail'>
              {
                isListClicked ?
                  <ListDescription id={idList} dataList={discriptionList}/>
                  : (null)
              }
            </div>
          </div>

        </div>
      );
    }

}

export default Home;
