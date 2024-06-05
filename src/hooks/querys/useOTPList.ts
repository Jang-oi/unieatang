import { axiosAPI } from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const READ_OTP_LIST = 'READ_OTP_LIST';
// const COLLECTION_NAME = 'customerList';

/**
 * 업체 리스트 조회 쿼리
 */
export const useOTPListQuery = () => {
  const fetcher = async () => {
    return await axios.post('http://localhost:3005/generate-otp');
  };

  return useQuery({
    queryKey: [READ_OTP_LIST],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    },
  });
};
