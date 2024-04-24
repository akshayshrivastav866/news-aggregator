// slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from '../apis/settings';
import { AppThunk } from './store';

interface State {
	loading: boolean;
	data: any[];
	error: string | null;
}

const initialState: State = {
	loading: true,
	data: [],
	error: null
};

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {
		fetchDataRequest(state) {
			state.loading = true;
			state.error = null;
		},
		fetchDataSuccess(state, action: PayloadAction<any[]>) {
			state.loading = false;
			state.data = action.payload;
			state.error = null;
		},
		fetchDataFailure(state, action: PayloadAction<string>) {
			state.loading = false;
			state.error = action.payload;
		}
	}
});

export const { fetchDataRequest, fetchDataSuccess, fetchDataFailure } = dataSlice.actions;

export const fetchDataWithKeyword = (keyword: string): AppThunk => async (dispatch) => {
	dispatch(fetchDataRequest());

	try {
		if (keyword.trim() === '') {
			dispatch(fetchDataSuccess([]));
		} else {
			const response = await axios.get(`/getSearchedResults?query=${keyword}`);
			dispatch(fetchDataSuccess(response.data));
		}
	} catch (err) {
		dispatch(fetchDataFailure(err.message));
	}
};

export default dataSlice.reducer;
