import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, {listItemButtonClasses} from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import SupportRoundedIcon from '@mui/icons-material/SupportRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ComputerIcon from '@mui/icons-material/Computer';
import QuizIcon from '@mui/icons-material/Quiz';

import {closeSidebar} from '../../utils/sdieBarUtil';
import {menuData} from '../../utils/commonUits';
import {useNavigate} from "react-router-dom";
import {MenuTypes} from "../../types/menuTypes";

function Toggler({defaultExpanded = false, renderToggle, children,}: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => React.ReactNode;
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
                        overflow: 'hidden',
                    },
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
    const bottomMenuData = [{menu: 'Support'}, {menu: 'Settings'}];

    const getMenuIcon = (menu: string) => {
        switch (menu) {
            case 'Home' :
                return <HomeRoundedIcon/>
            case 'HyperV' :
                return <ComputerIcon/>
            case 'Calendar' :
                return <CalendarMonthIcon/>
            case "Interview Quiz" :
                return <QuizIcon/>
            case "Support" :
                return <SupportRoundedIcon/>
            case "Settings" :
                return <SettingsRoundedIcon/>
            default :
                return <></>
        }
    }

    /**
     * Menu 렌더링 하는 함수
     * childMenu 존재 유무로 분기 처리함
     * @param menuItem
     * @param menuIndex
     */
    const renderMenu = (menuItem: MenuTypes, menuIndex: number) => {
        if (!menuItem.childMenu) {
            return (
                <ListItemButton onClick={() => {
                    navigate(`${menuItem.url}`)
                }}>
                    {getMenuIcon(menuItem.menu)}
                    <ListItemContent>
                        <Typography level="title-md">{menuItem.menu}</Typography>
                    </ListItemContent>
                </ListItemButton>
            )
        } else {
            return (
                <Toggler
                    renderToggle={({open, setOpen}) => (
                        <ListItemButton onClick={() => setOpen(!open)}>
                            {getMenuIcon(menuItem.menu)}
                            <ListItemContent>
                                <Typography level="title-md">{menuItem.menu}</Typography>
                            </ListItemContent>
                            <KeyboardArrowDownIcon sx={{transform: open ? 'rotate(180deg)' : 'none'}}/>
                        </ListItemButton>
                    )}
                >
                    <List key={menuIndex} sx={{gap: 0.5}}>
                        {menuItem.childMenu.map((childItem, childIndex) => (
                            <ListItem key={childIndex}>
                                <ListItemButton onClick={() => {
                                    navigate(`${menuItem.childUrl && menuItem.childUrl[childIndex]}`)
                                }}>{childItem}</ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Toggler>
            )
        }
    }

    return (
        <Sheet
            className="Sidebar"
            sx={{
                position: {xs: 'fixed', md: 'sticky'},
                transform: {
                    xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
                    md: 'none',
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
            }}
        >
            <GlobalStyles
                styles={(theme) => ({
                    ':root': {
                        '--Sidebar-width': '220px',
                        [theme.breakpoints.up('lg')]: {
                            '--Sidebar-width': '260px',
                        },
                    },
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
                        lg: 'translateX(-100%)',
                    },
                }}
                onClick={() => closeSidebar()}
            />
            <Box sx={{display: 'flex', gap: 1, alignItems: 'center'}}>
                <Avatar variant="outlined" size="md" src=""/>
                <Box sx={{minWidth: 0, flex: 1}}>
                    <Typography level="title-md">User.Name</Typography>
                    <Typography level="body-md">User.????</Typography>
                </Box>
                <IconButton size="md" variant="plain" color="neutral">
                    <LogoutRoundedIcon/>
                </IconButton>
            </Box>
            <Divider/>
            <Box
                sx={{
                    minHeight: 0,
                    overflow: 'hidden auto',
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    [`& .${listItemButtonClasses.root}`]: {
                        gap: 1.5,
                    },
                }}
            >
                <List
                    size="sm"
                    sx={{
                        gap: 1,
                        '--List-nestedInsetStart': '30px',
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                    }}
                >
                    {menuData && menuData.map((menuItem, menuIndex) => (
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
                    {bottomMenuData && bottomMenuData.map((bottomMenuItem, index) => (
                        <ListItem key={index}>
                            <ListItemButton onClick={() => {
                            }}>
                                {getMenuIcon(bottomMenuItem.menu)}
                                <ListItemContent>
                                    <Typography level="title-md">{bottomMenuItem.menu}</Typography>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Sheet>
    );
}
