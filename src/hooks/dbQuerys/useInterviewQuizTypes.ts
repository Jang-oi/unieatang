import { axiosAPI } from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';

export const READ_INTERVIEW_QUIZ_TYPE = 'READ_INTERVIEW_QUIZ_TYPE';
const COLLECTION_NAME = 'interviewQuizTypes';

/**
 * 면접 문제 타입에 대한 쿼리
 * EX) 운영체제, Javascript, Java ... 등
 */
export const useInterviewQuizTypesQuery = () => {
  const fetcher = async () => {
    return await axiosAPI({ name: COLLECTION_NAME, type: 'R' });
  };

  return useQuery({
    queryKey: [READ_INTERVIEW_QUIZ_TYPE],
    queryFn: fetcher,
    select: (data) => {
      return data.data;
    },
  });
};
