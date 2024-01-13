import { useRecoilValue } from 'recoil';
import { userSettingState } from '../../recoil/settings/atom';

import { toggleSidebar } from '../../utils/sdieBarUtil';

import { GlobalStyles, Sheet, IconButton } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {
  const { themeColor } = useRecoilValue(userSettingState);

  return (
    <Sheet
      sx={{
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        p: 2,
        gap: 1,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <IconButton onClick={() => toggleSidebar()} variant="outlined" color={themeColor} size="sm">
        <MenuIcon />
      </IconButton>
    </Sheet>
  );
}
