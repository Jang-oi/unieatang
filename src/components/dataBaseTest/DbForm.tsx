import React from 'react';
import {Box} from '@mui/joy';
import {QuizTable} from './QuizCRUD';
import {CustomerTable} from './CustomerCRUD';
import {HolidayTable} from './HolidayCRUD';

interface DBFormProps {
  optionValue: string;
}

const DbForm = ({optionValue}: DBFormProps) => {
  const getDBReadTable = () => {
    switch (optionValue) {
      case 'Quiz':
        return <QuizTable />;
      case 'Customer':
        return <CustomerTable />;
      case 'Holiday':
        return <HolidayTable />;
    }
  };

  return <Box sx={{overflow: 'auto', maxHeight: '85vh', width: '100%'}}>{getDBReadTable()}</Box>;
};

export default DbForm;
