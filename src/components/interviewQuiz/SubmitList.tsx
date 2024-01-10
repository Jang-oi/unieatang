import {Table} from '@mui/joy';
import {useInterviewQuizSubmitQuery} from '../../hooks/dbQuerys/useInterviewQuizSubmit';
import LoadingComponent from '../common/LoadingComponent';

const SubmitList = () => {
  const {isLoading, data: interviewSubmitData} = useInterviewQuizSubmitQuery();
  if (isLoading) return <LoadingComponent />;

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
                <td>{submitItem.name}</td>
                <td>{submitItem.totalScore}</td>
                <td>{submitItem.score}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default SubmitList;
