import {useState} from 'react';
import {dbOptionData} from '../utils/commonUits';
import {Select, Option} from '@mui/joy';
import DbForm from '../components/dataBaseTest/DbForm';

const DataBaseCRUD = () => {
  const [dbOption, setDbOption] = useState<string>('Quiz');

  const onDBHandler = (event: any, optionValue: string | null) => {
    if (optionValue) setDbOption(optionValue);
  };

  return (
    <>
      <Select defaultValue={dbOption} sx={{width: '30vw', mb: '40px'}} onChange={onDBHandler}>
        {dbOptionData &&
          dbOptionData.map((optionItem, optionIndex) => (
            <Option key={optionIndex} value={optionItem.optionValue}>
              {optionItem.optionValue}
            </Option>
          ))}
      </Select>
      <DbForm optionValue={dbOption} />
    </>
  );
};

export default DataBaseCRUD;
