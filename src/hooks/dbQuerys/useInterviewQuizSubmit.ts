import {axiosAPI} from '../../utils/axios';
import {useMutation} from '@tanstack/react-query';

interface InterviewQuizSubmitMutation {
  type: string;
  data: any;
}

interface UseInterviewQuizSubmitMutation {
  onSuccessFn: (response: any) => void;
}

const COLLECTION_NAME = 'interviewQuizSubmit';
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
    onSuccess: (data) => {
      onSuccessFn(data.data.data);
    }
  });
};
