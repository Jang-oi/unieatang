import { axiosAPI } from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

export const READ_USER = 'READ_USER';
const COLLECTION_NAME = 'users';

/**
 * 유저정보 조회 쿼리
 */
export const useUserQuery = (params?: any) => {
  const fetcher = async () => {
    return await axiosAPI({ name: COLLECTION_NAME, type: 'R', ...params });
  };

  return useQuery({
    queryKey: [READ_USER],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    },
  });
};

interface UserMutationCbType {
  onSuccessFn: (response: any) => void;
}

interface UserMutationParamType {
  type: string;
  data: any;
}

/**
 * 면접 문제 생성, 삭제, 업데이트 쿼리
 */
export const useUserMutation = ({ onSuccessFn }: UserMutationCbType) => {
  const fetcher = async ({ type, data }: UserMutationParamType) => {
    return await axiosAPI({
      name: COLLECTION_NAME,
      type,
      data,
    });
  };

  return useMutation({
    mutationFn: fetcher,
    onSuccess: (response) => {
      onSuccessFn(response.data);
    },
  });
};
