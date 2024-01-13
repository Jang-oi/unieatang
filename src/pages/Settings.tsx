import React from 'react';
import { useRecoilState } from 'recoil';
import { userSettingState } from '../recoil/settings/atom';
import { userSettingType } from '../types/userSettingType';

import { Select, Option } from '@mui/joy';
import { getColorWithTheme } from '../utils/commonUits';

const Settings = () => {
  const [userSetting, setUserSetting] = useRecoilState<userSettingType>(userSettingState);
  const handleChange = (event: React.SyntheticEvent | null, selectValue: string | null) => {
    if (selectValue) {
      const { bgColor, fontColor } = getColorWithTheme(selectValue);
      setUserSetting({
        ...userSetting,
        themeColor: selectValue as 'neutral' | 'primary' | 'danger' | 'success' | 'warning' | undefined,
        bgColor,
        fontColor,
      });
    }
  };

  const { themeColor } = userSetting;

  return (
    <Select defaultValue={themeColor} onChange={handleChange} sx={{ width: '40vw' }}>
      <Option value="neutral">Neutral</Option>
      <Option value="primary">Primary</Option>
      <Option value="danger">Danger</Option>
      <Option value="success">Success</Option>
      <Option value="warning">Warning</Option>
    </Select>
  );
};

export default Settings;
