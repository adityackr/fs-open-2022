import React from 'react';

const Notification = ({ message, customClass }) => {
	if (message === null) {
		return null;
	}
	return <div className={customClass}>{message}</div>;
};

export default Notification;
