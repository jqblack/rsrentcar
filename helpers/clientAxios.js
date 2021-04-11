import axios from 'axios';

const ClientAxios = axios.create({
  baseURL: 'http://25.31.135.148:8080/API/',
});

export default ClientAxios;
