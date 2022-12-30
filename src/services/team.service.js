import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/teams");
};

const create = (data) => {
  return httpClient.post("/teams", data);
};

const get = (id) => {
  return httpClient.get(`/teams/${id}`);
};

const update = (data, id) => {
  console.log(id)
  return httpClient.post(`/teams/${id}`, data);
};

const remove = (id) => {
  return httpClient.delete(`/teams/${id}`);
};
export default { getAll, create, get, update, remove };