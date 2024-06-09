import { axiosAPI } from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from '../../utils/commonUits';

export const READ_OTP_LIST = 'READ_OTP_LIST';
export const READ_OTP_DETAIL = 'READ_OTP_DETAIL';
const COLLECTION_NAME = 'otpList';

/**
 * 업체 OTP 조회
 */
export const useOTPListQuery = (params?: any) => {
  const fetcher = async () => {
    // return await axios.post(`${BASE_URL}:3005/generate-otp`, params);
    return await axios.post(`${BASE_URL}:3005/getOtpList`, params);
  };

  return useQuery({
    queryKey: [READ_OTP_LIST],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const useOTPDetailQuery = (params?: any) => {
  const fetcher = async () => {
    return await axios.post(`${BASE_URL}:3005/getOtpList`, params);
  };

  return useQuery({
    queryKey: [READ_OTP_DETAIL],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    },
    refetchOnWindowFocus: false,
  });
};

/*
export const useOTPListQuery = (params?: any) => {
  const fetcher = async () => {
    return await axiosAPI({ name: COLLECTION_NAME, type: 'R', ...params });
  };

  return useQuery({
    queryKey: [READ_OTP_LIST],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    },
  });
};
*/
