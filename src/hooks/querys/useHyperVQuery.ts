import {axiosAPI} from '../../utils/axios';
import {useQuery} from '@tanstack/react-query';

export const READ_HYPER_V_LIST = 'READ_HYPER_V_LIST';

/**
 * HYPER-V 사용자 List 조회
 */
export const useHyperVQuery = () => {
  const fetcher = async () => {
    return await axiosAPI({name: 'hyperv', type: 'R'}, 'http://local-prd-proxy:3001/hyperv/connect/init');
  };

  return useQuery({
    queryKey: [READ_HYPER_V_LIST],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    }
  });
};
