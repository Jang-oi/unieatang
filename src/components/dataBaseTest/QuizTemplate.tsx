import {useEffect, useState} from 'react';
import {useQueryClient} from '@tanstack/react-query';

import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import {useInterviewQuizQuery, READ_INTERVIEW_QUIZ, useInterviewQuizMutation} from '../../hooks/dbQuerys/useInterviewQuiz';
import {InterviewQuizType} from '../../types/interviewQuizType';
import {useInterviewQuizTypesQuery} from '../../hooks/dbQuerys/useInterviewQuizTypes';
import {userSettingState} from '../../recoil/settings/atom';
import {interviewQuizCRUDModalState} from '../../recoil/db/atom';

import {Box, Button, DialogTitle, Input, Modal, ModalDialog, Option, Select, Stack, Table, Textarea} from '@mui/joy';

import LoadingComponent from '../common/LoadingComponent';

const QuizTable = () => {
  const setQuizCURDModal = useSetRecoilState(interviewQuizCRUDModalState);
  const {isLoading, data} = useInterviewQuizQuery({option: 'a'});

  if (isLoading) return <LoadingComponent />;
  const quizData = data.data.tableData;

  return (
    <>
      <Table sx={{mt: '30px', textAlign: 'center', fontSize: '15px', width: '73vw'}} borderAxis="both" size="sm" stickyHeader>
        <thead>
          <tr>
            <th style={{width: '10%'}}>카테고리</th>
            <th style={{width: '20%'}}>문제</th>
            <th style={{width: '30%'}}>지문</th>
            <th style={{width: '5%'}}>점수</th>
            <th style={{width: '30%'}}>보기</th>
            <th style={{width: '5%'}}>정답</th>
          </tr>
        </thead>
        <tbody>
          {quizData &&
            quizData.map((quizItem: InterviewQuizType) => (
              <tr key={quizItem._id}>
                <td>{quizItem.type}</td>
                <td style={{color: '#0079F4', cursor: 'pointer'}} onClick={() => setQuizCURDModal({createMode: false, showModal: true, quizData: quizItem})}>
                  {quizItem.question}
                </td>
                <td>
                  <Textarea readOnly variant="plain" sx={{backgroundColor: 'white'}} value={quizItem?.passage}></Textarea>
                </td>
                <td>{quizItem.point}</td>
                <td>
                  <Textarea readOnly variant="plain" sx={{backgroundColor: 'white'}} value={quizItem.choice.join('\n')}></Textarea>
                </td>
                <td>{quizItem.answer}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <QuizCRUDModal />
    </>
  );
};

type QuizOptionTypes = {
  _id: string;
  text: string;
  type: string;
};

const QuizCRUDModal = () => {
  const {color} = useRecoilValue(userSettingState);
  const {isLoading, data} = useInterviewQuizTypesQuery();
  const [quizCURDModal, setQuizCURDModal] = useRecoilState(interviewQuizCRUDModalState);

  const queryClient = useQueryClient();
  const onSuccessFn = (response: any) => {
    setQuizCURDModal({createMode: false, showModal: false, quizData: {}});
    queryClient.invalidateQueries({queryKey: [READ_INTERVIEW_QUIZ]});
    alert(response.returnMessage);
  };
  const {createMode, showModal, quizData} = quizCURDModal as any;
  const {mutate} = useInterviewQuizMutation({onSuccessFn});

  const [typeOption, setTypeOption] = useState<string>();
  const [question, setQuestion] = useState<string>('');
  const [passage, setPassage] = useState<string>('');
  const [point, setPoint] = useState<number>();
  const [choice, setChoice] = useState<string>('');
  const [answer, setAnswer] = useState<number>();
  const [choiceArray, setChoiceArray] = useState<string[]>([]);

  useEffect(() => {
    if (quizData) {
      setQuestion(quizData.question || '');
      setPassage(quizData.passage || '');
      setPoint(quizData.point || 0);
      setChoice(quizData.choice ? quizData.choice.join('\n') : []);
      setAnswer(quizData.answer || '');
      setTypeOption(quizData.type || '');
    }
  }, [quizData]);

  if (isLoading) return <LoadingComponent />;

  const typeData: QuizOptionTypes[] = data.data.tableData;
  const onTypeHandler = (event: any, optionValue: string | null) => {
    if (optionValue) setTypeOption(optionValue);
  };

  const onQuestionHandler = (event: any) => {
    setQuestion(event.currentTarget.value);
  };

  const onPassageHandler = (event: any) => {
    const userInput = event.currentTarget.value;
    setPassage(userInput);
  };

  const onPointHandler = (event: any) => {
    setPoint(event.currentTarget.value);
  };

  const onChoiceHandler = (event: any) => {
    const userInput = event.currentTarget.value;
    setChoice(userInput);
    setChoiceArray(userInput.split('\n').filter(Boolean));
  };

  const onAnswerHandler = (event: any) => {
    setAnswer(event.currentTarget.value);
  };

  const onQuizCreateHandler = () => {
    if (!typeOption || !question || !point || choiceArray.length === 0 || !answer) alert('데이터 확인');
    else {
      const type = typeData.find((typeItem) => typeItem.text === typeOption)?.type;
      mutate({
        type: 'C',
        data: {
          tableData: [
            {
              type,
              question,
              passage,
              point,
              choice: choiceArray,
              answer: answer.toString()
            }
          ]
        }
      });
    }
  };

  const onQuizDeleteHandler = () => {
    mutate({
      type: 'D',
      data: {
        tableData: [
          {
            id: quizData._id
          }
        ]
      }
    });
  };
  const onQuizUpdateHandler = () => {};

  const buttonRender = () => {
    if (createMode) {
      return (
        <Button type="submit" color={color} id={'create'} onClick={onQuizCreateHandler}>
          Create
        </Button>
      );
    } else {
      return (
        <>
          {/*          <Button type="submit" color={color} id={'update'} onClick={onQuizUpdateHandler}>
            Update
          </Button>*/}
          <Button type="submit" color={color} id={'delete'} onClick={onQuizDeleteHandler}>
            Delete
          </Button>
        </>
      );
    }
  };

  return (
    <Modal open={showModal} onClose={() => setQuizCURDModal({...quizCURDModal, showModal: false})}>
      <ModalDialog>
        <DialogTitle>{createMode ? '문제 추가' : '문제 수정 및 삭제'}</DialogTitle>
        <Stack spacing={2}>
          <Select value={typeOption} sx={{width: '30vw', mb: '40px'}} onChange={onTypeHandler} placeholder={'카테고리를 선택 해주세요.'}>
            {typeData &&
              typeData.map((optionItem, optionIndex) => (
                <Option key={optionItem._id} value={optionItem.text}>
                  {optionItem.text}
                </Option>
              ))}
          </Select>
          <Input sx={{width: '40vw'}} placeholder={'문제를 입력 해주세요.'} value={question} onChange={onQuestionHandler} />
          <Textarea minRows={4} sx={{width: '40vw'}} placeholder={'지문을 입력 해주세요.'} value={passage} onChange={onPassageHandler} />
          <Input sx={{width: '40vw'}} placeholder={'점수를 입력 해주세요.'} type={'number'} value={point} onChange={onPointHandler} />
          <Textarea
            minRows={4}
            sx={{width: '40vw'}}
            placeholder={'보기를 입력 해주세요.\n보기는 엔터로 구분 지어 입력합니다. \nex)\n 16비트 \n 12비트\n 8비트 ...'}
            value={choice}
            onChange={onChoiceHandler}
          />
          <Input sx={{width: '40vw'}} placeholder={'정답을 입력 해주세요.'} type={'number'} value={answer} onChange={onAnswerHandler} />
          <Box sx={{display: 'flex', gap: 3, justifyContent: 'left', marginTop: '20px'}}>{buttonRender()}</Box>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

const QuizTemplate = () => {
  const {color} = useRecoilValue(userSettingState);
  const setQuizCURDModal = useSetRecoilState(interviewQuizCRUDModalState);

  return (
    <>
      <Button
        color={color}
        id={'create'}
        onClick={() => {
          setQuizCURDModal({createMode: true, showModal: true, quizData: {}});
        }}
      >
        Create
      </Button>
      <QuizTable />
      <QuizCRUDModal />
    </>
  );
};

export default QuizTemplate;
