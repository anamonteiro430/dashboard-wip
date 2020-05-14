import axios from "axios";

export const getToken = () => {
  localStorage.getItem("token");
};

export const axiosWithAuth = () => {
  return axios.create({
    // config object
    baseURL: "https://wip-api.herokuapp.com/api/",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
};
