import { Fragment, useEffect, useState } from 'react';
import {
  Box,
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
import { copyToClipboard } from '../../utils/commonUits';

const OTPModal = () => {
  const [snackbarOption, setSnackbarOption] = useRecoilState<SnackbarType>(snackbarState);
  const [otpListModal, setOTPListModal] = useRecoilState(otpListModalState);
  const [progress, setProgress] = useState(0);
  const [otpData, setOTPData] = useState([]);
  const { showModal, customer } = otpListModal as any;

  const { isLoading, data, refetch } = useOTPDetailQuery({ customer });

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
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'left', marginTop: '20px' }}>
            <Typography level="h2">{customer}</Typography>
            <CircularProgress determinate value={progress * 3.33} size="md" />
          </Box>
          <List>
            {otpData &&
              otpData.map((otpItem: any, otpIndex: number) => (
                <Fragment key={otpIndex}>
                  <ListItemButton
                    onClick={() => {
                      copyToClipboard(
                        otpItem.user,
                        () => {
                          setSnackbarOption({
                            ...snackbarOption,
                            open: true,
                            message: '클립보드 복사 완료되었습니다.',
                          });
                        },
                        (err: any) => {
                          setSnackbarOption({ ...snackbarOption, open: true, isError: true, message: err.toString() });
                        },
                      );
                    }}
                  >
                    <Typography level="h2" id={otpItem.user} sx={{ fontSize: '25px' }}>
                      {otpItem.otp}
                    </Typography>
                    {`${otpItem.user} 기기  ${otpItem.mobile}`}
                  </ListItemButton>
                  <ListDivider />
                </Fragment>
              ))}
          </List>
          <Typography level="title-md">해당 OTP 클릭하면 클립보드에 복사 됩니다!!</Typography>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default OTPModal;
