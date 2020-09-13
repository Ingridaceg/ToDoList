import React, {useState, useEffect} from 'react';
import get from 'lodash/get';

import { List, AddList } from "./components";
import { httpGet } from "./services/rest.api";
import { endPoints } from "./services/constants";

const App = () => {

    const [listItems, setListItems] = useState([]);

    const addListHandler = (listItem) => {
        if (listItem.length > 0) {
            setListItems(prevArray => [...prevArray, listItem]);
        };
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
              <List todolist={listItems}/>
              <AddList onAddItem={addListHandler}/>
          </div>
      </div>
  );
};

export default App;