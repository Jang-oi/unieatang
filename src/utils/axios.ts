import axios from 'axios';
import { RequestAxiosTypes } from '../types/axiosTypes';
import { BASE_URL } from './commonUits';

const BASE_URL_API = `${BASE_URL}/api/v1/`;

/**
 * @param url
 * @param params
 */
export const axiosAPI = (params: RequestAxiosTypes, url?: string) => {
  return axios.create({ baseURL: BASE_URL_API }).post('/', { ...params });
};
