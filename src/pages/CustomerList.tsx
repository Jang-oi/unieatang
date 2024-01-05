import React from 'react';
import {Box, Table} from '@mui/joy';
import LoadingComponent from '../components/common/LoadingComponent';
import {useCustomerListQuery} from '../hooks/useCustomerListQuery';

const CustomerList = () => {
  const {isLoading, data} = useCustomerListQuery();

  if (isLoading) return <LoadingComponent />;
  const customerData = data.data.tableData;

  // 데이터를 팀 별로 정렬
  const sortedData: any = {};
  customerData.forEach((customerItem: any) => {
    const team = customerItem.team;
    if (!sortedData[team]) {
      sortedData[team] = [];
    }
    sortedData[team].push(customerItem.text);
  });

  return (
    <>
      <Box sx={{width: '100%', overflow: 'auto', maxHeight: '80vh', mb: '20px'}}>
        <Table sx={{marginBottom: '30px', textAlign: 'center', fontSize: '15px', width: '73vw'}} borderAxis="both" size="md" stickyHeader>
          <thead>
            <tr>
              <th>1팀</th>
              <th>2팀</th>
              <th>3팀</th>
              <th>4팀</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({length: Math.max(...Object.values(sortedData).map((arr: any) => arr.length))}).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {[1, 2, 3, 4].map((team) => (
                  <td key={team}>{sortedData[team] && sortedData[team][rowIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </>
  );
};

export default CustomerList;
