import {axiosAPI} from "../utils/axios";
import {useQuery} from '@tanstack/react-query';

export const QUERY_KEY_HYPER_V = 'GET_HYPER_V';

export const useHyperVQuery = () => {
    const fetcher = async () => {
        // return await axiosAPI('/hyperv/connect/init', {name: 'hyperv', type: 'R'});
        return await axiosAPI('http://local-prd-proxy:3001/hyperv/connect/init', {name: 'hyperv', type: 'R'});
    };

    return useQuery({
        queryKey: [QUERY_KEY_HYPER_V],
        queryFn: fetcher,
        select: (data) => {
            return data.data;
        },
    });
};