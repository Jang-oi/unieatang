import {axiosAPI} from '../../utils/axios';
import {useQuery, useMutation} from '@tanstack/react-query';

export const READ_HOLIDAY = 'READ_HOLIDAY';
const COLLECTION_NAME = 'holiday';

/**
 * 공휴일 조회 쿼리
 */
export const useHolidayQuery = () => {
  const fetcher = async () => {
    return await axiosAPI({name: COLLECTION_NAME, type: 'R'});
  };

  return useQuery({
    queryKey: [READ_HOLIDAY],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    }
  });
};

interface HolidayMutationCbType {
  onSuccessFn: (response: any) => void;
}

interface HolidayMutationParamType {
  type: string;
  data: any;
}
/**
 * 공휴일 생성, 삭제, 업데이트 쿼리
 */
export const useHolidayMutation = ({onSuccessFn}: HolidayMutationCbType) => {
  const fetcher = async ({type, data}: HolidayMutationParamType) => {
    return await axiosAPI({
      name: COLLECTION_NAME,
      type,
      data
    });
  };

  return useMutation({
    mutationFn: fetcher,
    onSuccess: (response) => {
      onSuccessFn(response.data);
    }
  });
};
