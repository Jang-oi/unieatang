import { HyperVBoardColumn } from '../../types/hypervTypes';

import { Table } from '@mui/joy';
import axios from 'axios';
import LoadingComponent from '../common/LoadingComponent';
import React from 'react';
import { useHyperVQuery } from '../../hooks/querys/useHyperVQuery';

interface HyperVTableProps {
  hyperVData: HyperVBoardColumn[];
}

export default function HyperVTable({ hyperVData }: HyperVTableProps) {
  const { data, isLoading } = useHyperVQuery();

  return (
    <>
      {isLoading && <LoadingComponent />}
      <Table
        sx={{ marginBottom: '30px', textAlign: 'center', fontSize: '15px', width: '73vw' }}
        borderAxis="both"
        size="md"
        stickyHeader
      >
        <thead>
          <tr>
            <th>고객사명 (HyeprV 이름)</th>
            <th style={{ width: '10%' }}>연결상태</th>
            <th>접속자</th>
            <th>접속시간</th>
          </tr>
        </thead>
        <tbody>
          {hyperVData &&
            hyperVData.map((hyperVItem) => (
              <tr key={hyperVItem.id}>
                <td
                  style={{ color: '#0079F4', cursor: 'pointer' }}
                  onClick={() => {
                    /*                    axios.post(`http://localhost:3001/hypervConnect`, {
                      hostName: hyperVItem.hostName,
                      customer: hyperVItem.customer,
                      isConnect: hyperVItem.isConnect,
                    });*/
                  }}
                >
                  {hyperVItem.customer.toUpperCase()}
                </td>
                <td>{hyperVItem.isConnect && '연결 중'}</td>
                <td>{hyperVItem.clientHostName}</td>
                <td>{hyperVItem.currentTime}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
