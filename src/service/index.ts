import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  headers: {
    "Accept": "*/*",
    key: process.env.NEXT_PUBLIC_ACCESS_KEY,
  },
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default client;
