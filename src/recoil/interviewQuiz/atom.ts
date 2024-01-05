import {atom} from "recoil";
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

/**
 * 면접 문제 선택한 내역
 */
export const interviewQuizState = atom({
    key: "interviewQuizState",
    default: [],
    effects_UNSTABLE: [persistAtom]
});