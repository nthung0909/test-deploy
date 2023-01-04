import axiosClient from "./axiosClient";

const skillCategoryApi = {
  get: async (params) => {
    const url = '/v1/skill-categories/get';
    const result = await axiosClient.post(url, {}, {params});
    return result;
  },
}

export default skillCategoryApi;