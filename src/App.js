import React, {useState} from 'react';

import {List, AddList} from "./components";

const App = () => {

    const [listItems, setListItems] = useState([]);

    const addListHandler = (listItem) => {
        if (listItem.length > 0) {
            setListItems(prevArray => [...prevArray, listItem]);
        };
    };

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