import {axiosAPI} from "../utils/axios";
import {useQuery, useMutation} from '@tanstack/react-query';

export const QUERY_KEY_INTERVIEW_QUIZ = 'INTERVIEW_QUIZ';
export const QUERY_KEY_INTERVIEW_QUIZ_TYPE = 'INTERVIEW_QUIZ_TYPE';

export const useInterviewQuizQuery = () => {
    const GET_INTERVIEW_QUIZ = async () => {
        return await axiosAPI({name: 'interviewQuiz', type: 'R'});
    };

    return useQuery({
        queryKey: [QUERY_KEY_INTERVIEW_QUIZ],
        queryFn: GET_INTERVIEW_QUIZ,
        select: (data) => {
            return data.data;
        }
    });
};

export const useInterviewQuizTypeQuery = () => {
    const READ_INTERVIEW_QUIZ_TYPE = async () => {
        return await axiosAPI({name: 'interviewQuizTypes', type: 'R'});
    };

    return useQuery({
        queryKey: [QUERY_KEY_INTERVIEW_QUIZ_TYPE],
        queryFn: READ_INTERVIEW_QUIZ_TYPE,
        select: (data) => {
            return data.data;
        }
    });
}

interface UseInterviewQuizAnswerMutation {
    onSuccessFn: () => void
}

interface InterviewQuizAnswerMutation {
    type: string,
    data: any
}

export const useInterviewQuizAnswerMutation = ({onSuccessFn}: UseInterviewQuizAnswerMutation) => {
    const CREATE_INTERVIEW_ANSWER = async ({type, data}: InterviewQuizAnswerMutation) => {

        return await axiosAPI({
            name: 'interviewQuiz',
            type,
            data
        });
    };

    return useMutation({
        mutationFn: CREATE_INTERVIEW_ANSWER,
        onSuccess: () => {
            onSuccessFn();
        }
    });
}
