import Alert from 'react-bootstrap/cjs/Alert';
import Proptypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { states } from '../../core/constants';

const ToDoAlert = ({ type, text, onHide }) => {
	const color =
		type === states.error
			? 'danger'
			: type === states.success
			? 'success'
			: 'dark';
	const [show, setShow] = useState(false);

	const executeToDoAlert = () => {
		if (text && text.length > 0) {
			setShow(true);
			setTimeout(() => {
				setShow(false);
				onHide();
			}, 2000);
		}
	};

	useEffect(() => {
		executeToDoAlert();
	}, [text]);

	return (
		<Alert show={show} variant={color}>
			{text}
		</Alert>
	);
};

ToDoAlert.propTypes = {
	onHide: Proptypes.func.isRequired,
	text: Proptypes.string.isRequired,
	type: Proptypes.string.isRequired,
};

export default ToDoAlert;
