export interface InterviewQuizType {
    _id: string,
    question: string,
    passage?: string,
    choice: string[],
    point: number,
    type: string
}