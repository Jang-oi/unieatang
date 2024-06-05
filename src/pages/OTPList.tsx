import { Box, CircularProgress, Table, Typography } from '@mui/joy';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { otpListData } from '../utils/commonUits';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { SnackbarType } from '../components/common/UniSnackbar';
import { snackbarState } from '../recoil/snackbar/atom';
const OTPList = () => {
  const [snackbarOption, setSnackbarOption] = useRecoilState<SnackbarType>(snackbarState);
  const initialOtpData = {
    otp: '',
    timeUse: 0,
  };

  const [otpData, setOtpData] = useState(initialOtpData);
  const generateOTP = async (secret: any) => {
    try {
      const response = await axios.post(`http://localhost:3005/generate-otp`, { secret });
      if (response) {
        setOtpData(response.data);
      }
    } catch (error) {
      console.error('Error generating QR code', error);
    }
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

  useEffect(() => {
    let interval: any;
    if (otpData.timeUse > 0 && otpData.timeUse < 30) {
      interval = setInterval(() => {
        setOtpData((prevOtpData) => ({
          ...prevOtpData,
          timeUse: prevOtpData.timeUse + 1,
        }));
      }, 1000);
    }

    if (otpData.timeUse >= 30) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [otpData.timeUse]);
  return (
    <>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography level="title-lg"> 남은시간 :</Typography>
        <CircularProgress determinate value={otpData.timeUse * 3.33} size="md" />
        <Typography level="title-lg"> 원형이 다 찼으면 다시 호출해야함!!</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
        <Typography level="title-lg"> OTP :</Typography>
        <Typography id={'otp'} level={'title-lg'} onClick={copyToClipboard} sx={{ mb: '20px', mt: '20px' }}>
          {otpData.otp && otpData.otp}
        </Typography>
      </Box>
      <Typography color="danger" level="title-lg" variant="soft" sx={{ width: '35vw', marginBottom: '20px' }}>
        <DangerousIcon />
        Google OTP 만 가능!! 모바일 1은 너무 옛날폰이라 지원 불가!!
      </Typography>
      <Table
        sx={{ marginBottom: '30px', textAlign: 'center', fontSize: '15px', width: '73vw' }}
        borderAxis="both"
        size="md"
        stickyHeader
      >
        <thead>
          <tr>
            <th>고객사명</th>
            <th>유저아이디</th>
            <th>기기</th>
          </tr>
        </thead>
        <tbody>
          {otpListData &&
            otpListData.map((otpItem: any) => (
              <tr key={otpItem.secret}>
                <td
                  style={{ color: '#0079F4', cursor: 'pointer' }}
                  onClick={() => {
                    generateOTP(otpItem.secret);
                  }}
                >
                  {otpItem.customer}
                </td>
                <td>{otpItem.user}</td>
                <td>{otpItem.mobile}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default OTPList;
