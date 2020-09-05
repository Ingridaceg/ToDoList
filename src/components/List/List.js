import React from 'react';
import Proptypes from 'prop-types';

const List = ({ todolist }) => {

    return (
      <ul>
        
        {todolist.length === 0 && (
          <li>You are Free!!</li>
        )}
        
        {todolist.map((todoItem, key) => (
          <li key={`todoItem_${key}`}>{todoItem}</li>
        ))}
      </ul>
    );
};

List.propTypes = {
  todolist: Proptypes.arrayOf(Proptypes.string),
};

List.defaultProps = {
    todolist: [],
}

export default List;
