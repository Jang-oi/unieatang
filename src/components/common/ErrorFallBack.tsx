import React from 'react';
import {Button} from '@mui/joy';

const ErrorFallBack = ({error, resetErrorBoundary}: any) => {
  return (
    <div>
      <span>{error.message}...</span>
      <Button onClick={resetErrorBoundary} color={'neutral'}>
        Try again
      </Button>
    </div>
  );
};

export default ErrorFallBack;
