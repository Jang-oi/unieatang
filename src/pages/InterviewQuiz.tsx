import {
    Button, DialogContent,
    DialogTitle, FormControl, FormLabel, Input,
    Modal,
    ModalDialog, Stack,
    Typography
} from "@mui/joy"
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Box from "@mui/joy/Box";
import {useState} from "react";
import {useRecoilValue, useResetRecoilState} from "recoil";
import {interviewQuizState} from "../recoil/interviewQuiz/atom";
import Quiz from "../components/interviewQuiz/Quiz";
import {userSettingState} from "../recoil/settings/atom";

export default function InterviewQuiz() {

    const [open, setOpen] = useState<boolean>(false);
    const resetInterviewSelect = useResetRecoilState(interviewQuizState);
    const {color} = useRecoilValue(userSettingState);

    const onSubmitButtonHandler = () => {
        alert('고생하셨습니다.');
        setOpen(false);
        resetInterviewSelect();
    }

    const quizData = [
        {
            question: "What does HTML stand for?",
            passage: '지문이 있을 경우 사용',
            choice: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ]
        },
        {
            question: "Java 에서 Wrapper 클래스는 무엇인가요?",
            choice: [
                "기본 데이터 타입을 객체로 감싸는 클래스",
                "상속을 받지 않는 최상위 클래스",
                "인터페이스를 구현한 클래스",
                "문자열을 처리하는 클래스"
            ]
        },
        {
            question: "Java 에서 예외 처리를 위한 키워드는 무엇인가요?",
            choice: [
                "exception",
                "try",
                "handle",
                "throw"
            ]
        },
        {
            question: "Java 에서 다음 중 오버로딩이 아닌 것은 무엇인가요?",
            choice: [
                "메서드 이름이 동일",
                "매개변수의 개수가 다름",
                "매개변수의 자료형이 다름",
                "매개변수의 이름이 다름"
            ]
        },
        {
            question: "Java 에서 다음 중 올바르지 않은 것은 무엇인가요?",
            choice: [
                "배열(Array)의 길이는 length() 속성을 사용한다.",
                "문자열(String)의 길이는 length() 메서드를 사용한다.",
                "컬렉션(Collection)의 크기는 size() 메서드를 사용한다."
            ]
        },
        {
            question: "Java 에서 다음 중 오류가 발생하는 코드는 무엇인가요?",
            choice: [
                "System.out.println(\"a = \" + 1 + 1);",
                "System.out.println(\"a = \" + 1 - 1);",
                "System.out.println(\"a = \" + 1 * 1);",
                "System.out.println(\"a = \" + 1 / 1);"
            ]
        },
    ]

    return (
        <>
            <Box sx={{width: '100%', overflow: 'auto', maxHeight: '80vh', mb: '20px'}}>
                <Typography level="h1" sx={{mb: '20px'}}>유니 영역</Typography>
                {quizData && quizData.map((quizItem, quizIndex) => (
                    <Quiz quizItem={quizItem} quizIndex={quizIndex}/>
                ))}
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