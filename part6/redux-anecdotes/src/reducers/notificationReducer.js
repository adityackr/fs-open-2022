import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		showNotification(state, action) {
			state = action.payload;
			return state;
		},
		hidNotification(state, action) {
			state = initialState;
			return state;
		},
	},
});

export const { showNotification, hidNotification } = notificationSlice.actions;

let timeoutId = null;

export const setNotiFication = (message, time) => {
	return async (dispatch) => {
		dispatch(showNotification(message));

		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => dispatch(hidNotification()), time);
	};
};

export default notificationSlice.reducer;
