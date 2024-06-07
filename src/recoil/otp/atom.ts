import { atom } from 'recoil';

/**
 * OTP List 모달
 */
export const otpListModalState = atom({
  key: 'otpListModalState',
  default: {
    showModal: false,
    customer: '',
  },
});
