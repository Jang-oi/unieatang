import {atom} from "recoil";
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

export const interviewQuizState = atom({
    key: "interviewQuizState",
    default: {},
    effects_UNSTABLE: [persistAtom]
})