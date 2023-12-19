import axios from 'axios';
import {RequestAxiosTypes} from '../types/axiosTypes';

let BASE_URL_API = 'http://local-permes:3001/V1/API';

/**
 * @param url
 * @param params
 */
export const axiosAPI = (params: RequestAxiosTypes, url? : string ) => {
    if (url) return axios.get(url);
    else return axios.create({baseURL: BASE_URL_API}).post('/nameservice', {...params});
}