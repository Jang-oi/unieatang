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

interface Question {
    question: string;
    choice: string[];
    id: string;
    passage?: string;
    answer: string;
    type: number;
    type_name: string;
    del: string;
}

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
            "question": "바이트는 몇 비트로 구성되는가?",
            "choice": [
                "16비트",
                "12비트",
                "8비트",
                "4비트",
                "2비트"
            ],
            "id": "0001",
            "passage": "",
            "answer": "3",
            "type": 1,
            "type_name": "운영체제",
            "del": ""
        },
        {
            "question": "다음 중 cron 서비스에 대해 틀린 설명을 하는 사람은?",
            "choice": [
                "예리",
                "슬기",
                "조이",
                "웬디"
            ],
            "id": "0002",
            "passage": "cron 서비스는 주기적인 작업을 수행할 때 사용하는 서비스야.\n crontab 파일은 모든 사용자가 수정할 수 있어. crontab 명령으로 작업을 등록할 수 있어. crond라는 데몬 프로그램이 설정 파일의 내용을 검사해서 정해진 시간에 작업해.",
            "answer": "2",
            "type": 1,
            "type_name": "운영체제",
            "del": ""
        },
        {
            "question": "주어진 문제를 풀기위한 단계별 절차를 수학적으로 기술한 것은?",
            "choice": [
                "프로그래밍 언어",
                "알고리즘",
                "저급 언어",
                "함수",
                "고급 언어"
            ],
            "id": "0003",
            "passage": "",
            "answer": "2",
            "type": 2,
            "type_name": "알고리즘",
            "del": ""
        },
        {
            "question": "Java 에서 Wrapper 클래스는 무엇인가요?",
            "choice": [
                "기본 데이터 타입을 객체로 감싸는 클래스",
                "상속을 받지 않는 최상위 클래스",
                "인터페이스를 구현한 클래스",
                "문자열을 처리하는 클래스"
            ],
            "id": "0004",
            "passage": "",
            "answer": "1",
            "type": 3,
            "type_name": "JAVA",
            "del": ""
        },
        {
            "question": "Java 에서 예외 처리를 위한 키워드는 무엇인가요?",
            "choice": [
                "exception",
                "try",
                "handle",
                "throw"
            ],
            "id": "0005",
            "passage": "",
            "answer": "2",
            "type": 3,
            "type_name": "JAVA",
            "del": ""
        },
        {
            "question": "Java 에서 다음 중 오버로딩이 아닌 것은 무엇인가요?",
            "choice": [
                "메서드 이름이 동일",
                "매개변수의 개수가 다름",
                "매개변수의 자료형이 다름",
                "매개변수의 이름이 다름"
            ],
            "id": "0006",
            "passage": "",
            "answer": "4",
            "type": 3,
            "type_name": "JAVA",
            "del": ""
        },
        {
            "question": "Java 에서 다음 중 올바르지 않은 것은 무엇인가요?",
            "choice": [
                "배열(Array)의 길이는 length() 속성을 사용한다.",
                "문자열(String)의 길이는 length() 메서드를 사용한다.",
                "컬렉션(Collection)의 크기는 size() 메서드를 사용한다."
            ],
            "id": "0007",
            "passage": "",
            "answer": "1",
            "type": 3,
            "type_name": "JAVA",
            "del": ""
        },
        {
            "question": "Java 에서 다음 중 오류가 발생하는 코드는 무엇인가요?",
            "choice": [
                "System.out.println(\"a = \" + 1 + 1);",
                "System.out.println(\"a = \" + 1 - 1);",
                "System.out.println(\"a = \" + 1 * 1);",
                "System.out.println(\"a = \" + 1 / 1);"
            ],
            "id": "0008",
            "passage": "",
            "answer": "3",
            "type": 3,
            "type_name": "JAVA",
            "del": ""
        },
        {
            "question": "다음 중 맞는 것을 고르시오.",
            "choice": [
                "이따가 학교 앞에서 만나자.",
                "있다가 학교 앞에서 만나자.",
                "둘다 맞다",
                "둘다 틀리다"
            ],
            "id": "0009",
            "passage": "",
            "answer": "1",
            "type": 10,
            "type_name": "맞춤법",
            "del": ""
        },
        {
            "question": "다음 ( ) 안의 말 중 올바른 것을 고르시오.",
            "choice": [
                "빅분률",
                "백분율"
            ],
            "id": "0010",
            "passage": "유니의 석차 (백분률/백분율)은 얼마나 됩니까?",
            "answer": "2",
            "type": 10,
            "type_name": "맞춤법",
            "del": ""
        }
    ]

    const questionsByType: Record<string, Question[]> = {};

    quizData.forEach((question) => {
        if (!questionsByType[question.type_name]) questionsByType[question.type_name] = [];
        questionsByType[question.type_name].push(question);
    });

    return (
        <>
            <Box sx={{width: '100%', overflow: 'auto', maxHeight: '80vh', mb: '20px'}}>
                <Typography level="h1" sx={{mb: '20px'}}>유니 영역</Typography>
                {questionsByType && Object.entries(questionsByType).map(entries => (
                    <>
                        <Typography level="h2">{entries[0]}</Typography>
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