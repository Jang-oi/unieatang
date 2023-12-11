import axios from 'axios';
import {RequestAxiosTypes} from '../types/axiosTypes';

let BASE_URL_API = 'http://local-permes:3001/V1/API';

/**
 * @param url
 * @param params
 */
export const axiosAPI = (url : string, params: RequestAxiosTypes) => {
    if (url.includes('hyperv')) {
        // BASE_URL_API = 'http://local-permes:3001/';
        return axios.get(url);
    }
    else {
        return axios.create({baseURL: BASE_URL_API}).post(url, {
            ...params,
        });
    }
}