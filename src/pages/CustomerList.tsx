import { Box, Table } from '@mui/joy';

import LoadingComponent from '../components/common/LoadingComponent';
import { useCustomerListQuery } from '../hooks/dbQuerys/useCustomerList';

const CustomerList = () => {
  const { isLoading, data } = useCustomerListQuery();

  if (isLoading) return <LoadingComponent />;
  const customerData = data.data.tableData;

  // 데이터를 팀 별로 정렬
  const sortedData: any = {};
  customerData.forEach((customerItem: any) => {
    const team = customerItem.team;
    if (!sortedData[team]) sortedData[team] = [];
    sortedData[team].push({ text: customerItem.text, ip: customerItem.ip || '' });
  });

  return (
    <>
      <Box sx={{ width: '100%', overflow: 'auto', maxHeight: '80vh', mb: '20px' }}>
        <Table sx={{ marginBottom: '30px', fontSize: '15px', width: '73vw' }} borderAxis="both" size="md" stickyHeader>
          <thead>
            <tr>
              <th>1팀(011 ~ 050)</th>
              <th>2팀(051 ~ 100)</th>
              <th>3팀(101 ~ 150)</th>
              <th>4팀(151 ~ 190)</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(...Object.values(sortedData).map((arr: any) => arr.length)) }).map(
              (_, rowIndex) => (
                <tr key={rowIndex}>
                  {[1, 2, 3, 4].map((team) => (
                    <td key={team}>
                      {sortedData[team][rowIndex] &&
                        `${sortedData[team][rowIndex].text} (${sortedData[team][rowIndex].ip})`}
                    </td>
                  ))}
                </tr>
              ),
            )}
          </tbody>
        </Table>
      </Box>
    </>
  );
};

export default CustomerList;
