import { Fragment, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { useInterviewQuizQuery } from '../../hooks/dbQuerys/useInterviewQuiz';
import { useInterviewQuizSubmitMutation } from '../../hooks/dbQuerys/useInterviewQuizSubmit';

import { userSettingState } from '../../recoil/settings/atom';
import { interviewQuizState } from '../../recoil/interviewQuiz/atom';
import { InterviewQuizType } from '../../types/interviewQuizType';

import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography,
  Divider,
} from '@mui/joy';
import TouchAppIcon from '@mui/icons-material/TouchApp';

import Quiz from './Quiz';
import LoadingComponent from '../common/LoadingComponent';
import { snackbarState } from '../../recoil/snackbar/atom';
import { SnackbarType } from '../common/UniSnackbar';

export default function InterviewQuiz() {
  const { themeColor } = useRecoilValue(userSettingState);
  const interviewSelect = useRecoilValue(interviewQuizState);
  const resetInterviewSelect = useResetRecoilState(interviewQuizState);
  const { isLoading, data } = useInterviewQuizQuery();
  const [snackbarOption, setSnackbarOption] = useRecoilState<SnackbarType>(snackbarState);

  const onSuccessFn = (response: any) => {
    const userInterviewData = response.tableData[0];
    setSnackbarOption({
      ...snackbarOption,
      open: true,
      message: `${userInterviewData.name} 님 고생 많으셨습니다.\n 총 ${userInterviewData.totalScore} 점 중 점수는 ${userInterviewData.score} 점 입니다.`,
    });
  };

  const { mutate } = useInterviewQuizSubmitMutation({ onSuccessFn });

  const [submitModalOpen, setSubmitModalOpen] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [phoneNum, setPhoneNum] = useState<string | ''>('');

  const questionsByType: Record<string, InterviewQuizType[]> = {};
  const quizRef = useRef<any>([]);

  if (isLoading) return <LoadingComponent />;

  const quizData = data.data.tableData;
  quizData.forEach((question: InterviewQuizType) => {
    if (!questionsByType[question.type]) questionsByType[question.type] = [];
    questionsByType[question.type].push(question);
  });

  const onUserNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.currentTarget.value);
  };

  const onPhoneNumHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNum = event.target.value;
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(phoneNum) && phoneNum.length <= 4) {
      setPhoneNum(phoneNum === '' ? '' : phoneNum);
    }
  };

  const onSubmitButtonHandler = () => {
    const namePattern = /^[가-힣]{2,5}$/;
    if (!namePattern.test(userName)) {
      setSnackbarOption({
        ...snackbarOption,
        open: true,
        message: '이름은 한글 2~5 자만 가능합니다.',
      });
    } else if (!phoneNum) {
      setSnackbarOption({
        ...snackbarOption,
        open: true,
        message: '핸드폰 번호 입력이 필요합니다.',
      });
    } else {
      setSubmitModalOpen(false);
      mutate({ type: 'C', data: { name: `${userName}${phoneNum}`, tableData: interviewSelect } });
      resetInterviewSelect();
      setPhoneNum('');
      setUserName('');
    }
  };

  return (
    <>
      <Box sx={{ width: '100%', overflow: 'auto', maxHeight: '80vh', mb: '20px' }}>
        <Typography level="h1" sx={{ mb: '20px' }}>
          유니 영역
        </Typography>
        {questionsByType &&
          Object.entries(questionsByType).map((entries, _i) => (
            <Fragment key={entries[0]}>
              <Typography level="h1">{entries[0]}</Typography>
              {entries[1].map((quizItem, quizIndex) => (
                <Quiz
                  key={`${entries[0]}_${quizIndex}`}
                  quizItem={quizItem}
                  quizIndex={quizIndex}
                  forwardedRef={quizRef}
                />
              ))}
              <Divider sx={{ fontSize: '20px', width: '60vw', mb: '30px' }} />
            </Fragment>
          ))}
      </Box>
      <Button
        sx={{ float: 'right', mr: '50px' }}
        size={'lg'}
        color={themeColor}
        variant="soft"
        startDecorator={<TouchAppIcon />}
        onClick={() => {
          const interviewSelectKeys = new Set(interviewSelect.map((item: any) => item.key));
          let missingKey;
          for (const item of quizData) {
            if (!interviewSelectKeys.has(item._id)) {
              missingKey = item._id;
              break;
            }
          }

          if (missingKey) {
            setSnackbarOption({
              ...snackbarOption,
              open: true,
              message: '체크되지 않은 문항이 있습니다.\n정답을 체크해 주세요.',
            });
            quizRef.current[missingKey].scrollIntoView({ behavior: 'smooth' });
          } else {
            setSubmitModalOpen(true);
          }
        }}
      >
        Submit
      </Button>
      <Modal open={submitModalOpen} onClose={() => setSubmitModalOpen(false)}>
        <ModalDialog>
          <DialogTitle>테스트 보시느라 고생 많으셨습니다.</DialogTitle>
          <DialogContent>정답 체크를 잘못했는지 확인 한 번 하고 제출 부탁드립니다.</DialogContent>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>이름</FormLabel>
              <Input
                slotProps={{ input: { minLength: 2, maxLength: 5 } }}
                autoFocus
                value={userName}
                onChange={onUserNameHandler}
              />
            </FormControl>
            <FormControl>
              <FormLabel>핸드폰 번호 뒷 자리 4 자리</FormLabel>
              <Input
                type="number"
                slotProps={{ input: { min: 0, max: 9999 } }}
                value={phoneNum}
                onChange={onPhoneNumHandler}
              />
            </FormControl>
            <Button color={themeColor} variant="solid" onClick={onSubmitButtonHandler}>
              제출
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
}
