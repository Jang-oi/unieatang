import { Box } from '@mui/joy';

import QuizTemplate from './QuizTemplate';
import CustomerTemplate from './CustomerTemplate';
import HolidayTemplate from './HolidayTemplate';
import UserTemplate from './UserTemplate';

interface DBFormProps {
  optionValue: string;
}

const DbForm = ({ optionValue }: DBFormProps) => {
  const getDBReadTable = () => {
    switch (optionValue) {
      case 'Quiz':
        return <QuizTemplate />;
      case 'Customer':
        return <CustomerTemplate />;
      case 'Holiday':
        return <HolidayTemplate />;
      case 'User':
        return <UserTemplate />;
    }
  };

  return <Box sx={{ overflow: 'auto', maxHeight: '85vh', width: '100%' }}>{getDBReadTable()}</Box>;
};

export default DbForm;
