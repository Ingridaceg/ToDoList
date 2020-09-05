import React, { useState } from 'react';
import get from 'lodash/get';
import Proptypes from 'prop-types';

const AddList = ({ onAddItem }) => {
    const [listItem, setListItem] = useState('');
    
    const enterHandler = (event) => {
        if (event.key === 'Enter') {
            addHandler();
            setListItem('');
        };
    };
    
    const addHandler = () => {
        onAddItem(listItem);
        setListItem('');
    };

    const inputHandler = (event) => {
        const inputValue = get(event, 'target.value', '');
        setListItem(inputValue);

    };

    return (
        <div>
            <input type="text" value={listItem} onChange= {inputHandler} onKeyUp={enterHandler}/>
            <button type="button" onClick={addHandler}>Add</button>
        </div>
    );

};

AddList.propTypes = {
    onAddItem: Proptypes.func.isRequired,
};

export default AddList;
