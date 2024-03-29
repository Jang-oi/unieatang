import axios from 'axios';
import { RequestAxiosTypes } from '../types/axiosTypes';

const BASE_URL_API = 'http://local-prd-proxy:3001/api/v1/';
// const BASE_URL_API = 'http://local-permes:3001/api/v1/';
// const BASE_URL_API = 'http://localhost:3001/api/v1/';

/**
 * @param url
 * @param params
 */
export const axiosAPI = (params: RequestAxiosTypes, url?: string) => {
  return axios.create({ baseURL: BASE_URL_API }).post('/', { ...params });
};
