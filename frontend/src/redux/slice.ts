// slice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../apis/settings';
import { AppThunk } from './store';

interface DataResponse {
  data: any[];
}
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

export const fetchDataWithKeyword = createAsyncThunk<DataResponse, string>(
	'/fetchDataWithKeyword',
	async (keyword: string, { rejectWithValue }) => {
		try {
			if (keyword.trim() === '') {
				return [];
			}

			const response = await axios.get(`/getSearchedResults?query=${keyword}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchDefaultData = createAsyncThunk<DataResponse, void>(
	'/fetchDefaultData',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get('/getDefaultFeeds');
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const dataSlice = createSlice({
	name: 'data',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDataWithKeyword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchDataWithKeyword.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchDataWithKeyword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			})
			.addCase(fetchDefaultData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchDefaultData.fulfilled, (state, action) => {
				state.loading = false;
				state.data = action.payload;
			})
			.addCase(fetchDefaultData.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload as string;
			});
	},
});

export default dataSlice.reducer;
