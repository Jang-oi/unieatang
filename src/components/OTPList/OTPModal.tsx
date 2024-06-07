import { useEffect, useState } from 'react';
import {
  CircularProgress,
  DialogTitle,
  List,
  ListDivider,
  ListItemButton,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy';
import { useRecoilState } from 'recoil';
import { otpListModalState } from '../../recoil/otp/atom';
import { useOTPDetailQuery } from '../../hooks/querys/useOTPList';
import LoadingComponent from '../common/LoadingComponent';
import { SnackbarType } from '../common/UniSnackbar';
import { snackbarState } from '../../recoil/snackbar/atom';

const OTPModal = () => {
  const [snackbarOption, setSnackbarOption] = useRecoilState<SnackbarType>(snackbarState);
  const [otpListModal, setOTPListModal] = useRecoilState(otpListModalState);
  const [progress, setProgress] = useState(0);
  const [otpData, setOTPData] = useState([]);
  const { showModal, customer } = otpListModal as any;

  const { isLoading, data, refetch } = useOTPDetailQuery({ customer });

  const copyToClipboard = (id: string) => {
    try {
      const container = document.getElementById(id) as HTMLInputElement;
      const range = document.createRange();
      range.selectNode(container);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      setSnackbarOption({ ...snackbarOption, open: true, message: '클립보드 복사 완료되었습니다.' });
    } catch (e: any) {
      setSnackbarOption({ ...snackbarOption, open: true, isError: true, message: e.toString() });
    }
  };

  useEffect(() => {
    if (data) {
      setOTPData(data.data.tableData);
      setProgress(data.data.timeUse);
    }
    const interval = setInterval(() => {
      const currentDate = new Date();
      const seconds = currentDate.getSeconds();
      setProgress((prevProgress) => prevProgress + 1);
      if (seconds === 0 || seconds === 30) refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) return <LoadingComponent />;
  return (
    <>
      <Modal open={showModal} onClose={() => setOTPListModal({ ...otpListModal, showModal: false })}>
        <ModalDialog size="lg">
          <DialogTitle sx={{ mb: '30px' }}>
            <Typography level="h2">{customer}</Typography>
            <CircularProgress determinate value={progress * 3.33} size="md" />
          </DialogTitle>
          <List>
            {otpData &&
              otpData.map((otpItem: any) => (
                <>
                  <ListItemButton
                    onClick={() => {
                      copyToClipboard(otpItem.user);
                    }}
                  >
                    <Typography level="h2" id={otpItem.user} sx={{ fontSize: '25px' }}>
                      {otpItem.otp}
                    </Typography>
                    {`${otpItem.user} 기기  ${otpItem.mobile}`}
                  </ListItemButton>
                  <ListDivider />
                </>
              ))}
          </List>
          <Typography level="title-md">해당 OTP 클릭하면 클립보드에 복사 됩니다!!</Typography>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default OTPModal;
