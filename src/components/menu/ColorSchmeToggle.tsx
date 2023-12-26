import * as React from 'react';
import {useColorScheme} from '@mui/joy/styles';
import IconButton, {IconButtonProps} from '@mui/joy/IconButton';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeIcon from '@mui/icons-material/LightMode';
import {userSettingState} from "../../recoil/settings/atom";
import {useRecoilValue} from "recoil";
import {getColorWithTheme} from "../../utils/commonUits";

export default function ColorSchemeToggle(props: IconButtonProps) {
    const {onClick, sx, ...other} = props;
    const {mode, setMode} = useColorScheme();
    const [mounted, setMounted] = React.useState(false);
    const {color} = useRecoilValue(userSettingState);
    const {bgColor, fontColor} = getColorWithTheme(color);

    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return (
            <IconButton
                size="sm"
                {...other}
                sx={{...sx, color: fontColor}}
                disabled
            />
        );
    }
    return (
        <IconButton
            id="toggle-mode"
            size="sm"
            color={color}
            {...other}
            onClick={(event) => {
                if (mode === 'light') {
                    setMode('dark');
                } else {
                    setMode('light');
                }
                onClick?.(event);
            }}
            sx={[
                {
                    '& > *:first-of-type': {
                        display: mode === 'dark' ? 'none' : 'initial',
                    },
                    '& > *:last-child': {
                        display: mode === 'light' ? 'none' : 'initial',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <DarkModeRoundedIcon/>
            <LightModeIcon/>
        </IconButton>
    );
}