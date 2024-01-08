import {atom} from 'recoil';

export const interviewQuizCRUDModalState = atom({
  key: 'interviewQuizCRUDModalState',
  default: {
    createMode: false,
    showModal: false,
    quizData: {}
  }
});
