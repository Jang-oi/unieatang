import {atom} from 'recoil';

export const interviewQuizCRUDModalState = atom({
  key: 'interviewQuizCRUDModalState',
  default: {
    createMode: false,
    showModal: false,
    quizData: {}
  }
});

export const holidayCRUDModalState = atom({
  key: 'holidayCRUDModalState',
  default: {
    createMode: false,
    showModal: false,
    holidayData: {}
  }
});
