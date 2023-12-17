import {Fragment} from 'react';
import {Box, Button} from "@mui/joy";
import Typography from "@mui/joy/Typography";

export default function Main() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '80vh'
            }}
        >
            <Typography level={'h2'} variant="plain" color="neutral">
                공사중...
            </Typography>
        </Box>
    )
};
