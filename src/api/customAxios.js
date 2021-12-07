import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:80',
	// headers: {
	//Authorization: 'bearer accessKey',  (토큰 설정 해야함)
	//timeout: 1000
	// },
});

/** 요청 인터셉터 */
axiosInstance.interceptors.request.use(
	// 요청 성공 직전 호출. axios 설정값을 config에 넣게 된다
	(config) => {
		return config;
	},
	// 요청 실패 직전 호출
	(error) => {
		return Promise.reject(error);
	}
);

/** 응답 인터셉터 */
axiosInstance.interceptors.response.use(
	(response) => {
		// 응답 성공 직전(status 200) 호출, .then() 로 이어짐
		console.log(response);
		return response;
	},

	(error) => {
		// 응답 에러 직전 호출, .catch() 로 이어짐
		console.log(error);
		return Promise.reject(error);
	}
);

export default axiosInstance;