import React from 'react';
import Proptypes from 'prop-types';

const List = ({ todolist }) => {

    return (
      <ul>
        
        {todolist.length === 0 && (
          <li>You are Free!!</li>
        )}
        
        {todolist.map((todoItem) => (
          <li key={`todoItem_${todoItem.id}`}>{todoItem.task}</li>
        ))}
      </ul>
    );
};

List.propTypes = {
  todolist: Proptypes.arrayOf(Proptypes.shape({
    id: Proptypes.string,
    task: Proptypes.string,
  })),
};

List.defaultProps = {
    todolist: [],
}

export default List;
