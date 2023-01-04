import axiosClient from "./axiosClient";

const industryApi = {
  getIndustries: async (params) => {
    const url = `/v1/industries/get?${new URLSearchParams(params)}`;
    return axiosClient.post(url);
  },
  getIndustryById: async (params) => {
    const url = `/v1/industries/`;
    return axiosClient.get(url, {
      params
    });
  },
  create: async (params) => {
    const url = "/v1/industries/";
    return axiosClient.post(url, params);
  },
  update: async (params) => {
    const { industry_id } = params;
    const url = `/v1/industries/${industry_id}`;
    delete params.industry_id;
    return axiosClient.put(url, params);
  },
  delete: async (id) => {
    const url = `/v1/industries/${id}`;
    return axiosClient.delete(url);
  },
};

export default industryApi;
