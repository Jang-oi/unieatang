import {axiosAPI} from '../../utils/axios';
import {useMutation, useQuery} from '@tanstack/react-query';
import {ResponseAxiosTypes} from '../../types/axiosTypes';

const COLLECTION_NAME = 'interviewQuizSubmit';
export const READ_INTERVIEW_QUIZ_SUBMIT = 'READ_INTERVIEW_QUIZ_SUBMIT';

/**
 * 면접 문제 제출자 조회 쿼리
 */
export const useInterviewQuizSubmitQuery = (params?: any) => {
  const fetcher = async () => {
    return await axiosAPI({name: COLLECTION_NAME, type: 'R', data: params});
  };

  return useQuery({
    queryKey: [READ_INTERVIEW_QUIZ_SUBMIT],
    queryFn: fetcher,
    select: (data) => {
      const responseData: ResponseAxiosTypes = data.data;
      if (responseData.returnErrorMessage) {
        throw responseData.returnErrorMessage;
      } else {
        return responseData.data.tableData;
      }
    }
  });
};

interface InterviewQuizSubmitMutation {
  type: string;
  data: any;
}

interface UseInterviewQuizSubmitMutation {
  onSuccessFn: (response: any) => void;
}

/**
 * 면접 문제 제출 쿼리
 */
export const useInterviewQuizSubmitMutation = ({onSuccessFn}: UseInterviewQuizSubmitMutation) => {
  const fetcher = async ({type, data}: InterviewQuizSubmitMutation) => {
    return await axiosAPI({
      name: COLLECTION_NAME,
      type,
      data
    });
  };

  return useMutation({
    mutationFn: fetcher,
    onSuccess: (response) => {
      onSuccessFn(response.data.data);
    }
  });
};
