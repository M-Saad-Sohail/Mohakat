import axios from 'axios';

export const getJson = async (url: string) => {
	const response = await axios.get(url);
	return response.data;
};

export const postJson = async (url: string, body: any, token?: any) => {
	const response = await axios.post(url, body ,{
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `${token}`
		  }
	});
	return response.data;
};

export const putJson = async (url: string, body: any) => {
	const response = await axios.put(url, body ,{
		headers: {
			'Content-Type': 'application/json',
		  }
	});
	return response.data;
};
