import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

/**
 * 면접 문제 선택한 내역
 */
export const interviewQuizState = atom({
  key: 'interviewQuizState',
  default: [],
  effects_UNSTABLE: [persistAtom],
});

/**
 * 면접 문제 제출자 틀린문제 모달
 */
export const interviewQuizSubmitModalState = atom({
  key: 'interviewQuizSubmitModalState',
  default: {
    showModal: false,
    submitDetailData: {},
  },
});
