import { Box, Snackbar, Textarea } from '@mui/joy';
import { useRecoilState } from 'recoil';
import { snackbarState } from '../../recoil/snackbar/atom';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

export interface SnackbarType {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
  open: boolean;
  message: string;
  isError: boolean;
}

const UniSnackbar = () => {
  const [snackbarOption, setSnackbarOption] = useRecoilState<SnackbarType>(snackbarState);
  const { vertical, horizontal, open, message, isError } = snackbarOption;
  const handleClose = () => {
    setSnackbarOption({ ...snackbarOption, open: false, isError: false, message: '' });
  };

  const snackBackgroundColor = isError ? '#C41C1C' : '#FBFCFE';
  const snackFontColor = isError ? 'white' : '#595F64';

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + horizontal}
        startDecorator={
          isError ? <ErrorIcon sx={{ color: snackFontColor }} /> : <InfoIcon sx={{ color: snackFontColor }} />
        }
        variant={'plain'}
        size={'lg'}
        sx={{ backgroundColor: snackBackgroundColor }}
      >
        <Textarea
          readOnly
          variant="plain"
          sx={{
            backgroundColor: snackBackgroundColor,
            color: snackFontColor,
            width: '100%',
            height: '100%',
            '&:hover': {
              backgroundColor: snackBackgroundColor,
              color: snackFontColor,
            },
            '&::before': {
              top: 'unset',
              transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
              borderRadius: 0,
            },
          }}
          value={message}
        />
      </Snackbar>
    </Box>
  );
};
export default UniSnackbar;
