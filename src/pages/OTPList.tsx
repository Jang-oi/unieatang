import { Box, Table, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { useOTPListQuery } from '../hooks/querys/useOTPList';
import LoadingComponent from '../components/common/LoadingComponent';
import DangerousIcon from '@mui/icons-material/Dangerous';
import OTPModal from '../components/OTPList/OTPModal';
import { useRecoilState } from 'recoil';
import { otpListModalState } from '../recoil/otp/atom';

const OTPList = () => {
  const [otpListData, setOTPListData] = useState([]);
  const [otpListModal, setOTPListModal] = useRecoilState(otpListModalState);
  const { isLoading, data } = useOTPListQuery({ option: 'a' });

  useEffect(() => {
    if (data) {
      const otpData = data.data.tableData;
      setOTPListData(otpData);
    }
  }, [data]);
  if (isLoading) return <LoadingComponent />;

  return (
    <>
      <Typography color="danger" level="title-lg" variant="soft" sx={{ width: '35vw', marginBottom: '20px' }}>
        <DangerousIcon />
        Google OTP 만 가능!! 모바일 1은 너무 옛날폰이라 지원 불가!!
      </Typography>
      <Box sx={{ overflow: 'auto', maxHeight: '80vh' }}>
        <Table
          sx={{ marginBottom: '30px', textAlign: 'center', fontSize: '15px', width: '30vw' }}
          size="sm"
          stickyHeader
        >
          <thead>
            <tr>
              <th>고객사명</th>
            </tr>
          </thead>
          <tbody>
            {otpListData &&
              otpListData.map((otpItem: any) => (
                <tr key={otpItem.customer}>
                  <td
                    style={{ color: '#0079F4', cursor: 'pointer' }}
                    onClick={() => setOTPListModal({ showModal: true, customer: otpItem.customer })}
                  >
                    {otpItem.customer}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
      {otpListModal.showModal && <OTPModal />}
    </>
  );
};
export default OTPList;
