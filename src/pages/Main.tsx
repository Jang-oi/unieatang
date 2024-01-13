import ErrorView from '../components/common/ErrorView';
import { useRecoilState } from 'recoil';
import { snackbarState } from '../recoil/snackbar/atom';
import { SnackbarType } from '../components/common/UniSnackbar';
import { Button } from '@mui/joy';

export default function Main() {
  const [snackbarOption, setSnackbarOption] = useRecoilState<SnackbarType>(snackbarState);
  const handleClose = () => {
    setSnackbarOption({ ...snackbarOption, open: true, message: '오류테스트테스트\nasdasdjahsdkjahsdkjasd안녕' });
  };

  return (
    <>
      <Button onClick={handleClose}>테트</Button>
      <ErrorView code={'9999'} message={'준비 중 입니다 ...'} />;
    </>
  );
}
