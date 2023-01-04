import axiosClient from "./axiosClient";

const careerTrackApi = {
  getByIndustry: async (params) => {
    const url = "/v1/career-tracks/get-by-industry";
    return axiosClient.post(url, {}, {params});
  },
  getByUser: async (params) => {
    const url = "/v1/career-tracks/get-by-user";
    return axiosClient.post(url, {}, {params});
  },
  getById: async (params) => {
    const url = "/v1/career-tracks/";
    return axiosClient.get(url, {params});
  },
  create: async (params) => {
    const url = "/v1/career-tracks/";
    return axiosClient.post(url, params);
  },
  update: async (params) => {
    const url = `v1/career-tracks`;
    return axiosClient.post(url, params);
  },
  delete: async (id) => {
    const url = `/v1/career-tracks/${id.replace("#", "%23")}`;
    return axiosClient.delete(url);
  },
  getCareerTrackSkill: async (params) => {
    const url = `/v1/career-tracks/`;
    return axiosClient.get(url, params);
  }
};

export default careerTrackApi;
