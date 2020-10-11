import React from 'react';
import Proptypes from 'prop-types';
const List = ({ todolist, onUpdateItem, onDeleteItem }) => {
  
  return (
    <ul>
    
      {todolist.length === 0 && (
        <li>You are Free!!</li>
      )}
    
      {todolist.map((todoItem) => (
        <li key={`todoItem_${todoItem.id}`}>{todoItem.task}
          <input
            checked={todoItem.completed}
            id="completed"
            name="completed"
            type="checkbox"
            onChange={() => onUpdateItem(todoItem)}
          />
          <img src= "images/delete.svg"
               height= "18"
               alt="delete"
               style={{cursor: "pointer"}}
               onClick={() => onDeleteItem(todoItem)}/>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  todolist: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string,
    task: Proptypes.string,
    completed: Proptypes.bool,
  })),
  onUpdateItem: Proptypes.func.isRequired,
  onDeleteItem: Proptypes.func.isRequired,
};

List.defaultProps = {
  todolist: [],
}

export default List;
