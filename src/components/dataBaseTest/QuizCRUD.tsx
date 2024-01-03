import React from 'react';
import {Input, Table} from "@mui/joy";
import {useInterviewQuizQuery} from "../../hooks/useInterviewQuizQuery";
import LoadingComponent from "../common/LoadingComponent";
import {InterviewQuizType} from "../../types/interviewQuizType";

export const QuizTable = () => {
    const query = useInterviewQuizQuery();

    if (query.isLoading) return <LoadingComponent/>;
    const quizData = query.data;

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
                    <td>{quizItem?.passage}</td>
                    <td>{quizItem.point}</td>
                    <td>{quizItem.choice}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}

export const QuizInput = () => {
    return (
        <>
            <Input required type={'number'}/>
            <Input required type={'number'}/>
            <Input required type={'number'}/>
            <Input required type={'number'}/>
            <Input required type={'number'}/>
            <Input required type={'number'}/>
        </>
    );
};
