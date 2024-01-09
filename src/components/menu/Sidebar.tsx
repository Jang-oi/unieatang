import * as React from 'react';
import {useNavigate} from 'react-router-dom';

import {useRecoilValue} from 'recoil';
import {userSettingState} from '../../recoil/settings/atom';

import {MenuTypes} from '../../types/menuTypes';

import {closeSidebar} from '../../utils/sdieBarUtil';
import {menuData, bottomMenuData, openNewTab, getColorWithTheme} from '../../utils/commonUits';

import {GlobalStyles, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemContent, listItemButtonClasses, Typography, Sheet} from '@mui/joy';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ComputerIcon from '@mui/icons-material/Computer';
import QuizIcon from '@mui/icons-material/Quiz';
import ScienceIcon from '@mui/icons-material/Science';
import GroupsIcon from '@mui/icons-material/Groups';
import GitHubIcon from '@mui/icons-material/GitHub';
import GridViewIcon from '@mui/icons-material/GridView';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import BusinessIcon from '@mui/icons-material/Business';
import KeyIcon from '@mui/icons-material/Key';

function Toggler({
  defaultExpanded = false,
  renderToggle,
  children
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({open, setOpen})}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden'
          }
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

/**
 * LeftMenu
 */
export default function Sidebar() {
  const navigate = useNavigate();

  const getMenuIcon = (menu: string) => {
    switch (menu) {
      case 'Home':
        return <HomeRoundedIcon sx={{color: fontColor}} />;
      case 'HyperV':
        return <ComputerIcon sx={{color: fontColor}} />;
      case 'Calendar':
        return <CalendarMonthIcon sx={{color: fontColor}} />;
      case 'Interview Quiz':
        return <QuizIcon sx={{color: fontColor}} />;
      case 'Customer List':
        return <BusinessIcon sx={{color: fontColor}} />;
      case 'License':
        return <KeyIcon sx={{color: fontColor}} />;
      case 'Lab':
        return <ScienceIcon sx={{color: fontColor}} />;
      case 'Support':
        return <SupportRoundedIcon sx={{color: fontColor}} />;
      case 'GroupWare':
        return <GroupsIcon sx={{color: fontColor}} />;
      case 'Git Lab':
        return <GitHubIcon sx={{color: fontColor}} />;
      case 'Real Grid':
        return <GridViewIcon sx={{color: fontColor}} />;
      case 'RedMine':
        return <RocketLaunchIcon sx={{color: fontColor}} />;
      case 'Settings':
        return <SettingsRoundedIcon sx={{color: fontColor}} />;
      default:
        return <></>;
    }
  };

  /**
   * Menu 렌더링 하는 함수
   * childMenu 존재 유무로 분기 처리함
   * @param menuItem
   * @param menuIndex
   */
  const renderMenu = (menuItem: MenuTypes, menuIndex: number) => {
    if (!menuItem.childMenu) {
      return (
        <ListItemButton
          onClick={() => {
            navigate(`${menuItem.url}`);
          }}
        >
          {getMenuIcon(menuItem.menu)}
          <ListItemContent>
            <Typography level="title-md" sx={{color: fontColor}}>
              {menuItem.menu}
            </Typography>
          </ListItemContent>
        </ListItemButton>
      );
    } else {
      return (
        <Toggler
          renderToggle={({open, setOpen}) => (
            <ListItemButton onClick={() => setOpen(!open)}>
              {getMenuIcon(menuItem.menu)}
              <ListItemContent>
                <Typography level="title-md" sx={{color: fontColor}}>
                  {menuItem.menu}
                </Typography>
              </ListItemContent>
              <KeyboardArrowDownIcon sx={{transform: open ? 'rotate(180deg)' : 'none'}} />
            </ListItemButton>
          )}
        >
          <List key={menuIndex} sx={{gap: 0.5}}>
            {menuItem.childMenu.map((childItem, childIndex) => (
              <ListItem key={childIndex}>
                <ListItemButton
                  sx={{color: fontColor}}
                  onClick={() => {
                    navigate(`${menuItem.childUrl && menuItem.childUrl[childIndex]}`);
                  }}
                >
                  {childItem}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Toggler>
      );
    }
  };

  const {color} = useRecoilValue(userSettingState);
  const {bgColor, fontColor} = getColorWithTheme(color);

  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: {xs: 'fixed', md: 'sticky'},
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none'
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
        backgroundColor: bgColor
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '260px'
            }
          }
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)'
          }
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
        <Box sx={{minWidth: 0, flex: 1}}>
          <Typography level="title-md" sx={{color: fontColor}}>
            User.Name
          </Typography>
          <Typography level="body-md" sx={{color: fontColor}}>
            User.????
          </Typography>
        </Box>
        <IconButton size="md">
          <LogoutRoundedIcon sx={{color: fontColor}} />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          minHeight: 0,
          overflow: 'hidden auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5
          }
        }}
      >
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm
          }}
        >
          {menuData &&
            menuData.map((menuItem, menuIndex) => (
              <ListItem key={menuIndex} nested={!!menuItem.childMenu}>
                {renderMenu(menuItem, menuIndex)}
              </ListItem>
            ))}
        </List>
        <List
          size="sm"
          sx={{
            mt: 'auto',
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
            mb: 2
          }}
        >
          {bottomMenuData &&
            bottomMenuData.map((bottomMenuItem, index) => (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => {
                    openNewTab(`${bottomMenuItem.url}`);
                  }}
                >
                  {getMenuIcon(bottomMenuItem.menu)}
                  <ListItemContent>
                    <Typography level="title-md" sx={{color: fontColor}}>
                      {bottomMenuItem.menu}
                    </Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            ))}
        </List>
      </Box>
    </Sheet>
  );
}
