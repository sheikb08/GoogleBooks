import axios from "axios";
// All routes should follow the pattern 'API.searchtype.CRUDrequest'.
// Creating an axios instance - more config params can  be added, for now baseURL makes code DRY.
const API = axios.create({
  baseURL: "/api",
  // headers: { "Content-Type": "application/json" },
});


const server = {
  searchDB: (query) => API.get("/db/books", { params: { q: query } }),
  get: (id) => API.get(`/db/book/${id}`),
  post: (data) => API.post("/db/book", data),
  update: (id, data) => API.put(`/db/book/${id}`, data),
  delete: (id) => API.delete(`/db/book/${id}`),
};

const web = {
  // The getBooks method retrieves books from the server
// It accepts a "query" or term to search the book api for
  getBooks: (query) => API.get("/web/books/", { params: { q: query } }),
  getOne: (query) => API.get("/web/book/", { params: { selfLink: query } }),
};

export default {
  server,
  web
};