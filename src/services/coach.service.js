// Sitas failas suvalgo Spring endpointus ir leidzia naudoti funkcijose, pagal metodo pavadinimus
import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/coaches");
};

const create = (data) => {
  return httpClient.post("/coaches", data);
};

const get = (id) => {
  return httpClient.get(`/coaches/${id}`);
};

const update = (data, id) => {
  return httpClient.post(`/coaches`, data);
};

const remove = (id) => {
  return httpClient.delete(`/coaches/${id}`);
};
export default { getAll, create, get, update, remove };