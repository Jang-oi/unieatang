import { atom } from 'recoil';
import { SnackbarType } from '../../components/common/UniSnackbar';

export const snackbarState = atom<SnackbarType>({
  key: 'snackbarState',
  default: {
    vertical: 'top',
    horizontal: 'right',
    open: false,
    message: '',
    isError: false,
  },
});
