import {axiosAPI} from "../utils/axios";
import {useQuery, useMutation} from '@tanstack/react-query';

export const QUERY_KEY_INTERVIEW_QUIZ = '';

export const useInterviewQuizQuery = () => {
    const GET_INTERVIEW_QUIZ = async () => {
        return await axiosAPI({name: 'hyperv', type: 'R'});
        // return await axiosAPI('http://local-prd-proxy:3001/hyperv/connect/init', {name: 'hyperv', type: 'R'});
    };

    return useQuery({
        queryKey: [QUERY_KEY_INTERVIEW_QUIZ],
        queryFn: GET_INTERVIEW_QUIZ,
    });
};

export const useInterviewQuizMutation = (type: string, data: any) => {
    const CREATE_INTERVIEW_ANSWER = async () => {
        return await axiosAPI({
            name: '',
            type,
            data
        });
    };

    return useMutation({
        mutationFn: CREATE_INTERVIEW_ANSWER
    });
}
