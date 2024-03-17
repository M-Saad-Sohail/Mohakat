import axios from 'axios';
import api from '@/config/axios';
export const fetchPendingData = async (token: string) => {
	try {
		const response = await api.get(
			'sponsers/pending',
			{
				headers: {
					Authorization: `${token}`,
				},
			},
		);
		console.log('data', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};
export const fetchApprovedData = async (token: string) => {
	try {
		const response = await api.get(
			'sponsers/approved',
			// {
			// 	headers: {
			// 		Authorization: `${token}`,
			// 	},
			// },
		);

		return response.data;
	} catch (error) {
		throw error;
	}
};

export const fetchRejectededData = async (token: string) => {
	try {
		const response = await api.get(
			'sponsers/rejected',
			{
				headers: {
					Authorization: `${token}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const RejectSponsor = async (token: string, id: string) => {
	try {
		const response = await api.put(
			`/admin/reject/sponser/${id}`,
			{},
			{
				headers: {
					Authorization: `${token}`,
				},
			},
		);
		console.log('data', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};
export const RejectDelete = async (token: string, id: string) => {
	try {
		const response = await api.delete(
			`sponsers/rejected/delete/${id}`,
		
			{
				headers: {
					Authorization: `${token}`,
				},
			},
		);
		console.log('data', response.data);
		console.log('sucesssfully delete')
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};
export const RejectDeleteAll = async (token: string) => {
	try {
		const response = await api.delete(
			`sponsers/rejected/delete`,
		
			{
				headers: {
					Authorization: `${token}`,
				},
			},
		);
		console.log('data', response.data);
		console.log('sucesssfully delete all')
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};
export const ApprovedSponsor = async (token: string, id: string) => {
	try {
		const response = await api.put(
			`/admin/approved/sponser/${id}`,
			{
				status: 'approved',
			},
			{
				headers: {
					Authorization: `${token}`,
				},
			},
		);
		console.log('data', response.data);
		return response.data;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};
