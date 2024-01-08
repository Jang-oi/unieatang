import {axiosAPI} from '../../utils/axios';
import {useQuery} from '@tanstack/react-query';
import {useMutation} from '@tanstack/react-query';

export const READ_INTERVIEW_QUIZ = 'READ_INTERVIEW_QUIZ';
const COLLECTION_NAME = 'interviewQuiz';

/**
 * 면접문제 조회 쿼리
 */
export const useInterviewQuizQuery = (params?: any) => {
  const fetcher = async () => {
    return await axiosAPI({name: COLLECTION_NAME, type: 'R', ...params});
  };

  return useQuery({
    queryKey: [READ_INTERVIEW_QUIZ],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    }
  });
};

interface InterviewQuizMutationCbType {
  onSuccessFn: () => void;
}

interface InterviewQuizMutationParamType {
  type: string;
  data: any;
}

/**
 * 면접 문제 생성, 삭제, 업데이트 쿼리
 */
export const useInterviewQuizMutation = ({onSuccessFn}: InterviewQuizMutationCbType) => {
  const fetcher = async ({type, data}: InterviewQuizMutationParamType) => {
    return await axiosAPI({
      name: COLLECTION_NAME,
      type,
      data
    });
  };

  return useMutation({
    mutationFn: fetcher,
    onSuccess: () => {
      onSuccessFn();
    }
  });
};
