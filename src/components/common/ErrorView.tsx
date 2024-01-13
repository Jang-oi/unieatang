import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userSettingState } from '../../recoil/settings/atom';

import { Box, Button } from '@mui/joy';
import Typography from '@mui/joy/Typography';

interface ErrorProps {
  code: string;
  message: string;
}

export default function ErrorView({ code, message }: ErrorProps) {
  const navigate = useNavigate();
  const { themeColor } = useRecoilValue(userSettingState);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '80vh',
      }}
    >
      <Typography level={'h1'} variant="plain" color={themeColor}>
        {code}
      </Typography>
      <Typography level={'h2'} variant="plain" color={themeColor}>
        {message}
      </Typography>
      <Button
        sx={{ marginTop: '30px' }}
        color={themeColor}
        variant="soft"
        onClick={() => {
          navigate('/');
        }}
      >
        메인으로
      </Button>
    </Box>
  );
}
