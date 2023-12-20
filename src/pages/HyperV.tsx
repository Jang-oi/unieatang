import React, { useEffect, useState} from 'react';
import HyperVTemplate from "../components/hyperv/HyperVTemplate";
import HyperVTable from "../components/hyperv/HyperVTable";
import {useHyperVQuery} from "../hooks/useHyperVQuery";
import {HyperVBoardColumn} from "../types/hypervTypes";

import {io} from "socket.io-client";
import {useRecoilValue} from "recoil";
import {hyperVSearchState} from "../recoil/hyperV/atom";

const socket = io('http://local-prd-proxy:3001', {transports: ['websocket']});
const HyperV = () => {

    const hyperVSearch = useRecoilValue<string>(hyperVSearchState);

    const query = useHyperVQuery();
    const [hyperVData, setHyperVData] = useState<HyperVBoardColumn[]>([]);

    const handleSessionData = (data: HyperVBoardColumn[]) => {
        setHyperVData((prevData) => [...prevData, ...data]);
    };

    useEffect(() => {
        socket.on('sessionData', handleSessionData);
        if (query.data) handleSessionData(query.data.data);

        return () => {
            socket.off('sessionData', handleSessionData);
        };
    }, [query.data]);

    const filteredBoardData = hyperVData.filter((boardItem) => boardItem?.customer.toLowerCase().includes(hyperVSearch.toLowerCase()));
    const sortedBoardData = filteredBoardData.sort((a, b) => a.customer.localeCompare(b.customer));

    return (
        <HyperVTemplate>
            <HyperVTable hyperVData={sortedBoardData}/>
        </HyperVTemplate>
    );
};

export default HyperV;