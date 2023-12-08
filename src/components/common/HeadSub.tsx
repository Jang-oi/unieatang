import {Link as RouterLink, useLocation} from 'react-router-dom';

import Box from '@mui/joy/Box';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Link from '@mui/joy/Link';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Typography from '@mui/joy/Typography';
import ColorSchemeToggle from './ColorSchmeToggle'; // 다크모드 버튼 컴포넌트

export default function HeadSub() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Breadcrumbs
        size="sm"
        aria-label="breadcrumbs"
        separator={<ChevronRightRoundedIcon />}
        sx={{ pl: 0 }}
      >
        <Link underline="none" color="neutral" href="#some-link" aria-label="Home">
          <HomeRoundedIcon />
        </Link>
        <Link
          underline="hover"
          color="neutral"
          component={RouterLink}
          to={'/'}
          fontSize={12}
          fontWeight={500}
        >
          Dashboard
        </Link>
        <Typography color="primary" fontWeight={500} fontSize={12}>
          Orders
        </Typography>
      </Breadcrumbs>
      <ColorSchemeToggle sx={{ marginLeft: 'auto' }} />
    </Box>
  );
}
