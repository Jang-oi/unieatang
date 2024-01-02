import React from 'react';
import {Card, CardContent, Radio, RadioGroup, Typography} from "@mui/joy";
import {useRecoilState} from "recoil";
import {interviewQuizState} from "../../recoil/interviewQuiz/atom";
import {InterviewQuizType} from "../../types/interviewQuizType";

interface saveQuizType {
    [key: string]: string
}

interface QuizProps {
    key: string,
    quizItem: InterviewQuizType,
    quizIndex: number
}

const Quiz = ({quizItem, quizIndex}: QuizProps) => {

    const [interviewSelect, setInterviewSelect] = useRecoilState<saveQuizType>(interviewQuizState);

    const handleRadioChange = (choiceItem: string) => {
        setInterviewSelect({
            ...interviewSelect,
            [quizItem._id]: choiceItem
        });
    };

    const getDefaultValue = () => {
        return interviewSelect[quizItem._id] || '';
    }

    return (
        <Card variant="plain">
            <CardContent>
                <Typography level="h3">{quizIndex + 1}) {quizItem.question}</Typography>
                {quizItem.passage && (<Card size="sm" sx={{width: '50vw', whiteSpace: 'pre-line', minWidth: '400px'}}>{quizItem.passage}</Card>)}
                <RadioGroup sx={{margin: '20px'}} value={getDefaultValue()} id={quizItem._id}>
                    {quizItem.choice.map((choiceItem, choiceIndex) => (
                        <Radio key={choiceIndex} value={choiceItem} variant="outlined" label={choiceItem} onClick={() => {handleRadioChange(choiceItem)}}/>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

export default Quiz;