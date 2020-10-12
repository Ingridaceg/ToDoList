import React, { useState, useEffect } from 'react';
import get from 'lodash/get';
import findIndex from 'lodash/findIndex';
import remove from 'lodash/remove';
import uid from 'uid';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/cjs/Button';

import { List, AddList, Alert } from './components';
import { httpDelete, httpGet, httpPut } from './services/rest.api';
import { endPoints } from './services/constants';

import 'bootstrap/dist/css/bootstrap.min.css';
import { states } from './core/constants';

const App = () => {
	const [listItems, setListItems] = useState([]);
	const [modalState, setModalState] = useState({
		state: false,
		item: {},
	});
	const [toDoAlert, setToDoAlert] = useState({
		type: states.undefined,
		text: '',
	});

	const setToDo = (newTask) => {
		httpPut(endPoints.createToDo(), newTask).then((response) => {
			if (get(response, states.success, null)) {
				setToDoAlert({
					type: states.success,
					text: 'task saved',
				});
			} else {
				setListItems(listItems);
				setToDoAlert({
					type: states.error,
					text: 'error saving task',
				});
			}
		});
	};

	const addListHandler = (listItem) => {
		if (listItem.length > 0) {
			const newTask = {
				id: uid(16),
				task: listItem,
				completed: false,
			};
			setListItems((prevArray) => [...prevArray, newTask]);
			setToDo(newTask);
		}
	};

	const closeDeleteModal = () => {
		setModalState({
			state: false,
			item: {},
		});
	};

	const updateListItems = (listItem) => {
		listItem.completed = !listItem.completed;
		const indexToDo = findIndex(listItems, { id: listItem.id });
		const newListItems = [...listItems];
		newListItems.splice(indexToDo, 1, listItem);
		setListItems(newListItems);
	};

	const updateListHandler = (listItem) => {
		updateListItems(listItem);
		httpPut(endPoints.updateToDo(), listItem).then((response) => {
			if (get(response, states.success, null)) {
				setToDoAlert({
					type: states.success,
					text: 'task updated',
				});
			} else {
				setListItems(listItems);
				setToDoAlert({
					type: states.error,
					text: 'error updating task',
				});
			}
		});
	};

	const deleteListItems = (listItem) => {
		const newListItems = [...listItems];
		remove(newListItems, { id: listItem.id });
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
		httpDelete(endPoints.deleteToDo(), listItem).then((response) => {
			if (get(response, states.success, null)) {
				closeDeleteModal();
				setToDoAlert({
					type: states.success,
					text: 'task deleted',
				});
			} else {
				setListItems(listItems);
				setToDoAlert({
					type: states.error,
					text: 'error deleting task',
				});
			}
		});
	};

	const resetAlert = () => {
		setToDoAlert({
			type: states.undefined,
			text: '',
		});
	};

	const loadTodos = () => {
		httpGet(endPoints.getToDos())
			.then((response) => {
				if (get(response, states.success, null)) {
					const myToDos = get(response, 'todos', []);
					setListItems(myToDos);
				}
			})
			.catch((error) => {
				setToDoAlert({
					type: states.error,
					text: { error },
				});
			});
	};

	useEffect(() => {
		loadTodos();
	}, []);

	return (
		<div>
			<Modal show={modalState.state} onHide={closeDeleteModal}>
				<Modal.Body>
					Do you want to delete {get(modalState, 'item.task', '')}
				</Modal.Body>

				<Modal.Footer>
					<Button variant="primary" onClick={closeDeleteModal}>
						Cancel
					</Button>
					<Button variant="danger" onClick={() => deleteItem(modalState.item)}>
						Delete
					</Button>
				</Modal.Footer>
			</Modal>

			<Alert text={toDoAlert.text} type={toDoAlert.type} onHide={resetAlert} />

			<h1>To Do List </h1>
			<div>
				<List
					todolist={listItems}
					onDeleteItem={deleteListHandler}
					onUpdateItem={updateListHandler}
				/>
				<AddList onAddItem={addListHandler} />
			</div>
		</div>
	);
};

export default App;
