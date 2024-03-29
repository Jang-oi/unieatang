import { ChangeEvent } from 'react';

import { useRecoilState, useRecoilValue } from 'recoil';
import { hyperVSearchState } from '../../recoil/hyperV/atom';
import { userSettingState } from '../../recoil/settings/atom';

import { Input, Box, Typography } from '@mui/joy';
import DangerousIcon from '@mui/icons-material/Dangerous';

export default function HyperVTemplate({ children }: { children: React.ReactNode }) {
  const [searchValue, setSearchValue] = useRecoilState<string>(hyperVSearchState);
  const { themeColor } = useRecoilValue(userSettingState);
  const onSearchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <Box sx={{ overflow: 'auto', maxHeight: '85vh' }}>
      <Input
        placeholder="고객사명 입력"
        variant="outlined"
        color={themeColor}
        sx={{ width: '20vw', marginBottom: '30px' }}
        value={searchValue}
        onChange={onSearchHandler}
      />
      <Typography color="danger" level="title-lg" variant="soft" sx={{ width: '35vw', marginBottom: '20px' }}>
        <DangerousIcon />
        고객사 방화벽, VPN 정책 등에 따라 연결상태가 정상적이지 않을 수 있음!!
      </Typography>
      {children}
    </Box>
  );
}
