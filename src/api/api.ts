import axios from 'axios';
import { responseDataToCamelCase } from '../utils/api';

export const api = axios.create({});

api.interceptors.response.use(responseDataToCamelCase, (error) =>
  Promise.reject(error)
);
