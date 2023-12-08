import {axiosDB} from "../utils/axios";
import {useMutation, useQuery} from '@tanstack/react-query';
// import {ResponseAxiosTypes} from '../../types/axiosTypes';

export const QUERY_KEY_CALENDAR = 'abc';

export const useCalendarQuery = () => {
    const fetcher = async () => {
        return await axiosDB('holiday', {
            type: 'R',
            data: {
                tableData: [],
                stringData: {}
            }
        });
    };

    return useQuery({
        queryKey: [QUERY_KEY_CALENDAR],
        queryFn: fetcher,
    });
};

export const useCalendarMutation = (type: string, data : any) => {
    const fetcher = async () => {
        return await axiosDB('holiday', {
            type: type,
            data
        });
    };

    return useMutation({
        mutationKey: [QUERY_KEY_CALENDAR],
        // queryFn: fetcher,
    });
}
