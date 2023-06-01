import axios from "axios";
import store from "../store";

const axiosClient = axios.create({
	baseURL: "https://movienew.cybersoft.edu.vn/api/",
	headers: {
		TokenCybersoft:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlanMgMzAiLCJIZXRIYW5TdHJpbmciOiIxMi8xMC8yMDIzIiwiSGV0SGFuVGltZSI6IjE2OTcwNjg4MDAwMDAiLCJuYmYiOjE2NzkyNDUyMDAsImV4cCI6MTY5NzIxNjQwMH0.zHBe1xuPzYEovj4ort--O3_1lX_L3XKX4XgpI4soOUM",
	},
});

axiosClient.interceptors.request.use((config) => {
	const { accessToken } = store.getState().auth.user || {};

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		return response.data.content;
	},
	(error) => {
		return Promise.reject(error.response?.data.content);
	}
);

export default axiosClient;
