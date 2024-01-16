import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const READ_HYPER_V_LIST = 'READ_HYPER_V_LIST';

/**
 * HYPER-V 사용자 List 조회
 */
export const useHyperVQuery = () => {
  const fetcher = async () => {
    return await axios.get('http://local-prd-proxy:3001/hyperv/connect/init');
  };

  return useQuery({
    queryKey: [READ_HYPER_V_LIST],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    },
  });
};
