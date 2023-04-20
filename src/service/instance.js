import axios from 'axios'
export default axios.create({
  baseURL: "https://backend-desafio-05.herokuapp.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
