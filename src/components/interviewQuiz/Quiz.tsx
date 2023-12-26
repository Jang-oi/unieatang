import React from 'react';
import {Card, CardContent, Radio, RadioGroup, Typography} from "@mui/joy";
import {useRecoilState, useResetRecoilState} from "recoil";
import {interviewQuizState} from "../../recoil/interviewQuiz/atom";
import {InterviewQuizType} from "../../types/interviewQuizType";

interface quizType {
    quizIndex: number,
    choiceIndex: number,
    choiceItem: string
}

interface saveQuizType {
    [key: string]: quizType
}

interface QuizProps {
    quizItem: InterviewQuizType,
    quizIndex: number
}

const Quiz = ({quizItem, quizIndex} : QuizProps) => {

    const [interviewSelect, setInterviewSelect] = useRecoilState<saveQuizType>(interviewQuizState);
    const resetInterviewSelect = useResetRecoilState(interviewQuizState);

    const handleRadioChange = (quizObject: quizType) => {
        const {quizIndex, choiceIndex, choiceItem} = quizObject;
        setInterviewSelect({
            ...interviewSelect,
            [quizIndex]: {
                choiceIndex,
                choiceItem
            }
        });
    };


    const getDefaultValue = (quizIndex: number) => {
        return interviewSelect[quizIndex] ? interviewSelect[quizIndex]['choiceItem'] : '';
    }

    return (
        <Card variant="plain" key={quizIndex}>
            <CardContent>
                <Typography level="h3">{quizIndex + 1}) {quizItem.question}</Typography>
                {quizItem.passage && (<Card size="md" sx={{width: '30vw'}}>{quizItem.passage}</Card>)}
                <RadioGroup sx={{margin: '20px'}} value={getDefaultValue(quizIndex)}>
                    {quizItem.choice.map((choiceItem, choiceIndex) => (
                        <Radio key={choiceIndex} value={choiceItem} variant="outlined" label={choiceItem}
                               onClick={() => {
                                   handleRadioChange({quizIndex, choiceIndex, choiceItem})
                               }}/>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default Quiz;