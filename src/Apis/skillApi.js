import axiosClient from "./axiosClient";

const skillApi = {
  getSkills: async(params) => {
    const url = '/v1/skills/get';
    return axiosClient.post(url, {}, {
      params
    });
  },
  getBySkillCategory: async (params) => {
    const url = '/v1/skills/';
    return axiosClient.get(url, params);
  },
}

export default skillApi;