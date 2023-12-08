import {axiosAPI} from "../utils/axios";
import {useQuery} from '@tanstack/react-query';

export const QUERY_KEY_CALENDAR = 'cc';

export const useHyperVQuery = () => {
    const fetcher = async () => {
        const response = await axiosAPI('/hyperv/connect/update');
        return response.data.data;
    };

    return useQuery({
        queryKey: [QUERY_KEY_CALENDAR],
        queryFn: fetcher
    });
};