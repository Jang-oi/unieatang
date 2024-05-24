import { Button, Input, Typography } from '@mui/joy';
import React, { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userSettingState } from '../recoil/settings/atom';
import axios from 'axios';
import { sha256 } from 'js-sha256';
import LoadingComponent from '../components/common/LoadingComponent';
import { SnackbarType } from '../components/common/UniSnackbar';
import { snackbarState } from '../recoil/snackbar/atom';

type fetchDataType = {
  isLoading: boolean;
  data: any;
};

//TODO 로딩 컴포넌트 실행할때 전체가 되는게 아니라 밑에 조회 영역만되게 ...

const LicenseKey = () => {
  const [fetchData, setFetchData] = useState<fetchDataType>({ isLoading: false, data: '' });
  const [snackbarOption, setSnackbarOption] = useRecoilState<SnackbarType>(snackbarState);
  const [cryptoText, setCryptoText] = useState<string>('');
  const [shaCryptoText, shaSetCryptoText] = useState<string>('');
  const [encryptText, setEncryptText] = useState<string>('');
  const { themeColor } = useRecoilValue(userSettingState);
  const { isLoading, data } = fetchData;

  const onCryptoButtonHandler = (event: any) => {
    event.preventDefault();
    const buttonId = event.target.id;
    setFetchData({ ...fetchData, isLoading: true });

    axios
      .post(`http://local-prd-proxy:3001/license/${buttonId}/text`, { cryptoText })
      .then((res) => {
        if (res.data.data.error) {
          setFetchData({ ...fetchData, isLoading: false });
          setSnackbarOption({ ...snackbarOption, open: true, isError: true, message: res.data.data.error });
        } else {
          setFetchData({
            isLoading: false,
            data: buttonId === 'encrypt' ? res.data.data.toUpperCase() : res.data.data,
          });
          setSnackbarOption({ ...snackbarOption, open: true, message: '정상적으로 암복호화 완료되었습니다.' });
        }
      })
      .catch((err) => {
        setSnackbarOption({ ...snackbarOption, open: true, isError: true, message: err });
      });
  };

  const onShaCryptoButtonHandler = (event: any) => {
    event.preventDefault();
    setEncryptText(sha256(shaCryptoText));
  };

  const copyToClipboard = (event: any) => {
    try {
      const container = document.getElementById(event.target.id) as HTMLInputElement;
      const range = document.createRange();
      range.selectNode(container);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand('copy');
      window.getSelection()?.removeAllRanges();
      setSnackbarOption({ ...snackbarOption, open: true, message: '클립보드 복사 완료되었습니다.' });
    } catch (e: any) {
      setSnackbarOption({ ...snackbarOption, open: true, isError: true, message: e.toString() });
    }
  };

  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <Input
        size="md"
        placeholder="SAP 패스워드 암복호화 문자열을 입력해주세요."
        sx={{ width: '40vw' }}
        value={cryptoText}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setCryptoText(event.target.value);
        }}
        endDecorator={
          <>
            <Button
              id="encrypt"
              variant={'solid'}
              color={themeColor}
              sx={{ margin: '5px' }}
              disabled={!cryptoText}
              onClick={onCryptoButtonHandler}
            >
              암호화
            </Button>
            <Button
              id="decrypt"
              variant={'solid'}
              color={themeColor}
              sx={{ margin: '5px' }}
              disabled={!cryptoText}
              onClick={onCryptoButtonHandler}
            >
              복호화
            </Button>
          </>
        }
      />
      <Typography id={'crypto-result'} level={'body-md'} sx={{ mt: '20px', mb: '100px' }} onClick={copyToClipboard}>
        {data && data}
      </Typography>
      <Input
        size="md"
        placeholder="SHA256 암호화 문자열을 입력해주세요."
        sx={{ width: '40vw' }}
        value={shaCryptoText}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          shaSetCryptoText(event.target.value);
        }}
        endDecorator={
          <>
            <Button
              id="encrypt"
              variant={'solid'}
              color={themeColor}
              sx={{ margin: '5px' }}
              disabled={!shaCryptoText}
              onClick={onShaCryptoButtonHandler}
            >
              암호화
            </Button>
          </>
        }
      />
      <Typography id={'crypto-result2'} level={'body-md'} sx={{ mt: '20px' }} onClick={copyToClipboard}>
        {encryptText && encryptText}
      </Typography>
    </>
  );
};

const LicenseFile = () => {};

const License = () => {
  return (
    <>
      <LicenseKey />
    </>
  );
};

export default License;
