import { axiosAPI } from '../../utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';

export const READ_CUSTOMER_LIST = 'READ_CUSTOMER_LIST';
const COLLECTION_NAME = 'customerList';

/**
 * 업체 리스트 조회 쿼리
 */
export const useCustomerListQuery = () => {
  const fetcher = async () => {
    return await axiosAPI({ name: COLLECTION_NAME, type: 'R' });
  };

  return useQuery({
    queryKey: [READ_CUSTOMER_LIST],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    },
  });
};

interface CustomerListMutationCbType {
  onSuccessFn: (response: any) => void;
}

interface CustomerListMutationParamType {
  type: string;
  data: any;
}

/**
 * 면접 문제 생성, 삭제, 업데이트 쿼리
 */
export const useCustomerListMutation = ({ onSuccessFn }: CustomerListMutationCbType) => {
  const fetcher = async ({ type, data }: CustomerListMutationParamType) => {
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
