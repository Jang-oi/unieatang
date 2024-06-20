import { atom } from 'recoil';

/**
 * 유저 권한
 */

export const roleState = atom({
  key: 'roleState',
  default: {
    userRole: '',
  },
});
