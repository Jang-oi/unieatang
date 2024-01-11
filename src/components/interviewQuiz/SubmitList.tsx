import {Box, Card, CardContent, DialogContent, Modal, ModalDialog, Radio, RadioGroup, Table, Typography} from '@mui/joy';
import {useInterviewQuizSubmitQuery} from '../../hooks/dbQuerys/useInterviewQuizSubmit';
import LoadingComponent from '../common/LoadingComponent';
import {interviewQuizSubmitModalState} from '../../recoil/interviewQuiz/atom';
import {useRecoilState, useSetRecoilState} from 'recoil';

const SubmitDetailModal = () => {
  const [interviewQuizSubmitModal, setInterviewQuizSubmitModal] = useRecoilState(interviewQuizSubmitModalState);
  const {showModal, submitDetailData} = interviewQuizSubmitModal as any;

  if (!Object.keys(submitDetailData).length) return <></>;

  const getAnswer = (id: string, type?: string) => {
    const findItem = submitDetailData.quizData.find((item: any) => item._id === id);
    if (type === 'user') {
      return findItem ? findItem['choice'][+findItem['user_answer'] - 1] : '';
    } else {
      return findItem ? findItem['choice'][+findItem['answer'] - 1] : '';
    }
  };

  return (
    <Modal open={showModal} onClose={() => setInterviewQuizSubmitModal({...interviewQuizSubmitModal, showModal: false})}>
      <ModalDialog>
        <Typography level={'h2'}>{submitDetailData.name} 님 면접 문제</Typography>
        <Typography level={'title-lg'}>
          ({submitDetailData.totalScore} 점 만점에 {submitDetailData.score} 점)
        </Typography>
        {submitDetailData.totalScore === submitDetailData.score ? (
          <Typography level="h4">만점 입니다!!</Typography>
        ) : (
          <>
            <Typography level="body-md">정답은 빨간색 체크된 보기 입니다.</Typography>
            <DialogContent>
              <Card variant="plain" sx={{width: '60vw', backgroundColor: 'white'}}>
                {submitDetailData.quizData &&
                  submitDetailData.quizData.map((detailItem: any, detailIndex: number) => (
                    <CardContent key={detailIndex}>
                      <Typography level="h3">
                        {detailIndex + 1}) {detailItem.question}
                      </Typography>
                      {detailItem.passage && (
                        <Card size="sm" sx={{width: '50vw', whiteSpace: 'pre-line', minWidth: '400px'}}>
                          {detailItem.passage}
                        </Card>
                      )}
                      <RadioGroup sx={{margin: '20px'}} id={detailItem._id} value={getAnswer(detailItem._id, 'user')}>
                        {detailItem.choice.map((choiceItem: any, choiceIndex: any) => {
                          if (getAnswer(detailItem._id) === choiceItem) {
                            return <Radio readOnly={true} key={choiceIndex} value={choiceItem} variant="solid" label={choiceItem} color="danger" />;
                          } else {
                            return <Radio readOnly={true} key={choiceIndex} value={choiceItem} variant="outlined" label={choiceItem} />;
                          }
                        })}
                      </RadioGroup>
                    </CardContent>
                  ))}
              </Card>
            </DialogContent>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
};

const SubmitList = () => {
  const {isLoading, data: interviewSubmitData} = useInterviewQuizSubmitQuery();
  const setInterviewQuizSubmitModal = useSetRecoilState(interviewQuizSubmitModalState);
  if (isLoading) return <LoadingComponent />;

  return (
    <Box sx={{overflow: 'auto', maxHeight: '85vh'}}>
      <Table sx={{marginBottom: '30px', textAlign: 'center', fontSize: '15px', width: '73vw'}} borderAxis="both" size="md" stickyHeader>
        <thead>
          <tr>
            <th>이름</th>
            <th>총 점수</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          {interviewSubmitData &&
            interviewSubmitData.map((submitItem: any, submitIndex) => (
              <tr key={submitIndex}>
                <td style={{color: '#0079F4', cursor: 'pointer'}} onClick={() => setInterviewQuizSubmitModal({showModal: true, submitDetailData: submitItem})}>
                  {submitItem.name}
                </td>
                <td>{submitItem.totalScore}</td>
                <td>{submitItem.score}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <SubmitDetailModal />
    </Box>
  );
};

export default SubmitList;
