import {Card, CardContent, Radio, RadioGroup, Typography} from "@mui/joy"
import Box from "@mui/joy/Box";
import {useState} from "react";

export default function InterviewQuiz() {

    const [selectedRow, setSelectedRow] = useState(null);

    const handleRadioChange = (event: any) => {
        setSelectedRow(event.target.value);
    };

    const quizData = [
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
        }
    ]

    return (
        <Box sx={{width: '100%', overflow: 'auto', maxHeight: '85vh'}}>
            <Typography level="h1" sx={{mb: '20px'}}>유니 영역</Typography>
            {quizData && quizData.map((quizItem, quizIndex) => (
                <Card variant="plain" sx={{backgroundColor: 'white'}} key={quizIndex}>
                    <CardContent>
                        <Typography level="h3">{quizIndex + 1}) {quizItem.question}</Typography>
                        <table style={{margin: '10px'}}>
                            <tbody>
                            {quizItem.choice.map((choiceItem, choiceIndex) => (
                                <tr key={choiceIndex}>
                                    <td style={{width: '5%'}}>
                                        <RadioGroup name={'radio-' + choiceIndex} value={selectedRow}>
                                            <Radio value={choiceItem} variant="outlined" onClick={handleRadioChange}/>
                                        </RadioGroup>
                                    </td>
                                    <td>{choiceItem}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
}