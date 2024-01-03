import axios from 'axios';
import {RequestAxiosTypes} from '../types/axiosTypes';

let BASE_URL_API = 'http://local-prd-proxy:3001/api/v1/';
// let BASE_URL_API = 'http://local-permes:3001/api/v1/';

/**
 * @param url
 * @param params
 */
export const axiosAPI = (params: RequestAxiosTypes, url? : string ) => {
    if (url?.includes('hyperv')) {
        return axios.get(url);
    } else {
        return axios.create({baseURL: BASE_URL_API}).post('/', {...params});
    }
}