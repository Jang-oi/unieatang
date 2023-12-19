import {
    Button,
    Card,
    CardContent, DialogContent,
    DialogTitle, FormControl, FormLabel, Input,
    Modal,
    ModalDialog,
    Radio,
    RadioGroup, Stack, Textarea,
    Typography
} from "@mui/joy"
import TouchAppIcon from '@mui/icons-material/TouchApp';
import Box from "@mui/joy/Box";
import {useState} from "react";
import {useRecoilState} from "recoil";
import {interviewQuizState} from "../recoil/interviewQuiz/atom";
import {useHyperVQuery} from "../hooks/useHyperVQuery";

interface quizType {
    quizIndex: number,
    choiceIndex: number,
    choiceItem: string
}

interface saveQuizType {
    [key: string]: quizType
}

export default function InterviewQuiz() {

    const [open, setOpen] = useState<boolean>(false);
    const [interviewSelect, setInterviewSelect] = useRecoilState<saveQuizType>(interviewQuizState);

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

    const onSubmitButtonHandler = () => {
        alert('고생하셨습니다.');
        setOpen(false);
        setInterviewSelect({});
    }


    const getDefaultValue = (quizIndex: number) => {
        return interviewSelect[quizIndex] ? interviewSelect[quizIndex]['choiceItem'] : '';
    }

    const quizData = [
        {
            question: "What does HTML stand for?",
            passage: 'asdasd',
            choice: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ]
        },
        {
            question: "Who is making the Web standards?",
            choice: [
                "The World Wide Web Consortium",
                "Mozilla",
                "Google",
                "Microsoft"
            ]
        },
        {
            question: "Choose the correct HTML tag for the largest heading",
            choice: [
                "<h6>",
                "<h1>",
                "<heading>",
                "<head>"
            ]
        },
        {
            question: "What does HTML stand for?",
            choice: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ]
        },
        {
            question: "Who is making the Web standards?",
            choice: [
                "The World Wide Web Consortium",
                "Mozilla",
                "Google",
                "Microsoft"
            ]
        },
        {
            question: "Choose the correct HTML tag for the largest heading",
            choice: [
                "<h6>",
                "<h1>",
                "<heading>",
                "<head>"
            ]
        },
        {
            question: "What does HTML stand for?",
            choice: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ]
        },
        {
            question: "Who is making the Web standards?",
            choice: [
                "The World Wide Web Consortium",
                "Mozilla",
                "Google",
                "Microsoft"
            ]
        },
        {
            question: "Choose the correct HTML tag for the largest heading",
            choice: [
                "<h6>",
                "<h1>",
                "<heading>",
                "<head>"
            ]
        },
        {
            question: "What does HTML stand for?",
            choice: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ]
        },
        {
            question: "Who is making the Web standards?",
            choice: [
                "The World Wide Web Consortium",
                "Mozilla",
                "Google",
                "Microsoft"
            ]
        },
        {
            question: "Choose the correct HTML tag for the largest heading",
            choice: [
                "<h6>",
                "<h1>",
                "<heading>",
                "<head>"
            ]
        },
        {
            question: "What does HTML stand for?",
            choice: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ]
        },
        {
            question: "Who is making the Web standards?",
            choice: [
                "The World Wide Web Consortium",
                "Mozilla",
                "Google",
                "Microsoft"
            ]
        },
        {
            question: "Choose the correct HTML tag for the largest heading",
            choice: [
                "<h6>",
                "<h1>",
                "<heading>",
                "<head>"
            ]
        },
        {
            question: "What does HTML stand for?",
            choice: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ]
        },
        {
            question: "Who is making the Web standards?",
            choice: [
                "The World Wide Web Consortium",
                "Mozilla",
                "Google",
                "Microsoft"
            ]
        },
        {
            question: "Choose the correct HTML tag for the largest heading",
            choice: [
                "<h6>",
                "<h1>",
                "<heading>",
                "<head>"
            ]
        },
        {
            question: "What does HTML stand for?",
            choice: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ]
        },
        {
            question: "Who is making the Web standards?",
            choice: [
                "The World Wide Web Consortium",
                "Mozilla",
                "Google",
                "Microsoft"
            ]
        },
        {
            question: "Choose the correct HTML tag for the largest heading",
            choice: [
                "<h6>",
                "<h1>",
                "<heading>",
                "<head>"
            ]
        },
        {
            question: "What does HTML stand for?",
            choice: [
                "Hyper Text Markup Language",
                "Home Tool Markup Language",
                "Hyperlinks and Text Markup Language"
            ]
        },
        {
            question: "Who is making the Web standards?",
            choice: [
                "The World Wide Web Consortium",
                "Mozilla",
                "Google",
                "Microsoft"
            ]
        },
        {
            question: "Choose the correct HTML tag for the largest heading",
            choice: [
                "<h6>",
                "<h1>",
                "<heading>",
                "<head>"
            ]
        },
    ]

    return (
        <>
            <Box sx={{width: '100%', overflow: 'auto', maxHeight: '80vh', mb: '20px'}}>
                <Typography level="h1" sx={{mb: '20px'}}>유니 영역</Typography>
                {quizData && quizData.map((quizItem, quizIndex) => (
                    <Card variant="plain" sx={{backgroundColor: 'white'}} key={quizIndex}>
                        <CardContent>
                            <Typography level="h3">{quizIndex + 1}) {quizItem.question}</Typography>
                            {quizItem.passage && (<Card size="md" sx={{width:'30vw'}}>{quizItem.passage}</Card>)}
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
                ))}
            </Box>
            <Button sx={{float: 'right', mr: '50px'}} size={'lg'} color="neutral" variant="soft"
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
                            <Input required type={'number'} />
                        </FormControl>
                        <Button color="neutral" variant="solid" onClick={onSubmitButtonHandler}>제출</Button>
                    </Stack>
                </ModalDialog>
            </Modal>
        </>
    );
}