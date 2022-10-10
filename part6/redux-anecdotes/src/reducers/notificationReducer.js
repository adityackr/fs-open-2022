import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		showNotification(state, action) {
			state = action.payload;
			return state;
		},
		hidNotification() {
			return initialState;
		},
	},
});

export const { showNotification, hidNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
