import { param } from "jquery";
import axiosClient from "./axiosClient";

const userApi = {
  login: async (params) => {
    const url = '/v1/login/access-token/';
    const { username, password } = params;
    let body = new URLSearchParams({
      username, password
    })
    const result = await axiosClient.post(url, body);
    return result;
  },

  register: async (params) => {
    const url = '/v1/users/open';
    const { name, email, password } = params;
    const result = await axiosClient.post(url, {name, email, password});
    return result;
  },

  getCurrentUser: async () => {
    const url = '/v1/users/current/me';
    const result = await axiosClient.get(url);
    return result;
  },

  testToken: async () => {
    const url = 'v1/login/test-token';
    return axiosClient.post(url, "");
  }

  
}

export default userApi;