import axios from 'axios';
import {RequestAxiosTypes} from '../types/axiosTypes';

const BASE_URL_API = 'http://local-permes:3001/V1/API';
const BASE_URL_DB = 'http://local-permes:3001/db';

export const axiosAPI = (url : string) => {
    return axios.create({baseURL: BASE_URL_API}).get(url);
}

/**
 * @param name
 * @param params
 */
export const axiosDB = (name: string, params: RequestAxiosTypes) => {
    return axios.create({baseURL: BASE_URL_DB}).post('', {
        ...params,
        name,
    });
};