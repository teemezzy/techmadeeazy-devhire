import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFreelancers = createAsyncThunk(
	'freelancer/fetchFreelancers',
	async (fetch = true, { rejectWithValue }) => {
		try {
			const { data } = await axios.get(
				'https://api.terawork.com/service-categories/sellers-services/computer-software-development'
			);
			return data.data.service_search_results.hits;
		} catch (error) {
			return rejectWithValue('An error occurred while fetching freelancers');
		}
	}
);

const initialState = {
	freelancers: [],
	loading: false,
	error: '',
};

const freelancerSlice = createSlice({
	name: 'freelancer',
	initialState,
	reducers: {
		toggleFreelancer: (state, action) => {
			state.freelancers = state.freelancers.map((freelancer) => {
				if (freelancer._source.cust_id === action.payload) {
					freelancer.favorite = !freelancer.favorite;
				}
				return freelancer;
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFreelancers.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchFreelancers.fulfilled, (state, action) => {
				state.freelancers = action.payload.map((freelancer) => ({
					...freelancer,
					favorite: false,
				}));
				state.loading = false;
			})
			.addCase(fetchFreelancers.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});

export const { toggleFreelancer } = freelancerSlice.actions;

export default freelancerSlice.reducer;
