import {useRecoilState} from 'recoil';

import {interviewQuizState} from '../../recoil/interviewQuiz/atom';
import {InterviewQuizType} from '../../types/interviewQuizType';

import {Card, CardContent, Radio, RadioGroup, Typography} from '@mui/joy';

type saveQuizType = {
  [key: string]: string;
};

type QuizProps = {
  key: string;
  quizItem: InterviewQuizType;
  quizIndex: number;
  forwardedRef: any;
};

const Quiz = ({quizItem, quizIndex, forwardedRef}: QuizProps) => {
  const [interviewSelect, setInterviewSelect] = useRecoilState<saveQuizType[]>(interviewQuizState);

  const handleRadioChange = (choiceItem: string, choiceIndex: number) => {
    const existingDataIndex = interviewSelect.findIndex((item) => item.key === quizItem._id);
    let updatedData;

    if (existingDataIndex !== -1) {
      // 기존 데이터가 존재하면 해당 데이터 업데이트
      updatedData = [...interviewSelect];
      updatedData[existingDataIndex] = {
        key: quizItem._id,
        value: (choiceIndex + 1).toString(),
        text: choiceItem
      };
    } else {
      // 기존 데이터가 없으면 새로운 데이터 추가
      updatedData = [
        ...interviewSelect,
        {
          key: quizItem._id,
          value: (choiceIndex + 1).toString(),
          text: choiceItem
        }
      ];
    }
    setInterviewSelect(updatedData);
  };

  const getDefaultValue = () => {
    const findItem = interviewSelect.find((item) => item.key === quizItem._id);
    return findItem ? findItem['text'] : '';
  };

  return (
    <Card variant="plain" sx={{width: '60vw', backgroundColor: 'white'}}>
      <CardContent>
        <Typography level="h3" ref={(el) => (forwardedRef.current[quizItem._id] = el)}>
          {quizIndex + 1}) {quizItem.question}
        </Typography>
        {quizItem.passage && (
          <Card size="sm" sx={{width: '50vw', whiteSpace: 'pre-line', minWidth: '400px'}}>
            {quizItem.passage}
          </Card>
        )}
        <RadioGroup sx={{margin: '20px'}} value={getDefaultValue()} id={quizItem._id}>
          {quizItem.choice.map((choiceItem, choiceIndex) => (
            <Radio
              key={choiceIndex}
              value={choiceItem}
              variant="outlined"
              label={choiceItem}
              onClick={() => {
                handleRadioChange(choiceItem, choiceIndex);
              }}
            />
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Quiz;
