import {CircularProgress} from '@mui/joy';

const LoadingComponent = () => {
  return <CircularProgress color="neutral" size="lg" variant="solid" sx={{top: '50%', left: '50%', position: 'absolute'}} />;
};

export default LoadingComponent;
