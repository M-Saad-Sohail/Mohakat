import axios from 'axios';

export const getJson = async (url: string) => {
	const response = await axios.get(url);
	return response.data;
};
