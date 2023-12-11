import {Table} from '@mui/joy';
import {HyperVBoardColumn} from "../types/hypervTypes";

interface HyperVTableProps {
    hyperVData: HyperVBoardColumn[];
}

export default function HyperVTable({hyperVData}: HyperVTableProps) {

    return (
        <Table sx={{marginBottom: '30px', textAlign: 'center', fontSize: '15px', width:'73vw'}} borderAxis="both" size="md" stickyHeader>
            <thead>
            <tr>
                <th>고객사명 (HyeprV 이름)</th>
                <th style={{width: '10%'}}>연결상태</th>
                <th>접속자</th>
                <th>접속시간</th>
            </tr>
            </thead>
            <tbody>
            {hyperVData && hyperVData.map((hyperVItem) => (
                <tr key={hyperVItem.id}>
                    <td>{hyperVItem.customer.toUpperCase()}</td>
                    <td>{hyperVItem.isConnect && '연결 중'}</td>
                    <td>{hyperVItem.clientHostName}</td>
                    <td>{hyperVItem.currentTime}</td>
                </tr>
            ))}
            </tbody>
        </Table>
    )
}