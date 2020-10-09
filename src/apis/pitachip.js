import axios from "axios";

const pitachip = axios.create({
	baseURL: process.env.REACT_APP_API_ENDPOINT,
});

pitachip.interceptors.response.use(
	function (response) {
		return response.data;
	},
	function (error) {
		return Promise.reject(error.response.data.error);
	}
);

export default pitachip;
