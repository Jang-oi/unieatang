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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ScienceIcon from '@mui/icons-material/Science';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import KeyIcon from '@mui/icons-material/Key';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ComputerIcon from '@mui/icons-material/Computer';
import QuizIcon from '@mui/icons-material/Quiz';

import {closeSidebar} from '../../utils/sdieBarUtil';
import {openNewTab} from '../../utils/commonUits';
import {useNavigate} from "react-router-dom";

function Toggler({
                     defaultExpanded = false,
                     renderToggle,
                     children,
                 }: {
    defaultExpanded?: boolean;
    children: React.ReactNode;
    renderToggle: (params: {
        open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    }) => React.ReactNode;
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
    const menuData = [{menu : 'Home', url : '/'}, {menu : 'HyperV', url : '/HyperV'}, {menu : 'Calendar', url : '/Calendar'}, {menu : 'Interview Quiz', url : '/InterviewQuiz'}]

    const getMenuIcon = (menu : string) => {
        switch (menu) {
            case 'Home' :
                return <HomeRoundedIcon/>
            case 'HyperV' :
                return <ComputerIcon/>
            case 'Calendar' :
                return <CalendarMonthIcon/>
            case "Interview Quiz" :
                return <QuizIcon/>
            default :
                return <></>
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
                <Avatar variant="outlined" size="sm" src=""/>
                <Box sx={{minWidth: 0, flex: 1}}>
                    <Typography level="title-sm">User.Name</Typography>
                    <Typography level="body-xs">User.????</Typography>
                </Box>
                <IconButton size="sm" variant="plain" color="neutral">
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
                    {menuData && menuData.map((menuItem, index) => (
                        <ListItem key={index}>
                            <ListItemButton onClick={() => { navigate(`${menuItem.url}`)}}>
                                {getMenuIcon(menuItem.menu)}
                                <ListItemContent>
                                    <Typography level="title-sm">{menuItem.menu}</Typography>
                                </ListItemContent>
                            </ListItemButton>
                        </ListItem>
                    ))}
                  {/*  <ListItem>
                        <ListItemButton onClick={() => {navigate('/')}}>
                            <HomeRoundedIcon/>
                            <ListItemContent>
                                <Typography level="title-sm">Home</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => {navigate('/hyperv')}}>
                            <ComputerIcon/>
                            <ListItemContent>
                                <Typography level="title-sm">HyperV</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => {navigate('/license')}}>
                            <KeyIcon/>
                            <ListItemContent>
                                <Typography level="title-sm">License</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem>
                        <ListItemButton onClick={() => {navigate('/calendar')}}>
                            <CalendarMonthIcon/>
                            <ListItemContent>
                                <Typography level="title-sm">Calendar</Typography>
                            </ListItemContent>
                        </ListItemButton>
                    </ListItem>

                    <ListItem nested>
                        <Toggler
                            renderToggle={({open, setOpen}) => (
                                <ListItemButton onClick={() => setOpen(!open)}>
                                    <ScienceIcon/>
                                    <ListItemContent>
                                        <Typography level="title-sm">Lab</Typography>
                                    </ListItemContent>
                                    <KeyboardArrowDownIcon sx={{transform: open ? 'rotate(180deg)' : 'none'}}/>
                                </ListItemButton>
                            )}
                        >
                            <List sx={{gap: 0.5}}>
                                <ListItem sx={{mt: 0.5}}>
                                    <ListItemButton onClick={() => {
                                        navigate('/lab/dbtest')
                                    }}>DB Test</ListItemButton>
                                </ListItem>
                            </List>
                        </Toggler>
                    </ListItem>*/}
                </List>

                <List
                    size="sm"
                    sx={{
                        mt: 'auto',
                        flexGrow: 0,
                        '--ListItem-radius': (theme) => theme.vars.radius.sm,
                        '--List-gap': '8px',
                        mb: 2,
                    }}
                >
{/*                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                alert('로또 추첨 사이트');
                                // openNewTab('https://114.unipost.co.kr:8543');
                            }}>
                            <AttachMoneyIcon/>
                            Lotto
                        </ListItemButton>
                    </ListItem>*/}
                    <ListItem>
                        <ListItemButton
                            onClick={() => {
                                openNewTab('https://114.unipost.co.kr:8543');
                            }}
                        >
                            <SupportRoundedIcon/>
                            Support
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <SettingsRoundedIcon/>
                            Settings
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Sheet>
    );
}
