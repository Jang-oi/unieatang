import {axiosAPI} from '../utils/axios';
import {useQuery} from '@tanstack/react-query';

export const QUERY_KEY_HYPER_V = 'GET_HYPER_V';

export const useHyperVQuery = () => {
  const fetcher = async () => {
    return await axiosAPI({name: 'hyperv', type: 'R'}, 'http://local-prd-proxy:3001/hyperv/connect/init');
  };

  return useQuery({
    queryKey: [QUERY_KEY_HYPER_V],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    }
  });
};
