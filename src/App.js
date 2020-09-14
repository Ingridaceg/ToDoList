import React, {useState, useEffect} from 'react';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import remove from 'lodash/remove';
import uid from 'uid';

import { List, AddList } from "./components";
import {httpDelete, httpGet, httpPut} from "./services/rest.api";
import { endPoints } from "./services/constants";

const App = () => {
  
  const [listItems, setListItems] = useState([]);
  
  const setToDo = (newTask) => {
    httpPut(endPoints.createToDo(), newTask)
      .then(response=> {
        if (response.success){
          console.log('task saved');
        } else {
          setListItems(listItems);
          console.log('error saving task');
        }
      });
  };
  
  const addListHandler = (listItem) => {
    if (listItem.length > 0) {
      const newTask = {
        id: uid(16),
        task: listItem,
        completed: false,
      }
      setListItems(prevArray => [...prevArray, newTask]);
      setToDo(newTask);
    }
  };
  
  const updateListItems = (listItem) => {
    listItem.completed = !listItem.completed;
    const indexToDo = findIndex(listItems, {id: listItem.id});
    const newListItems = [...listItems];
    newListItems.splice(indexToDo, 1, listItem);
    setListItems(newListItems);
  };
  
  const updateListHandler = (listItem) => {
    updateListItems(listItem);
    httpPut(endPoints.updateToDo(), listItem)
      .then(response=> {
        if (response.success){
          console.log('task updated');
        } else {
          setListItems(listItems);
          console.log('error updating task');
        }
      });
  };
  
  const deleteListItems = (listItem) => {
    const newListItems = [...listItems];
    remove(newListItems, {id: listItem.id});
    setListItems(newListItems);
  };
  
  const deleteListHandler = (listItem) => {
    deleteListItems(listItem);
    httpDelete(endPoints.deleteToDo(), listItem)
      .then(response=> {
        if (response.success){
          console.log('task deleted');
        } else {
          setListItems(listItems);
          console.log('error deleting task');
        }
      });
  };
  
  const loadTodos = () => {
    httpGet(endPoints.getToDos())
      .then(response=> {
        if (response.success) {
          const myToDos = get(response, 'todos', []);
          setListItems(myToDos);
        }
      })
      .catch(error => console.error(error));
  }
  
  useEffect(() => {
    loadTodos();
  },[]);
  
  
  return (
    <div>
      <h1>To Do List </h1>
      <div>
        <List todolist={listItems} onUpdateItem={updateListHandler} onDeleteItem={deleteListHandler}/>
        <AddList onAddItem={addListHandler}/>
      </div>
    </div>
  );
};

export default App;