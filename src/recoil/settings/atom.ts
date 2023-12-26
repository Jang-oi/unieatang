import {atom} from "recoil";
import {recoilPersist} from 'recoil-persist';

const {persistAtom} = recoilPersist();

export const userSettingState = atom({
    key: "userSettingState",
    default: {
        color : 'neutral',
        bgColor : '',
        fontColor : '',
    },
    effects_UNSTABLE: [persistAtom]
})