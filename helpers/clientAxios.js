import axios from 'axios';

const ClientAxios = axios.create({
  baseURL: 'http://10.0.0.7:8080/rent/',
});

export default ClientAxios;
