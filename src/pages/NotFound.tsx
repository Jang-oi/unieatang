import {Box, Button} from '@mui/joy';
import Typography from '@mui/joy/Typography';
import {useNavigate} from 'react-router-dom';

export default function NotFound() {

    const navigate = useNavigate();
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
                404
            </Typography>
            <Typography level={'h4'} variant="plain" color="neutral">
                페이지를 찾을 수 없습니다.
            </Typography>
            <Button sx={{marginTop: '30px'}} onClick={() => { navigate('/') }}>메인으로</Button>
        </Box>
    );
}
