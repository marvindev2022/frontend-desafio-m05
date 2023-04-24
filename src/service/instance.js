import axios from 'axios'
 export default axios.create({
  baseURL: "https://backend-desafio-05.herokuapp.com/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
const viaCep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

export {viaCep}