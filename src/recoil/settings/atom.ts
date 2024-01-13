import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { userSettingType } from '../../types/userSettingType';

const { persistAtom } = recoilPersist();

export const userSettingState = atom<userSettingType>({
  key: 'userSettingState',
  default: {
    themeColor: 'neutral',
    bgColor: '',
    fontColor: '',
  },
  effects_UNSTABLE: [persistAtom],
});
