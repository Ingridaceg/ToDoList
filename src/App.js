import React, {useState, useEffect} from 'react';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import remove from 'lodash/remove';
import uid from 'uid';
import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/cjs/Button";

import { List, AddList } from "./components";
import {httpDelete, httpGet, httpPut} from "./services/rest.api";
import { endPoints } from "./services/constants";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  
  const [listItems, setListItems] = useState([]);
  const [modalState, setModalState] = useState({
    state: false,
    item: null
  });
  
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
  
  const closeDeleteModal = () => {
    setModalState({
      state: false,
      item: null,
    });
  }
  
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
        if (get(response, "success", null)){
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
    setModalState({
      state: true,
      item: listItem,
    });
  };
  
  const deleteItem = (listItem) => {
     deleteListItems(listItem);
      httpDelete(endPoints.deleteToDo(), listItem)
        .then(response=> {
          if (get(response, "success", null)){
            closeDeleteModal();
          } else {
            setListItems(listItems);
            console.log('error deleting task');
          }
        });
  };
  
  const loadTodos = () => {
    httpGet(endPoints.getToDos())
      .then(response=> {
        if (get(response, "success", null)) {
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
      <Modal show={modalState.state} onHide={closeDeleteModal}>
        <Modal.Body>
          Do you want to delete { get(modalState, 'item.task', '')}
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="primary" onClick={closeDeleteModal} >
            Cancel
          </Button>
          <Button variant="danger" onClick={() => deleteItem(modalState.item)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <h1>To Do List </h1>
      <div>
        <List todolist={listItems} onUpdateItem={updateListHandler} onDeleteItem={deleteListHandler}/>
        <AddList onAddItem={addListHandler}/>
      </div>
    </div>
  );
};

export default App;