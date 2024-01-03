import {axiosAPI} from "../utils/axios";
import {useQuery} from '@tanstack/react-query';

export const QUERY_KEY_CUSTOMER_LIST = 'CUSTOMER_LIST';

export const useCustomerListQuery = () => {
    const GET_CUSTOMER_LIST = async () => {
        return await axiosAPI({name: 'customerList', type: 'R'});
    };

    return useQuery({
        queryKey: [QUERY_KEY_CUSTOMER_LIST],
        queryFn: GET_CUSTOMER_LIST,
        select : (data) => {
            return data.data;
        }
    });
};
