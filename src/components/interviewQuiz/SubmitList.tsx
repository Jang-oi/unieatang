import {Table} from '@mui/joy';
import {useInterviewQuizSubmitQuery} from '../../hooks/dbQuerys/useInterviewQuizSubmit';
import LoadingComponent from '../common/LoadingComponent';

const SubmitList = () => {
  const {isLoading, data} = useInterviewQuizSubmitQuery();
  if (isLoading) return <LoadingComponent />;
  const interviewSubmitData = data.data.tableData;

  console.log(interviewSubmitData);
  return (
    <Table sx={{marginBottom: '30px', textAlign: 'center', fontSize: '15px', width: '73vw'}} borderAxis="both" size="md" stickyHeader>
      <thead>
        <tr>
          <th>이름</th>
          <th>총 점수</th>
          <th>점수</th>
        </tr>
      </thead>
      <tbody>
        {interviewSubmitData &&
          interviewSubmitData.map((submitItem: any) => (
            <tr key={submitItem._id}>
              {/*<td>{hyperVItem.customer.toUpperCase()}</td>*/}
              {/*<td>{hyperVItem.isConnect && '연결 중'}</td>*/}
              {/*<td>{hyperVItem.clientHostName}</td>*/}
              {/*<td>{hyperVItem.currentTime}</td>*/}
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default SubmitList;
