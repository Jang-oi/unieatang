import {
    Button, DialogContent,
    DialogTitle, FormControl, FormLabel, Input,
    Modal,
    ModalDialog, Stack,
    Typography, Divider
} from "@mui/joy"
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Box from "@mui/joy/Box";
import {useState} from "react";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {interviewQuizState} from "../recoil/interviewQuiz/atom";
import Quiz from "../components/interviewQuiz/Quiz";
import {userSettingState} from "../recoil/settings/atom";
import {useInterviewQuizQuery} from "../hooks/useInterviewQuizQuery";
import LoadingComponent from "../components/common/LoadingComponent";

interface Question {
    question: string;
    choice: string[];
    id: string;
    passage?: string;
    answer: string;
    type: string;
    del: string;
}

export default function InterviewQuiz() {

    const [open, setOpen] = useState<boolean>(false);
    const query = useInterviewQuizQuery();
    const resetInterviewSelect = useResetRecoilState(interviewQuizState);
    const {color} = useRecoilValue(userSettingState);

    const onSubmitButtonHandler = () => {
        alert('고생하셨습니다.');
        setOpen(false);
        resetInterviewSelect();
    }

    const quizData = query.data;
    const questionsByType: Record<string, Question[]> = {};

    if (query.isLoading) return <LoadingComponent/>;

    quizData.forEach((question : Question) => {
        if (!questionsByType[question.type]) questionsByType[question.type] = [];
        questionsByType[question.type].push(question);
    });

    return (
        <>
            <Box sx={{width: '100%', overflow: 'auto', maxHeight: '80vh', mb: '20px'}}>
                <Typography level="h1" sx={{mb: '20px'}}>유니 영역</Typography>
                {questionsByType && Object.entries(questionsByType).map((entries, _i) => (
                    <>
                        <Typography level="h2" key={_i}>{entries[0]}</Typography>
                        {entries[1].map((quizItem,quizIndex) => (
                            <Quiz quizItem={quizItem} quizIndex={quizIndex}/>
                        ))}
                        <Divider sx={{fontSize: '20px'}}/>
                    </>
                    )
                )}
            </Box>
            <Button sx={{float: 'right', mr: '50px'}} size={'lg'} color={color} variant="soft"
                    startDecorator={<TouchAppIcon/>} onClick={() => setOpen(true)}>Submit</Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>테스트 보시느라 고생 많으셨습니다.</DialogTitle>
                    <DialogContent>정답 체크를 잘못했는지 확인 한 번 하고 제출 부탁드립니다.</DialogContent>
                    <Stack spacing={2}>
                        <FormControl>
                            <FormLabel>이름</FormLabel>
                            <Input autoFocus required/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>핸드폰 번호 뒷 자리 4 자리</FormLabel>
                            <Input required type={'number'}/>
                        </FormControl>
                        <Button color={color} variant="solid" onClick={onSubmitButtonHandler}>제출</Button>
                    </Stack>
                </ModalDialog>
            </Modal>
        </>
    );
}