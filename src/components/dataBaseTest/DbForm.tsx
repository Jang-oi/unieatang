import React from 'react';
import {Box} from '@mui/joy';
import QuizTemplate from './QuizTemplate';

interface DBFormProps {
  optionValue: string;
}

const DbForm = ({optionValue}: DBFormProps) => {
  const getDBReadTable = () => {
    switch (optionValue) {
      case 'Quiz':
        return <QuizTemplate />;
    }
  };

  return <Box sx={{overflow: 'auto', maxHeight: '85vh', width: '100%'}}>{getDBReadTable()}</Box>;
};

export default DbForm;
