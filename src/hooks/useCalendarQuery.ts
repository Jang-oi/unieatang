import {useMutation, useQuery} from '@tanstack/react-query';
import {axiosAPI} from '../utils/axios';
// import {ResponseAxiosTypes} from '../../types/axiosTypes';

export const QUERY_KEY_CALENDAR = 'abc';

export const useCalendarQuery = () => {
  const fetcher = async () => {
    return await axiosAPI({
      name: 'holiday',
      type: 'R',
      data: {
        tableData: []
      }
    });
  };

  return useQuery({
    queryKey: [QUERY_KEY_CALENDAR],
    queryFn: fetcher
  });
};

export const useCalendarMutation = (type: string, data: any) => {
  const fetcher = async () => {
    return await axiosAPI({
      name: 'abc',
      type: type,
      data
    });
  };

  return useMutation({
    mutationKey: [QUERY_KEY_CALENDAR]
    // queryFn: fetcher,
  });
};
