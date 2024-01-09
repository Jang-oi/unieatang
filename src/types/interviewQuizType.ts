/**
 * _id : DB 에서 사용하는 유니크 키
 * question : 문제
 * passage?: 지문
 * choice: 보기
 * point: 점수
 * type: 문제 타입 ( 운영체제, css 등등 )
 * answer: 정답
 */
export type InterviewQuizType = {
  _id: string;
  question: string;
  passage?: string;
  choice: string[];
  point: number;
  type: string;
  answer: string;
};
