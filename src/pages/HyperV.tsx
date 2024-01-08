import React, {useEffect, useState} from 'react';
import HyperVTemplate from '../components/hyperv/HyperVTemplate';
import HyperVTable from '../components/hyperv/HyperVTable';
import {useHyperVQuery} from '../hooks/querys/useHyperVQuery';
import {HyperVBoardColumn} from '../types/hypervTypes';

import {io} from 'socket.io-client';
import {useRecoilValue} from 'recoil';
import {hyperVSearchState} from '../recoil/hyperV/atom';
import LoadingComponent from '../components/common/LoadingComponent';

const socket = io('http://local-prd-proxy:3001', {transports: ['websocket']});
const HyperV = () => {
  const hyperVSearch = useRecoilValue<string>(hyperVSearchState);

  const {data, isLoading} = useHyperVQuery();
  const [hyperVData, setHyperVData] = useState<HyperVBoardColumn[]>([]);

  const handleSessionData = (hyperVData: HyperVBoardColumn[]) => {
    setHyperVData(hyperVData);
  };

  useEffect(() => {
    socket.emit('hyperV', 'hyperv-session');
    socket.on('sessionData', handleSessionData);

    return () => {
      socket.off('sessionData', handleSessionData);
    };
  }, []);

  useEffect(() => {
    if (data) handleSessionData(data.data);
  }, [data]);

  if (isLoading) return <LoadingComponent />;

  const filteredBoardData = hyperVData.filter((boardItem) => boardItem?.customer.toLowerCase().includes(hyperVSearch.toLowerCase()));
  const sortedBoardData = filteredBoardData.sort((a, b) => a.customer.localeCompare(b.customer));

  return (
    <HyperVTemplate>
      <HyperVTable hyperVData={sortedBoardData} />
    </HyperVTemplate>
  );
};

export default HyperV;
