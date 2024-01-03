import React, {useState} from 'react';
import {Box, Input, Option, Select, Table, Textarea} from "@mui/joy";
import {
    useInterviewQuizTypeQuery,
    useInterviewQuizQuery,
    useInterviewQuizAnswerMutation, QUERY_KEY_INTERVIEW_QUIZ
} from "../../hooks/useInterviewQuizQuery";
import LoadingComponent from "../common/LoadingComponent";
import {InterviewQuizType} from "../../types/interviewQuizType";
import CrudButtonBox from "./CrudButtonBox";
import {useQueryClient} from "@tanstack/react-query";

interface typeOptionTypes {
    _id: string,
    text: string,
    type: string,
}

export const QuizTable = () => {
    const {isLoading, data} = useInterviewQuizQuery();

    if (isLoading) return <LoadingComponent/>;
    const quizData = data.data.tableData;

    return (
        <Table sx={{mt: '30px', textAlign: 'center', fontSize: '15px', width: '73vw'}} borderAxis="both" size="sm"
               stickyHeader>
            <thead>
            <tr>
                <th>카테고리</th>
                <th>문제</th>
                <th>지문</th>
                <th>점수</th>
                <th>보기</th>
            </tr>
            </thead>
            <tbody>
            {quizData && quizData.map((quizItem: InterviewQuizType) => (
                <tr key={quizItem._id}>
                    <td>{quizItem.type}</td>
                    <td>{quizItem.question}</td>
                    <td><Textarea readOnly variant="plain" value={quizItem?.passage}></Textarea></td>
                    <td>{quizItem.point}</td>
                    <td><Textarea readOnly variant="plain" value={quizItem.choice.join('\n')}></Textarea></td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export const QuizInput = () => {

    const {isLoading, data} = useInterviewQuizTypeQuery();

    const onSuccessFn = () => {
        setQuestion('');
        setPassage('');
        setPoint(0);
        setChoice('');
        setChoiceArray([]);
        setAnswer(0);
        queryClient.invalidateQueries({queryKey : [QUERY_KEY_INTERVIEW_QUIZ]});
        alert('생성 완료');
    }

    const queryClient = useQueryClient();
    const {mutate} = useInterviewQuizAnswerMutation({onSuccessFn});

    const [typeOption, setTypeOption] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [passage, setPassage] = useState<string>('');
    const [point, setPoint] = useState<number>(0);
    const [choice, setChoice] = useState<string>('');
    const [answer, setAnswer] = useState<number>(0);

    const [choiceArray, setChoiceArray] = useState<string []>([]);

    if (isLoading) return <LoadingComponent/>;

    const typeData: typeOptionTypes[] = data.data.tableData;
    const onTypeHandler = (event: any, optionValue: string | null) => {
        if (optionValue) setTypeOption(optionValue);
    }

    const onQuestionHandler = (event: any) => {
        setQuestion(event.currentTarget.value);
    }

    const onPassageHandler = (event: any) => {
        const userInput = event.currentTarget.value;
        setPassage(userInput);
    }

    const onPointHandler = (event: any) => {
        setPoint(event.currentTarget.value);
    }

    const onChoiceHandler = (event: any) => {
        const userInput = event.currentTarget.value;
        setChoice(userInput);
        setChoiceArray(userInput.split('\n').filter(Boolean));
    }

    const onAnswerHandler = (event: any) => {
        setAnswer(event.currentTarget.value);
    }

    const onCreateHandler = () => {
        if (!typeOption || !question || !point || choiceArray.length === 0 || !answer) alert('데이터 확인');
        else {
            mutate({type: 'C', data: {tableData: [{type: typeOption, question, passage, point, choice : choiceArray, answer: answer.toString()}]}});
        }
    }

    return (
        <>
            <Select defaultValue={typeOption} sx={{width: '30vw', mb: '40px'}} onChange={onTypeHandler}
                    placeholder={'카테고리를 선택 해주세요.'}>
                {typeData && typeData.map((optionItem, optionIndex) => (
                    <Option key={optionItem._id} value={optionItem.type}>{optionItem.text}</Option>
                ))}
            </Select>
            <Input sx={{width: '40vw'}} placeholder={"문제를 입력 해주세요."} value={question} onChange={onQuestionHandler}/>
            <Textarea minRows={4} sx={{width: '40vw'}} placeholder={"지문을 입력 해주세요."} value={passage} onChange={onPassageHandler}/>
            <Input sx={{width: '40vw'}} placeholder={"점수를 입력 해주세요."} type={"number"} value={point} onChange={onPointHandler}/>
            <Textarea minRows={4} sx={{width: '40vw'}} placeholder={"보기를 입력 해주세요."} value={choice} onChange={onChoiceHandler}/>
            <Input sx={{width: '40vw'}} placeholder={"정답을 입력 해주세요."} type={"number"} value={answer} onChange={onAnswerHandler}/>
            <Box><CrudButtonBox create={onCreateHandler}/></Box>
        </>
    );
};
