import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCurrencies = createAsyncThunk(
	'currency/fetchCurrencies',
	async (fetch = true, { rejectWithValue }) => {
		try {
			const { data } = await axios.get('https://api.terawork.com/resources');
			return data.data.currencies;
		} catch (error) {
			return rejectWithValue('An error occurred while fetching currencies');
		}
	}
);

const initialState = {
	currencies: [
		{
			id: 1,
			name: 'Naira',
			short: 'NGN',
			locale: 'en_NG.UTF-8',
			symbol: '₦',
			divider: '1.00',
			category: 'local',
			regional_default: 1,
			flag_url:
				'https://tera-media.s3-eu-west-1.amazonaws.com/currency-flag/nigeria.png',
		},
	],
	currency: {
		id: 1,
		name: 'Naira',
		short: 'NGN',
		locale: 'en_NG.UTF-8',
		symbol: '₦',
		divider: '1.00',
		category: 'local',
		regional_default: 1,
		flag_url:
			'https://tera-media.s3-eu-west-1.amazonaws.com/currency-flag/nigeria.png',
	},
	
	loading: false,
	error: '',
};

const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setCurrency: (state, action) => {
			const currency = state.currencies.find(
				(curr) => curr.id === action.payload
			);
			state.currency = currency;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCurrencies.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCurrencies.fulfilled, (state, action) => {
				state.currencies = action.payload;
				state.loading = false;
			})
			.addCase(fetchCurrencies.rejected, (state, action) => {
				state.error = action.payload;
				state.loading = false;
			});
	},
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
