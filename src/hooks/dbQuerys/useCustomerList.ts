import {axiosAPI} from '../../utils/axios';
import {useQuery} from '@tanstack/react-query';

export const READ_CUSTOMER_LIST = 'READ_CUSTOMER_LIST';
const COLLECTION_NAME = 'customerList';

/**
 * 업체 리스트 조회 쿼리
 */
export const useCustomerListQuery = () => {
  const fetcher = async () => {
    return await axiosAPI({name: COLLECTION_NAME, type: 'R'});
  };

  return useQuery({
    queryKey: [READ_CUSTOMER_LIST],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    }
  });
};
