import React from 'react';

const Notification = ({ message, customClass }) => {
	if (message === null) {
		return null;
	}
	return <div className="notification">{message}</div>;
};

export default Notification;
