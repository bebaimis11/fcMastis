// Sitas failas suvalgo Spring endpointus ir leidzia naudoti funkcijose, pagal metodo pavadinimus
import httpClient from "../http-common";

const getAll = () => {
  return httpClient.get("/players");
};

const create = (data) => {
  return httpClient.post("/players", data);
};

const get = (id) => {
  return httpClient.get(`/players/${id}`);
};

const update = (data) => {
  return httpClient.post(`/players`, data);
};

// const update = (data, id) => {
//   return httpClient.put(`/players/${id}`, data);
// };

const remove = (id) => {
  return httpClient.delete(`/players/${id}`);
};
export default { getAll, create, get, update, remove };
