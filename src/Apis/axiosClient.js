import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: 'http://api.dev.careerladder.today/api/',
  headers: {
    'accept': 'application/json'
  },
  // paramsSerializer: params => {queryString.stringify(params)},
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access-token');
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, (error) => {
  const { config, response } = error;
  if (config.url === "v1/login/test-token") {
    const { data = {} } = response;
    if(data.detail === "Could not validate credentials") {
      window.location.href = window.location.origin + "/login";
    }
  }
  throw error;
});

export default axiosClient;